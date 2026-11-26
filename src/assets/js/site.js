/* tomaszkwietniewski.pl - zachowania klientowe (vanilla JS, bez zależności).
   Każda sekcja to osobny init odpalany w try/catch - wyjątek w jednej
   nie wyłącza pozostałych (np. błąd formularza nie zabija wyszukiwarki). */
(function () {
  "use strict";

  /* ---------- Menu mobilne ---------- */
  function initMenu() {
    var nav = document.getElementById("nav");
    var burger = document.getElementById("nav-burger");
    if (!burger || !nav) return;
    var przelacz = function (otworz) {
      nav.classList.toggle("nav--otwarta", otworz);
      burger.setAttribute("aria-expanded", otworz ? "true" : "false");
    };
    burger.addEventListener("click", function () {
      przelacz(!nav.classList.contains("nav--otwarta"));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("nav--otwarta")) {
        przelacz(false);
        burger.focus();
      }
    });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("nav--otwarta") && !nav.contains(e.target)) przelacz(false);
    });
  }

  /* ---------- Pasek postępu czytania (tylko widok wpisu) ---------- */
  function initPasekPostepu() {
    var pasek = document.getElementById("postep-pasek");
    if (!pasek || !document.body.classList.contains("widok-wpis")) return;
    var zaplanowane = false;
    var aktualizuj = function () {
      zaplanowane = false;
      var d = document.documentElement;
      var max = d.scrollHeight - d.clientHeight;
      pasek.style.width = (max > 0 ? Math.min(1, window.scrollY / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", function () {
      // throttling przez rAF - odczyt scrollHeight/clientHeight raz na klatkę
      if (!zaplanowane) {
        zaplanowane = true;
        requestAnimationFrame(aktualizuj);
      }
    }, { passive: true });
    aktualizuj();
  }

  /* ---------- Filtr bloga (?temat=...) ---------- */
  function initFiltrBloga() {
    var siatka = document.getElementById("blog-siatka");
    if (!siatka) return;
    var karty = siatka.querySelectorAll(".karta-wpisu");
    var pusto = document.getElementById("blog-pusto");
    var klikalne = document.querySelectorAll("[data-temat]");
    var pigulki = document.querySelectorAll(".filtry__pigulka");
    var licznik = document.getElementById("blog-licznik");

    var zastosujFiltr = function (temat) {
      var widoczne = 0;
      karty.forEach(function (karta) {
        var pasuje = !temat || (karta.dataset.cats || "").split(" ").indexOf(temat) !== -1;
        karta.hidden = !pasuje;
        if (pasuje) widoczne++;
      });
      if (pusto) pusto.hidden = widoczne > 0;
      pigulki.forEach(function (p) {
        var aktywna = (p.dataset.temat || "") === temat;
        p.classList.toggle("filtry__pigulka--aktywna", aktywna);
        if (aktywna) p.setAttribute("aria-current", "true");
        else p.removeAttribute("aria-current");
      });
      if (licznik) {
        licznik.textContent = widoczne === 1 ? "1 wpis" : widoczne + " wpisów";
      }
      var adres = temat ? "/blog/?temat=" + encodeURIComponent(temat) : "/blog/";
      history.replaceState(null, "", adres);
    };

    klikalne.forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        zastosujFiltr(el.dataset.temat || "");
      });
    });

    var startowy = new URLSearchParams(location.search).get("temat") || "";
    if (startowy) zastosujFiltr(startowy);
  }

  /* ---------- Odkrywanie e-maila (Kontakt) ---------- */
  function initEmail() {
    var przycisk = document.getElementById("kontakt-email");
    if (!przycisk) return;
    przycisk.addEventListener("click", function odkryj(e) {
      e.preventDefault();
      var adres = przycisk.dataset.u + "@" + przycisk.dataset.d;
      var opis = przycisk.querySelector(".kontakt-kafel__opis");
      if (opis) {
        opis.textContent = adres;
        opis.classList.add("kontakt-kafel__opis--odkryty");
      }
      // button -> link mailto z tą samą treścią; fokus zostaje na kaflu,
      // więc drugi Enter otwiera program pocztowy
      var link = document.createElement("a");
      link.className = przycisk.className;
      link.id = przycisk.id;
      link.href = "mailto:" + adres;
      while (przycisk.firstChild) link.appendChild(przycisk.firstChild);
      przycisk.replaceWith(link);
      link.focus();
    });
  }

  /* ---------- Donut portfela (O mnie) ---------- */
  function initDonut() {
    var donut = document.getElementById("donut");
    if (!donut) return;
    var elementy = document.querySelectorAll("[data-seg]");
    var kolka = donut.querySelectorAll("circle[data-seg]");
    var legendy = document.querySelectorAll(".legenda__wiersz[data-seg]");
    var wartosc = document.getElementById("donut-wartosc");
    var pct = document.getElementById("donut-pct");
    var opis = document.getElementById("donut-opis");
    var podpowiedz = document.getElementById("donut-podpowiedz");
    if (!wartosc || !pct || !opis || !podpowiedz) return;

    // Dane segmentów z legendy (procent + opis + kolor kwadratu) - jedna
    // definicja w HTML zamiast duplikatu w JS.
    var SEGMENTY = {};
    legendy.forEach(function (l) {
      var kwadrat = l.querySelector(".legenda__kwadrat");
      var mocne = l.querySelector("strong");
      SEGMENTY[l.dataset.seg] = {
        pct: mocne ? mocne.textContent : "",
        opis: l.textContent.replace(mocne ? mocne.textContent : "", "").replace(/^\s*·\s*/, "").trim(),
        kolor: kwadrat ? getComputedStyle(kwadrat).backgroundColor : ""
      };
    });

    var ustaw = function (seg) {
      kolka.forEach(function (k) {
        k.setAttribute("stroke-width", k.dataset.seg === seg ? "7.2" : "5.5");
        k.setAttribute("stroke-opacity", seg && k.dataset.seg !== seg ? ".3" : "1");
      });
      legendy.forEach(function (l) {
        l.classList.toggle("legenda__wiersz--podswietlona", l.dataset.seg === seg);
        l.style.opacity = seg && l.dataset.seg !== seg ? ".3" : "1";
      });
      if (seg && SEGMENTY[seg]) {
        pct.textContent = SEGMENTY[seg].pct;
        pct.style.color = SEGMENTY[seg].kolor;
        opis.textContent = SEGMENTY[seg].opis;
        wartosc.hidden = false;
        podpowiedz.hidden = true;
      } else {
        wartosc.hidden = true;
        podpowiedz.hidden = false;
      }
    };

    elementy.forEach(function (el) {
      el.addEventListener("mouseenter", function () { ustaw(el.dataset.seg); });
      el.addEventListener("mouseleave", function () { ustaw(null); });
      // klawiatura: wiersze legendy mają tabindex="0"
      el.addEventListener("focus", function () { ustaw(el.dataset.seg); });
      el.addEventListener("blur", function () { ustaw(null); });
    });
  }

  /* ---------- Formularze MailerLite ---------- */
  function initFormularze() {
    document.querySelectorAll("[data-ml-form]").forEach(function (form) {
      var przycisk = form.querySelector("button[type=submit]");
      if (!przycisk) return;
      var tekstPrzycisku = przycisk.textContent; // zapamiętany raz, nie z bieżącego stanu
      var pole = form.querySelector("input[type=email]");
      var wysylanie = false;

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (wysylanie) return; // strażnik przed podwójnym wysłaniem
        wysylanie = true;
        var komunikat = form.parentElement.querySelector("[data-ml-komunikat]");
        przycisk.disabled = true;
        przycisk.textContent = "Zapisuję...";
        if (komunikat) komunikat.hidden = true;
        if (pole) pole.removeAttribute("aria-invalid");

        var pokazBlad = function (tresc) {
          wysylanie = false;
          przycisk.disabled = false;
          przycisk.textContent = tekstPrzycisku;
          if (pole) pole.setAttribute("aria-invalid", "true");
          if (komunikat) {
            komunikat.textContent = tresc;
            komunikat.classList.add("form-nl__komunikat--blad");
            komunikat.hidden = false;
          }
        };

        // Timeout 15 s - bez niego zawieszone żądanie zostawiałoby przycisk
        // w stanie "Zapisuję..." na zawsze
        fetch(form.action, { method: "POST", body: new FormData(form), signal: AbortSignal.timeout(15000) })
          .then(function (res) { return res.json().catch(function () { return {}; }).then(function (dane) { return { ok: res.ok, dane: dane }; }); })
          .then(function (wynik) {
            if (wynik.ok && wynik.dane.success !== false) {
              window.location.href = "/dziekuje-bardzo/";
            } else {
              pokazBlad("Nie udało się zapisać. Sprawdź adres e-mail i spróbuj ponownie za chwilę.");
            }
          })
          .catch(function () {
            // błąd sieci/timeout - inna wiadomość niż odrzucenie adresu
            pokazBlad("Brak połączenia z serwerem zapisu. Spróbuj ponownie za chwilę.");
          });
      });
    });
  }

  /* ---------- Wyszukiwarka (Pagefind, ładowana leniwie) ---------- */
  function initSzukaj() {
    var modal = document.getElementById("szukaj-modal");
    if (!modal) return;
    var przyciskSzukaj = document.getElementById("nav-szukaj");
    var szukajZaladowane = false;

    var otworzSzukaj = function () {
      if (modal.open) return;
      modal.showModal();
      if (szukajZaladowane) {
        var pole = modal.querySelector("input");
        if (pole) pole.focus();
        return;
      }
      szukajZaladowane = true;
      var css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "/pagefind/pagefind-ui.css";
      document.head.appendChild(css);
      var skrypt = document.createElement("script");
      skrypt.src = "/pagefind/pagefind-ui.js";
      skrypt.onload = function () {
        /* global PagefindUI */
        new PagefindUI({
          element: "#szukaj-pagefind",
          showSubResults: true,
          showImages: false,
          translations: {
            placeholder: "Czego szukasz?",
            clear_search: "Wyczyść",
            load_more: "Pokaż więcej wyników",
            zero_results: "Brak wyników dla „[SEARCH_TERM]”",
            many_results: "[COUNT] wyników dla „[SEARCH_TERM]”",
            one_result: "[COUNT] wynik dla „[SEARCH_TERM]”",
            searching: "Szukam „[SEARCH_TERM]”..."
          }
        });
        setTimeout(function () {
          var pole = modal.querySelector("input");
          if (pole) pole.focus();
        }, 60);
      };
      skrypt.onerror = function () {
        // pozwól na ponowną próbę przy kolejnym otwarciu modala
        szukajZaladowane = false;
        skrypt.remove();
        var info = document.getElementById("szukaj-info");
        if (info) info.hidden = false;
      };
      document.head.appendChild(skrypt);
    };

    if (przyciskSzukaj) przyciskSzukaj.addEventListener("click", otworzSzukaj);
    var zamknij = document.getElementById("szukaj-zamknij");
    if (zamknij) zamknij.addEventListener("click", function () { modal.close(); });
    modal.addEventListener("click", function (e) {
      if (e.target === modal) modal.close();
    });
    document.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        otworzSzukaj();
      }
    });
  }

  /* ---------- Galeria zrzutów w oknie (data-galeria na /projekty/) ----------
     Kontener [data-galeria="Nazwa"] zawiera linki <a href=pełny_zrzut data-podpis data-szer data-wys>;
     pierwszy jest widoczną miniaturą, reszta ukryta. [data-galeria-otworz="Nazwa"] otwiera od pierwszego.
     Bez JS link prowadzi po prostu do pełnego zrzutu. */
  function initGaleria() {
    var galerie = document.querySelectorAll("[data-galeria]");
    if (!galerie.length || typeof HTMLDialogElement !== "function") return;

    var dlg = document.createElement("dialog");
    dlg.className = "galeria-modal";
    dlg.innerHTML =
      '<div class="galeria-modal__wnetrze">' +
      '<img class="galeria-modal__obraz" alt="">' +
      '<p class="galeria-modal__podpis"></p>' +
      '<p class="galeria-modal__licznik" aria-live="polite"></p>' +
      '<button type="button" class="galeria-modal__btn galeria-modal__zamknij" aria-label="Zamknij podgląd">&times;</button>' +
      '<button type="button" class="galeria-modal__btn galeria-modal__poprz" aria-label="Poprzedni zrzut">&lsaquo;</button>' +
      '<button type="button" class="galeria-modal__btn galeria-modal__nast" aria-label="Następny zrzut">&rsaquo;</button>' +
      "</div>";
    document.body.appendChild(dlg);
    var obraz = dlg.querySelector(".galeria-modal__obraz");
    var podpis = dlg.querySelector(".galeria-modal__podpis");
    var licznik = dlg.querySelector(".galeria-modal__licznik");
    var zamknij = dlg.querySelector(".galeria-modal__zamknij");
    var poprz = dlg.querySelector(".galeria-modal__poprz");
    var nast = dlg.querySelector(".galeria-modal__nast");
    var elementy = [], nr = 0, nazwa = "", powrot = null;

    function pokaz(i) {
      nr = (i + elementy.length) % elementy.length;
      var a = elementy[nr];
      if (a.dataset.szer) { obraz.width = +a.dataset.szer; obraz.height = +a.dataset.wys; }
      obraz.src = a.getAttribute("href");
      obraz.alt = a.dataset.podpis || "";
      podpis.textContent = (a.dataset.podpis || "") + " ";
      var pelny = document.createElement("a");
      pelny.href = a.getAttribute("href");
      pelny.target = "_blank";
      pelny.rel = "noopener";
      pelny.textContent = "Pełny rozmiar";
      podpis.appendChild(pelny);
      licznik.textContent = nazwa + ": zrzut " + (nr + 1) + " z " + elementy.length;
      poprz.hidden = nast.hidden = elementy.length < 2;
    }

    function otworz(kontener, i) {
      elementy = Array.prototype.slice.call(kontener.querySelectorAll("a[href]"));
      if (!elementy.length) return;
      nazwa = kontener.getAttribute("data-galeria") || "Zrzuty";
      dlg.setAttribute("aria-label", nazwa + " - zrzuty ekranu");
      powrot = document.activeElement;
      pokaz(i > 0 ? i : 0);
      document.documentElement.style.overflow = "hidden";
      dlg.showModal();
      (nast.hidden ? zamknij : nast).focus();
    }

    dlg.addEventListener("close", function () {
      document.documentElement.style.overflow = "";
      obraz.removeAttribute("src");
      if (powrot && powrot.focus) powrot.focus({ preventScroll: true });
    });
    zamknij.addEventListener("click", function () { dlg.close(); });
    poprz.addEventListener("click", function () { pokaz(nr - 1); });
    nast.addEventListener("click", function () { pokaz(nr + 1); });
    // klik w tło (poza obrazem, podpisem i przyciskami) zamyka
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg || e.target.classList.contains("galeria-modal__wnetrze")) dlg.close();
    });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); pokaz(nr - 1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); pokaz(nr + 1); }
    });
    // przesunięcie palcem; nie przy powiększeniu dwoma palcami
    var startX = null, startY = 0;
    dlg.addEventListener("touchstart", function (e) {
      var zoom = window.visualViewport ? window.visualViewport.scale : 1;
      startX = e.touches.length === 1 && zoom <= 1.05 ? e.touches[0].clientX : null;
      startY = e.touches[0].clientY;
    }, { passive: true });
    dlg.addEventListener("touchend", function (e) {
      if (startX === null || elementy.length < 2) return;
      var dx = e.changedTouches[0].clientX - startX, dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) pokaz(nr + (dx < 0 ? 1 : -1));
      startX = null;
    }, { passive: true });

    function zModyfikatorem(e) { return e.ctrlKey || e.metaKey || e.shiftKey || e.button > 0; }
    Array.prototype.forEach.call(galerie, function (kontener) {
      kontener.addEventListener("click", function (e) {
        var a = e.target.closest("a[href]");
        if (!a || zModyfikatorem(e)) return;
        e.preventDefault();
        otworz(kontener, Array.prototype.indexOf.call(kontener.querySelectorAll("a[href]"), a));
      });
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-galeria-otworz]"), function (link) {
      link.addEventListener("click", function (e) {
        var cel = link.getAttribute("data-galeria-otworz");
        var kontener = Array.prototype.find.call(galerie, function (g) { return g.getAttribute("data-galeria") === cel; });
        if (!kontener || zModyfikatorem(e)) return;
        e.preventDefault();
        otworz(kontener, 0);
      });
    });
  }

  [initMenu, initPasekPostepu, initFiltrBloga, initEmail, initDonut, initFormularze, initSzukaj, initGaleria]
    .forEach(function (init) {
      try { init(); } catch (err) {
        if (window.console && console.error) console.error("site.js: " + init.name, err);
      }
    });
})();
