/* tomaszkwietniewski.pl - zachowania klientowe (vanilla JS, bez zależności) */
(function () {
  "use strict";

  /* ---------- Menu mobilne ---------- */
  var nav = document.getElementById("nav");
  var burger = document.getElementById("nav-burger");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var otwarte = nav.classList.toggle("nav--otwarta");
      burger.setAttribute("aria-expanded", otwarte ? "true" : "false");
    });
  }

  /* ---------- Pasek postępu czytania (tylko widok wpisu) ---------- */
  var pasek = document.getElementById("postep-pasek");
  if (pasek && document.body.classList.contains("widok-wpis")) {
    var aktualizuj = function () {
      var d = document.documentElement;
      var max = d.scrollHeight - d.clientHeight;
      pasek.style.width = (max > 0 ? Math.min(1, window.scrollY / max) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", aktualizuj, { passive: true });
    aktualizuj();
  }

  /* ---------- Filtr bloga (?temat=...) ---------- */
  var siatka = document.getElementById("blog-siatka");
  if (siatka) {
    var karty = siatka.querySelectorAll(".karta-wpisu");
    var pusto = document.getElementById("blog-pusto");
    var klikalne = document.querySelectorAll("[data-temat]");
    var pigulki = document.querySelectorAll(".filtry__pigulka");

    var zastosujFiltr = function (temat) {
      var widoczne = 0;
      karty.forEach(function (karta) {
        var pasuje = !temat || (karta.dataset.cats || "").split(" ").indexOf(temat) !== -1;
        karta.hidden = !pasuje;
        if (pasuje) widoczne++;
      });
      if (pusto) pusto.hidden = widoczne > 0;
      pigulki.forEach(function (p) {
        p.classList.toggle("filtry__pigulka--aktywna", (p.dataset.temat || "") === temat);
      });
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
  var emailKafel = document.getElementById("kontakt-email");
  if (emailKafel) {
    emailKafel.addEventListener("click", function odkryj(e) {
      e.preventDefault();
      var adres = emailKafel.dataset.u + "@" + emailKafel.dataset.d;
      var opis = emailKafel.querySelector(".kontakt-kafel__opis");
      opis.textContent = adres;
      opis.classList.add("kontakt-kafel__opis--odkryty");
      emailKafel.setAttribute("href", "mailto:" + adres);
      emailKafel.removeEventListener("click", odkryj);
    });
  }

  /* ---------- Donut portfela (O mnie) ---------- */
  var donut = document.getElementById("donut");
  if (donut) {
    var SEGMENTY = {
      akcje: { pct: "67%", opis: "Akcje globalne (VWCE)", kolor: "#1E56D6" },
      obligacje: { pct: "32%", opis: "Obligacje (EDO i ROD)", kolor: "#8FB0F5" },
      gotowka: { pct: "1%", opis: "Gotówka", kolor: "#131A26" }
    };
    var elementy = document.querySelectorAll("[data-seg]");
    var kolka = donut.querySelectorAll("circle[data-seg]");
    var legendy = document.querySelectorAll(".legenda__wiersz[data-seg]");
    var wartosc = document.getElementById("donut-wartosc");
    var pct = document.getElementById("donut-pct");
    var opis = document.getElementById("donut-opis");
    var podpowiedz = document.getElementById("donut-podpowiedz");

    var ustaw = function (seg) {
      kolka.forEach(function (k) {
        k.setAttribute("stroke-width", k.dataset.seg === seg ? "7.2" : "5.5");
        k.setAttribute("stroke-opacity", seg && k.dataset.seg !== seg ? ".3" : "1");
      });
      legendy.forEach(function (l) {
        l.classList.toggle("legenda__wiersz--podswietlona", l.dataset.seg === seg);
        l.style.opacity = seg && l.dataset.seg !== seg ? ".3" : "1";
      });
      if (seg) {
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
    });
  }

  /* ---------- Formularze MailerLite ---------- */
  document.querySelectorAll("[data-ml-form]").forEach(function (form) {
    var przycisk = form.querySelector("button[type=submit]");
    var tekstPrzycisku = przycisk.textContent; // zapamiętany raz, nie z bieżącego stanu
    var wysylanie = false;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (wysylanie) return; // strażnik przed podwójnym wysłaniem
      wysylanie = true;
      var komunikat = form.parentElement.querySelector("[data-ml-komunikat]");
      przycisk.disabled = true;
      przycisk.textContent = "Zapisuję...";
      if (komunikat) komunikat.hidden = true;

      fetch(form.action, { method: "POST", body: new FormData(form) })
        .then(function (res) { return res.json().catch(function () { return {}; }).then(function (dane) { return { ok: res.ok, dane: dane }; }); })
        .then(function (wynik) {
          if (wynik.ok && wynik.dane.success !== false) {
            window.location.href = "/dziekuje-bardzo/";
          } else {
            throw new Error("Odpowiedź serwera: błąd zapisu");
          }
        })
        .catch(function () {
          wysylanie = false;
          przycisk.disabled = false;
          przycisk.textContent = tekstPrzycisku;
          if (komunikat) {
            komunikat.textContent = "Nie udało się zapisać. Sprawdź adres e-mail i spróbuj ponownie za chwilę.";
            komunikat.classList.add("form-nl__komunikat--blad");
            komunikat.hidden = false;
          }
        });
    });
  });

  /* ---------- Wyszukiwarka (Pagefind, ładowana leniwie) ---------- */
  var modal = document.getElementById("szukaj-modal");
  var przyciskSzukaj = document.getElementById("nav-szukaj");
  var szukajZaladowane = false;

  var otworzSzukaj = function () {
    if (!modal) return;
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
      var info = document.getElementById("szukaj-info");
      if (info) info.hidden = false;
    };
    document.head.appendChild(skrypt);
  };

  if (przyciskSzukaj) przyciskSzukaj.addEventListener("click", otworzSzukaj);
  var zamknij = document.getElementById("szukaj-zamknij");
  if (zamknij && modal) zamknij.addEventListener("click", function () { modal.close(); });
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) modal.close();
    });
  }
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      otworzSzukaj();
    }
  });
})();
