---
title: "Jak za 1150 zł zrobiłem inteligentne ładowanie auta elektrycznego z nadwyżek słońca"
slug: "jak-za-1150-zl-zrobilem-inteligentne-ladowanie-auta-elektrycznego-z-nadwyzek-slonca"
miniatura: "/media/2026/05/2026-05-04_ladowanie_EV.png"
date: "2026-05-02T09:15:13"
modified: "2026-08-11T14:35:00"
url_stara: "https://tomaszkwietniewski.pl/jak-za-1150-zl-zrobilem-inteligentne-ladowanie-auta-elektrycznego-z-nadwyzek-slonca/"
typ: "wpis"
kategorie: ["Nowe technologie", "Tipy ułatwiające życie"]
excerpt: "Mam fotowoltaikę 9 kWp, magazyn energii 15 kWh i Citroëna Spacetourer elektrycznego z baterią 75 kWh. Przez chwilę ładowałem auto „na ślepo” — podłączałem kabel i tyle. Tymczasem latem moje panele produkują więcej prądu niż potrzebuję, a nadwyżki szły do sieci. Postanowiłem to zmienić. Problem: moja ładowarka — dé EV Charger 11 kW z Wi-Fi…"
---


<p class="wp-block-paragraph">Mam fotowoltaikę 9 kWp, magazyn energii 15 kWh i Citroëna Spacetourer elektrycznego z baterią 75 kWh. Przez chwilę ładowałem auto &#8222;na ślepo&#8221; — podłączałem kabel i tyle. Tymczasem latem moje panele produkują więcej prądu niż potrzebuję, a nadwyżki szły do sieci. Postanowiłem to zmienić.</p>



<p class="wp-block-paragraph">Problem: moja ładowarka — <strong>dé EV Charger 11 kW z Wi-Fi</strong> za około 1150 zł — teoretycznie nie oferuje żadnych zaawansowanych konfiguracji sterowania mocą. Łączy się z chmurą Tuya przez aplikację Smart Life i tyle. Nie ma API, nie ma integracji z Home Assistant, nie ma możliwości ustawienia &#8222;ładuj tylko z nadwyżek&#8221;.</p>



<p class="wp-block-paragraph">A jednak udało się to osiągnąć. Oto jak — i na co uważać.</p>



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<h2 class="wp-block-heading">Co mam w domu</h2>



<ul class="wp-block-list">
<li><strong>Fotowoltaika:</strong> 9 kWp (18 paneli JA Solar n-type)</li>



<li><strong>Falownik hybrydowy:</strong> Sofar HYD 8KTL-3PH</li>



<li><strong>Magazyn energii:</strong> Sofar BTS E15-DS5 (15 kWh)</li>



<li><strong>Auto:</strong> Citroën Spacetourer Electric 75 kWh</li>



<li><strong>Ładowarka:</strong> dé EV Charger 11 kW, 3-fazowa, Wi-Fi, protokół Tuya</li>



<li><strong>Centrum automatyki:</strong> Home Assistant na Synology NAS DS420+</li>



<li><strong>Taryfa:</strong> Pstryk (dynamiczne ceny energii)</li>
</ul>



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<h2 class="wp-block-heading">Dlaczego Local Tuya nie zadziałało — protokół 3.5</h2>



<p class="wp-block-paragraph">Zanim doszedłem do rozwiązania z TinyTuya, próbowałem najprostszej drogi: integracji <strong>Local Tuya</strong> dostępnej przez HACS. To popularna integracja która pozwala sterować urządzeniami Tuya lokalnie bezpośrednio z Home Assistant — bez żadnego kodowania w Pythonie.</p>



<p class="wp-block-paragraph">Przeprowadziłem szczegółową diagnostykę. Połączenie TCP z ładowarką na porcie 6668 działało prawidłowo, Local Key był poprawny, adres IP również. Problem tkwił gdzie indziej — dwa czynniki jednocześnie:</p>



<p class="wp-block-paragraph"><strong>Problem 1: Protokół 3.5</strong><br>Ładowarka dé EV używa protokołu Tuya w wersji <strong>3.5</strong>, natomiast integracja Local Tuya obsługuje tylko wersje do <strong>3.4</strong>. To powodowało że wszystkie encje pozostawały w stanie <code>unavailable</code> mimo prawidłowej konfiguracji.</p>



<p class="wp-block-paragraph"><strong>Problem 2: Brak UDP discovery</strong><br>Ładowarka nie wysyłała broadcastu UDP discovery, którego Local Tuya oczekuje do automatycznego wykrycia urządzenia w sieci. Nawet ręczne wpisanie IP nie pomagało — integracja nie mogła nawiązać poprawnej sesji.</p>



<p class="wp-block-paragraph"><strong>Rozwiązanie: AppDaemon + TinyTuya</strong></p>



<p class="wp-block-paragraph">Biblioteka TinyTuya obsługuje protokół 3.5 i połączyła się bez problemów. Uruchomiłem ją przez add-on AppDaemon w Home Assistant, który pozwala instalować paczki Pythona trwale.</p>



<p class="wp-block-paragraph">Oficjalne nazwy Data Pointów pobrane przez Tuya IoT Platform:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>DP</th><th>Nazwa w API</th><th>Znaczenie</th></tr></thead><tbody><tr><td>101</td><td>x_work_state</td><td>Stan pracy jako liczba</td></tr><tr><td>102</td><td>x_metrics</td><td>Dane pomiarowe JSON (napięcie/prąd/moc per faza)</td></tr><tr><td>109</td><td>x_work_st_debug</td><td>Status: WORKING / SLEEP / IDLE / PAUSE</td></tr><tr><td>140</td><td>x_do_charge</td><td>Start/Stop ładowania (bool)</td></tr><tr><td>150</td><td>x_charge_current</td><td>Prąd ładowania w amperach</td></tr></tbody></table></figure>



<p class="wp-block-paragraph"><strong>Protokół 3.5 — to kluczowa informacja</strong> dla każdego kto będzie chciał zintegrować tę ładowarkę z Home Assistant. Local Tuya nie zadziała. Jedyna działająca droga to AppDaemon + TinyTuya.</p>



<p class="wp-block-paragraph">Jeśli kiedyś Local Tuya doda obsługę protokołu 3.5, konfiguracja stanie się znacznie prostsza — wystarczy dodać urządzenie przez UI bez pisania kodu.</p>



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<h2 class="wp-block-heading">Kluczowe odkrycie: TinyTuya i lokalna kontrola</h2>



<p class="wp-block-paragraph">Urządzenia Tuya (Smart Life) domyślnie komunikują się przez chmurę producenta. Każde kliknięcie w aplikacji wędruje przez serwery Tuya i wraca do urządzenia. To oznacza zależność od internetu, opóźnienia i — co ważne — <strong>limity zapytań w darmowym planie API</strong> (około 1000 dziennie).</p>



<p class="wp-block-paragraph">Dla użytkowników z Polski dane trafiają na serwer w <strong>Frankfurcie</strong> (AWS, Niemcy) — nie w Chinach jak można by się spodziewać. Tuya ma centra danych w Europie Centralnej i Zachodniej obsługujące europejskich użytkowników. Opóźnienia są więc minimalne, ale limit zapytań pozostaje problemem.</p>



<p class="wp-block-paragraph">Ale jest sposób, żeby to obejść. Biblioteka <strong>TinyTuya</strong> pozwala komunikować się z urządzeniem <strong>bezpośrednio po sieci lokalnej</strong>, bez udziału chmury. Wystarczy znać trzy rzeczy:</p>



<ul class="wp-block-list">
<li><strong>Device ID</strong> — unikalny identyfikator urządzenia</li>



<li><strong>Local Key</strong> — klucz szyfrujący (pobierany jednorazowo z chmury Tuya)</li>



<li><strong>IP urządzenia</strong> — lokalny adres w sieci domowej</li>
</ul>



<p class="wp-block-paragraph">Po jednorazowym pobraniu klucza z chmury (przez Tuya IoT Platform), całe sterowanie odbywa się lokalnie. Zero limitów, zero opóźnień, zero zależności od internetu.</p>



<pre class="wp-block-code"><code>import tinytuya

d = tinytuya.Device(
    dev_id="TWOJ_DEVICE_ID",
    address="192.168.X.X",
    local_key="TWOJ_LOCAL_KEY",
    version=3.5
)

status = d.status()
print(status)</code></pre>



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<h2 class="wp-block-heading">Data Pointy — jak ładowarka mówi o sobie</h2>



<p class="wp-block-paragraph">Urządzenia Tuya komunikują się przez tzw. <strong>Data Pointy (DP)</strong> — numerowane kanały danych. Każde urządzenie ma swój zestaw DP. Żeby dowiedzieć się co DP znaczą, trzeba zapytać urządzenie i przeanalizować odpowiedź w różnych stanach pracy.</p>



<p class="wp-block-paragraph">Kluczowa pułapka: klucze w słowniku <code>dps</code> są <strong>stringami</strong>, nie integerami. Dlatego <code>dps.get(109)</code> zawsze zwróci <code>None</code> — trzeba używać <code>dps.get("109")</code>. To jeden z tych błędów który potrafi zająć godzinę debugowania.</p>



<h3 class="wp-block-heading">Pełna mapa Data Pointów</h3>



<p class="wp-block-paragraph">Po dogłębnej analizie udało mi się rozszyfrować wszystkie DP tej ładowarki:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>DP</th><th>Typ</th><th>Znaczenie</th><th>Przydatność</th></tr></thead><tbody><tr><td>102</td><td>JSON</td><td>Dane pomiarowe per faza (napięcie, prąd, moc)</td><td>⭐⭐⭐ używam</td></tr><tr><td>105</td><td>JSON</td><td>Historia ostatniej sesji (start, koniec, czas, prąd)</td><td>⭐⭐⭐ bardzo przydatne</td></tr><tr><td>106</td><td>JSON</td><td>Dane techniczne (wersja firmware, parametry)</td><td>⭐ informacyjne</td></tr><tr><td>107</td><td>string</td><td>Lista dostępnych poziomów prądu:<code>[6, 8, 10, 13, 16]</code></td><td>⭐⭐ warto znać</td></tr><tr><td>109</td><td>string</td><td>Status:<code>WORKING</code> / <code>SLEEP</code> / <code>IDLE</code> / <code>PAUSE</code></td><td>⭐⭐⭐ używam</td></tr><tr><td>140</td><td>bool</td><td>Start/Stop ładowania</td><td>⭐⭐⭐ używam</td></tr><tr><td>150</td><td>int</td><td>Prąd ładowania w A (6–16)</td><td>⭐⭐⭐ używam</td></tr><tr><td>151</td><td>JSON</td><td>Wbudowany harmonogram ładowania</td><td>⭐⭐ alternatywa dla AppDaemon</td></tr><tr><td>152</td><td>int</td><td>Maksymalny prąd (16A)</td><td>⭐ informacyjne</td></tr><tr><td>155</td><td>bool</td><td>Nieznane — prawdopodobnie blokada ładowania</td><td>❓ do zbadania</td></tr><tr><td>156</td><td>bool</td><td>Nieznane — może tryb jednofazowy/trójfazowy</td><td>❓ do zbadania</td></tr><tr><td>157</td><td>int</td><td>Nieznane (zawsze 1)</td><td>❓ do zbadania</td></tr><tr><td>188</td><td>bool</td><td>Nieznane — może lock kabla</td><td>❓ do zbadania</td></tr></tbody></table></figure>



<h3 class="wp-block-heading">DP 105 — historia sesji gotowa do odczytu</h3>



<p class="wp-block-paragraph">Ten DP zawiera dane o ostatnim ładowaniu bez potrzeby własnych liczników:</p>



<pre class="wp-block-code"><code>{
  "t": "2026-04-30 17:13:26",
  "s": "17:13",
  "e": "17:41",
  "d": 1677,
  "c": 17
}</code></pre>



<p class="wp-block-paragraph">Gdzie <code>s</code> = godzina startu, <code>e</code> = godzina końca, <code>d</code> = czas trwania w sekundach (1677s ≈ 28 min), <code>c</code> = prąd w A.</p>



<h3 class="wp-block-heading">DP 102 — dane pomiarowe i ukryta skala</h3>



<p class="wp-block-paragraph">Format danych pomiarowych z DP 102:</p>



<pre class="wp-block-code"><code>{
  "L1": &#91;2260, 144, 32],
  "L2": &#91;2260, 147, 33],
  "L3": &#91;2260, 145, 32],
  "p": 98,
  "e": 11
}</code></pre>



<p class="wp-block-paragraph">Gdzie <code>L1[2]</code>, <code>L2[2]</code>, <code>L3[2]</code> to moc per faza, a <code>p</code> to łączna moc — <strong>mnożona przez 100</strong> (98 × 100 = 9800 W = 9,8 kW). Uwaga: nigdzie w dokumentacji tego nie ma — odkryłem to porównując wartości z aplikacją Smart Life.</p>



<h3 class="wp-block-heading">DP 151 — wbudowany harmonogram</h3>



<p class="wp-block-paragraph">Ładowarka ma własny harmonogram który można programować:</p>



<pre class="wp-block-code"><code>{"m": 0, "dt": 0, "ss": "15:00", "se": "17:00"}</code></pre>



<p class="wp-block-paragraph">W prostszych przypadkach (np. &#8222;ładuj zawsze w nocy 23:00–6:00&#8221;) można ustawić harmonogram bezpośrednio bez AppDaemon. Do dynamicznego sterowania zależnego od cen i PV — AppDaemon jest niezastąpiony.</p>



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<h2 class="wp-block-heading">Logika sterowania — sześć trybów</h2>



<p class="wp-block-paragraph">Skrypt AppDaemon co 30 sekund sprawdza stan instalacji i podejmuje decyzję. W aktualnej wersji obsługuje sześć trybów pracy:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Tryb</th><th>Warunek</th><th>Działanie</th></tr></thead><tbody><tr><td><code>EMERGENCY</code></td><td>Włączony ręcznie przez toggle w HA</td><td>Ładuj natychmiast na 13A (~9 kW), niezależnie od PV i cen</td></tr><tr><td><code>NEGATIVE_PRICE</code></td><td>Cena Pstryk &lt; 0 zł/kWh</td><td>Ładuj na 13A (~9 kW, bufor ~2 kW na dom)</td></tr><tr><td><code>WINTER_NIGHT</code></td><td>Tryb zimowy włączony, godz. 22–6</td><td>Ładuj na 10A (tania taryfa nocna)</td></tr><tr><td><code>SOLAR</code></td><td>SOC baterii ≥ 95% i nadwyżka ≥ 1,6 kW</td><td>Ładuj proporcjonalnie do nadwyżki (6–16A)</td></tr><tr><td><code>BATTERY_PRIORITY</code></td><td>SOC &lt; 95%</td><td>Czekaj, priorytet ładowania baterii</td></tr><tr><td><code>IDLE</code></td><td>Brak nadwyżek lub auto niepodłączone</td><td>Ładowarka wyłączona</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">Tryby sprawdzane są w kolejności od góry — EMERGENCY ma najwyższy priorytet.</p>



<h3 class="wp-block-heading">Tryb EMERGENCY — ładowanie awaryjne na maksa</h3>



<p class="wp-block-paragraph">Dodany po tym jak pewnego dnia wróciłem do domu z prawie pustą baterią auta i za godzinę musiałem jechać znowu. Słońca było mało, a skrypt solarny czekał na nadwyżki.</p>



<p class="wp-block-paragraph">Rozwiązanie: przełącznik w dashboardzie HA z timerem. Ustawiasz ile godzin (0,5–8h), włączasz toggle — ładowarka rusza natychmiast na 13A (~9 kW). Nie czeka na słońce, może drenować magazyn (ale zatrzyma się gdy SOC baterii spadnie poniżej 20%). Po upływie czasu automatycznie wraca do trybu normalnego.</p>



<pre class="wp-block-code"><code>EMERGENCY_CURRENT_A = 13   # zostawia ~2 kW bufora na dom przy przyłączu 11 kW
SOC_EMERGENCY_MIN   = 20   # nie drenuj magazynu poniżej 20%</code></pre>



<h3 class="wp-block-heading">Znak PCC Sofara — weryfikuj empirycznie</h3>



<p class="wp-block-paragraph">To jedna z ważniejszych pułapek. Sensor <code>sensor.sofar_modbus_inverter_active_power_pcc_total</code> może mieć różny znak w zależności od wersji firmware i trybu pracy falownika. W mojej instalacji:</p>



<ul class="wp-block-list">
<li><strong>Dodatni PCC</strong> = eksport do sieci (nadwyżka)</li>



<li><strong>Ujemny PCC</strong> = import z sieci (brak nadwyżki)</li>
</ul>



<p class="wp-block-paragraph">Sprawdź w Developer Tools wartość tego sensora gdy wiesz że eksportujesz (bateria pełna, słońce świeci). Jeśli wartość jest ujemna przy eksporcie — zamień znak w kodzie.</p>



<h3 class="wp-block-heading">Nadwyżka to nie samo PCC</h3>



<p class="wp-block-paragraph">Naturalny odruch: &#8222;nadwyżka to jest to, co wypycham do sieci&#8221;, czyli PCC. Przy falowniku hybrydowym to jednak zły sygnał sterujący, bo Sofar w trybie self-use <strong>aktywnie kompensuje deficyt z magazynu</strong> i trzyma PCC blisko zera. Przy PV 1 kW, domu 5 kW i ładowarce ciągnącej 4 kW licznik pokaże PCC bliskie zeru, a skrypt uzna, że jest równowaga. Realnie w tym czasie opróżnia baterię domową.</p>



<p class="wp-block-paragraph">Dlatego nadwyżkę liczę jako minimum z dwóch sygnałów:</p>



<pre class="wp-block-code"><code>surplus_without_ev_kw = min(grid_power, pv_power - load_power)</code></pre>



<p class="wp-block-paragraph"><code>PV minus dom</code> widzi deficyt maskowany przez magazyn. PCC z kolei pilnuje, żeby nie zabrać mocy, którą falownik akurat wpompowuje do baterii (przy SOC 95-99% <code>PV minus dom</code> jest większe niż realny eksport). Minimum z obu to nadwyżka, którą można wziąć bez szkody dla magazynu.</p>



<p class="wp-block-paragraph">Sprawdzone na żywych danych w dniu wdrożenia: PV 2,8 kW, dom 0,4 kW, a PCC tylko 0,04 kW. Różnica 2,4 kW szła do ładującego się magazynu. Sam <code>PV minus dom</code> uznałby ją za wolną i podebrał baterii, <code>min()</code> widzi realne 40 W.</p>



<h3 class="wp-block-heading">Uśrednianie, czyli eliminacja migotania</h3>



<p class="wp-block-paragraph">Sygnał &#8222;migocze&#8221;: raz -0,1 kW, raz +0,2 kW, raz -0,5 kW, nawet gdy bilans jest w zasadzie zero. To normalne przy hybrydowym falowniku, regulacja nie jest idealna. Bez filtrowania skrypt zmieniałby prąd ładowania co 30 sekund.</p>



<p class="wp-block-paragraph">Rozwiązanie: uśrednianie z ostatnich 3 odczytów (90 sekund):</p>



<pre class="wp-block-code"><code>PCC_HISTORY_SIZE = 3

# uwaga: do historii trafia wartość PO doliczeniu poboru ładowarki,
# żeby każda próbka znaczyła to samo (patrz Problem 19)
self._surplus_history.append(available_kw)
if len(self._surplus_history) &gt; PCC_HISTORY_SIZE:
    self._surplus_history.pop(0)
avg_available_kw = sum(self._surplus_history) / len(self._surplus_history)</code></pre>



<h3 class="wp-block-heading">Bias +1000W — agresywne wykorzystanie nadwyżek</h3>



<p class="wp-block-paragraph">Prąd ładowarki zmienia się skokowo co 690W (1A × 3 fazy × 230V). Żeby skrypt był trochę bardziej &#8222;agresywny&#8221; i częściej wybierał wyższy prąd, dodałem stały bias +1000W do obliczonej nadwyżki. Dzięki temu auto startuje już przy ~0,6 kW realnego eksportu zamiast czekać na pełne 1,6 kW. W kodzie bias jest wydzielony jako nazwana stała:</p>



<pre class="wp-block-code"><code>SURPLUS_BIAS_W = 1000  # bufor zachęcający do startu

# Bez podłogi: przy imporcie wychodzi ujemne i regulacja redukuje prąd
surplus_w = avg_available_kw * 1000 + SURPLUS_BIAS_W</code></pre>



<p class="wp-block-paragraph">Ważne, żeby nie zastępować ujemnej nadwyżki stałą wartością biasu. Pierwotna wersja tak robiła i sterowanie &#8222;uciekało&#8221; w górę przy zachmurzeniu. Szczegóły w Problemie 19.</p>



<p class="wp-block-paragraph">Przy cenie 0,15 zł/kWh to koszt ~15 groszy za godzinę ładowania w zamian za lepsze wykorzystanie słońca. Latem przy cenach bliskich zeru — bez znaczenia.</p>



<h3 class="wp-block-heading">Stan PAUSE — ładowarka gotowa ale wstrzymana</h3>



<p class="wp-block-paragraph">Gdy auto jest podłączone ale ładowanie jest wstrzymane (np. przez harmonogram), ładowarka raportuje stan <code>PAUSE</code>. Stary kod nie obsługiwał tego stanu i nie wysyłał START — auto stało podłączone ale się nie ładowało.</p>



<p class="wp-block-paragraph">Rozwiązanie: traktuj <code>PAUSE</code> jak <code>IDLE</code> — auto jest gotowe do ładowania:</p>



<pre class="wp-block-code"><code>CHARGER_READY_STATES   = {"PAUSE", "SLEEP", "IDLE", "UNKNOWN"}
CHARGER_WORKING_STATES = {"WORKING"}</code></pre>



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<h2 class="wp-block-heading">Pułapki techniczne — kompletna lista</h2>



<h3 class="wp-block-heading">Problem 1: Protokół Tuya 3.5</h3>



<p class="wp-block-paragraph">Local Tuya obsługuje tylko do wersji 3.4. Jedyne rozwiązanie: AppDaemon + TinyTuya.</p>



<h3 class="wp-block-heading">Problem 2: Klucze DP jako stringi</h3>



<pre class="wp-block-code"><code>dps.get("109")  # poprawnie
dps.get(109)    # zawsze None</code></pre>



<h3 class="wp-block-heading">Problem 3: DP 151 blokuje START</h3>



<p class="wp-block-paragraph">Ładowarka ma wbudowany harmonogram (DP 151). Gdy harmonogram jest aktywny, ładowarka ignoruje zewnętrzne komendy START i pozostaje w PAUSE. Rozwiązanie — wyczyść harmonogram przy każdym starcie:</p>



<pre class="wp-block-code"><code>self._device.set_value("151", json.dumps({"m":0,"dt":0,"ss":"00:00","se":"00:00"}))</code></pre>



<h3 class="wp-block-heading">Problem 4: Znak PCC zmienia się po zmianie trybu Sofara</h3>



<p class="wp-block-paragraph">Po zmianie trybu falownika (np. z Self-use na Time of Use) znak PCC może się odwrócić. Zawsze weryfikuj empirycznie po każdej zmianie konfiguracji falownika.</p>



<h3 class="wp-block-heading">Problem 5: Moc DP 102 mnożona x100</h3>



<p class="wp-block-paragraph"><code>L1[2]</code>, <code>L2[2]</code>, <code>L3[2]</code> to moc per faza w jednostkach x100W. Wartość <code>32</code> oznacza 3200W, nie 32W.</p>



<h3 class="wp-block-heading">Problem 6: Stan PAUSE ignorowany</h3>



<p class="wp-block-paragraph">Gdy auto podłączone ale harmonogram wstrzymał ładowanie — ładowarka raportuje PAUSE. Stary kod nie wysyłał START w tym stanie.</p>



<h3 class="wp-block-heading">Problem 7: Uśrednianie PCC konieczne</h3>



<p class="wp-block-paragraph">Bez filtrowania migające wartości PCC powodują chaotyczne zmiany prądu co 30 sekund.</p>



<h3 class="wp-block-heading">Problem 8: Próg startu za wysoki</h3>



<p class="wp-block-paragraph">Pierwotny próg START_SURPLUS_W = 5000W był za wysoki — system nie startował przy nadwyżkach 3–4 kW. Aktualny próg: 1600W (razem z biasem 1000W to znaczy, że auto startuje już przy ~0,6 kW realnego eksportu PCC).</p>



<h3 class="wp-block-heading">Problem 9: Serwery Tuya dla Polski</h3>



<p class="wp-block-paragraph">Dla europejskich użytkowników dane trafiają na serwer w <strong>Frankfurcie</strong> (AWS). Nie w Chinach. To ważne przy konfiguracji Tuya IoT Platform — wybierz region &#8222;Central Europe&#8221;.</p>



<h3 class="wp-block-heading">Problem 10: Helpery tylko przez UI</h3>



<p class="wp-block-paragraph">Encje zdefiniowane w YAML są read-only dla serwisów HA. Twórz helpery wyłącznie przez UI (Settings → Helpers → Add).</p>



<h3 class="wp-block-heading">Problem 11: Nie twórz sensorów przez AppDaemon set_state()</h3>



<p class="wp-block-paragraph">W HA 2026.x API odrzuca encje z atrybutami <code>unit_of_measurement</code> i <code>device_class</code> tworzonymi przez AppDaemon. Używaj <code>input_text</code> jako pośrednika i template sensorów w <code>configuration.yaml</code>.</p>



<h3 class="wp-block-heading">Problem 12: AppDaemon skanuje folder apps/ rekurencyjnie</h3>



<p class="wp-block-paragraph">AppDaemon ładuje wszystkie pliki <code>.yaml</code> z folderu <code>apps/</code> — łącznie z podfolderami. Jeśli wewnątrz <code>apps/</code> umieścisz backup z poprzednim <code>apps.yaml</code>, AppDaemon załaduje go razem z aktualnym i uruchomi duplikaty wszystkich aplikacji.</p>



<p class="wp-block-paragraph">W praktyce wygląda to tak: masz jeden skrypt sterujący ładowarką, a działają dwie instancje — każda wysyła komendy do ładowarki co 30 sekund, wzajemnie sobie przeszkadzając. W logach zobaczysz dwa razy <code>Calling initialize() for ev_charger_*</code> przy starcie.</p>



<p class="wp-block-paragraph">Rozwiązanie: trzymaj backupy <strong>poza</strong> folderem <code>apps/</code>, np. w <code>addon_configs/a0d7b954_appdaemon/_backups/</code>.</p>



<h3 class="wp-block-heading">Problem 13: STOP-spam w gałęzi IDLE</h3>



<p class="wp-block-paragraph">W <code>_apply_decision</code> gałąź <code>BATTERY_PRIORITY/IDLE/OFFLINE</code> początkowo nie miała guardu sprawdzającego ostatnio wysłany switch — co iterację (30 s) wysyłała komendę STOP do ładowarki, nawet jeśli już wcześniej została wysłana. Skutek dwojaki: niepotrzebne pakiety przez sieć do wallboxa <strong>oraz</strong> słyszalne klikanie stycznika ładowarki — każdy STOP wymusza cykl przekaźnika.</p>



<p class="wp-block-paragraph">W logach widać było po kilkanaście STOPów pod rząd w 8 minutach mimo, że stan logiczny się nie zmieniał.</p>



<p class="wp-block-paragraph">Rozwiązanie: dodać guard <code>if self._last_sent_switch != False:</code> analogicznie do gałęzi SOLAR (gdzie analogiczny guard <code>!= True</code> już był). Dzięki temu STOP idzie raz na przejście z aktywnego trybu w IDLE, a nie co iterację.</p>



<h3 class="wp-block-heading">Problem 14: DP 102 potrafi się „zamrozić&#8221; — firmware quirk dé EV v2.9.4</h3>



<p class="wp-block-paragraph">Najbardziej podstępny problem jaki spotkałem. Firmware wallboxa dé EV (sprawdzane na wersji <strong>2.9.4</strong>) potrafi zamrozić cały blok pomiarów w DP 102 — wartości napięć, prądów, mocy, energii sesji i temperatury (<code>L1</code>/<code>L2</code>/<code>L3</code>/<code>p</code>/<code>e</code>/<code>t</code>) zwracają identyczny string przez wiele godzin, mimo że auto fizycznie się ładuje. DP 109 (status) nadal raportuje poprawnie <code>WORKING</code>, sterowanie (DP 140 switch, DP 150 current) działa, <strong>tylko pomiary kłamią</strong>.</p>



<p class="wp-block-paragraph">Diagnoza tego trwała godziny. Wprowadzało w błąd, że Smart Life cyklicznie pokazywało „Charging&#8221;/„Paused&#8221; — sugerując że to wallbox cyklicznie zatrzymuje sesję. W rzeczywistości auto ładowało stabilnie ~8 kW, tylko nasz skrypt liczył 0 W (a więc też 0 kWh do liczników miesięcznych).</p>



<p class="wp-block-paragraph">Rozstrzygnięciem był pełny bilans Sofara — porównanie PV, obciążenia, magazynu i PCC — które jednoznacznie pokazało że ~8 kW znika gdzieś (czyli idzie do auta).</p>



<p class="wp-block-paragraph"><strong>Lekarstwo</strong>: w aplikacji Smart Life otworzyć urządzenie → Settings (zębatka) → <strong>Reboot</strong> (NIE Reset to Factory — to kasuje pairing). Po ~30 sekundach DP 102 wraca do raportowania prawdziwych wartości. Mechanizm — najpewniej zerwany sync wallboxa z chmurą Tuya, soft reboot przywraca.</p>



<p class="wp-block-paragraph">W skrypcie dodałem <strong>watchdog</strong> który ostrzega w logach (poziom WARNING) gdy w aktywnym trybie ładowania utrzymuje się <code>status=WORKING + power=0W</code> przez ponad 10 minut. Próg konfigurowalny przez stałą <code>WATCHDOG_FROZEN_DP_THRESHOLD</code>. Skrypt nie restartuje sam — wymagana ręczna interwencja w Smart Life (na razie, do dalszego rozważenia).</p>



<h3 class="wp-block-heading">Problem 15: DP 151 — chmura Tuya potrafi wpychać harmonogram</h3>



<p class="wp-block-paragraph">Po reboocie wallboxa zaobserwowałem że DP 151 (harmonogram) zmienił się z pustego <code>{"m":0,"dt":0,"ss":"00:00","se":"00:00"}</code> na <code>{"m":0,"dt":0,"ss":"15:00","se":"17:00"}</code> — chmura Tuya wpchnęła resztkowy harmonogram. Pole <code>m:0</code> oznacza nieaktywny, więc <em>w tym przypadku</em> nie blokuje ładowania, ale daje ślad że chmura może modyfikować wallbox lokalnie bez naszego udziału.</p>



<p class="wp-block-paragraph">W skrypcie dodałem diagnostykę logującą każdą zmianę DP 151 oraz utrzymuję wywołanie <code>_clear_schedule()</code> w <code>initialize()</code> AppDaemona (raz po starcie skryptu) i w momencie każdego startu sesji. To zabezpiecza przed sytuacją gdy chmura wpchnie tym razem <code>m:1</code> (aktywny harmonogram blokujący).</p>



<h3 class="wp-block-heading">Problem 16: DP 102 ma ukryte pole <code>e</code> — energia sesji × 0,1 kWh</h3>



<p class="wp-block-paragraph">Przy okazji diagnostyki Problemu 14 odkryłem że DP 102 oprócz <code>L1</code>/<code>L2</code>/<code>L3</code>/<code>p</code>/<code>t</code> zawiera też pole <strong><code>e</code></strong> — licznik energii bieżącej sesji w jednostce 0,1 kWh. Po <code>e:5</code> minęło 0,5 kWh sesji, przy <code>e:23</code> mamy 2,3 kWh. Niezależne od naszego liczenia <code>power_w × dt</code>, mniej podatne na błędy zaokrąglenia.</p>



<p class="wp-block-paragraph">Plus pole <code>d</code> w DP 102 to <strong>duration sesji</strong> ale w jakichś własnych jednostkach wallboxa (nie sekundach realnych — przyrosty są nieregularne). Pole <code>t</code> to <strong>temperatura ładowarki × 10</strong> (<code>360</code> = 36,0 °C).</p>



<p class="wp-block-paragraph">DP 105 z kolei to <strong>historia ostatniej zakończonej sesji</strong> — JSON z polami <code>t</code> (timestamp), <code>s/e</code> (start/end HH:MM), <code>d</code> (duration w sekundach), <code>c</code> (kWh × 10). Dostępne natychmiast po zakończeniu sesji — można nasłuchiwać zmian DP 105 i mieć w HA dokładny licznik sesji niezależny od <code>power × dt</code>.</p>



<h3 class="wp-block-heading">Problem 17: Archiwum historii miesięcznej — dane ginęły przy resecie</h3>



<p class="wp-block-paragraph">Licznik <code>_month_energy_kwh</code> oraz utility_meters zerują się 1. dnia miesiąca. Stary kod logował tylko <code>Nowy miesiac! Reset: X kWh</code> i kasował wartość — historia poprzednich miesięcy przepadała, nie dało się porównać miesiąca do miesiąca.</p>



<p class="wp-block-paragraph">Rozwiązanie ma trzy subtelności warte zapamiętania:</p>



<ol class="wp-block-list">
<li><strong>Wyścig z resetem utility_meter.</strong> Gdyby przy przełomie miesiąca odczytać <code>sensor.produkcja_pv_miesiac</code> „na bieżąco&#8221;, można trafić już po jego wyzerowaniu i zapisać ~0. Dlatego skrypt w każdej iteracji zapamiętuje snapshot liczników (<code>_um_snapshot</code>), a przy przełomie archiwizuje snapshot z <strong>poprzedniej</strong> iteracji — czyli stan na koniec starego miesiąca. Niezależnie od kolejności resetów.</li>



<li><strong>Fallback po restarcie.</strong> Jeśli AppDaemon wstanie świeżo (pusty snapshot) tuż po przełomie, sięga po atrybut <code>last_period</code> liczników utility_meter — HA trzyma tam wartość poprzedniego cyklu.</li>



<li><strong>Trwały znacznik miesiąca.</strong> Zamiast <code>datetime.now().month</code> w RAM, miesiąc trzymany jest jako <code>ev_last_ym</code> (<code>"YYYY-MM"</code>) w pliku persistent. Dzięki temu archiwizacja zadziała nawet, gdy serwer był wyłączony 1. dnia miesiąca i wstał np. 2-go.</li>
</ol>



<p class="wp-block-paragraph">Publikacja sensora to osobny temat — patrz Problem 18.</p>



<h3 class="wp-block-heading">Problem 18: <code>set_state()</code> na <code>sensor.*</code> zwraca 400 w HA 2026.x — publikacja przez REST API</h3>



<p class="wp-block-paragraph">Pierwsza wersja archiwum publikowała <code>sensor.ev_historia_miesieczna</code> przez AppDaemon <code>set_state()</code>. Na HA <strong>2026.6.1</strong> + AppDaemon <strong>4.5.13</strong> kończyło się to w logach błędem:</p>



<pre class="wp-block-code"><code>ERROR HASS: &#91;400] HTTP POST: Bad Request {'attributes': {'friendly_name': ..., 'months': &#91;]}}
ERROR HASS: Error setting state: Bad Request</code></pre>



<p class="wp-block-paragraph">To rozwinięcie Problemu 11. Wbrew pierwotnej hipotezie <strong>nie chodzi tylko o <code>unit_of_measurement</code>/<code>device_class</code></strong> — <code>set_state()</code> na encji <code>sensor.*</code> zwraca 400 nawet z gołymi atrybutami. Diagnostyka empiryczna (POST wprost do REST API rdzenia przez proxy supervisora, <code>http://supervisor/core/api/states/...</code> z <code>$SUPERVISOR_TOKEN</code>) pokazała, że <strong>samo REST API przyjmuje identyczny payload bez zająknięcia (HTTP 201)</strong> — ze stanem <code>int</code> i <code>string</code>, z <code>months</code>, <code>friendly_name</code>, <code>icon</code>. Wina leży więc po stronie ścieżki <code>set_state()</code> w tej wersji AppDaemona, nie HA.</p>



<p class="wp-block-paragraph">Dlaczego nie <code>input_text</code> + template (sprawdzony wzorzec z Problemu 11)? Bo archiwum (do 120 miesięcy / 10 lat × 7 pól) nie zmieści się w <code>input_text</code> (limit 255 znaków) ani w stanie encji (też 255). Atrybuty encji limitu nie mają.</p>



<p class="wp-block-paragraph">Rozwiązanie: <code>_publish_history()</code> robi bezpośredni <code>requests.post(...)</code> do REST API rdzenia z tokenem z <code>os.environ["SUPERVISOR_TOKEN"]</code> (addon ma <code>homeassistant_api: true</code>, więc token i proxy są dostępne). Całe archiwum siedzi w atrybucie <code>months</code>; stan = kWh ostatniego miesiąca; jednostki opisują karty dashboardu. Źródłem prawdy pozostaje plik <code>ev_charger_data.json</code> (klucz <code>ev_history</code>) — encja to tylko warstwa prezentacji, odtwarzana przy każdym <code>initialize()</code> (czyli też po restarcie HA, gdy AppDaemon przełącza połączenie).</p>



<h3 class="wp-block-heading">Problem 19: Regulacja SOLAR &#8222;uciekała w górę&#8221; przy zachmurzeniu</h3>



<p class="wp-block-paragraph">Najpoważniejszy błąd, jaki znalazłem w tym projekcie, i jednocześnie taki, którego nigdy nie zdiagnozowałem z logów. Objawiał się tylko jako &#8222;auto ładuje się mocniej niż powinno, a potem nagle stop&#8221;.</p>



<p class="wp-block-paragraph">Pierwotny kod liczył nadwyżkę tak: jeśli PCC pokazuje eksport, to <code>nadwyżka = PCC + 1000 W</code>, a jeśli import, to po prostu <code>nadwyżka = 1000 W</code>. Ta druga gałąź wyrzucała informację o tym, <strong>jak duży</strong> jest import. A w trybie SOLAR do nadwyżki dolicza się jeszcze moc ładowarki (bo jej pobór siedzi już w zużyciu domu), więc przy deficycie wychodziło:</p>



<pre class="wp-block-code"><code>available = 1000 W + moc_ladowarki
target    = int(available / 690)</code></pre>



<p class="wp-block-paragraph">To jest dodatnie sprzężenie zwrotne. Ładowarka na 6A (4,1 kW) daje <code>target = int(5140/690) = 7A</code>, przy 7A (4,8 kW) wychodzi 8A, i tak dalej aż do 16A. Wszystko to mimo że słońce zaszło za chmurę, a energia leci z magazynu domowego. Warunek STOP wymagałby przy tym mocy ładowarki poniżej 200 W, czyli w praktyce nie zadziała nigdy. Ładowanie kończyło się dopiero, gdy SOC magazynu spadł poniżej 95% i wszedł <code>BATTERY_PRIORITY</code>, czyli po niepotrzebnym cyklu rozładowania baterii.</p>



<p class="wp-block-paragraph">Poprawka to nadwyżka liczona jako <code>min(PCC, PV minus dom)</code> bez podłogi (opisana wyżej, w sekcji o nadwyżce). Przy imporcie wartość schodzi poniżej zera, więc regulacja realnie redukuje prąd, a histereza STOP wreszcie działa.</p>



<p class="wp-block-paragraph"><strong>Kolejność operacji okazała się równie ważna, co sam wzór.</strong> Pierwsza wersja poprawki uśredniała nadwyżkę, a moc ładowarki dodawała dopiero przy podejmowaniu decyzji. Symulacja pokazała, że to wciąż daje skok prądu: w pierwszej iteracji po starcie sesji historia zawiera próbkę zmierzoną przy wyłączonej ładowarce i próbkę zmierzoną przy 7,6 kW poboru. Dodanie do takiej średniej bieżącej mocy ładowarki liczy ten pobór półtora raza i przy PV 8 kW skrypt skakał na 16A, czyli 11 kW. Kompensacja musi iść <strong>przed</strong> uśrednianiem, żeby każda próbka w historii znaczyła to samo: ile w tej chwili jest do dyspozycji dla auta.</p>



<p class="wp-block-paragraph">Jest jeszcze przypadek brzegowy na styku z Problemem 14. Gdy DP 102 zamarznie, ładowarka raportuje <code>WORKING</code> i 0 W, więc kompensacja wychodzi zerowa, a <code>PV minus dom</code> pokazuje ogromny deficyt, bo auto realnie ciągnie 8 kW. Skrypt uznałby to za brak nadwyżki i przerwał realnie trwającą sesję, zamiast pozwolić watchdogowi dojść do progu i ostrzec. Dlatego po dwóch iteracjach <code>WORKING + 0 W</code> do kompensacji podstawiana jest ostatnia znana moc. Dwie iteracje, bo tuż po starcie sesji chwilowe zero jest normalne, auto negocjuje z wallboxem.</p>



<h3 class="wp-block-heading">Problem 20: Dedup komend bez ponowień to zakleszczenie sterowania</h3>



<p class="wp-block-paragraph">Naprawa STOP-spamu z Problemu 13 wprowadziła pole <code>_last_sent_switch</code>, czyli &#8222;nie wysyłaj drugi raz tego samego&#8221;. Rozwiązała klikanie stycznika, ale wprowadziła cichą regresję: funkcja wysyłająca komendę łykała wyjątek sieciowy, a <code>_last_sent_switch</code> i tak zapisywało się na &#8222;wysłano START&#8221;. Jeden zgubiony pakiet w Wi-Fi (a wallbox stoi w garażu, zasięg bywa marny) i skrypt do końca życia procesu uważał, że START poszedł. Ładowanie nie ruszało aż do restartu AppDaemona albo przełączenia trybu awaryjnego. W drugą stronę było gorzej: nieudany STOP oznaczał ładowanie mimo trybu priorytetu baterii.</p>



<p class="wp-block-paragraph">Poprawka ma dwie warstwy. Po pierwsze, funkcje wysyłające zwracają informację o powodzeniu, a stan &#8222;ostatnio wysłane&#8221; aktualizuje się tylko przy udanej wysyłce, więc nieudana komenda jest ponawiana w następnej iteracji. Po drugie, osobno obsłużony jest przypadek &#8222;komenda poszła, ale wallbox jej nie wykonał&#8221;: licznik niezgodności między intencją a stanem ładowarki, ponowienie co 4 iteracje (2 minuty). START ma limit 3 ponowień, bo auto może być po prostu naładowane do 100% i nie przyjmie sesji. STOP dostaje 5 prób i głośny błąd w logach, zamiast walić w stycznik w nieskończoność.</p>



<p class="wp-block-paragraph">Ten błąd potwierdził się w terenie dokładnie w chwili wdrożenia poprawki. Auto ładowało się wtedy na 5,2 kW przy SOC magazynu 46%, czyli w warunkach, w których stary skrypt powinien był wysłać STOP. Nie wysyłał, bo miał zapamiętane, że już zatrzymał. Ręczny start ze Smart Life przechodził w ten sposób niezauważony. Nowy kod zatrzymał sesję w pierwszej iteracji po restarcie.</p>



<h3 class="wp-block-heading">Problem 21: TinyTuya zwraca błąd jako słownik, nie wyjątek</h3>



<p class="wp-block-paragraph"><code>device.status()</code> przy problemach sieciowych często <strong>nie rzuca wyjątku</strong>, tylko zwraca słownik <code>{&quot;Error&quot;: &quot;Network Error&quot;, &quot;Err&quot;: &quot;901&quot;}</code>. Stary kod sięgał po klucz <code>dps</code>, dostawał pusty słownik, status wychodził <code>UNKNOWN</code>, a <code>UNKNOWN</code> jest na liście stanów &#8222;gotowy do ładowania&#8221;. Efekt: ładowarka uznana za dostępną i gotową, komendy wysyłane w próżnię.</p>



<p class="wp-block-paragraph">Poprawka sprawdza obecność klucza <code>Error</code> w odpowiedzi i traktuje taką sytuację jak brak łączności. Przy okazji limit ponowień gniazda zszedł z 3 na 1, bo trzy próby po 6 sekund timeoutu plus drugi odczyt potrafiły zablokować wątek AppDaemona na około 36 sekund, czyli dłużej niż interwał pętli.</p>



<h3 class="wp-block-heading">Problem 22: Nieatomowy zapis pliku z licznikami</h3>



<p class="wp-block-paragraph"><code>ev_charger_data.json</code> trzyma liczniki energii i całe 10-letnie archiwum, a zapisywany był w miejscu: otwórz do zapisu, zrzuć JSON. Przerwanie w trakcie (restart dodatku, brak miejsca) zostawia obcięty plik. Gorzej: od tego momentu <strong>każdy</strong> kolejny zapis padał już na etapie wczytania starej zawartości, a odczyt cicho zwracał wartości domyślne. Liczniki wyzerowane, archiwum niedostępne, w logach tylko ostrzeżenie co 30 sekund.</p>



<p class="wp-block-paragraph">Poprawka: zapis do pliku tymczasowego i podmiana przez <code>os.replace()</code>, która jest atomowa w obrębie tego samego systemu plików. Nieczytelny plik jest odkładany z końcówką <code>.corrupt</code>, a skrypt startuje od pustego stanu, zamiast zapętlać się na błędzie.</p>



<h3 class="wp-block-heading">Problem 23: Regulacja goniąca szum, czyli ładowarka pikająca co 30 sekund</h3>



<p class="wp-block-paragraph">Ten problem zgłosiło ucho, nie log. Dzień po naprawie regulacji usłyszałem przez otwarte okno, że wallbox pika bardzo często. Logi potwierdziły od ręki: w ciągu trzech minut prąd zmienił się pięć razy, w tym sekwencja <strong>10A, 11A, z powrotem 10A w ciągu minuty</strong>.</p>



<p class="wp-block-paragraph">Pierwsza przyczyna to brak strefy nieczułości. Komenda szła do ładowarki, ilekroć nowy cel różnił się od poprzedniego choćby o jeden amper. Tyle że jeden amper to zaledwie 690 W (trzy fazy razy 230 V), a dzielenie jest obcinane w dół. Gdy nadwyżka stanęła dokładnie na granicy stopnia, wystarczyło wahanie rzędu <strong>30 W</strong>, czyli ułamka procenta, żeby cel przeskakiwał w każdej iteracji. W symulacji stabilnego słońca z takim właśnie szumem stary kod wygenerował 29 zmian prądu w kwadrans.</p>



<p class="wp-block-paragraph">Druga przyczyna jest ciekawsza. Porównałem cel z rzeczywistą mocą i okazało się, że <strong>auto dochodzi do zadanego prądu z opóźnieniem około minuty</strong>: przy celu 10A moc odpowiadała najpierw 8,5A, minutę później 9,4A. A ponieważ zmierzony pobór ładowarki wraca do wyliczenia nadwyżki, sterownik reagował na stan, który jeszcze się nie ustalił, i sam sobie produkował oscylacje. Podręcznikowy błąd: pętla regulacji szybsza niż obiekt, którym steruje.</p>



<p class="wp-block-paragraph">Rozwiązanie ma dwie warstwy. <strong>Histereza plus minus 250 W wokół progu stopnia</strong> - żeby podnieść prąd, nadwyżka musi przekroczyć próg z zapasem, i tak samo w drugą stronę. Oraz <strong>potwierdzenie zmiany w czasie</strong> - nowy cel musi utrzymać się przez dwie iteracje, zanim komenda pójdzie do wallboxa. Wyjątkiem jest spadek o trzy ampery lub więcej, który idzie natychmiast, bo chroni przyłącze 11 kW, gdy nagle ruszy pompa ciepła albo piekarnik.</p>



<p class="wp-block-paragraph">Świadomie wygładzam też <em>małe</em> redukcje, choć pierwszy szkic poprawki miał je wykonywać od ręki. Zmieniłem zdanie po prostej refleksji: krótkie zejście w magazyn domowy nie jest tragedią, bo magazyn i tak się doładuje, gdy słońce wyjdzie zza chmury. Rzadsze szarpanie ładowarką jest tego warte.</p>



<p class="wp-block-paragraph">Efekt zmierzony na symulacji, w tym na prawdziwych nadwyżkach z logów:</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Scenariusz</th><th>Przed</th><th>Po</th></tr></thead><tbody><tr><td>Realne logi (3 minuty)</td><td>5 zmian</td><td>1</td></tr><tr><td>Pochmurne 30 minut</td><td>52 zmiany</td><td>1</td></tr><tr><td>Stabilne słońce 15 minut</td><td>29 zmian</td><td>0</td></tr></tbody></table></figure>



<p class="wp-block-paragraph">Koszt wolniejszego podbijania mocy to 0,04-0,09 kWh, czyli kilka groszy. Weryfikacja na produkcji potwierdziła rzecz jeszcze ładniejszą: w oknie dwóch i pół minuty produkcja PV spadła chwilowo z 6,8 kW do 1,6 kW, bo przeszła chmura, a prąd <strong>nie zmienił się ani razu</strong>. Dołek nie utrzymał się przez wymagane dwie iteracje, więc sterownik go zignorował i słońce wróciło.</p>



<p class="wp-block-paragraph"><strong>Wniosek ogólny:</strong> przy sterowaniu ze sprzężeniem zwrotnym nie wystarczy poprawnie policzyć wartość zadaną. Trzeba jeszcze zapytać, jak szybko obiekt na nią odpowiada, i nie wysyłać komend częściej. Inaczej regulator ściga własny ogon.</p>



<h3 class="wp-block-heading">Problem 24: Ładowarka zawieszona przez 36 godzin, a system tego nie zauważył</h3>



<p class="wp-block-paragraph">Ten problem zgłosiłem ja, patrząc na wykres przepływów energii. Cztery kilowaty nadwyżki szły do sieci, auto stało podłączone kablem, a na jego desce rozdzielczej świecił się komunikat &#8222;ładowanie zakończone&#8221;. Skrypt w tym samym czasie pracował z pozoru wzorowo: liczył nadwyżkę, trzymał tryb solarny i regulował prąd. Najpierw do 9 amperów, potem do 7, potem do 8.</p>



<p class="wp-block-paragraph">Diagnoza zajęła kilkanaście minut i sprowadziła się do jednego pytania: <strong>czy dane, które czytamy, w ogóle są świeże?</strong></p>



<p class="wp-block-paragraph">Watchdog zgłosił podejrzenie zamrożonych pomiarów cztery razy w ciągu półtorej doby. Za każdym razem dołączał do logu surowy odczyt z ładowarki. Wszystkie cztery były identyczne, co do znaku:</p>



<pre class="wp-block-code"><code>{"L1":[2430,0,0],"L2":[2430,0,0],"L3":[2430,0,0],"t":330,"p":0,"d":0,"e":0}</code></pre>



<p class="wp-block-paragraph">Napięcie 243,0 V dokładnie takie samo na wszystkich trzech fazach i temperatura obudowy niezmieniona od poprzedniego dnia. Realny pomiar tak nie wygląda. Napięcie w sieci drga o kilka woltów w każdej minucie, trzy fazy praktycznie nigdy nie mają identycznej wartości, a obudowa nagrzewa się i stygnie razem z pogodą. To nie było &#8222;auto nie chce się ładować&#8221;. To był martwy blok danych.</p>



<p class="wp-block-paragraph">Reszta obrazu układała się w to samo:</p>



<ul class="wp-block-list">
<li>ładowarka <strong>ignorowała polecenia w obie strony</strong>: cztery komendy startu poprzedniego dnia i cztery komendy stopu następnego, wszystkie bez najmniejszej reakcji;</li>
<li>ten sam status przez <strong>641 kolejnych odczytów</strong>, bez jednej zmiany mocy;</li>
<li><strong>ani jednej sekundy z mocą powyżej zera przez 36 godzin</strong>, licznik sesji na zerze;</li>
<li>przy tym zero błędów łączności, a ping do urządzenia wracał w 3 milisekundy.</li>
</ul>



<p class="wp-block-paragraph">Ładowarka odpowiadała w sieci, tylko jej oprogramowanie stało. Auto pokazywało &#8222;ładowanie zakończone&#8221;, bo urządzenie przestało podawać sygnał sterujący i sesja została zamknięta.</p>



<p class="wp-block-paragraph">Lekarstwo okazało się takie samo jak przy Problemie 14: <strong>Reboot z aplikacji Smart Life</strong> (Settings, absolutnie nie Reset to Factory). Moc skoczyła z zera na 3700 W w niecałą minutę, przy zupełnie nietkniętym kodzie. To zresztą najczystszy dowód, jaki mogłem dostać: skoro niczego nie zmieniłem w skrypcie, a wszystko ruszyło, to skrypt nie był winowajcą.</p>



<p class="wp-block-paragraph"><strong>Najciekawsze jest jednak to, co ta awaria powiedziała o moim własnym kodzie.</strong> Ładowarka zawiesiła się z powodu swojego oprogramowania i na to nie mam wpływu. Ale to, że nikt się o tym nie dowiedział przez półtorej doby, przy dwóch słonecznych dniach z rzędu, było już winą skryptu. Znalazłem siedem osobnych usterek i wszystkie należą do jednej rodziny: <strong>system nie odróżniał &#8222;urządzenie milczy&#8221; od &#8222;urządzenie mówi, że wszystko gra&#8221;</strong>.</p>



<ol class="wp-block-list">
<li><strong>Watchdog rozpoznawał awarię po najsłabszym możliwym sygnale.</strong> Patrzył wyłącznie na to, czy moc wynosi zero, co wygląda dokładnie tak samo przy awarii i przy aucie, które jest po prostu naładowane do pełna. Mocniejszy trop leżał w danych przez cały czas: niezmienny surowy odczyt. Teraz porównuję właśnie jego, a najczystszym wskaźnikiem okazała się temperatura, bo ona drga zawsze. Czas wykrycia spadł z &#8222;nigdy&#8221; do pięciu minut.</li>
<li><strong>Licznik gubił się przy migotaniu trybu.</strong> Liczył się tylko wtedy, gdy skrypt chciał ładować, więc każde chwilowe zejście do bezczynności kasowało go do zera. A przy nadwyżce stojącej na granicy progu tryb przeskakuje tam i z powrotem co kilka minut. W czasie awarii licznik wyzerował się w połowie, przy stanie 40. Ten sam błąd podcinał kompensację poboru, przez co skrypt potrafił zatrzymać realnie trwającą sesję. Jedna poprawka naprawiła oba.</li>
<li><strong>Jedyną reakcją na awarię było ostrzeżenie w logu.</strong> Czyli w miejscu, do którego nikt normalnie nie zagląda. Teraz powstaje powiadomienie w Home Assistant, jedno na zdarzenie, kasowane samo po powrocie ładowarki do pracy.</li>
<li><strong>Komendy startu i stopu miały osobne liczniki i żaden nie łączył kropek.</strong> Każdy z osobna mieścił się w swoim limicie i milkł, choć razem opowiadały jedną historię: to urządzenie nie wykonuje niczego, o co je prosimy.</li>
<li><strong>&#8222;Odpuszczam do zmiany warunków&#8221; znaczyło w praktyce &#8222;do jutra&#8221;.</strong> Po trzech nieudanych próbach startu skrypt milkł, a licznik prób zerował się wyłącznie w sytuacji, w której przy trwającej nadwyżce nigdy się nie znajdziemy. Efekt: cisza od wpół do jedenastej do końca dnia, przy nadwyżce dochodzącej do 8,6 kW. Teraz po pół godziny wraca kolejna seria prób.</li>
<li><strong>Przy aktywnym statusie skrypt nie miał żadnej drogi wznowienia sesji.</strong> Warunek, który miał wysłać komendę startu, brzmiał &#8222;jeśli ładowarka nie pracuje&#8221;, a ona twierdziła, że pracuje. Komenda nie mogła pójść z definicji. To boli podwójnie, bo auta Stellantisa po zatrzymaniu ładowania zamykają sesję i same jej nie wznawiają. Doszedł cykl stop i start po piętnastu minutach bez poboru, z twardym limitem dwóch prób, żeby nie wrócić do klikania stycznikiem z Problemu 13.</li>
<li><strong>Zadany prąd szedł na ślepo.</strong> Ładowarka udostępnia pole z informacją, jaki prąd faktycznie ma ustawiony. Czytałem je, ale nigdy nie porównywałem z tym, co wysłałem. Skrypt posłał 6, 9, 7 i 8 amperów do martwego urządzenia i każdą komendę uznał za wykonaną, bo funkcja wysyłająca nie zgłosiła błędu.</li>
</ol>



<p class="wp-block-paragraph">Jest jeszcze ósma poprawka, której nie wymyśliłem przy biurku. Wdrożyłem zmiany, po czym nadeszła chmura i ładowarka przeszła w stan wstrzymania. Zobaczyłem wtedy coś, co powinno być oczywiste: przy zatrzymanym ładowaniu prąd nie płynie, więc pomiary mogą stać w miejscu <strong>zupełnie legalnie</strong>. Mój świeży licznik zamrożenia rósł jednak niezależnie od tego, czy w ogóle chcemy ładować. Pierwsza minuta po powrocie słońca spełniałaby oba warunki naraz i wyrzucała fałszywy alarm. Codziennie rano. A powiadomienie, które myli się regularnie, przestaje cokolwiek znaczyć, czyli traci się dokładnie to, co się właśnie zbudowało. Poprawka poszła tego samego popołudnia.</p>



<p class="wp-block-paragraph"><strong>Wniosek ogólny, chyba najważniejszy z całego projektu:</strong> status z urządzenia to deklaracja, nie fakt. &#8222;Pracuję&#8221; znaczy tylko tyle, że urządzenie tak twierdzi. Dopóki nie skonfrontuje się tej deklaracji z czymś niezależnym, czyli ze świeżością danych, z potwierdzeniem wykonania komendy i z realnym przepływem mocy, sterownik potrafi godzinami wykonywać bardzo precyzyjne obliczenia na martwym obiekcie i nie mieć o tym najmniejszego pojęcia. Warto pytać nie tylko &#8222;co urządzenie mówi&#8221;, ale też &#8222;kiedy ostatnio powiedziało coś nowego&#8221;.</p>



<h3 class="wp-block-heading">Problem 25: Alarm, którego nikt nie ogląda, nie jest alarmem</h3>



<p class="wp-block-paragraph">Tydzień po naprawieniu poprzedniego problemu ta sama awaria wróciła. Tym razem wykrywanie zadziałało wzorowo: system rozpoznał zamrożone pomiary po pięciu minutach i zaalarmował <strong>sześć razy</strong> w ciągu dwóch dni. Każdy alarm z surowym odczytem, każdy z gotową instrukcją, co kliknąć.</p>



<p class="wp-block-paragraph">Awaria trwała <strong>dwadzieścia dwie i pół godziny</strong>. Do sieci uciekło minimum 12,2 kWh nadwyżki, a drugiego dnia rano ładowarka stała, podczas gdy z dachu szło 7-9 kW.</p>



<p class="wp-block-paragraph">Dlaczego? Bo powiadomienie trafiało do panelu Home Assistanta, a do panelu nikt nie zagląda w środku dnia roboczego. Diagnostyka była bez zarzutu. Adresat nie istniał.</p>



<p class="wp-block-paragraph"><strong>Pierwszy wniosek jest banalny i właśnie dlatego łatwo go przegapić:</strong> wykrycie awarii ma wartość dopiero wtedy, gdy dociera tam, gdzie człowiek naprawdę patrzy. Alarm idzie więc teraz dodatkowo powiadomieniem na telefon. Panel został jako drugi kanał, nie jedyny.</p>



<p class="wp-block-paragraph"><strong>Drugi wniosek jest ciekawszy.</strong> Skoro lekarstwo jest znane od maja, zawsze to samo i całkowicie mechaniczne, czyli restart z aplikacji, to dlaczego w ogóle czeka na człowieka? Skrypt wie o awarii pięć minut po jej wystąpieniu, a jedyne, co potrafi, to poprosić o kliknięcie. Zbudowałem więc mechanizm, który restartuje ładowarkę sam: reaktywnie, gdy rozpozna zawieszenie, z limitem trzech prób i dziesięciominutowym odstępem, plus profilaktycznie raz na dobę w nocy, wstrzymany, gdy akurat płynie prąd.</p>



<p class="wp-block-paragraph">Warto zauważyć, że mój pierwszy pomysł brzmiał &#8222;restartujmy co rano&#8221; i wcale by nie wystarczył. Tamta awaria zaczęła się w środku dnia, więc poranny restart uratowałby dokładnie nic z popołudnia. Profilaktyka jest higieną, nie mechanizmem ratunkowym.</p>



<p class="wp-block-paragraph"><strong>I tu zaczyna się część, która się nie udała.</strong> Okazało się, że wysłanie komendy restartu wcale nie jest trywialne.</p>



<p class="wp-block-paragraph">Podłączyłem się do ładowarki podsłuchem odpytującym ją trzy razy na sekundę i poprosiłem domownika o kliknięcie restartu w aplikacji. Wynik zaskoczył mnie na trzy sposoby. Po pierwsze, <strong>żadne z widocznych pól nie drgnęło</strong>. Po drugie, urządzenie <strong>ani na moment nie zniknęło z sieci</strong>, co znaczy, że &#8222;restart&#8221; wcale nie restartuje całego sprzętu, a jedynie moduł wykonawczy. Po trzecie, widać było za to jego skutek: napięcie sygnału sterującego, którym ładowarka rozmawia z autem, spadło na trzy sekundy do zera.</p>



<p class="wp-block-paragraph">Przy okazji wyszło, że pole, które przez trzy miesiące uważałem za numer wersji, jest w rzeczywistości <strong>napięciem tego właśnie sygnału</strong>. Około 12 V znaczy &#8222;auto odpięte&#8221;, 9 V &#8222;podłączone&#8221;, 6 V &#8222;ładuje&#8221;. Ładowarka przez cały czas mówiła mi, czy kabel siedzi w gnieździe, a ja tego nie czytałem.</p>



<p class="wp-block-paragraph">Skoro komendy nie widać w odczycie, musi być <strong>tylko do zapisu</strong>. I to nie jest teoria: pole, którym od miesięcy włączam i wyłączam ładowanie, też nie pojawia się w żadnym odczycie ani skanie, a działa bez zarzutu. Takich komend po prostu nie da się podsłuchać.</p>



<p class="wp-block-paragraph">Zostało zapytać producenta. Chmura zna pełny model urządzenia, więc założyłem konto deweloperskie i wyciągnąłem listę wszystkich pól z ich oryginalnymi nazwami. Znalazłem tam dokładnie to, czego szukałem: pole nazwane wprost &#8222;wykonaj restart&#8221;. Wysłałem. Nic. Wysłałem przez chmurę. Chmura potwierdziła przyjęcie, urządzenie nie zareagowało.</p>



<p class="wp-block-paragraph">Po kilkunastu podejściach trafiłem wreszcie na kombinację, która zadziałała: nie samo ustawienie wartości, lecz pełna zmiana stanu, najpierw wyłącz, potem włącz. Napięcie sygnału spadło do zera dokładnie sekundę po komendzie. Sukces. Tyle że <strong>jedyny</strong>. Pięć kolejnych prób, w tym po dłuższych przerwach, nie dało nic.</p>



<p class="wp-block-paragraph">Jeden sukces na sześć prób to nie jest mechanizm, tylko anegdota. Automat ma mnie ratować przed dobową awarią, więc nie może opierać się na komendzie działającej raz na kilka razy, w okolicznościach, których nie umiem odtworzyć. Mechanizm jest więc gotowy, przetestowany i <strong>uśpiony</strong>: czeka na jedną brakującą stałą.</p>



<p class="wp-block-paragraph">Jedna rzecz z tego etapu jest warta zapamiętania jako metoda. Pierwszą próbę uznałem za obiecującą, bo po komendzie ładowarka kilka razy przestała odpowiadać, a chmura wepchnęła swoje ustawienia, czyli dokładnie to, co widuję po prawdziwym restarcie. Dopiero <strong>próba kontrolna</strong>, czyli identyczny pomiar bez wysyłania czegokolwiek, pokazała, że to był zwykły szum. Bez niej wpisałbym do kodu komendę, która nic nie robi, i dowiedziałbym się o tym przy następnej awarii, czyli w najgorszym możliwym momencie. Przy pomiarach na urządzeniu, które ktoś inny również odpytuje, wynik bez grupy kontrolnej jest wart tyle co nic.</p>



<p class="wp-block-paragraph">Z tego samego podsłuchu wypadła jeszcze jedna poprawka, tym razem zupełnie przypadkiem. Ładowarka przy starcie sesji przechodzi przez krótki stan pośredni, trwający kilkanaście sekund, który znaczy &#8222;kabel włożony&#8221;. Nie miałem go na żadnej liście, więc skrypt widział wtedy status, którego nie rozpoznawał, i uznawał, że <strong>auto jest odpięte</strong>. Przy pętli co pół minuty to od czasu do czasu jedna iteracja bez sterowania, czyli drobiazg. Gorszy jest wariant, w którym ładowarka zawiesiłaby się właśnie w tym stanie: watchdog by tego nie zobaczył, bo zamrożenie liczy się wyłącznie wtedy, gdy skrypt w ogóle chce ładować. Cicha dziura dokładnie tej samej rodziny co cały poprzedni problem.</p>



<p class="wp-block-paragraph"><strong>Wniosek na koniec:</strong> dwie z trzech rzeczy, które wyniosłem z tej sesji, nie wzięły się z naprawiania tego, co zepsute, tylko z <strong>przyglądania się urządzeniu przy normalnej pracy</strong>. Napięcie sygnału sterującego i ten stan pośredni leżały w danych od miesięcy. Wystarczyło raz spojrzeć z rozdzielczością większą niż co trzydzieści sekund.</p>



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<h2 class="wp-block-heading">Helpery w Home Assistant</h2>



<p class="wp-block-paragraph">Wymagane helpery — tworzone przez UI (Settings → Helpers):</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Typ</th><th>Entity ID</th><th>Opis</th></tr></thead><tbody><tr><td>Text</td><td><code>input_text.ev_charger_status</code></td><td>Status ładowarki (WORKING/SLEEP/PAUSE…)</td></tr><tr><td>Text</td><td><code>input_text.ev_charger_mode</code></td><td>Aktywny tryb (SOLAR/EMERGENCY…)</td></tr><tr><td>Text</td><td><code>input_text.ev_data</code></td><td>JSON z pełnymi danymi sesji</td></tr><tr><td>Toggle</td><td><code>input_boolean.ev_tryb_zimowy</code></td><td>Tryb zimowy — nocne ładowanie 22–6</td></tr><tr><td>Toggle</td><td><code>input_boolean.ev_tryb_awaryjny</code></td><td>Tryb awaryjny — ładuj na maksa teraz</td></tr><tr><td>Number</td><td><code>input_number.ev_awaryjny_godziny</code></td><td>Czas trybu awaryjnego (0,5–8h)</td></tr><tr><td>Button</td><td><code>input_button.ev_archiwizuj_teraz</code></td><td>Ręczna archiwizacja bieżącego miesiąca (opcjonalny)</td></tr></tbody></table></figure>



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<h2 class="wp-block-heading">Efekty i wnioski</h2>



<h3 class="wp-block-heading">Strategia sezonowa — lato i zima</h3>



<p class="wp-block-paragraph">System jest zaprojektowany na cały rok z jednym przełącznikiem sezonowym.</p>



<p class="wp-block-paragraph"><strong>Lato (kwiecień–wrzesień):</strong><br>Polska ma dobre nasłonecznienie — 9 kWp produkuje regularnie nadwyżki powyżej 1,6 kW. Auto ładuje się za darmo z nadwyżek PV. Przy ujemnych cenach Pstryk (które latem zdarzają się regularnie w południe) system ładuje na 13A, czyli około 9 kW, a operator energii dopłaca za pobieranie prądu.</p>



<p class="wp-block-paragraph"><strong>Zima (październik–marzec):</strong><br>Krótkie dni, niskie słońce — nadwyżki PV są rzadkie i małe. Jednocześnie od października planowana jest taryfa G12W z tanią energią nocną (~0,70 zł/kWh vs ~0,85 zł/kWh w dzień). Włączam jeden przełącznik w HA — <code>❄️ Tryb zimowy</code> — i skrypt automatycznie ładuje auto w nocy między 22:00 a 6:00 na 10A (~6,9 kW).</p>



<p class="wp-block-paragraph">Dlaczego 10A a nie 16A? Zimą działają pompy ciepła powietrze-powietrze które mogą pobierać łącznie 3–4 kW. Przy przyłączu 11 kW zostaje bezpiecznie ~7 kW na auto, ale przyjąłem 10A (6,9 kW) jako bezpieczny bufor na szczyty poboru (gotowanie, bojler, klimatyzatory).</p>



<p class="wp-block-paragraph">Słoneczne dni zimą? Skrypt nadal wykrywa nadwyżki PV i uruchamia tryb SOLAR automatycznie — tryb zimowy dodaje tylko nocne okno ładowania, nie wyłącza logiki solarnej.</p>



<p class="wp-block-paragraph"><strong>Przy ujemnych cenach Pstryk</strong> (które latem zdarzają się regularnie w godzinach 10:00–16:00) system automatycznie ładuje auto na maksimum. W majowy dzień cena spadła do -0,60 zł/kWh — za każdą godzinę ładowania (9,8 kWh) operator energii <strong>płacił mi</strong> 5,88 zł zamiast żebym ja płacił.</p>



<p class="wp-block-paragraph"><strong>Ładowanie z nadwyżek</strong> działa dokładnie tak jak planowałem — gdy bateria jest pełna i słońce produkuje więcej niż potrzeba, auto dostaje resztę. Prąd reguluje się co 30 sekund, typowo oscyluje w zakresie 8–12A przy produkcji PV 8 kW.</p>



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<h2 class="wp-block-heading">Historia miesięczna — przeglądanie miesiąc do miesiąca</h2>



<p class="wp-block-paragraph">Przez pierwszych kilka tygodni dashboard pokazywał statystyki tylko z bieżącego miesiąca. Mankament: zarówno wewnętrzny licznik energii naładowanej do auta, jak i miesięczne liczniki <code>utility_meter</code> w Home Assistant zerują się 1. dnia każdego miesiąca — a stara wartość trafiała wyłącznie do logu i przepadała. Nie dało się cofnąć w czasie i porównać: ile auto wzięło z PV w maju, a ile w czerwcu.</p>



<p class="wp-block-paragraph">Dorzuciłem więc trwałe <strong>archiwum miesięczne</strong> z retencją <strong>10 lat</strong>. Tuż przed wyzerowaniem licznika skrypt zapisuje zamknięty miesiąc jako jeden rekord:</p>



<ul class="wp-block-list">
<li>energia naładowana do auta [kWh],</li>



<li>produkcja PV, zużycie domu, import i eksport z sieci [kWh],</li>



<li>samowystarczalność energetyczna domu [%].</li>
</ul>



<p class="wp-block-paragraph">Przykładowy wpis za czerwiec 2026: <strong>145,86 kWh</strong> wpompowane w auto przy <strong>62,3%</strong> samowystarczalności. Na dashboardzie wyświetlam to jako wykres słupkowy (miesiąc do miesiąca: auto vs produkcja PV vs zużycie domu) oraz tabelę porównawczą.</p>



<p class="wp-block-paragraph">Diabeł tkwił w dwóch szczegółach, które warto znać:</p>



<p class="wp-block-paragraph"><strong>Wyścig z resetem.</strong> Gdyby przy przełomie miesiąca odczytać liczniki „na bieżąco&#8221;, można trafić już po ich wyzerowaniu i zapisać zera. Dlatego skrypt w każdej iteracji (co 30 s) zapamiętuje snapshot liczników, a przy przełomie archiwizuje snapshot z <strong>poprzedniej</strong> iteracji — czyli stan na koniec starego miesiąca. Niezależnie od tego, w jakiej kolejności HA zresetuje <code>utility_meter</code>.</p>



<p class="wp-block-paragraph"><strong><code>set_state()</code> kontra HA 2026.</strong> Pierwsza wersja publikowała sensor archiwum przez AppDaemonowe <code>set_state()</code> — i dostawała <code>400 Bad Request</code>. Diagnostyka (strzał wprost do REST API rdzenia przez proxy supervisora) pokazała, że samo API przyjmuje identyczny payload bez zająknięcia — wina leżała po stronie ścieżki <code>set_state</code>. Ostatecznie publikuję sensor bezpośrednim <code>POST</code>-em do REST API, z całym archiwum w atrybucie <code>months</code> (atrybuty nie mają limitu 255 znaków, w przeciwieństwie do <code>input_text</code> i stanu encji). Szczegóły w Problemach 17–18 powyżej.</p>



<p class="wp-block-paragraph">Źródłem prawdy jest plik JSON, który przeżywa restarty — sam sensor to tylko warstwa prezentacji, odtwarzana przy każdym starcie skryptu. Dodałem też opcjonalny przycisk „Zarchiwizuj bieżący miesiąc&#8221;, który robi snapshot niezamkniętego miesiąca od ręki (bez resetu liczników) — przydatny, gdy nie chce się czekać do 1. dnia, żeby zobaczyć dane.</p>



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<h2 class="wp-block-heading">Audyt kodu, czyli co siedziało w skrypcie przez trzy miesiące</h2>



<p class="wp-block-paragraph">Skrypt działał od maja i robił swoje, więc przez długi czas nie było powodu do niego zaglądać. W lipcu usiadłem do porządnego przeglądu całości: linijka po linijce, z pytaniem &#8222;czy to na pewno robi to, co myślę&#8221;. Wyszły cztery błędy, z czego dwa realnie kosztowały mnie energię z magazynu domowego. Żaden nie rzucał się w oczy w logach, bo żaden nie powodował awarii. Po prostu system zachowywał się odrobinę inaczej, niż sądziłem.</p>



<p class="wp-block-paragraph"><strong>Najciekawszy okazał się błąd w samej regulacji.</strong> Gdy nadeszła chmura i zaczynałem pobierać prąd z sieci, skrypt zamiast zejść z mocy ładowania, <em>podkręcał</em> ją. Krok po kroku: 6A, 7A, 8A, aż do maksimum. Powód jest podręcznikowy i dlatego wart opisania: przy imporcie kod gubił informację o tym, jak duży jest deficyt, i podstawiał w to miejsce stałą wartość. A ponieważ do nadwyżki dolicza się moc ładowarki, każda kolejna iteracja widziała &#8222;więcej dostępnej mocy&#8221; niż poprzednia. Klasyczne dodatnie sprzężenie zwrotne, w pętli, którą sam napisałem i której przez kwartał nie zauważyłem. Ładowanie kończyło się dopiero wtedy, gdy magazyn domowy spadł poniżej 95% i wchodził tryb priorytetu baterii, czyli już po niepotrzebnym cyklu rozładowania.</p>



<p class="wp-block-paragraph">Przy okazji wyszła rzecz, która zmieniła moje rozumienie własnej instalacji. <strong>Licznik na złączu z siecią nie mówi prawdy o nadwyżce, jeśli ma się falownik hybrydowy.</strong> Sofar w trybie autokonsumpcji aktywnie dopełnia deficyt z magazynu, żeby utrzymać zerowy bilans z siecią. Efekt jest taki, że przy PV 1 kW, domu 5 kW i aucie ciągnącym 4 kW licznik pokazuje spokojne zero, a bateria w garażu po cichu się opróżnia. Teraz nadwyżkę liczę jako minimum z dwóch rzeczy: tego, co faktycznie wypycham do sieci, i tego, co zostaje z produkcji po odjęciu zużycia domu. Pierwsze pilnuje, żeby nie podbierać mocy ładującej się baterii, drugie widzi deficyt, który bateria maskuje.</p>



<p class="wp-block-paragraph"><strong>Drugi poważny błąd był bardziej perfidny, bo powstał przy naprawianiu innego błędu.</strong> W maju walczyłem z tym, że skrypt co 30 sekund wysyłał do wallboxa komendę STOP i słychać było klikanie stycznika. Naprawa była prosta: zapamiętuj, co ostatnio wysłałeś, i nie powtarzaj. Tyle że zapamiętywanie działo się także wtedy, gdy wysyłka się nie udała. Wystarczył jeden zgubiony pakiet Wi-Fi (a wallbox stoi w garażu, zasięg bywa marny), żeby skrypt do końca życia procesu był przekonany, że komendę wysłał. W praktyce: ładowanie nie ruszało, dopóki czegoś nie zrestartowałem, albo, w drugą stronę, auto ładowało się mimo trybu priorytetu baterii.</p>



<p class="wp-block-paragraph">Ten drugi wariant potwierdził się w najlepszy możliwy sposób: dokładnie w chwili wgrywania poprawki. Auto ciągnęło wtedy 5,2 kW przy magazynie naładowanym w 46%, czyli w sytuacji, w której skrypt od dawna powinien był je zatrzymać. Nie zatrzymywał, bo miał zapisane, że już to zrobił. Nowa wersja ucięła sesję w pierwszej iteracji po restarcie. Trudno o lepszy dowód, że błąd nie był teoretyczny.</p>



<p class="wp-block-paragraph">Do tego doszły dwie rzeczy z gatunku &#8222;cicha awaria&#8221;. Biblioteka TinyTuya przy problemach z siecią nie zgłasza wyjątku, tylko zwraca słownik z kluczem <code>Error</code>, a stary kod interpretował to jako &#8222;ładowarka gotowa do pracy&#8221;. I plik z licznikami energii oraz dziesięcioletnim archiwum zapisywał się nieatomowo, więc jedno przerwanie w złym momencie mogło go uszkodzić tak, że od tej pory każdy kolejny zapis cicho padał, a liczniki wracały do zera.</p>



<h3 class="wp-block-heading">Czego się nauczyłem o testowaniu takich systemów</h3>



<p class="wp-block-paragraph">Napisałem do skryptu zestaw prostych testów, bez żadnego frameworka, podmieniając AppDaemon i TinyTuya atrapami. Ale najwięcej dała nie tabelka testów, tylko <strong>symulacja całego dnia</strong>: słońce, chmura, powrót słońca, wieczór, z wallboxem reagującym na komendy jak prawdziwy. Dopiero ona pokazała błąd, którego testy jednostkowe nie widziały, bo dotyczył kolejności operacji. Uśrednianie odczytów robiłem <em>przed</em> doliczeniem poboru ładowarki, przez co średnia mieszała próbki mierzone przy różnej mocy ładowania i tuż po starcie sesji prąd skakał na maksimum.</p>



<p class="wp-block-paragraph">Wniosek na przyszłość jest chyba taki: przy sterowaniu ze sprzężeniem zwrotnym sprawdzanie pojedynczych funkcji to za mało. Trzeba puścić pętlę w czasie i zobaczyć, dokąd zbiega. Po poprawkach symulacja wygląda tak, jak powinna: 11A stabilnie w pełnym słońcu, przy chmurze redukcja 10, 8, 7, 6 amperów, stop, a potem płynny powrót w górę.</p>



<p class="wp-block-paragraph">Dopisek z następnego dnia: ta sama historia dostała ciąg dalszy, którego nie wychwyciły ani testy, ani symulacja. Zgłosiło go ucho - usłyszałem przez okno, że ładowarka pika co pół minuty. Regulacja liczyła poprawnie, tylko wysyłała komendy znacznie częściej, niż auto było w stanie za nimi nadążyć. Opisałem to jako Problem 23 wyżej. Morał: nawet dobra symulacja nie zastąpi tego, że system stoi w garażu i wydaje dźwięki.</p>



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<h2 class="wp-block-heading">Koszt całego rozwiązania</h2>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Element</th><th>Koszt</th></tr></thead><tbody><tr><td>Ładowarka dé EV 11kW Wi-Fi</td><td>~1150 zł</td></tr><tr><td>Home Assistant</td><td>0 zł (open source)</td></tr><tr><td>AppDaemon</td><td>0 zł (open source)</td></tr><tr><td>TinyTuya</td><td>0 zł (open source)</td></tr><tr><td>Tuya IoT Platform (jednorazowe pobranie klucza)</td><td>0 zł</td></tr></tbody></table></figure>



<p class="wp-block-paragraph"><strong>Łącznie: 1150 zł</strong> za inteligentną ładowarkę zintegrowaną z PV.</p>



<p class="wp-block-paragraph">Dla porównania — dedykowane ładowarki z zarządzaniem mocą i integracją z PV kosztują 3000–8000 zł.</p>



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<h2 class="wp-block-heading">Dla technicznych: kluczowe fragmenty kodu</h2>



<p class="wp-block-paragraph">Pełny skrypt AppDaemon dostępny na moim GitHubie: <a href="https://github.com/tomasz-kwietniewski/ha-ev-charger">github.com/tomasz-kwietniewski/ha-ev-charger</a>. Dane urządzenia (Device ID, Local Key, IP) trzymam w osobnym pliku <code>ev_charger_secrets.json</code> który nie trafia do repozytorium — szablon znajdziesz w repo jako <code>ev_charger_secrets.json.example</code>. Poniżej kluczowe fragmenty kodu:</p>



<p class="wp-block-paragraph"><strong>Odczyt danych z ładowarki z obsługą PAUSE:</strong></p>



<pre class="wp-block-code"><code>CHARGER_READY_STATES   = {"PAUSE", "SLEEP", "IDLE", "UNKNOWN"}
CHARGER_WORKING_STATES = {"WORKING"}

def _get_charger_data(self):
    raw = self._device.status()
    # tinytuya zwraca błąd jako słownik, nie wyjątek (Problem 21)
    if not isinstance(raw, dict) or "Error" in raw:
        raise RuntimeError(f"tinytuya zwrocil blad: {raw!r}")
    dps = raw.get("dps", {})

    status  = str(dps.get("109", "unknown")).upper()
    current = int(dps.get("150", 0))

    metrics = json.loads(dps.get("102", "{}"))
    l1 = metrics.get("L1", &#91;0, 0, 0])
    l2 = metrics.get("L2", &#91;0, 0, 0])
    l3 = metrics.get("L3", &#91;0, 0, 0])
    power_w = (l1&#91;2] + l2&#91;2] + l3&#91;2]) * 100  # skala x100!

    return {"status": status, "current_a": current, "power_w": power_w}</code></pre>



<p class="wp-block-paragraph"><strong>Obliczanie nadwyżki z uśrednianiem:</strong></p>



<pre class="wp-block-code"><code># Sofar: dodatni PCC = eksport (nadwyżka), ujemny = import.
# min() bierze wariant konserwatywny: PV minus dom widzi deficyt
# maskowany przez magazyn, PCC pilnuje mocy idącej do baterii.
surplus_without_ev_kw = min(grid_power, pv_power - load_power)

# Pobór auta siedzi już w load_power, doliczamy go z powrotem PRZED
# uśrednianiem, żeby każda próbka w historii znaczyła to samo.
available_kw = surplus_without_ev_kw + charger_power_kw

# Uśredniamy ostatnie 3 odczyty (90s) żeby wyeliminować migotanie
self._surplus_history.append(available_kw)
if len(self._surplus_history) &gt; PCC_HISTORY_SIZE:
    self._surplus_history.pop(0)
avg_available_kw = sum(self._surplus_history) / len(self._surplus_history)

# Bias +1000W, agresywniejsze wykorzystanie nadwyżek.
# BEZ podłogi: przy imporcie wychodzi ujemne, więc regulacja redukuje prąd.
surplus_w = avg_available_kw * 1000 + SURPLUS_BIAS_W</code></pre>



<p class="wp-block-paragraph"><strong>Logika decyzyjna z sześcioma trybami:</strong></p>



<pre class="wp-block-code"><code>def _decide(self, ha_data, charger_data):
    # 1. EMERGENCY — najwyższy priorytet
    if self._is_emergency_active():
        if soc &lt; SOC_EMERGENCY_MIN:
            return ("BATTERY_PRIORITY", 0)
        return ("EMERGENCY", EMERGENCY_CURRENT_A)  # 13A

    # 2. Ujemna cena energii
    if price &lt; 0:
        return ("NEGATIVE_PRICE", NEGATIVE_PRICE_CURRENT_A)  # 13A

    # 3. Tryb zimowy — nocne ładowanie
    if winter_mode and in_night_window:
        return ("WINTER_NIGHT", WINTER_MAX_CURRENT)  # 10A

    # 4. Ochrona baterii
    if soc &lt; SOC_THRESHOLD:  # 95%
        return ("BATTERY_PRIORITY", 0)

    # 5. Tryb solarny
    if available_surplus &gt;= START_SURPLUS_W:  # 1600W
        current = max(6, min(16, int(available_surplus / (3 * 230))))
        return ("SOLAR", current)

    return ("IDLE", 0)</code></pre>



<p class="wp-block-paragraph"><strong>Tryb EMERGENCY z automatycznym timerem:</strong></p>



<pre class="wp-block-code"><code>def _on_emergency_toggle(self, entity, attribute, old, new, kwargs):
    if new == "on":
        hours = self._get_emergency_hours()  # z input_number
        self._emergency_end_time = datetime.datetime.now() + datetime.timedelta(hours=hours)
        self._clear_schedule()  # wyczyść harmonogram przed startem
    else:
        self._emergency_end_time = None

def _is_emergency_active(self):
    if self.get_state(EMERGENCY_MODE_ENTITY) != "on":
        return False
    if datetime.datetime.now() &gt; self._emergency_end_time:
        # Czas minął — wyłącz automatycznie
        self.call_service("input_boolean/turn_off", entity_id=EMERGENCY_MODE_ENTITY)
        return False
    return True</code></pre>



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<h2 class="wp-block-heading">Podsumowanie</h2>



<p class="wp-block-paragraph">Inteligentne ładowanie auta elektrycznego z nadwyżek PV nie wymaga drogiego sprzętu. Wystarczy:</p>



<ol class="wp-block-list">
<li>Tania ładowarka z Wi-Fi i protokołem Tuya (~1150 zł)</li>



<li>Home Assistant jako centrum automatyki</li>



<li>Biblioteka TinyTuya do lokalnej kontroli</li>



<li>Trochę Pythona w AppDaemon</li>
</ol>



<p class="wp-block-paragraph">System obsługuje sześć trybów pracy: solarny (proporcjonalnie do nadwyżek), awaryjny (ładuj teraz na maksa), ujemne ceny (operator płaci), zimowy (nocna taryfa), priorytet baterii i bezczynność. Wszystko sterowane z poziomu dashboardu HA.</p>



<p class="wp-block-paragraph">Efekt: auto ładuje się za darmo gdy świeci słońce, a przy ujemnych cenach Pstryk — operator energii dopłaca za to, że pobieramy prąd.</p>



<p class="wp-block-paragraph">Latem planujemy naładować całą baterię 75 kWh praktycznie bez kosztów. Policzymy to jesienią.</p>



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<p class="wp-block-paragraph"><em>Artykuł napisany na podstawie rzeczywistej instalacji. Pierwsza wersja: maj 2026. Aktualizacja: maj 2026 — dodano tryb EMERGENCY, obsługę stanu PAUSE, uśrednianie PCC, obniżenie progu startu do 1600W. Aktualizacja 2: maj 2026 — uśrednianie PCC rozszerzone do 3 próbek (90s), bias wydzielony jako nazwana stała SURPLUS_BIAS_W, poprawka komentarzy znaku PCC. Aktualizacja 3: 12 maja 2026 — dodano Problem 12 (AppDaemon skanuje apps/ rekurencyjnie — duplikaty aplikacji przy backupie wewnątrz folderu). Aktualizacja 4: 8 czerwca 2026 — Problemy 13–16 (STOP-spam w gałęzi IDLE, zamrożony DP 102 w firmware dé EV v2.9.4, chmura Tuya a harmonogram DP 151, ukryte pole <code>e</code> = energia sesji × 0,1 kWh); archiwum historii miesięcznej z retencją 10 lat — wykres i tabela porównawcza na dashboardzie, ręczny przycisk archiwizacji (Problemy 17–18: dane ginące przy resecie miesiąca oraz <code>set_state</code> 400 w HA 2026.x → publikacja przez REST API rdzenia). Aktualizacja 5: 27 lipca 2026 — audyt kodu, Problemy 19-22: regulacja SOLAR &#8222;uciekająca&#8221; w górę przy zachmurzeniu (nadwyżka liczona teraz jako minimum z eksportu i z produkcji minus zużycie domu, bez podłogi), dedup komend START/STOP bez ponowień, TinyTuya zwracająca błąd jako słownik zamiast wyjątku, nieatomowy zapis pliku z licznikami; tryb ujemnych cen zszedł z 16A na 13A (bufor na dom), doszły testy jednostkowe i symulacja pętli regulacji. Aktualizacja 6: 28 lipca 2026 - Problem 23: regulacja goniąca szum (prąd zmieniany co 30 sekund, sekwencje 10A, 11A, 10A). Histereza plus minus 250 W wokół progu stopnia oraz potwierdzenie zmiany przez dwie iteracje; duży spadek nadal natychmiastowy. Zmierzone: 52 zmiany prądu w pochmurne pół godziny zeszły do jednej. Aktualizacja 7: 11 sierpnia 2026 - Problem 24: ładowarka zawieszona przez 36 godzin (odpowiadała w sieci, ale nie aktualizowała danych i ignorowała wszystkie komendy), a system tego nie zauważył. Rozpoznawanie awarii po niezmiennym surowym odczycie pomiarów zamiast po samym zerze mocy, powiadomienie w Home Assistant zamiast ostrzeżenia w logu, cykl budzenia sesji, gdy ładowarka twierdzi że pracuje, a prąd nie płynie, potwierdzanie zadanego prądu, koniec z trwałym odpuszczaniem prób startu. Testy jednostkowe wzrosły z 24 do 51. Aktualizacja 8: 20 sierpnia 2026 - Problem 25: ta sama awaria wróciła i mimo sześciu poprawnych alarmów trwała 22,5 godziny, bo powiadomienie szło wyłącznie do panelu Home Assistanta. Alarm idzie teraz również na telefon. Doszedł mechanizm automatycznego restartu ładowarki, na razie uśpiony: komenda restartu okazała się poleceniem tylko do zapisu, którego nie da się podsłuchać, a to znalezione w modelu producenta zadziałało raz na sześć prób. Przy okazji: pole, które uważałem za numer wersji, jest napięciem sygnału sterującego między ładowarką a autem, oraz naprawiony stan pośredni przy starcie sesji, przez który skrypt widział podłączone auto jako odpięte. Testy jednostkowe: 51 do 67.</em></p>
