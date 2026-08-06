---
title: "Ekstraklasa rosła szybciej niż Real Madryt. I dogoni go około 2099 roku"
slug: finanse-polskiej-pilki
date: "2026-08-06T09:00:00"
kategorie:
  - Ciekawostki / świat
excerpt: "Kluby Ekstraklasy zarobiły rekordowe 1,27 mld zł. Przeliczyłem osiemnaście lat raportów finansowych na realne złotówki, udział w PKB i przeciętne wynagrodzenia. Polska piłka rosła szybciej niż najbogatsze kluby Europy - a mimo to różnica w euro się podwoiła i będzie rosła jeszcze przez pokolenie."
typ: wpis
---
<style>
/* ===== Esej "Finanse polskiej pilki" - style zscopowane pod .esej ===== */
/* Baza: dopracowany CSS eseju "Polska: sport a gospodarka" (wersja ze strony, */
/* nie ze zrodlowego HTML - ma poprawki, bez ktorych style.css przebija kolory */
/* i marginesy). Usuniete komponenty, ktorych ten tekst nie uzywa; nic nie zmieniane. */
/* Fonty: Bricolage Grotesque (display) + Archivo (tekst) - self-hostowane fonty strony. */
.esej{
  --paper:#F4F6F8; --card:#FFFFFF; --ink:#15202B; --ink-2:#51616C; --ink-3:#8593A0;
  --line:#DCE2E8; --line-2:#EAEEF2;
  --nor:#1F5C99; --nor-soft:#E4EEF7; --pol:#C0303A; --pol-soft:#F8E4E6;
  --disp:"Bricolage Grotesque","Archivo",sans-serif;
  background:var(--paper); color:var(--ink);
  font-family:"Archivo",system-ui,sans-serif; font-size:17px; line-height:1.72;
  border-radius:16px; padding:clamp(18px,4vw,32px); margin:8px 0 4px;
  -webkit-font-smoothing:antialiased;
}
.esej a{color:var(--nor);text-decoration:none;border-bottom:1px solid rgba(31,92,153,.25)}
.esej a:hover{border-bottom-color:var(--nor);opacity:1}
.esej strong{font-weight:600;color:var(--ink)}
.esej em{font-style:italic}
.esej .lede{font-size:clamp(18px,2.3vw,21px);color:var(--ink-2);margin:0 0 4px;text-wrap:pretty}

/* KPI */
.esej .kpis{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:14px;overflow:hidden;margin:28px 0 0}
.esej .kpi{background:var(--card);padding:22px 20px}
.esej .kpi .n{font-family:var(--disp);font-weight:600;font-size:32px;line-height:1;letter-spacing:-.02em;color:var(--ink);margin:0}
.esej .kpi .l{font-size:13.5px;color:var(--ink-2);margin:8px 0 0;line-height:1.4}
.esej .kpi.cap .n{color:var(--nor)}

/* Wstep z inicjalem */
.esej .lead{margin:36px 0 0}
.esej .lead p{font-size:clamp(18px,2.1vw,20px);line-height:1.68;color:var(--ink-2);margin:0 0 18px}
.esej .lead p:last-child{margin-bottom:0}
.esej .lead p strong{color:var(--ink)}
.esej .lead p:first-of-type::first-letter{font-family:var(--disp);font-weight:600;font-size:58px;line-height:.8;float:left;margin:8px 12px 0 0;color:var(--pol)}

/* Sekcje */
.esej .part{padding:56px 0 0;border-top:1px solid var(--line);margin-top:48px}
.esej .part:first-of-type{border-top:none;margin-top:36px}
.esej .part-tag{font-family:var(--disp);font-weight:600;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--pol);margin:0 0 10px}
.esej .part h2{font-family:var(--disp);font-weight:600;font-size:clamp(24px,3.6vw,32px);line-height:1.12;letter-spacing:-.015em;margin:0 0 20px;color:var(--ink)}
.esej h3{font-family:var(--disp);font-weight:600;font-size:19px;letter-spacing:-.01em;margin:32px 0 10px;color:var(--ink)}
.esej p{margin:0 0 18px}
.esej p:last-child{margin-bottom:0}

/* Wykres */
.esej .fig{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:24px 20px 16px;margin:10px 0 2px}
.esej .fig svg{width:100%;height:auto;display:block}
/* Wykres nie kurczy sie ponizej czytelnosci - na waskim ekranie przewija sie
   w poziomie, tak jak tabele w reszcie serwisu. Legenda zostaje poza kontenerem. */
.esej .plotno{overflow-x:auto;-webkit-overflow-scrolling:touch}
.esej .figcap{font-size:12.5px;color:var(--ink-3);margin:12px 4px 0;line-height:1.5}
.esej .legend{display:flex;gap:20px;flex-wrap:wrap;font-size:13px;color:var(--ink-2);margin:16px 0 0}
.esej .legend span{display:inline-flex;align-items:center;gap:7px}
.esej .dot{width:11px;height:11px;border-radius:3px;display:inline-block;flex:0 0 auto}

/* Cytat wyrozniony */
.esej .pull{border-left:3px solid var(--pol);padding:4px 0 4px 22px;margin:28px 0;font-family:var(--disp);font-weight:500;font-size:clamp(18px,2.4vw,21px);line-height:1.4;letter-spacing:-.01em;color:var(--ink)}

/* Trzy modele + nota */
.esej .models{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:8px}
.esej .model{border:1px solid var(--line);border-radius:14px;padding:18px;background:var(--card)}
.esej .model .lab{font-family:var(--disp);font-weight:600;font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-3);margin:0 0 7px}
.esej .model h4{font-family:var(--disp);font-weight:600;font-size:15px;margin:0 0 6px;color:var(--ink)}
.esej .model p{font-size:13px;color:var(--ink-2);margin:0;line-height:1.55}
.esej .midnote{margin-top:14px;padding:16px 18px;border:1px solid var(--pol);border-radius:12px;background:var(--pol-soft);font-size:14.5px;color:#8E2028;line-height:1.55}
.esej .midnote strong{color:var(--pol)}

/* Tabela lig */
.esej .rtable{border:1px solid var(--line);border-radius:14px;overflow:hidden;margin-top:8px;background:var(--card)}
.esej .rrow{display:grid;grid-template-columns:130px 62px 1fr;align-items:center;gap:0;border-top:1px solid var(--line-2)}
.esej .rrow:first-child{border-top:none}
.esej .rrow.head div{font-family:var(--disp);font-weight:600;font-size:12px;letter-spacing:.04em;color:var(--ink-3);text-transform:uppercase}
.esej .rrow > div{padding:13px 16px;font-size:14px}
.esej .rrow .country{font-family:var(--disp);font-weight:600;color:var(--ink)}
.esej .rrow .pop{color:var(--ink-3);font-size:13px;text-align:right;font-variant-numeric:tabular-nums}
.esej .rrow .ach{color:var(--ink-2);line-height:1.45}
.esej .rrow.poland{background:var(--pol-soft)}
.esej .rrow.poland .country{color:var(--pol)}
.esej .rrow.poland .ach{color:#8E2028}

/* Podsumowanie "W skrocie" */
.esej .summary{border:1px solid var(--line);border-left:3px solid var(--nor);border-radius:12px;background:var(--card);padding:24px 26px;margin:56px 0 0}
.esej .summary h4{font-family:var(--disp);font-weight:600;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-3);margin:0 0 14px}
.esej .summary ul{margin:0;padding-left:20px}
.esej .summary li{font-size:14.5px;color:var(--ink-2);line-height:1.55;margin:9px 0}
.esej .summary li strong{color:var(--ink)}

/* Zrodla */
.esej .zrodla{padding:44px 0 8px;border-top:1px solid var(--line);margin-top:48px}
.esej .zrodla h2{font-family:var(--disp);font-weight:600;font-size:20px;margin:0 0 14px;color:var(--ink)}
.esej .src{font-size:13px;color:var(--ink-2);line-height:1.7;margin:0 0 14px}
.esej .meta{font-size:12.5px;color:var(--ink-3);margin-top:26px;padding-top:20px;border-top:1px solid var(--line)}

/* Wiekszy przeswit od ramki/wizualizacji do nastepnego akapitu tekstu (~1 interlinia) */
.esej :is(.kpis,.legend,.fig,.models,.midnote,.rtable) + p{margin-top:28px}

@media (max-width:640px){
  .esej{font-size:16px}
  .esej .kpis,.esej .models{grid-template-columns:1fr}
  .esej .fig{padding-left:12px;padding-right:12px}
  .esej .plotno svg{min-width:540px}
  .esej .rrow{grid-template-columns:1fr 54px;grid-template-areas:"c p" "a a"}
  .esej .rrow .country{grid-area:c}
  .esej .rrow .pop{grid-area:p}
  .esej .rrow .ach{grid-area:a;padding-top:0}
  .esej .rrow.head{display:none}
}
</style>
<div class="esej">
<p class="lede">Kluby Ekstraklasy zarobiły w sezonie 2024/2025 rekordowe 1,27 mld zł. Brzmi jak przełom. Postanowiłem sprawdzić, ile z tego rekordu zostaje, gdy odliczyć inflację, wzrost gospodarki i to, o ile więcej zarabiają dziś Polacy. Wynik wyszedł inny, niż się spodziewałem - i to w obie strony.</p>
<div class="kpis">
<div class="kpi"><p class="n">5,2×</p><p class="l">tyle razy wzrosły przychody Ekstraklasy w latach 2007-2024/25, licząc w zwykłych złotówkach</p></div>
<div class="kpi"><p class="n">1,6×</p><p class="l">tyle wynosi ten sam wzrost, gdy zmierzyć go w przeciętnych polskich wynagrodzeniach</p></div>
<div class="kpi cap"><p class="n">913 mln €</p><p class="l">o tyle najbogatszy klub Europy jest dziś bogatszy od całej Ekstraklasy. W 2007 r. o 455 mln, licząc w dzisiejszych cenach</p></div>
</div>
<div class="lead">
<p>Raporty o finansach polskiej piłki wychodzą co roku od 2007 i za każdym razem mówią to samo: rekord. To prawda - liczby faktycznie rosną. Kłopot w tym, że sama kwota w złotówkach nie mówi nic, dopóki nie ma się do czego jej odnieść. W 2007 r. przeciętna pensja w Polsce wynosiła 2 866 zł, dziś jest to 9 379 zł. Bilet, kadra i sztab też kosztują dziś inaczej.</p>
<p>Wziąłem więc szesnaście raportów - Deloitte, EY, Grant Thornton, PwC i UEFA - odtworzyłem z nich ciągły szereg od 2007 r. i przeliczyłem go na cztery sposoby: <strong>realnie</strong> (po inflacji), <strong>w udziale w PKB</strong>, <strong>w przeciętnych wynagrodzeniach</strong> i <strong>w euro</strong>, żeby dało się porównać z Europą. Cztery miary, cztery różne odpowiedzi.</p>
</div>
<div class="part">
<p class="part-tag">Część I - Skąd te liczby</p>
<h2>Trzy serie raportów, dwie dziury i jedna pułapka</h2>
<p>Zanim padnie pierwsza liczba, trzeba powiedzieć, skąd się bierze - bo w sieci krążą o finansach Ekstraklasy dane, które nie zgadzają się ze sobą nawzajem, a jak sprawdziłem, część z nich jest po prostu zmyślona przez generatory tekstu.</p>
<p>Szereg czasowy stoi na trzech seriach. Deloitte prowadził <em>Piłkarską ligę finansową</em> od 2007 r. do sezonu 2021/2022. Równolegle EY wydawał z Ekstraklasą SA <em>Ekstraklasę piłkarskiego biznesu</em> - liczoną inną metodą, przez co jej liczby nigdy nie zgadzały się z Deloitte i to jest główne źródło zamieszania. Od sezonu 2022/2023 pałeczkę przejął Grant Thornton, który w swoim raporcie wprost kontynuuje szereg Deloitte. Dzięki temu dane spinają się co do złotówki i można je czytać jako jedną historię.</p>
<p>Są w niej dwie dziury, o których trzeba wiedzieć. Pierwsza: od sezonu 2020/2021 raporty przestały liczyć rok kalendarzowy, a zaczęły sezon piłkarski (od 1 lipca do 30 czerwca). Druga: <strong>sezon 2019/2020 wypadł zupełnie</strong> - w danych jest skok z roku 2019 wprost na sezon 2020/2021. To akurat rok pandemii, więc szkoda podwójna.</p>
<p>I pułapka, przez którą wpadają prawie wszyscy, łącznie ze mną w poprzednim tekście. Raporty podają dwie różne wielkości: <strong>przychody z podstawowej działalności</strong> (sponsorzy, prawa mediowe, bilety) oraz <strong>przychody ogółem</strong>, czyli to samo plus sprzedaż zawodników. Przychody transferowe doliczane są jednak <em>dopiero od 2017 roku</em>, bo wcześniej nie było porównywalnych danych. Kto zestawi 380 mln zł z 2013 r. z 1 270 mln zł z sezonu 2024/2025, porównuje dwie różne rzeczy i dostaje wzrost 3,3-krotny zamiast rzeczywistego. Dlatego w całym tym tekście trzymam się <strong>przychodów z podstawowej działalności</strong> - jedynej wielkości liczonej tak samo przez wszystkie osiemnaście lat. Wynosiły one 203 mln zł w 2007 r. i 1 051 mln zł w sezonie 2024/2025.</p>
</div>
<div class="part">
<p class="part-tag">Część II - Ile naprawdę przybyło</p>
<h2>Pięć razy więcej pieniędzy albo półtora raza. Zależy, czym mierzyć</h2>
<p>Ten sam wzrost, trzy miary. Wszystkie zaczynają się w 2007 r. od stu.</p>
<div class="fig">
<div class="plotno"><svg viewBox="0 0 720 340" role="img" aria-label="Wykres liniowy: przychody Ekstraklasy w trzech ujeciach, indeks 2007 rowny 100. Nominalnie rosna do 518, realnie do 281, a w przecietnych wynagrodzeniach tylko do 158.">
<line x1="44" y1="245" x2="706" y2="245" stroke="#DCE2E8" stroke-width="1"/>
<text x="36" y="249" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">100</text>
<line x1="44" y1="197" x2="706" y2="197" stroke="#EAEEF2" stroke-width="1"/>
<text x="36" y="201" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">200</text>
<line x1="44" y1="148" x2="706" y2="148" stroke="#EAEEF2" stroke-width="1"/>
<text x="36" y="152" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">300</text>
<line x1="44" y1="99" x2="706" y2="99" stroke="#EAEEF2" stroke-width="1"/>
<text x="36" y="103" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">400</text>
<line x1="44" y1="50" x2="706" y2="50" stroke="#EAEEF2" stroke-width="1"/>
<text x="36" y="54" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">500</text>
<text x="44" y="314" text-anchor="start" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">07</text>
<text x="161" y="314" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">10</text>
<text x="278" y="314" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">13</text>
<text x="394" y="314" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">16</text>
<text x="511" y="314" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">19</text>
<text x="628" y="314" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">22/23</text>
<text x="706" y="314" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">24/25</text>
<polyline points="44.0,245.3 82.9,239.5 121.9,231.1 160.8,221.3 199.8,206.4 238.7,209.3 277.6,202.8 316.6,192.2 355.5,175.4 394.5,155.0 433.4,161.7 472.4,167.3 511.3,156.5 550.2,143.5 589.2,122.1 628.1,104.1 667.1,63.1 706.0,41.7" fill="none" stroke="#C0303A" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
<circle cx="706.0" cy="41.7" r="3.6" fill="#C0303A"/>
<text x="699" y="32" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="13.5" font-weight="600" fill="#C0303A">518</text>
<polyline points="44.0,245.3 82.9,241.7 121.9,236.0 160.8,228.6 199.8,218.2 238.7,223.3 277.6,218.5 316.6,209.8 355.5,195.2 394.5,178.0 433.4,185.4 472.4,191.1 511.3,184.7 550.2,184.3 589.2,183.4 628.1,183.8 667.1,164.7 706.0,157.3" fill="none" stroke="#1F5C99" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
<circle cx="706.0" cy="157.3" r="3.6" fill="#1F5C99"/>
<text x="699" y="147" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="13.5" font-weight="600" fill="#1F5C99">281</text>
<polyline points="44.0,245.3 82.9,244.6 121.9,239.6 160.8,233.3 199.8,224.7 238.7,229.1 277.6,226.6 316.6,221.1 355.5,212.1 394.5,201.2 433.4,210.3 472.4,218.9 511.3,217.9 550.2,222.1 589.2,220.5 628.1,222.3 667.1,217.3 706.0,216.9" fill="none" stroke="#9AA7B2" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
<circle cx="706.0" cy="216.9" r="3.6" fill="#9AA7B2"/>
<text x="699" y="207" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="13.5" font-weight="600" fill="#9AA7B2">158</text>
</svg></div><p class="legend"><span><i class="dot" style="background:#C0303A"></i>nominalnie w złotówkach</span><span><i class="dot" style="background:#1F5C99"></i>realnie, po inflacji</span><span><i class="dot" style="background:#9AA7B2"></i>w przeciętnych wynagrodzeniach</span></p>
<p class="figcap">Przychody z podstawowej działalności klubów Ekstraklasy, indeks 2007 = 100. Źródła: Deloitte i Grant Thornton (przychody), GUS (wynagrodzenia), Eurostat (indeks cen). Przerwa w danych za sezon 2019/2020.</p>
</div>
<p>Czerwona linia to nagłówek, który znacie: przychody wzrosły <strong>5,2-krotnie</strong>. Niebieska pokazuje, ile z tego zostaje po odliczeniu inflacji - <strong>2,8 raza</strong>, czyli prawie połowa wzrostu okazuje się złudzeniem cenowym. Ale najciekawsza jest szara.</p>
<h3>Skąd szara linia, czyli po co mierzyć ligę pensjami</h3>
<p>Złotówka jest kiepską miarą czegokolwiek w perspektywie osiemnastu lat, bo sama zmienia wartość. Dlatego obok inflacji warto użyć jednostki, która sama się urealnia: <strong>rocznego wynagrodzenia przeciętnego Polaka</strong>. Rachunek jest prosty - bierzemy roczne przychody wszystkich osiemnastu klubów i dzielimy przez przeciętną roczną pensję brutto w danym roku. Wychodzi liczba, która mówi: ilu przeciętnie zarabiającym Polakom liga mogłaby zapłacić roczną pensję za to, co w tym roku zarobiła.</p>
<p>Trzeba od razu powiedzieć, czego ta liczba <em>nie</em> obejmuje, bo łatwo ją nadinterpretować. To nie jest wartość ligi ani jej majątek, tylko <strong>roczny przychód klubów</strong>. Nie ma w niej stadionów - te w 83 procentach nie należą do klubów, tylko do samorządów. Nie ma wydatków kibiców na dojazdy, piwo czy koszulki, nie ma podatków, które generuje wokół siebie mecz, ani miejsc pracy w otoczeniu. Cały ten szerszy ślad gospodarczy PwC wyliczyło osobno na jakieś 1,7 mld zł wartości dodanej rocznie. Tu chodzi wyłącznie o to, co wpływa na konta klubów: bilety, prawa mediowe i pieniądze od sponsorów.</p>
<p>I ta linia w zasadzie stoi w miejscu od dekady. W 2007 r. przychody Ekstraklasy odpowiadały około 5 900 przeciętnych rocznych pensji brutto. W 2015 r. - już 9 900. W sezonie 2024/2025, w rekordowym roku - <strong>9 338</strong>. Mniej niż dziesięć lat wcześniej. Liga zarabia dziś więcej złotówek, ale za te złotówki może opłacić mniej ludzkiej pracy.</p>
<p class="pull">Rekordowe przychody polskiej piłki kupują dziś mniej ludzkiej pracy niż w 2015 roku. Liga nie tyle urosła, ile nadążyła za pensjami - i to nie do końca.</p>
<p>Podobnie wygląda to od strony gospodarki. Przychody Ekstraklasy to w 2007 r. było 0,171 promila polskiego PKB, a dziś 0,269 promila. Wzrost realny, ale skromny - i wciąż poniżej szczytu, który liga osiągnęła w <strong>2016 roku</strong> (0,310 promila). Ten szczyt to nie przypadek: to rok, w którym Legia zagrała w fazie grupowej Ligi Mistrzów. Jedna kampania jednego klubu w europejskiej elicie dała polskiej piłce więcej niż następne osiem lat komercyjnego rozwoju.</p>
<p>Dla porządku zastrzeżenie: kluby nie zatrudniają za przeciętną krajową i kupują zawodników na rynku europejskim, nie polskim. To jednak argument na niekorzyść, nie na korzyść - koszty rosną im według stawek, które ustala Zachód, a przychody według tego, na co stać Polskę.</p>
</div>
<div class="part">
<p class="part-tag">Część III - Z czego liga żyje</p>
<h2>Od mecenasa do praw medialnych</h2>
<p>Jedna rzecz zmieniła się w tym czasie naprawdę głęboko: struktura pieniędzy. To zmiana z gatunku tych, które widać dopiero na osiemnastoletniej osi.</p>
<div class="fig">
<div class="plotno"><svg viewBox="0 0 720 300" role="img" aria-label="Wykres slupkowy: struktura przychodow Ekstraklasy w procentach. Udzial praw mediowych rosnie z 24 procent w 2007 do 41 procent w sezonie 2024/2025, udzial przychodow komercyjnych spada z 60 do 39 procent.">
<rect x="39.2" y="20.0" width="26.9" height="140.7" fill="#C0303A"/>
<rect x="39.2" y="160.7" width="26.9" height="55.8" fill="#C98A1E"/>
<rect x="39.2" y="216.5" width="26.9" height="39.5" fill="#1F5C99"/>
<text x="53" y="276" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">07</text>
<text x="53" y="193" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="11.5" font-weight="600" fill="#15202B">24%</text>
<rect x="76.6" y="20.0" width="26.9" height="106.0" fill="#C0303A"/>
<rect x="76.6" y="126.0" width="26.9" height="83.2" fill="#C98A1E"/>
<rect x="76.6" y="209.2" width="26.9" height="46.8" fill="#1F5C99"/>
<rect x="113.9" y="20.0" width="26.9" height="113.5" fill="#C0303A"/>
<rect x="113.9" y="133.5" width="26.9" height="94.6" fill="#C98A1E"/>
<rect x="113.9" y="228.1" width="26.9" height="27.9" fill="#1F5C99"/>
<rect x="151.2" y="20.0" width="26.9" height="106.7" fill="#C0303A"/>
<rect x="151.2" y="126.7" width="26.9" height="82.6" fill="#C98A1E"/>
<rect x="151.2" y="209.3" width="26.9" height="46.7" fill="#1F5C99"/>
<text x="165" y="276" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">10</text>
<rect x="188.6" y="20.0" width="26.9" height="108.6" fill="#C0303A"/>
<rect x="188.6" y="128.6" width="26.9" height="82.1" fill="#C98A1E"/>
<rect x="188.6" y="210.7" width="26.9" height="45.3" fill="#1F5C99"/>
<rect x="225.9" y="20.0" width="26.9" height="124.4" fill="#C0303A"/>
<rect x="225.9" y="144.4" width="26.9" height="66.9" fill="#C98A1E"/>
<rect x="225.9" y="211.2" width="26.9" height="44.8" fill="#1F5C99"/>
<rect x="263.2" y="20.0" width="26.9" height="117.4" fill="#C0303A"/>
<rect x="263.2" y="137.4" width="26.9" height="74.5" fill="#C98A1E"/>
<rect x="263.2" y="211.9" width="26.9" height="44.1" fill="#1F5C99"/>
<text x="277" y="276" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">13</text>
<rect x="300.6" y="20.0" width="26.9" height="123.6" fill="#C0303A"/>
<rect x="300.6" y="143.6" width="26.9" height="72.9" fill="#C98A1E"/>
<rect x="300.6" y="216.5" width="26.9" height="39.5" fill="#1F5C99"/>
<rect x="337.9" y="20.0" width="26.9" height="117.0" fill="#C0303A"/>
<rect x="337.9" y="137.0" width="26.9" height="77.4" fill="#C98A1E"/>
<rect x="337.9" y="214.4" width="26.9" height="41.6" fill="#1F5C99"/>
<rect x="375.2" y="20.0" width="26.9" height="98.2" fill="#C0303A"/>
<rect x="375.2" y="118.2" width="26.9" height="103.5" fill="#C98A1E"/>
<rect x="375.2" y="221.8" width="26.9" height="34.2" fill="#1F5C99"/>
<text x="389" y="276" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">16</text>
<rect x="412.6" y="20.0" width="26.9" height="115.6" fill="#C0303A"/>
<rect x="412.6" y="135.6" width="26.9" height="79.2" fill="#C98A1E"/>
<rect x="412.6" y="214.9" width="26.9" height="41.1" fill="#1F5C99"/>
<rect x="449.9" y="20.0" width="26.9" height="124.3" fill="#C0303A"/>
<rect x="449.9" y="144.3" width="26.9" height="74.6" fill="#C98A1E"/>
<rect x="449.9" y="218.9" width="26.9" height="37.1" fill="#1F5C99"/>
<rect x="487.2" y="20.0" width="26.9" height="117.0" fill="#C0303A"/>
<rect x="487.2" y="137.0" width="26.9" height="82.8" fill="#C98A1E"/>
<rect x="487.2" y="219.8" width="26.9" height="36.2" fill="#1F5C99"/>
<text x="501" y="276" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">19</text>
<rect x="524.6" y="20.0" width="26.9" height="113.3" fill="#C0303A"/>
<rect x="524.6" y="133.3" width="26.9" height="113.7" fill="#C98A1E"/>
<rect x="524.6" y="247.0" width="26.9" height="9.0" fill="#1F5C99"/>
<rect x="561.9" y="20.0" width="26.9" height="95.9" fill="#C0303A"/>
<rect x="561.9" y="115.9" width="26.9" height="106.1" fill="#C98A1E"/>
<rect x="561.9" y="222.1" width="26.9" height="33.9" fill="#1F5C99"/>
<rect x="599.2" y="20.0" width="26.9" height="102.6" fill="#C0303A"/>
<rect x="599.2" y="122.6" width="26.9" height="92.5" fill="#C98A1E"/>
<rect x="599.2" y="215.1" width="26.9" height="40.9" fill="#1F5C99"/>
<text x="613" y="276" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">22/23</text>
<rect x="636.6" y="20.0" width="26.9" height="90.8" fill="#C0303A"/>
<rect x="636.6" y="110.8" width="26.9" height="100.1" fill="#C98A1E"/>
<rect x="636.6" y="210.9" width="26.9" height="45.1" fill="#1F5C99"/>
<rect x="673.9" y="20.0" width="26.9" height="91.6" fill="#C0303A"/>
<rect x="673.9" y="111.6" width="26.9" height="96.1" fill="#C98A1E"/>
<rect x="673.9" y="207.7" width="26.9" height="48.3" fill="#1F5C99"/>
<text x="687" y="276" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">24/25</text>
<text x="687" y="164" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="11.5" font-weight="600" fill="#15202B">41%</text>
<line x1="34" y1="256" x2="706" y2="256" stroke="#DCE2E8" stroke-width="1"/>
</svg></div><p class="legend"><span><i class="dot" style="background:#C0303A"></i>komercyjne (sponsorzy, dotacje, gadżety)</span><span><i class="dot" style="background:#C98A1E"></i>prawa mediowe i marketingowe (w tym UEFA)</span><span><i class="dot" style="background:#1F5C99"></i>dzień meczowy (bilety, loże, catering)</span></p>
<p class="figcap">Struktura przychodów z podstawowej działalności klubów Ekstraklasy, udziały procentowe. Źródła: Deloitte (do sezonu 2021/2022) i Grant Thornton. Kategoria praw mediowych obejmuje też wpływy od UEFA.</p>
</div>
<p>W 2007 r. sześćdziesiąt procent przychodów ligi pochodziło z kategorii „komercyjne" - czyli w praktyce od sponsorów, właścicieli i spółek skarbu państwa. Prawa mediowe dawały ledwie 24 procent. Dziś proporcje się odwróciły: prawa mediowe i marketingowe to <strong>41 procent</strong> i największe źródło pieniędzy w lidze, a komercyjne spadły do 39. To dobra zmiana - pieniądze z praw mediowych są przewidywalne, wspólne i nie zależą od humoru jednego biznesmena.</p>
<p>Dwa miejsca na tym wykresie warto obejrzeć osobno. Żółty pasek w 2016 r. puchnie do połowy słupka - to znowu Legia w Lidze Mistrzów, dzięki której wpływy z praw mediowych i UEFA skoczyły ze 162 do 254 mln zł w jeden rok. A niebieski pasek na dole niemal znika w sezonie 2020/2021: przychody z dnia meczowego spadły wtedy do <strong>24 mln zł</strong> dla całej ligi, bo trybuny stały puste.</p>
<p>Jest w tym obrazie coś, co powinno niepokoić bardziej niż cokolwiek innego. Polska zbudowała po Euro 2012 kilkanaście stadionów światowej klasy. Udział dnia meczowego w przychodach ligi wzrósł przez osiemnaście lat z 17 do 20 procent.</p>
</div>
<div class="part">
<p class="part-tag">Część IV - Kto to finansuje</p>
<h2>Nakłady publiczne, straty prywatne</h2>
<p>Skąd te pieniądze przychodzą, mówi o polskiej piłce więcej niż to, ile ich jest. Na osi finansowania klubów Polska mieści się między trzema modelami i nie należy do żadnego.</p>
<div class="models">
<div class="model"><p class="lab">USA</p><h4>Franczyza i kapitał</h4><p>Zamknięte ligi: płacisz wpisowe, zakładasz drużynę, właściciele budują stadiony - całość spina się jako biznes.</p></div>
<div class="model"><p class="lab">Zachodnia Europa</p><h4>Głęboki ekosystem</h4><p>Otwarta piramida, ale ogromne pieniądze z praw TV, bogaci właściciele i samopodtrzymująca się gospodarka futbolu.</p></div>
<div class="model"><p class="lab">Ukraina</p><h4>Oligarcha</h4><p>Jeden-dwóch oligarchów wlewa fortunę (Szachtar). Zastrzyk kapitału tam, gdzie brak systemu i zaufania.</p></div>
</div>
<div class="midnote"><strong>Polska - między wszystkimi.</strong> Bogatych właścicieli w Ekstraklasie ostatnio realnie przybyło: Robert Płatek (Cracovia), Zbigniew Jakubas (Motor Lublin), Robert Dobrzycki z Panattoni (Widzew, od razu z dużym kapitałem), rodzina Rutkowskich (Lech, pieniądze Amiki), Alex Haditaghi (Pogoń), Michał Świerczewski z x-komu (Raków), Dariusz Mioduski (Legia). Kilku z nich to miliarderzy. Historia zna też tych, którzy się „pobawili" i odeszli - Cupiał w Wiśle, Wojciechowski w Polonii.</div>
<p>Ten wzorzec - prywatny mecenas finansuje zryw, który gaśnie, gdy kończą się pieniądze - jest w polskiej piłce stary. Już jesienią 1992 r. w Legię wszedł pierwszy prywatny sponsor, biznesmen Janusz Romanowski, z umową z FSO i Adidasem; gdy zabrakło środków, drużyna się rozsypała, a zawodnicy rozeszli się do innych klubów.</p>
<p>Najpełniej powtórzyła to Wisła Kraków Bogusława Cupiała (od 1997 r.). Jej złoty zespół - oparty głównie na Polakach, co dziś rzadkie, gdy Raków, Lech czy Jagiellonię niosą obcokrajowcy - niemal zdominował ligę i raz po raz ocierał się o Europę. W Pucharze UEFA na początku lat 2000. przeżyła wielkie noce: rozbiła Schalke 04 w Gelsenkirchen, odpadając dopiero z rywalami klasy Lazio. W eliminacjach Ligi Mistrzów los raz po raz stawiał jej na drodze gigantów: przegrywała dwukrotnie z Barceloną (raz urywając nawet jeden mecz drużynie Guardioli) i z Realem Madryt. Najbardziej bolało to, że nie przechodziła też rywali w zasięgu - w 2005 r. do fazy grupowej zabrakło pięciu minut w dwumeczu z Panathinaikosem. Ale gdy właścicielowi skończyła się cierpliwość i pieniądze, projekt wygasł.</p>
<p>Sedno leży jednak gdzie indziej i widać je dopiero w danych UEFA, która od 2023 r. publikuje porównywalne wskaźniki dla wszystkich 55 federacji. Polskie kluby wypadają w nich skrajnie nierówno.</p>
<div class="kpis">
<div class="kpi cap"><p class="n">3. miejsce</p><p class="l">w Europie pod względem liczby dużych inwestycji stadionowych w ostatniej dekadzie - 16 projektów</p></div>
<div class="kpi"><p class="n">83%</p><p class="l">stadionów klubów Ekstraklasy należy do miasta albo państwa, nie do klubu</p></div>
<div class="kpi"><p class="n">51. miejsce</p><p class="l">na 55 federacji pod względem kapitału własnego klubów. Jedenaście polskich klubów ma go ujemny</p></div>
</div>
<p>Trudno o czystszy dowód tezy, którą postawiłem w poprzednim tekście. W stawianiu obiektów jesteśmy w europejskiej czołówce. W kondycji finansowej podmiotów, które w nich grają - w ogonie kontynentu. Trzecie miejsce w Europie w budowaniu i pięćdziesiąte pierwsze w bilansach to jedna i ta sama informacja: <strong>infrastrukturę finansuje u nas ktoś inny niż klub</strong>. Samorząd stawia stadion, prywatny właściciel łata bieżące straty, a sam klub nie zostaje właścicielem niczego, co mógłby wykorzystać jako kapitał.</p>
<p class="pull">Stadion można postawić w trzy lata za publiczne pieniądze. Bilansu klubu nie da się postawić za nic.</p>
</div>
<div class="part">
<p class="part-tag">Część V - Dystans do rdzenia</p>
<h2>Dogoniliśmy Europę. Przepaść i tak się podwoiła</h2>
<p>Szedłem do tych danych z gotową tezą: że polska piłka biegła szybko, ale najbogatsze kluby Europy biegły szybciej, i stąd nasza nieobecność w Lidze Mistrzów. Liczby tę tezę przewracają.</p>
<p>Licząc w euro, przychody Ekstraklasy wzrosły od 2007 r. <strong>4,6-krotnie</strong>. W tym samym czasie dwadzieścia najbogatszych klubów świata z rankingu Deloitte Money League urosło 3,4-krotnie, a najbogatszy klub - 3,2-krotnie. (To mnożniki nominalne; po odliczeniu inflacji w strefie euro wychodzi odpowiednio 3,2, 2,3 i 2,2 raza, ale ponieważ wszystkie trzy dzieli się przez ten sam indeks cen, samo porównanie się nie zmienia.) Udział Ekstraklasy w przychodach tej dwudziestki wzrósł z 1,45 do 2,00 procent. Sprawdziłem to jeszcze na innej mierze, licząc od 2014 r., dla którego UEFA podaje przychody całego europejskiego futbolu: przez dekadę Europa urosła o 81 procent, a Polska o 121. <strong>Rośliśmy szybciej niż rdzeń, i to wyraźnie.</strong></p>
<p>A teraz to samo na wykresie.</p>
<div class="fig">
<div class="plotno"><svg viewBox="0 0 720 340" role="img" aria-label="Wykres slupkowy w cenach z 2025 roku: w 2007 cala Ekstraklasa miala 78 milionow euro przychodow, a najbogatszy klub Europy 533 milionow - roznica 455 milionow. W sezonie 2024/2025 Ekstraklasa ma 248 milionow, a najbogatszy klub 1161 milionow - roznica 913 milionow euro.">
<line x1="52" y1="286" x2="704" y2="286" stroke="#DCE2E8" stroke-width="1"/>
<text x="44" y="290" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">0</text>
<line x1="52" y1="205" x2="704" y2="205" stroke="#EAEEF2" stroke-width="1"/>
<text x="44" y="209" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">400</text>
<line x1="52" y1="125" x2="704" y2="125" stroke="#EAEEF2" stroke-width="1"/>
<text x="44" y="129" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">800</text>
<line x1="52" y1="44" x2="704" y2="44" stroke="#EAEEF2" stroke-width="1"/>
<text x="44" y="48" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">1200</text>
<rect x="145" y="270" width="74" height="16" rx="4" fill="#C0303A"/>
<text x="182" y="261" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="14" font-weight="600" fill="#C0303A">78</text>
<rect x="237" y="179" width="74" height="107" rx="4" fill="#15202B"/>
<text x="274" y="170" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="14" font-weight="600" fill="#15202B">533</text>
<line x1="324" y1="179" x2="324" y2="270" stroke="#8593A0" stroke-width="1.2" stroke-dasharray="3 3"/>
<text x="331" y="222" text-anchor="start" font-family="Bricolage Grotesque, sans-serif" font-size="11" font-weight="400" fill="#8593A0">różnica</text>
<text x="331" y="237" text-anchor="start" font-family="Bricolage Grotesque, sans-serif" font-size="13" font-weight="600" fill="#51616C">455 mln</text>
<text x="228" y="308" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="12" font-weight="600" fill="#51616C">2007 (w cenach z 2025)</text>
<rect x="471" y="236" width="74" height="50" rx="4" fill="#C0303A"/>
<text x="508" y="227" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="14" font-weight="600" fill="#C0303A">248</text>
<rect x="563" y="52" width="74" height="234" rx="4" fill="#15202B"/>
<text x="600" y="43" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="14" font-weight="600" fill="#15202B">1161</text>
<line x1="650" y1="52" x2="650" y2="236" stroke="#8593A0" stroke-width="1.2" stroke-dasharray="3 3"/>
<text x="657" y="142" text-anchor="start" font-family="Bricolage Grotesque, sans-serif" font-size="11" font-weight="400" fill="#8593A0">różnica</text>
<text x="657" y="157" text-anchor="start" font-family="Bricolage Grotesque, sans-serif" font-size="13" font-weight="600" fill="#51616C">913 mln</text>
<text x="554" y="308" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="12" font-weight="600" fill="#51616C">sezon 2024/25</text>
</svg></div><p class="legend"><span><i class="dot" style="background:#C0303A"></i>cała Ekstraklasa (18 klubów)</span><span><i class="dot" style="background:#15202B"></i>najbogatszy klub Europy</span></p>
<p class="figcap">Przychody z podstawowej działalności wszystkich klubów Ekstraklasy wobec przychodów najbogatszego klubu Europy (Real Madryt w obu momentach), w mln euro <strong>według cen z 2025 r.</strong> - kwoty z 2007 r. przeliczone indeksem cen strefy euro, inaczej zestawialibyśmy dwie różne jednostki. Świadomie tylko dwa momenty: dla lat pośrednich nie ma w pełni porównywalnych danych. Źródła: Deloitte, Grant Thornton, Deloitte Football Money League, Eurostat, kursy średnioroczne NBP.</p>
</div>
<p>Proporcja rzeczywiście się poprawiła: w 2007 r. najbogatszy klub Europy miał prawie siedmiokrotność przychodów całej naszej ligi, dziś ma niecałe pięć. Tylko że proporcja to nie jest to, czym się płaci za piłkarza.</p>
<p>Różnica w pieniądzach wynosiła w 2007 r. 312 mln euro, a dziś wynosi 913 mln. Zestawianie tych dwóch kwot wprost byłoby jednak tym samym błędem, który opisałem na początku: przez osiemnaście lat ceny w strefie euro wzrosły o 45 procent, więc euro z 2007 r. i euro z 2025 r. to nie ta sama jednostka. Po urealnieniu tamte 312 mln odpowiada dzisiejszym <strong>455 mln euro</strong>. Rzetelne porównanie brzmi więc tak: różnica dzieląca całą polską ligę od jednego klubu <strong>podwoiła się w realnych pieniądzach</strong>, z 455 do 913 mln euro. To mniej dramatycznie niż „potroiła się", ale wciąż jest to podwojenie w okresie, w którym rzekomo doganialiśmy.</p>
<h3>To w takim razie kiedy dogonimy?</h3>
<p>Skoro rośniemy szybciej, pytanie nasuwa się samo. Da się na nie odpowiedzieć, choć odpowiedź jest niewesoła. W latach 2007-2024/25 przychody Ekstraklasy rosły średnio o <strong>8,9 procent rocznie</strong> (w euro), a najbogatszego klubu Europy o <strong>6,6 procent</strong>. Gdyby oba tempa utrzymały się bez zmian, cała polska liga zrównałaby się z jednym Realem Madryt <strong>około roku 2099</strong>.</p>
<p>Gorsza jest jednak druga liczba. Nadwyżka tempa jest tak mała wobec różnicy poziomów, że <strong>różnica w euro rośnie jeszcze przez mniej więcej sześćdziesiąt lat</strong> - mniej więcej do 2085 - i dopiero potem zaczyna maleć. Za dekadę wyniesie nie 913 mln, lecz około 1,6 mld euro. Innymi słowy: nawet w scenariuszu, w którym wszystko idzie po naszej myśli, przez całe życie zawodowe dzisiejszego dwudziestolatka dystans będzie się <em>powiększał</em>.</p>
<p>To oczywiście nie jest prognoza. Nikt nie wie, co się stanie z prawami telewizyjnymi, czy powstanie jakaś wersja Superligi, czy UEFA nie zmieni zasad podziału pieniędzy. Ten rachunek pokazuje tylko, co naprawdę znaczy „rośniemy szybciej od rdzenia" przy takiej różnicy skali: znaczy tyle, że nadganiamy w tempie, którego pojedyncze pokolenie nie zdąży zauważyć.</p>
<p class="pull">Rośniemy szybciej od najbogatszych i mimo to oddalamy się od nich w pieniądzach. Przy dzisiejszym tempie przepaść przestanie się powiększać dopiero około 2085 roku.</p>
<h3>Za to sąsiadów wyprzedziliśmy naprawdę</h3>
<p>Jest jednak liga, którą Polska wyprzedziła w tym czasie zupełnie realnie: skandynawska. W raporcie Deloitte za sezon 2018/2019 polskie kluby miały 133 mln euro przychodów i były <em>poniżej</em> Danii, Norwegii i Szwecji. Pięć lat później dane UEFA wyglądają tak:</p>
<div class="rtable">
<div class="rrow head"><div>Liga</div><div style="text-align:right">mln €</div><div>Miejsce w Europie</div></div>
<div class="rrow"><div class="country">Portugalia</div><div class="pop">618</div><div class="ach">9. miejsce. Punkt odniesienia dla „małej ligi, która się liczy"</div></div>
<div class="rrow"><div class="country">Belgia</div><div class="pop">574</div><div class="ach">10. miejsce</div></div>
<div class="rrow"><div class="country">Szkocja</div><div class="pop">378</div><div class="ach">11. miejsce</div></div>
<div class="rrow"><div class="country">Austria</div><div class="pop">315</div><div class="ach">13. miejsce</div></div>
<div class="rrow poland"><div class="country">Polska</div><div class="pop">241</div><div class="ach"><strong>14. miejsce w Europie.</strong> W 2018/2019 byliśmy jeszcze za całą Skandynawią</div></div>
<div class="rrow"><div class="country">Szwecja</div><div class="pop">232</div><div class="ach">15. miejsce</div></div>
<div class="rrow"><div class="country">Dania</div><div class="pop">222</div><div class="ach">16. miejsce</div></div>
<div class="rrow"><div class="country">Norwegia</div><div class="pop">187</div><div class="ach">18. miejsce</div></div>
<div class="rrow"><div class="country">Czechy</div><div class="pop">162</div><div class="ach">20. miejsce</div></div>
</div>
<p>Polska jest dziś czternastą ligą Europy pod względem przychodów i pierwszą w swojej części kontynentu. Wyprzedziliśmy Skandynawię, Czechy, Chorwację, Rumunię i Serbię. Tyle że wciąż jesteśmy o rząd wielkości od Anglii (7 447 mln euro), Niemiec (3 902) i Hiszpanii (3 881) - a to one, a nie Dania, decydują o tym, kto gra w Lidze Mistrzów.</p>
</div>
<div class="part">
<p class="part-tag">Konkluzja</p>
<h2>Wszystkie wskaźniki mówią „dogoniliśmy". Jeden mówi „nie"</h2>
<p>Po przeliczeniu wszystkiego wychodzi obraz, którego się nie spodziewałem, i wcale nie jest prostszy od tego, z którym zaczynałem.</p>
<p>Względem rdzenia europejskiej piłki polska liga <em>naprawdę</em> się podciągnęła: rosła szybciej niż najbogatsze kluby świata, szybciej niż europejski futbol jako całość, i awansowała na czternaste miejsce w Europie, wyprzedzając kraje, które jeszcze dekadę temu były poza zasięgiem. Ta część mojej dawnej tezy była błędna i dobrze, że sprawdziłem.</p>
<p>Względem własnego kraju polska piłka niemal drgnęła: w przeciętnych wynagrodzeniach jest dziś mniejsza niż w 2015 r., a jej udział w PKB wciąż nie dogonił rekordu z 2016. Rekordowe miliardy w nagłówkach to w dużej mierze inflacja i to, że Polacy zaczęli więcej zarabiać.</p>
<p>A trzecia rzecz jest tą, która decyduje o wyniku sportowym. W piłce nie płaci się procentami PKB ani indeksami wzrostu. Płaci się euro. Transfer za dwadzieścia milionów euro kosztuje dwadzieścia milionów euro niezależnie od tego, o ile procent czyjaś liga urosła w ostatniej dekadzie. I właśnie w tej jednej walucie, jedynej, która się liczy przy stole negocjacyjnym, <strong>dystans się podwoił</strong> - i przy dzisiejszym tempie będzie rósł jeszcze przez pokolenie albo dwa. Można biec szybciej od kogoś, kto ma dziesięć razy dłuższe nogi, i mimo to oddalać się od niego z każdym krokiem.</p>
<p>To zresztą domyka wątek, który zostawiłem otwarty w <a href="/polska-sport-a-gospodarka/">poprzednim tekście o sporcie i gospodarce</a>. Pisałem tam, że stadion to hardware, a system to software. Dane UEFA pokazują to teraz w liczbach: trzecie miejsce w Europie w budowaniu obiektów, pięćdziesiąte pierwsze w bilansach klubów, które w nich grają. Zbudowaliśmy hardware. Wciąż go nie mamy czym uruchomić.</p>
</div>
<div class="summary">
<h4>W skrócie</h4>
<ul>
<li><strong>203 mln zł (2007) i 1 051 mln zł (2024/25).</strong> To przychody z podstawowej działalności, jedyna wielkość liczona tak samo przez osiemnaście lat. Popularne porównanie „380 mln zł do 1,27 mld zł" miesza dwie różne metodyki, bo transfery doliczane są dopiero od 2017.</li>
<li><strong>5,2× nominalnie, 2,8× realnie, 1,6× w pensjach.</strong> Ostatnia miara to roczne przychody klubów podzielone przez przeciętną roczną pensję brutto. Tak liczona liga jest dziś <em>mniejsza</em> niż w 2015 r.</li>
<li><strong>Szczyt był w 2016, nie dziś.</strong> Udział Ekstraklasy w PKB wciąż nie wrócił do poziomu z roku, w którym Legia grała w fazie grupowej Ligi Mistrzów.</li>
<li><strong>Struktura zmieniła się na lepsze.</strong> Prawa mediowe wzrosły z 24 do 41 procent przychodów, komercyjne spadły z 60 do 39. Mniej zależności od pojedynczego mecenasa.</li>
<li><strong>Dzień meczowy: z 17 na 20 procent.</strong> Kilkanaście stadionów światowej klasy po Euro 2012 przesunęło tę pozycję o trzy punkty procentowe.</li>
<li><strong>Rośliśmy szybciej niż rdzeń.</strong> Ekstraklasa 4,6× w euro wobec 3,4× dla dwudziestu najbogatszych klubów świata; +121 procent wobec +81 dla całej Europy w latach 2014-2024.</li>
<li><strong>I mimo to przepaść się podwoiła.</strong> Różnica między najbogatszym klubem Europy a całą Ekstraklasą: 455 mln euro w 2007 (w dzisiejszych cenach) wobec 913 mln euro obecnie. Nominalnie wygląda to na potrojenie, ale euro sprzed osiemnastu lat nie jest tym samym euro.</li>
<li><strong>Przy tym tempie zrównanie wypada około 2099 r.</strong> A różnica w euro rośnie jeszcze przez jakieś sześćdziesiąt lat, zanim w ogóle zacznie maleć. To nie prognoza, tylko ilustracja tego, co znaczy „rosnąć szybciej" przy takiej różnicy skali.</li>
<li><strong>14. liga Europy, 51. bilans.</strong> Trzecie miejsce na kontynencie w inwestycjach stadionowych, 83 procent stadionów w rękach samorządów, jedenaście klubów z ujemnym kapitałem własnym.</li>
</ul>
</div>
<div class="zrodla">
<h2>Źródła i metoda</h2>
<p class="src"><strong>Przychody klubów.</strong> Deloitte, <em>Piłkarska Liga Finansowa</em> - edycje za rok 2016 (lipiec 2017), rok 2019 (październik 2020) i sezon 2021/2022 (wrzesień 2022). Grant Thornton, <em>Finansowa Ekstraklasa</em> - sezony 2022/2023, 2023/2024 i 2024/2025. Grant Thornton kontynuuje szereg Deloitte, dzięki czemu dane są porównywalne. Pomocniczo: EY i Ekstraklasa SA, <em>Ekstraklasa piłkarskiego biznesu</em> (2012, 2016, 2017) - inna metodyka, dlatego nie wchodzi do szeregu; Grant Thornton, <em>Finansowa pierwsza liga</em> (2022/23, 2023/24, 2024/25); PwC, <em>Ekstraklasa - kibice, kluby i miasto</em> (2025).</p>
<p class="src"><strong>Kontekst europejski.</strong> UEFA, <em>The European Club Finance and Investment Landscape 2025</em> - dane za rok obrotowy 2023/2024 dla wszystkich 55 federacji. Deloitte, <em>Football Money League</em> - edycje 2008 i 2026. Deloitte, <em>Piłkarska liga finansowa - rok 2019</em> (porównanie lig spoza wielkiej piątki za sezon 2018/2019).</p>
<p class="src"><strong>Dane makroekonomiczne.</strong> Przeciętne miesięczne wynagrodzenie brutto - GUS, Bank Danych Lokalnych. PKB w cenach bieżących oraz roczne indeksy cen konsumpcyjnych dla Polski i dla strefy euro - Eurostat. Kursy średnioroczne EUR/PLN - policzone ze wszystkich notowań tabeli A Narodowego Banku Polskiego z danego roku.</p>
<p class="src"><strong>Jak liczyłem.</strong> Wszystkie porównania w czasie oparte są na przychodach z podstawowej działalności (dzień meczowy, prawa mediowe i marketingowe, przychody komercyjne), bez transferów - bo tylko ta wielkość jest liczona tak samo od 2007 r. Sezony przypisano do roku, w którym się kończą, zgodnie z rokiem obrotowym klubów. Kwoty złotowe urealniam polskim indeksem cen, a kwoty w euro - indeksem strefy euro; w obu przypadkach do cen z 2025 r. Wskaźnik „w przeciętnych wynagrodzeniach" to roczne przychody klubów podzielone przez przeciętne roczne wynagrodzenie brutto w danym roku. Rachunek dogonienia zakłada, że obie strony rosną dalej w tempie zmierzonym w latach 2007-2024/25 (średnia geometryczna) - to nie jest prognoza, tylko ekstrapolacja obecnego tempa.</p>
<p class="meta">Tekst jest rozwinięciem wątku klubowego z eseju <a href="/polska-sport-a-gospodarka/">Gospodarczy prymus, sportowy maruder</a>. Stan danych: sierpień 2026.</p>
</div>
</div>
