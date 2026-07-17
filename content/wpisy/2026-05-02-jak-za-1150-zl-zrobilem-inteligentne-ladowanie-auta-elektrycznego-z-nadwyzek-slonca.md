---
title: "Jak za 1150 zł zrobiłem inteligentne ładowanie auta elektrycznego z nadwyżek słońca"
slug: "jak-za-1150-zl-zrobilem-inteligentne-ladowanie-auta-elektrycznego-z-nadwyzek-slonca"
miniatura: "/media/2026/05/2026-05-04_ladowanie_EV.png"
date: "2026-05-02T09:15:13"
modified: "2026-06-08T21:37:07"
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



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Tryb</th><th>Warunek</th><th>Działanie</th></tr></thead><tbody><tr><td><code>EMERGENCY</code></td><td>Włączony ręcznie przez toggle w HA</td><td>Ładuj natychmiast na 13A (~9 kW), niezależnie od PV i cen</td></tr><tr><td><code>NEGATIVE_PRICE</code></td><td>Cena Pstryk &lt; 0 zł/kWh</td><td>Ładuj na maksimum (16A)</td></tr><tr><td><code>WINTER_NIGHT</code></td><td>Tryb zimowy włączony, godz. 22–6</td><td>Ładuj na 10A (tania taryfa nocna)</td></tr><tr><td><code>SOLAR</code></td><td>SOC baterii ≥ 95% i nadwyżka PV ≥ 1,6 kW</td><td>Ładuj proporcjonalnie do nadwyżki (6–16A)</td></tr><tr><td><code>BATTERY_PRIORITY</code></td><td>SOC &lt; 95%</td><td>Czekaj, priorytet ładowania baterii</td></tr><tr><td><code>IDLE</code></td><td>Brak nadwyżek lub auto niepodłączone</td><td>Ładowarka wyłączona</td></tr></tbody></table></figure>



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



<h3 class="wp-block-heading">Uśrednianie PCC — eliminacja migotania</h3>



<p class="wp-block-paragraph">PCC &#8222;migocze&#8221; — raz -0,1 kW, raz +0,2 kW, raz -0,5 kW — nawet gdy bilans jest w zasadzie zero. To normalne przy hybrydowym falowniku, regulacja nie jest idealna. Bez filtrowania skrypt zmieniałby prąd ładowania co 30 sekund.</p>



<p class="wp-block-paragraph">Rozwiązanie: uśrednianie z ostatnich 3 odczytów (90 sekund):</p>



<pre class="wp-block-code"><code>PCC_HISTORY_SIZE = 3

self._pcc_history.append(grid_power)
if len(self._pcc_history) &gt; PCC_HISTORY_SIZE:
    self._pcc_history.pop(0)
avg_pcc = sum(self._pcc_history) / len(self._pcc_history)</code></pre>



<h3 class="wp-block-heading">Bias +1000W — agresywne wykorzystanie nadwyżek</h3>



<p class="wp-block-paragraph">Prąd ładowarki zmienia się skokowo co 690W (1A × 3 fazy × 230V). Żeby skrypt był trochę bardziej &#8222;agresywny&#8221; i częściej wybierał wyższy prąd, dodałem stały bias +1000W do obliczonej nadwyżki. Dzięki temu auto startuje już przy ~0,6 kW realnego eksportu zamiast czekać na pełne 1,6 kW. W kodzie bias jest wydzielony jako nazwana stała:</p>



<pre class="wp-block-code"><code>SURPLUS_BIAS_W = 1000  # bufor zachęcający do startu

if avg_pcc &gt; 0:
    surplus_w = avg_pcc * 1000 + SURPLUS_BIAS_W
else:
    surplus_w = SURPLUS_BIAS_W</code></pre>



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



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<h2 class="wp-block-heading">Helpery w Home Assistant</h2>



<p class="wp-block-paragraph">Wymagane helpery — tworzone przez UI (Settings → Helpers):</p>



<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Typ</th><th>Entity ID</th><th>Opis</th></tr></thead><tbody><tr><td>Text</td><td><code>input_text.ev_charger_status</code></td><td>Status ładowarki (WORKING/SLEEP/PAUSE…)</td></tr><tr><td>Text</td><td><code>input_text.ev_charger_mode</code></td><td>Aktywny tryb (SOLAR/EMERGENCY…)</td></tr><tr><td>Text</td><td><code>input_text.ev_data</code></td><td>JSON z pełnymi danymi sesji</td></tr><tr><td>Toggle</td><td><code>input_boolean.ev_tryb_zimowy</code></td><td>Tryb zimowy — nocne ładowanie 22–6</td></tr><tr><td>Toggle</td><td><code>input_boolean.ev_tryb_awaryjny</code></td><td>Tryb awaryjny — ładuj na maksa teraz</td></tr><tr><td>Number</td><td><code>input_number.ev_awaryjny_godziny</code></td><td>Czas trybu awaryjnego (0,5–8h)</td></tr><tr><td>Button</td><td><code>input_button.ev_archiwizuj_teraz</code></td><td>Ręczna archiwizacja bieżącego miesiąca (opcjonalny)</td></tr></tbody></table></figure>



<hr class="wp-block-separator has-alpha-channel-opacity"/>



<h2 class="wp-block-heading">Efekty i wnioski</h2>



<h3 class="wp-block-heading">Strategia sezonowa — lato i zima</h3>



<p class="wp-block-paragraph">System jest zaprojektowany na cały rok z jednym przełącznikiem sezonowym.</p>



<p class="wp-block-paragraph"><strong>Lato (kwiecień–wrzesień):</strong><br>Polska ma dobre nasłonecznienie — 9 kWp produkuje regularnie nadwyżki powyżej 1,6 kW. Auto ładuje się za darmo z nadwyżek PV. Przy ujemnych cenach Pstryk (które latem zdarzają się regularnie w południe) system ładuje na maksimum — operator energii dopłaca za pobieranie prądu.</p>



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
    dps = raw.get("dps", {})

    status  = str(dps.get("109", "unknown")).upper()
    current = int(dps.get("150", 0))

    metrics = json.loads(dps.get("102", "{}"))
    l1 = metrics.get("L1", &#91;0, 0, 0])
    l2 = metrics.get("L2", &#91;0, 0, 0])
    l3 = metrics.get("L3", &#91;0, 0, 0])
    power_w = (l1&#91;2] + l2&#91;2] + l3&#91;2]) * 100  # skala x100!

    return {"status": status, "current_a": current, "power_w": power_w}</code></pre>



<p class="wp-block-paragraph"><strong>Obliczanie nadwyżki z uśrednianiem PCC:</strong></p>



<pre class="wp-block-code"><code># Sofar: dodatni PCC = eksport (nadwyżka), ujemny = import
# Uśredniamy ostatnie 3 odczyty (90s) żeby wyeliminować migotanie
self._pcc_history.append(grid_power)
if len(self._pcc_history) &gt; PCC_HISTORY_SIZE:
    self._pcc_history.pop(0)
avg_pcc = sum(self._pcc_history) / len(self._pcc_history)

# Bias +1000W — agresywniejsze wykorzystanie nadwyżek
if avg_pcc &gt; 0:
    surplus_w = avg_pcc * 1000 + SURPLUS_BIAS_W
else:
    surplus_w = SURPLUS_BIAS_W</code></pre>



<p class="wp-block-paragraph"><strong>Logika decyzyjna z sześcioma trybami:</strong></p>



<pre class="wp-block-code"><code>def _decide(self, ha_data, charger_data):
    # 1. EMERGENCY — najwyższy priorytet
    if self._is_emergency_active():
        if soc &lt; SOC_EMERGENCY_MIN:
            return ("BATTERY_PRIORITY", 0)
        return ("EMERGENCY", EMERGENCY_CURRENT_A)  # 13A

    # 2. Ujemna cena energii
    if price &lt; 0:
        return ("NEGATIVE_PRICE", MAX_CURRENT_A)  # 16A

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



<p class="wp-block-paragraph"><em>Artykuł napisany na podstawie rzeczywistej instalacji. Pierwsza wersja: maj 2026. Aktualizacja: maj 2026 — dodano tryb EMERGENCY, obsługę stanu PAUSE, uśrednianie PCC, obniżenie progu startu do 1600W. Aktualizacja 2: maj 2026 — uśrednianie PCC rozszerzone do 3 próbek (90s), bias wydzielony jako nazwana stała SURPLUS_BIAS_W, poprawka komentarzy znaku PCC. Aktualizacja 3: 12 maja 2026 — dodano Problem 12 (AppDaemon skanuje apps/ rekurencyjnie — duplikaty aplikacji przy backupie wewnątrz folderu). Aktualizacja 4: 8 czerwca 2026 — Problemy 13–16 (STOP-spam w gałęzi IDLE, zamrożony DP 102 w firmware dé EV v2.9.4, chmura Tuya a harmonogram DP 151, ukryte pole <code>e</code> = energia sesji × 0,1 kWh); archiwum historii miesięcznej z retencją 10 lat — wykres i tabela porównawcza na dashboardzie, ręczny przycisk archiwizacji (Problemy 17–18: dane ginące przy resecie miesiąca oraz <code>set_state</code> 400 w HA 2026.x → publikacja przez REST API rdzenia).</em></p>
