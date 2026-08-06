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
.esej .fig{position:relative}
.esej .plotno{overflow-x:auto;-webkit-overflow-scrolling:touch}
.esej .plotno[data-punkty]{cursor:crosshair}
.esej .wyk-slupek{transition:opacity .12s}

/* Dymek z wartosciami - siedzi w .fig, wiec nie tnie go przewijanie .plotno */
.esej .wyk-dymek{
  position:absolute;top:8px;left:0;z-index:3;pointer-events:none;
  opacity:0;transition:opacity .12s;
  background:var(--card);border:1px solid var(--line);border-radius:10px;
  box-shadow:0 6px 20px rgba(21,32,43,.11);
  padding:10px 12px;font-size:12.5px;line-height:1.45;color:var(--ink-2);
  min-width:172px;max-width:min(300px,88%);
}
.esej .wyk-dymek.widoczny{opacity:1}
/* wariant waski: same udzialy, bez nazw - nazwy sa w legendzie pod wykresem */
.esej .wyk-dymek.waski{min-width:0;padding:8px 12px;text-align:center}
.esej .wyk-dymek.waski span{gap:8px}
.esej .wyk-dymek.waski em{margin-left:0}
.esej .wyk-dymek b{display:block;font-family:var(--disp);font-size:13px;color:var(--ink);margin-bottom:6px}
.esej .wyk-dymek span{display:flex;align-items:baseline;gap:6px;margin-top:3px}
.esej .wyk-dymek i{width:9px;height:9px;border-radius:2px;flex:0 0 auto;position:relative;top:1px}
.esej .wyk-dymek em{margin-left:auto;font-style:normal;font-weight:600;color:var(--ink);white-space:nowrap}
@media (hover:none){.esej .wyk-dymek{font-size:12px}}
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
<p>Wziąłem szesnaście raportów - Deloitte, EY, Grant Thornton, PwC i UEFA - odtworzyłem z nich ciągłą serię od 2007 r. i przeliczyłem ją na cztery sposoby: <strong>realnie</strong> (po inflacji), <strong>w udziale w PKB</strong>, <strong>w przeciętnych wynagrodzeniach</strong> i <strong>w euro</strong>, żeby dało się porównać z Europą. Cztery miary, cztery różne odpowiedzi. Nota o źródłach i o tym, jak liczyłem, jest na końcu - kto lubi zaczynać od metody, może tam zajrzeć od razu.
</div>
<div class="part">
<p class="part-tag">Część I - Ile naprawdę przybyło</p>
<h2>Pięć razy więcej pieniędzy albo półtora raza. Zależy, czym mierzyć</h2>
<p>Jedna rzecz na wstępie, bo bez niej wszystkie liczby niżej byłyby o czym innym. Raporty podają dwie różne wielkości: <strong>przychody z podstawowej działalności</strong> (sponsorzy, prawa medialne, bilety) oraz <strong>przychody ogółem</strong>, czyli to samo plus sprzedaż zawodników. Transfery doliczane są jednak dopiero od 2017 r., więc słynne porównanie „380 mln zł w 2013 do 1,27 mld dziś" zestawia dwie różne rzeczy. Trzymam się tej pierwszej wielkości, jedynej liczonej tak samo przez osiemnaście lat: <strong>203 mln zł w 2007 r. i 1 051 mln zł w sezonie 2024/2025</strong>.</p>
<p>Ten sam wzrost, trzy miary. Wszystkie zaczynają się w 2007 r. od stu.</p>
<div class="fig">
<div class="plotno" data-punkty="{&quot;punkty&quot;: [{&quot;xs&quot;: 44.0, &quot;etykieta&quot;: &quot;2007&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;nominalnie w złotówkach&quot;, &quot;tekst&quot;: &quot;100  (203 mln zł)&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;realnie, po inflacji&quot;, &quot;tekst&quot;: &quot;100  (375 mln zł z 2025)&quot;}, {&quot;kolor&quot;: &quot;#9AA7B2&quot;, &quot;nazwa&quot;: &quot;w przeciętnych wynagrodzeniach&quot;, &quot;tekst&quot;: &quot;100  (5 902 rocznych pensji)&quot;}]}, {&quot;xs&quot;: 82.9, &quot;etykieta&quot;: &quot;2008&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;nominalnie w złotówkach&quot;, &quot;tekst&quot;: &quot;112  (227 mln zł)&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;realnie, po inflacji&quot;, &quot;tekst&quot;: &quot;107  (402 mln zł z 2025)&quot;}, {&quot;kolor&quot;: &quot;#9AA7B2&quot;, &quot;nazwa&quot;: &quot;w przeciętnych wynagrodzeniach&quot;, &quot;tekst&quot;: &quot;101  (5 989 rocznych pensji)&quot;}]}, {&quot;xs&quot;: 121.9, &quot;etykieta&quot;: &quot;2009&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;nominalnie w złotówkach&quot;, &quot;tekst&quot;: &quot;129  (262 mln zł)&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;realnie, po inflacji&quot;, &quot;tekst&quot;: &quot;119  (446 mln zł z 2025)&quot;}, {&quot;kolor&quot;: &quot;#9AA7B2&quot;, &quot;nazwa&quot;: &quot;w przeciętnych wynagrodzeniach&quot;, &quot;tekst&quot;: &quot;112  (6 585 rocznych pensji)&quot;}]}, {&quot;xs&quot;: 160.8, &quot;etykieta&quot;: &quot;2010&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;nominalnie w złotówkach&quot;, &quot;tekst&quot;: &quot;149  (303 mln zł)&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;realnie, po inflacji&quot;, &quot;tekst&quot;: &quot;134  (502 mln zł z 2025)&quot;}, {&quot;kolor&quot;: &quot;#9AA7B2&quot;, &quot;nazwa&quot;: &quot;w przeciętnych wynagrodzeniach&quot;, &quot;tekst&quot;: &quot;125  (7 351 rocznych pensji)&quot;}]}, {&quot;xs&quot;: 199.8, &quot;etykieta&quot;: &quot;2011&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;nominalnie w złotówkach&quot;, &quot;tekst&quot;: &quot;180  (365 mln zł)&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;realnie, po inflacji&quot;, &quot;tekst&quot;: &quot;156  (583 mln zł z 2025)&quot;}, {&quot;kolor&quot;: &quot;#9AA7B2&quot;, &quot;nazwa&quot;: &quot;w przeciętnych wynagrodzeniach&quot;, &quot;tekst&quot;: &quot;142  (8 390 rocznych pensji)&quot;}]}, {&quot;xs&quot;: 238.7, &quot;etykieta&quot;: &quot;2012&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;nominalnie w złotówkach&quot;, &quot;tekst&quot;: &quot;174  (353 mln zł)&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;realnie, po inflacji&quot;, &quot;tekst&quot;: &quot;145  (544 mln zł z 2025)&quot;}, {&quot;kolor&quot;: &quot;#9AA7B2&quot;, &quot;nazwa&quot;: &quot;w przeciętnych wynagrodzeniach&quot;, &quot;tekst&quot;: &quot;133  (7 856 rocznych pensji)&quot;}]}, {&quot;xs&quot;: 277.6, &quot;etykieta&quot;: &quot;2013&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;nominalnie w złotówkach&quot;, &quot;tekst&quot;: &quot;187  (380 mln zł)&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;realnie, po inflacji&quot;, &quot;tekst&quot;: &quot;155  (581 mln zł z 2025)&quot;}, {&quot;kolor&quot;: &quot;#9AA7B2&quot;, &quot;nazwa&quot;: &quot;w przeciętnych wynagrodzeniach&quot;, &quot;tekst&quot;: &quot;138  (8 167 rocznych pensji)&quot;}]}, {&quot;xs&quot;: 316.6, &quot;etykieta&quot;: &quot;2014&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;nominalnie w złotówkach&quot;, &quot;tekst&quot;: &quot;209  (424 mln zł)&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;realnie, po inflacji&quot;, &quot;tekst&quot;: &quot;173  (647 mln zł z 2025)&quot;}, {&quot;kolor&quot;: &quot;#9AA7B2&quot;, &quot;nazwa&quot;: &quot;w przeciętnych wynagrodzeniach&quot;, &quot;tekst&quot;: &quot;150  (8 825 rocznych pensji)&quot;}]}, {&quot;xs&quot;: 355.5, &quot;etykieta&quot;: &quot;2015&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;nominalnie w złotówkach&quot;, &quot;tekst&quot;: &quot;243  (494 mln zł)&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;realnie, po inflacji&quot;, &quot;tekst&quot;: &quot;203  (759 mln zł z 2025)&quot;}, {&quot;kolor&quot;: &quot;#9AA7B2&quot;, &quot;nazwa&quot;: &quot;w przeciętnych wynagrodzeniach&quot;, &quot;tekst&quot;: &quot;168  (9 918 rocznych pensji)&quot;}]}, {&quot;xs&quot;: 394.5, &quot;etykieta&quot;: &quot;2016&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;nominalnie w złotówkach&quot;, &quot;tekst&quot;: &quot;285  (579 mln zł)&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;realnie, po inflacji&quot;, &quot;tekst&quot;: &quot;238  (892 mln zł z 2025)&quot;}, {&quot;kolor&quot;: &quot;#9AA7B2&quot;, &quot;nazwa&quot;: &quot;w przeciętnych wynagrodzeniach&quot;, &quot;tekst&quot;: &quot;191  (11 246 rocznych pensji)&quot;}]}, {&quot;xs&quot;: 433.4, &quot;etykieta&quot;: &quot;2017&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;nominalnie w złotówkach&quot;, &quot;tekst&quot;: &quot;271  (551 mln zł)&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;realnie, po inflacji&quot;, &quot;tekst&quot;: &quot;223  (835 mln zł z 2025)&quot;}, {&quot;kolor&quot;: &quot;#9AA7B2&quot;, &quot;nazwa&quot;: &quot;w przeciętnych wynagrodzeniach&quot;, &quot;tekst&quot;: &quot;172  (10 141 rocznych pensji)&quot;}]}, {&quot;xs&quot;: 472.4, &quot;etykieta&quot;: &quot;2018&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;nominalnie w złotówkach&quot;, &quot;tekst&quot;: &quot;260  (528 mln zł)&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;realnie, po inflacji&quot;, &quot;tekst&quot;: &quot;211  (791 mln zł z 2025)&quot;}, {&quot;kolor&quot;: &quot;#9AA7B2&quot;, &quot;nazwa&quot;: &quot;w przeciętnych wynagrodzeniach&quot;, &quot;tekst&quot;: &quot;154  (9 101 rocznych pensji)&quot;}]}, {&quot;xs&quot;: 511.3, &quot;etykieta&quot;: &quot;2019&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;nominalnie w złotówkach&quot;, &quot;tekst&quot;: &quot;282  (573 mln zł)&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;realnie, po inflacji&quot;, &quot;tekst&quot;: &quot;224  (840 mln zł z 2025)&quot;}, {&quot;kolor&quot;: &quot;#9AA7B2&quot;, &quot;nazwa&quot;: &quot;w przeciętnych wynagrodzeniach&quot;, &quot;tekst&quot;: &quot;156  (9 215 rocznych pensji)&quot;}]}, {&quot;xs&quot;: 550.2, &quot;etykieta&quot;: &quot;2020/21&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;nominalnie w złotówkach&quot;, &quot;tekst&quot;: &quot;309  (627 mln zł)&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;realnie, po inflacji&quot;, &quot;tekst&quot;: &quot;225  (843 mln zł z 2025)&quot;}, {&quot;kolor&quot;: &quot;#9AA7B2&quot;, &quot;nazwa&quot;: &quot;w przeciętnych wynagrodzeniach&quot;, &quot;tekst&quot;: &quot;148  (8 707 rocznych pensji)&quot;}]}, {&quot;xs&quot;: 589.2, &quot;etykieta&quot;: &quot;2021/22&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;nominalnie w złotówkach&quot;, &quot;tekst&quot;: &quot;353  (716 mln zł)&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;realnie, po inflacji&quot;, &quot;tekst&quot;: &quot;227  (850 mln zł z 2025)&quot;}, {&quot;kolor&quot;: &quot;#9AA7B2&quot;, &quot;nazwa&quot;: &quot;w przeciętnych wynagrodzeniach&quot;, &quot;tekst&quot;: &quot;151  (8 898 rocznych pensji)&quot;}]}, {&quot;xs&quot;: 628.1, &quot;etykieta&quot;: &quot;2022/23&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;nominalnie w złotówkach&quot;, &quot;tekst&quot;: &quot;390  (791 mln zł)&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;realnie, po inflacji&quot;, &quot;tekst&quot;: &quot;226  (847 mln zł z 2025)&quot;}, {&quot;kolor&quot;: &quot;#9AA7B2&quot;, &quot;nazwa&quot;: &quot;w przeciętnych wynagrodzeniach&quot;, &quot;tekst&quot;: &quot;147  (8 679 rocznych pensji)&quot;}]}, {&quot;xs&quot;: 667.1, &quot;etykieta&quot;: &quot;2023/24&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;nominalnie w złotówkach&quot;, &quot;tekst&quot;: &quot;474  (962 mln zł)&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;realnie, po inflacji&quot;, &quot;tekst&quot;: &quot;265  (994 mln zł z 2025)&quot;}, {&quot;kolor&quot;: &quot;#9AA7B2&quot;, &quot;nazwa&quot;: &quot;w przeciętnych wynagrodzeniach&quot;, &quot;tekst&quot;: &quot;157  (9 289 rocznych pensji)&quot;}]}, {&quot;xs&quot;: 706.0, &quot;etykieta&quot;: &quot;2024/25&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;nominalnie w złotówkach&quot;, &quot;tekst&quot;: &quot;518  (1 051 mln zł)&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;realnie, po inflacji&quot;, &quot;tekst&quot;: &quot;281  (1 051 mln zł z 2025)&quot;}, {&quot;kolor&quot;: &quot;#9AA7B2&quot;, &quot;nazwa&quot;: &quot;w przeciętnych wynagrodzeniach&quot;, &quot;tekst&quot;: &quot;158  (9 338 rocznych pensji)&quot;}]}], &quot;h&quot;: 340}"><svg viewBox="0 0 720 340" role="img" aria-label="Wykres liniowy: przychody Ekstraklasy w trzech ujeciach, indeks 2007 rowny 100. Nominalnie rosna do 518, realnie do 281, a w przecietnych wynagrodzeniach tylko do 158.">
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
<line class="wyk-prowadnica" x1="0" y1="20" x2="0" y2="294" stroke="#8593A0" stroke-width="1" stroke-dasharray="3 3" opacity="0"/>
<polyline points="44.0,245.3 82.9,239.5 121.9,231.1 160.8,221.3 199.8,206.4 238.7,209.3 277.6,202.8 316.6,192.2 355.5,175.4 394.5,155.0 433.4,161.7 472.4,167.3 511.3,156.5 550.2,143.5 589.2,122.1 628.1,104.1 667.1,63.1 706.0,41.7" fill="none" stroke="#C0303A" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
<circle cx="706.0" cy="41.7" r="3.6" fill="#C0303A"/>
<text x="699" y="32" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="13.5" font-weight="600" fill="#C0303A">518</text>
<polyline points="44.0,245.3 82.9,241.7 121.9,236.0 160.8,228.6 199.8,218.2 238.7,223.3 277.6,218.5 316.6,209.8 355.5,195.2 394.5,178.0 433.4,185.4 472.4,191.1 511.3,184.7 550.2,184.3 589.2,183.4 628.1,183.8 667.1,164.7 706.0,157.3" fill="none" stroke="#1F5C99" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
<circle cx="706.0" cy="157.3" r="3.6" fill="#1F5C99"/>
<text x="699" y="147" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="13.5" font-weight="600" fill="#1F5C99">281</text>
<polyline points="44.0,245.3 82.9,244.6 121.9,239.6 160.8,233.3 199.8,224.7 238.7,229.1 277.6,226.6 316.6,221.1 355.5,212.1 394.5,201.2 433.4,210.3 472.4,218.9 511.3,217.9 550.2,222.1 589.2,220.5 628.1,222.3 667.1,217.3 706.0,216.9" fill="none" stroke="#9AA7B2" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
<circle cx="706.0" cy="216.9" r="3.6" fill="#9AA7B2"/>
<text x="699" y="207" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="13.5" font-weight="600" fill="#9AA7B2">158</text>
<circle class="wyk-marker" data-i="0" cx="44.0" cy="245.3" r="4.2" fill="#C0303A" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="0" cx="44.0" cy="245.3" r="4.2" fill="#1F5C99" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="0" cx="44.0" cy="245.3" r="4.2" fill="#9AA7B2" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="1" cx="82.9" cy="239.5" r="4.2" fill="#C0303A" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="1" cx="82.9" cy="241.7" r="4.2" fill="#1F5C99" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="1" cx="82.9" cy="244.6" r="4.2" fill="#9AA7B2" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="2" cx="121.9" cy="231.1" r="4.2" fill="#C0303A" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="2" cx="121.9" cy="236.0" r="4.2" fill="#1F5C99" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="2" cx="121.9" cy="239.6" r="4.2" fill="#9AA7B2" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="3" cx="160.8" cy="221.3" r="4.2" fill="#C0303A" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="3" cx="160.8" cy="228.6" r="4.2" fill="#1F5C99" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="3" cx="160.8" cy="233.3" r="4.2" fill="#9AA7B2" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="4" cx="199.8" cy="206.4" r="4.2" fill="#C0303A" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="4" cx="199.8" cy="218.2" r="4.2" fill="#1F5C99" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="4" cx="199.8" cy="224.7" r="4.2" fill="#9AA7B2" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="5" cx="238.7" cy="209.3" r="4.2" fill="#C0303A" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="5" cx="238.7" cy="223.3" r="4.2" fill="#1F5C99" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="5" cx="238.7" cy="229.1" r="4.2" fill="#9AA7B2" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="6" cx="277.6" cy="202.8" r="4.2" fill="#C0303A" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="6" cx="277.6" cy="218.5" r="4.2" fill="#1F5C99" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="6" cx="277.6" cy="226.6" r="4.2" fill="#9AA7B2" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="7" cx="316.6" cy="192.2" r="4.2" fill="#C0303A" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="7" cx="316.6" cy="209.8" r="4.2" fill="#1F5C99" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="7" cx="316.6" cy="221.1" r="4.2" fill="#9AA7B2" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="8" cx="355.5" cy="175.4" r="4.2" fill="#C0303A" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="8" cx="355.5" cy="195.2" r="4.2" fill="#1F5C99" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="8" cx="355.5" cy="212.1" r="4.2" fill="#9AA7B2" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="9" cx="394.5" cy="155.0" r="4.2" fill="#C0303A" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="9" cx="394.5" cy="178.0" r="4.2" fill="#1F5C99" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="9" cx="394.5" cy="201.2" r="4.2" fill="#9AA7B2" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="10" cx="433.4" cy="161.7" r="4.2" fill="#C0303A" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="10" cx="433.4" cy="185.4" r="4.2" fill="#1F5C99" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="10" cx="433.4" cy="210.3" r="4.2" fill="#9AA7B2" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="11" cx="472.4" cy="167.3" r="4.2" fill="#C0303A" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="11" cx="472.4" cy="191.1" r="4.2" fill="#1F5C99" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="11" cx="472.4" cy="218.9" r="4.2" fill="#9AA7B2" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="12" cx="511.3" cy="156.5" r="4.2" fill="#C0303A" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="12" cx="511.3" cy="184.7" r="4.2" fill="#1F5C99" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="12" cx="511.3" cy="217.9" r="4.2" fill="#9AA7B2" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="13" cx="550.2" cy="143.5" r="4.2" fill="#C0303A" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="13" cx="550.2" cy="184.3" r="4.2" fill="#1F5C99" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="13" cx="550.2" cy="222.1" r="4.2" fill="#9AA7B2" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="14" cx="589.2" cy="122.1" r="4.2" fill="#C0303A" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="14" cx="589.2" cy="183.4" r="4.2" fill="#1F5C99" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="14" cx="589.2" cy="220.5" r="4.2" fill="#9AA7B2" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="15" cx="628.1" cy="104.1" r="4.2" fill="#C0303A" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="15" cx="628.1" cy="183.8" r="4.2" fill="#1F5C99" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="15" cx="628.1" cy="222.3" r="4.2" fill="#9AA7B2" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="16" cx="667.1" cy="63.1" r="4.2" fill="#C0303A" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="16" cx="667.1" cy="164.7" r="4.2" fill="#1F5C99" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="16" cx="667.1" cy="217.3" r="4.2" fill="#9AA7B2" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="17" cx="706.0" cy="41.7" r="4.2" fill="#C0303A" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="17" cx="706.0" cy="157.3" r="4.2" fill="#1F5C99" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
<circle class="wyk-marker" data-i="17" cx="706.0" cy="216.9" r="4.2" fill="#9AA7B2" stroke="#FFFFFF" stroke-width="1.4" opacity="0"/>
</svg></div>
<p class="legend"><span><i class="dot" style="background:#C0303A"></i>nominalnie w złotówkach</span><span><i class="dot" style="background:#1F5C99"></i>realnie, po inflacji</span><span><i class="dot" style="background:#9AA7B2"></i>w przeciętnych wynagrodzeniach</span></p>
<p class="figcap">Przychody z podstawowej działalności klubów Ekstraklasy, indeks 2007 = 100. Źródła: Deloitte i Grant Thornton (przychody), GUS (wynagrodzenia), Eurostat (indeks cen). Przerwa w danych za sezon 2019/2020.</p>
</div>
<p>Czerwona linia to nagłówek, który znacie: przychody wzrosły <strong>5,2-krotnie</strong>. Niebieska pokazuje, ile z tego zostaje po odliczeniu inflacji - <strong>2,8 raza</strong>, czyli prawie połowa wzrostu okazuje się złudzeniem cenowym. Ale najciekawsza jest szara.</p>
<h3>Skąd szara linia, czyli po co mierzyć ligę pensjami</h3>
<p>Złotówka jest kiepską miarą czegokolwiek w perspektywie osiemnastu lat, bo sama zmienia wartość. Dlatego obok inflacji warto użyć jednostki, która sama się urealnia: <strong>rocznego wynagrodzenia przeciętnego Polaka</strong>. Rachunek jest prosty - bierzemy roczne przychody wszystkich osiemnastu klubów i dzielimy przez przeciętną roczną pensję brutto w danym roku. Wychodzi liczba, która mówi: ilu przeciętnie zarabiającym Polakom liga mogłaby zapłacić roczną pensję za to, co w tym roku zarobiła.</p>
<p>Trzeba od razu powiedzieć, czego ta liczba <em>nie</em> obejmuje, bo łatwo ją nadinterpretować. To nie jest wartość ligi ani jej majątek, tylko <strong>roczny przychód klubów</strong>. Nie ma w niej stadionów - te w 83 procentach nie należą do klubów, tylko do samorządów. Nie ma wydatków kibiców na dojazdy, piwo czy koszulki, nie ma podatków, które generuje wokół siebie mecz, ani miejsc pracy w otoczeniu. Cały ten szerszy ślad gospodarczy PwC policzyło osobno na 1,7 mld zł wartości dodanej - to migawka z sezonu 2023/2024, dziś byłaby zapewne wyższa. Tu chodzi wyłącznie o to, co wpływa na konta klubów: bilety, prawa medialne i pieniądze od sponsorów.</p>
<p>I ta linia w zasadzie stoi w miejscu od dekady. W 2007 r. przychody Ekstraklasy odpowiadały około 5 900 przeciętnych rocznych pensji brutto. W 2015 r. - już 9 900. W sezonie 2024/2025, w rekordowym roku - <strong>9 338</strong>. Mniej niż dziesięć lat wcześniej. Liga zarabia dziś więcej złotówek, ale za te złotówki może opłacić mniej ludzkiej pracy.</p>
<p class="pull">Polska piłka nie stoi w miejscu - rośnie razem z krajem, a od Europy Zachodniej nawet szybciej. Tyle że rośnie dokładnie w tempie zamożności Polaków i ani trochę szybciej.</p>
<p>To jest chyba najważniejszy wniosek z całego rachunku i wart chwili zatrzymania. Kraj w tym czasie awansował: pensje wzrosły ponad trzykrotnie, poziom życia podniósł się w sposób, który widać w każdym mieście. Piłka za tym wzrostem <em>nadążyła</em> - i to jest osiągnięcie, o którym w 2007 r. nikt by nie marzył. Nie stała się jednak dla polskiej gospodarki <em>ważniejsza</em> niż była: waży w niej dziś mniej więcej tyle samo co dekadę temu. Rozwój jest realny, ale proporcjonalny - piłka płynie z prądem kraju, nie wyprzedza go.</p>
<p>I tu robi się ciekawie, bo sportowo nie widać tego prawie wcale. W fazie grupowej Ligi Mistrzów zagraliśmy od 1992 r. trzy razy, ostatnio dziesięć lat temu. Pieniędzy przybywa w tempie kraju, a wobec Europy Zachodniej nawet szybciej - a wyniku z tego nie ma. To jest właściwa zagadka tego tekstu i wracam do niej na końcu.</p>
<p>Podobnie wygląda to od strony gospodarki. Przychody Ekstraklasy to w 2007 r. było 0,171 promila polskiego PKB, a dziś 0,269 promila. Wzrost realny, ale skromny - i wciąż poniżej szczytu, który liga osiągnęła w <strong>2016 roku</strong> (0,310 promila). Ten szczyt to nie przypadek: to rok, w którym Legia zagrała w fazie grupowej Ligi Mistrzów. Jedna kampania jednego klubu w europejskiej elicie dała polskiej piłce więcej niż następne osiem lat komercyjnego rozwoju.</p>
<p>Jedno zastrzeżenie do tej miary, bo działa w obie strony. Rosnące ceny za polskich zawodników są dla klubów dobrą wiadomością, nie złą: sprzedaż wychowanka za kilkanaście milionów euro pozwala kupić kilku dobrych graczy i jeszcze zostawić coś na rozwój. Polska wyrobiła sobie na tym rynku markę, trochę jak Chorwacja, która sprzedaje drożej, niż wynikałoby z samej jakości. Ale to samo działa w drugą stronę, gdy trzeba kogoś kupić - i tu polski klub staje przy tym samym stole co reszta Europy, tyle że z portfelem liczonym w polskich przychodach.</p>
</div>
<div class="part">
<p class="part-tag">Część II - Z czego liga żyje</p>
<h2>Od mecenasa do praw medialnych</h2>
<p>Jedna rzecz zmieniła się w tym czasie naprawdę głęboko: struktura pieniędzy. To zmiana z gatunku tych, które widać dopiero na osiemnastoletniej osi.</p>
<div class="fig">
<div class="plotno" data-punkty="{&quot;punkty&quot;: [{&quot;xs&quot;: 52.7, &quot;x0&quot;: 39.2, &quot;x1&quot;: 66.1, &quot;etykieta&quot;: &quot;2007&quot;, &quot;waski&quot;: true, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;60%&quot;}, {&quot;kolor&quot;: &quot;#C98A1E&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;24%&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;17%&quot;}]}, {&quot;xs&quot;: 90.0, &quot;x0&quot;: 76.6, &quot;x1&quot;: 103.4, &quot;etykieta&quot;: &quot;2008&quot;, &quot;waski&quot;: true, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;45%&quot;}, {&quot;kolor&quot;: &quot;#C98A1E&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;35%&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;20%&quot;}]}, {&quot;xs&quot;: 127.3, &quot;x0&quot;: 113.9, &quot;x1&quot;: 140.8, &quot;etykieta&quot;: &quot;2009&quot;, &quot;waski&quot;: true, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;48%&quot;}, {&quot;kolor&quot;: &quot;#C98A1E&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;40%&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;12%&quot;}]}, {&quot;xs&quot;: 164.7, &quot;x0&quot;: 151.2, &quot;x1&quot;: 178.1, &quot;etykieta&quot;: &quot;2010&quot;, &quot;waski&quot;: true, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;45%&quot;}, {&quot;kolor&quot;: &quot;#C98A1E&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;35%&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;20%&quot;}]}, {&quot;xs&quot;: 202.0, &quot;x0&quot;: 188.6, &quot;x1&quot;: 215.4, &quot;etykieta&quot;: &quot;2011&quot;, &quot;waski&quot;: true, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;46%&quot;}, {&quot;kolor&quot;: &quot;#C98A1E&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;35%&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;19%&quot;}]}, {&quot;xs&quot;: 239.3, &quot;x0&quot;: 225.9, &quot;x1&quot;: 252.8, &quot;etykieta&quot;: &quot;2012&quot;, &quot;waski&quot;: true, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;53%&quot;}, {&quot;kolor&quot;: &quot;#C98A1E&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;28%&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;19%&quot;}]}, {&quot;xs&quot;: 276.7, &quot;x0&quot;: 263.2, &quot;x1&quot;: 290.1, &quot;etykieta&quot;: &quot;2013&quot;, &quot;waski&quot;: true, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;50%&quot;}, {&quot;kolor&quot;: &quot;#C98A1E&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;32%&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;19%&quot;}]}, {&quot;xs&quot;: 314.0, &quot;x0&quot;: 300.6, &quot;x1&quot;: 327.4, &quot;etykieta&quot;: &quot;2014&quot;, &quot;waski&quot;: true, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;52%&quot;}, {&quot;kolor&quot;: &quot;#C98A1E&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;31%&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;17%&quot;}]}, {&quot;xs&quot;: 351.3, &quot;x0&quot;: 337.9, &quot;x1&quot;: 364.8, &quot;etykieta&quot;: &quot;2015&quot;, &quot;waski&quot;: true, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;50%&quot;}, {&quot;kolor&quot;: &quot;#C98A1E&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;33%&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;18%&quot;}]}, {&quot;xs&quot;: 388.7, &quot;x0&quot;: 375.2, &quot;x1&quot;: 402.1, &quot;etykieta&quot;: &quot;2016&quot;, &quot;waski&quot;: true, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;42%&quot;}, {&quot;kolor&quot;: &quot;#C98A1E&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;44%&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;15%&quot;}]}, {&quot;xs&quot;: 426.0, &quot;x0&quot;: 412.6, &quot;x1&quot;: 439.4, &quot;etykieta&quot;: &quot;2017&quot;, &quot;waski&quot;: true, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;49%&quot;}, {&quot;kolor&quot;: &quot;#C98A1E&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;34%&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;17%&quot;}]}, {&quot;xs&quot;: 463.3, &quot;x0&quot;: 449.9, &quot;x1&quot;: 476.8, &quot;etykieta&quot;: &quot;2018&quot;, &quot;waski&quot;: true, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;53%&quot;}, {&quot;kolor&quot;: &quot;#C98A1E&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;32%&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;16%&quot;}]}, {&quot;xs&quot;: 500.7, &quot;x0&quot;: 487.2, &quot;x1&quot;: 514.1, &quot;etykieta&quot;: &quot;2019&quot;, &quot;waski&quot;: true, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;50%&quot;}, {&quot;kolor&quot;: &quot;#C98A1E&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;35%&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;15%&quot;}]}, {&quot;xs&quot;: 538.0, &quot;x0&quot;: 524.6, &quot;x1&quot;: 551.4, &quot;etykieta&quot;: &quot;2020/21&quot;, &quot;waski&quot;: true, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;48%&quot;}, {&quot;kolor&quot;: &quot;#C98A1E&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;48%&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;4%&quot;}]}, {&quot;xs&quot;: 575.3, &quot;x0&quot;: 561.9, &quot;x1&quot;: 588.8, &quot;etykieta&quot;: &quot;2021/22&quot;, &quot;waski&quot;: true, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;41%&quot;}, {&quot;kolor&quot;: &quot;#C98A1E&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;45%&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;14%&quot;}]}, {&quot;xs&quot;: 612.7, &quot;x0&quot;: 599.2, &quot;x1&quot;: 626.1, &quot;etykieta&quot;: &quot;2022/23&quot;, &quot;waski&quot;: true, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;43%&quot;}, {&quot;kolor&quot;: &quot;#C98A1E&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;39%&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;17%&quot;}]}, {&quot;xs&quot;: 650.0, &quot;x0&quot;: 636.6, &quot;x1&quot;: 663.4, &quot;etykieta&quot;: &quot;2023/24&quot;, &quot;waski&quot;: true, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;38%&quot;}, {&quot;kolor&quot;: &quot;#C98A1E&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;42%&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;19%&quot;}]}, {&quot;xs&quot;: 687.3, &quot;x0&quot;: 673.9, &quot;x1&quot;: 700.8, &quot;etykieta&quot;: &quot;2024/25&quot;, &quot;waski&quot;: true, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;39%&quot;}, {&quot;kolor&quot;: &quot;#C98A1E&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;41%&quot;}, {&quot;kolor&quot;: &quot;#1F5C99&quot;, &quot;nazwa&quot;: &quot;&quot;, &quot;tekst&quot;: &quot;20%&quot;}]}], &quot;h&quot;: 300}"><svg viewBox="0 0 720 300" role="img" aria-label="Wykres slupkowy: struktura przychodow Ekstraklasy w procentach. Udzial praw medialnych rosnie z 24 procent w 2007 do 41 procent w sezonie 2024/2025, udzial przychodow komercyjnych spada z 60 do 39 procent.">
<rect class="wyk-slupek" data-i="0" x="39.2" y="20.0" width="26.9" height="140.7" fill="#C0303A"/>
<rect class="wyk-slupek" data-i="0" x="39.2" y="160.7" width="26.9" height="55.8" fill="#C98A1E"/>
<rect class="wyk-slupek" data-i="0" x="39.2" y="216.5" width="26.9" height="39.5" fill="#1F5C99"/>
<text x="53" y="276" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">07</text>
<rect class="wyk-slupek" data-i="1" x="76.6" y="20.0" width="26.9" height="106.0" fill="#C0303A"/>
<rect class="wyk-slupek" data-i="1" x="76.6" y="126.0" width="26.9" height="83.2" fill="#C98A1E"/>
<rect class="wyk-slupek" data-i="1" x="76.6" y="209.2" width="26.9" height="46.8" fill="#1F5C99"/>
<rect class="wyk-slupek" data-i="2" x="113.9" y="20.0" width="26.9" height="113.5" fill="#C0303A"/>
<rect class="wyk-slupek" data-i="2" x="113.9" y="133.5" width="26.9" height="94.6" fill="#C98A1E"/>
<rect class="wyk-slupek" data-i="2" x="113.9" y="228.1" width="26.9" height="27.9" fill="#1F5C99"/>
<rect class="wyk-slupek" data-i="3" x="151.2" y="20.0" width="26.9" height="106.7" fill="#C0303A"/>
<rect class="wyk-slupek" data-i="3" x="151.2" y="126.7" width="26.9" height="82.6" fill="#C98A1E"/>
<rect class="wyk-slupek" data-i="3" x="151.2" y="209.3" width="26.9" height="46.7" fill="#1F5C99"/>
<text x="165" y="276" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">10</text>
<rect class="wyk-slupek" data-i="4" x="188.6" y="20.0" width="26.9" height="108.6" fill="#C0303A"/>
<rect class="wyk-slupek" data-i="4" x="188.6" y="128.6" width="26.9" height="82.1" fill="#C98A1E"/>
<rect class="wyk-slupek" data-i="4" x="188.6" y="210.7" width="26.9" height="45.3" fill="#1F5C99"/>
<rect class="wyk-slupek" data-i="5" x="225.9" y="20.0" width="26.9" height="124.4" fill="#C0303A"/>
<rect class="wyk-slupek" data-i="5" x="225.9" y="144.4" width="26.9" height="66.9" fill="#C98A1E"/>
<rect class="wyk-slupek" data-i="5" x="225.9" y="211.2" width="26.9" height="44.8" fill="#1F5C99"/>
<rect class="wyk-slupek" data-i="6" x="263.2" y="20.0" width="26.9" height="117.4" fill="#C0303A"/>
<rect class="wyk-slupek" data-i="6" x="263.2" y="137.4" width="26.9" height="74.5" fill="#C98A1E"/>
<rect class="wyk-slupek" data-i="6" x="263.2" y="211.9" width="26.9" height="44.1" fill="#1F5C99"/>
<text x="277" y="276" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">13</text>
<rect class="wyk-slupek" data-i="7" x="300.6" y="20.0" width="26.9" height="123.6" fill="#C0303A"/>
<rect class="wyk-slupek" data-i="7" x="300.6" y="143.6" width="26.9" height="72.9" fill="#C98A1E"/>
<rect class="wyk-slupek" data-i="7" x="300.6" y="216.5" width="26.9" height="39.5" fill="#1F5C99"/>
<rect class="wyk-slupek" data-i="8" x="337.9" y="20.0" width="26.9" height="117.0" fill="#C0303A"/>
<rect class="wyk-slupek" data-i="8" x="337.9" y="137.0" width="26.9" height="77.4" fill="#C98A1E"/>
<rect class="wyk-slupek" data-i="8" x="337.9" y="214.4" width="26.9" height="41.6" fill="#1F5C99"/>
<rect class="wyk-slupek" data-i="9" x="375.2" y="20.0" width="26.9" height="98.2" fill="#C0303A"/>
<rect class="wyk-slupek" data-i="9" x="375.2" y="118.2" width="26.9" height="103.5" fill="#C98A1E"/>
<rect class="wyk-slupek" data-i="9" x="375.2" y="221.8" width="26.9" height="34.2" fill="#1F5C99"/>
<text x="389" y="276" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">16</text>
<rect class="wyk-slupek" data-i="10" x="412.6" y="20.0" width="26.9" height="115.6" fill="#C0303A"/>
<rect class="wyk-slupek" data-i="10" x="412.6" y="135.6" width="26.9" height="79.2" fill="#C98A1E"/>
<rect class="wyk-slupek" data-i="10" x="412.6" y="214.9" width="26.9" height="41.1" fill="#1F5C99"/>
<rect class="wyk-slupek" data-i="11" x="449.9" y="20.0" width="26.9" height="124.3" fill="#C0303A"/>
<rect class="wyk-slupek" data-i="11" x="449.9" y="144.3" width="26.9" height="74.6" fill="#C98A1E"/>
<rect class="wyk-slupek" data-i="11" x="449.9" y="218.9" width="26.9" height="37.1" fill="#1F5C99"/>
<rect class="wyk-slupek" data-i="12" x="487.2" y="20.0" width="26.9" height="117.0" fill="#C0303A"/>
<rect class="wyk-slupek" data-i="12" x="487.2" y="137.0" width="26.9" height="82.8" fill="#C98A1E"/>
<rect class="wyk-slupek" data-i="12" x="487.2" y="219.8" width="26.9" height="36.2" fill="#1F5C99"/>
<text x="501" y="276" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">19</text>
<rect class="wyk-slupek" data-i="13" x="524.6" y="20.0" width="26.9" height="113.3" fill="#C0303A"/>
<rect class="wyk-slupek" data-i="13" x="524.6" y="133.3" width="26.9" height="113.7" fill="#C98A1E"/>
<rect class="wyk-slupek" data-i="13" x="524.6" y="247.0" width="26.9" height="9.0" fill="#1F5C99"/>
<rect class="wyk-slupek" data-i="14" x="561.9" y="20.0" width="26.9" height="95.9" fill="#C0303A"/>
<rect class="wyk-slupek" data-i="14" x="561.9" y="115.9" width="26.9" height="106.1" fill="#C98A1E"/>
<rect class="wyk-slupek" data-i="14" x="561.9" y="222.1" width="26.9" height="33.9" fill="#1F5C99"/>
<rect class="wyk-slupek" data-i="15" x="599.2" y="20.0" width="26.9" height="102.6" fill="#C0303A"/>
<rect class="wyk-slupek" data-i="15" x="599.2" y="122.6" width="26.9" height="92.5" fill="#C98A1E"/>
<rect class="wyk-slupek" data-i="15" x="599.2" y="215.1" width="26.9" height="40.9" fill="#1F5C99"/>
<text x="613" y="276" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">22/23</text>
<rect class="wyk-slupek" data-i="16" x="636.6" y="20.0" width="26.9" height="90.8" fill="#C0303A"/>
<rect class="wyk-slupek" data-i="16" x="636.6" y="110.8" width="26.9" height="100.1" fill="#C98A1E"/>
<rect class="wyk-slupek" data-i="16" x="636.6" y="210.9" width="26.9" height="45.1" fill="#1F5C99"/>
<rect class="wyk-slupek" data-i="17" x="673.9" y="20.0" width="26.9" height="91.6" fill="#C0303A"/>
<rect class="wyk-slupek" data-i="17" x="673.9" y="111.6" width="26.9" height="96.1" fill="#C98A1E"/>
<rect class="wyk-slupek" data-i="17" x="673.9" y="207.7" width="26.9" height="48.3" fill="#1F5C99"/>
<text x="687" y="276" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">24/25</text>
<line x1="34" y1="256" x2="706" y2="256" stroke="#DCE2E8" stroke-width="1"/>
</svg></div>
<p class="legend"><span><i class="dot" style="background:#C0303A"></i>komercyjne (sponsorzy, dotacje, gadżety)</span><span><i class="dot" style="background:#C98A1E"></i>prawa medialne i marketingowe (w tym UEFA)</span><span><i class="dot" style="background:#1F5C99"></i>dzień meczowy (bilety, loże, catering)</span></p>
<p class="figcap">Struktura przychodów z podstawowej działalności klubów Ekstraklasy, udziały procentowe. Źródła: Deloitte (do sezonu 2021/2022) i Grant Thornton. Kategoria praw medialnych obejmuje też wpływy od UEFA.</p>
</div>
<p>W 2007 r. sześćdziesiąt procent przychodów ligi pochodziło z kategorii „komercyjne" - czyli w praktyce od sponsorów, właścicieli i spółek skarbu państwa. Prawa medialne dawały ledwie 24 procent. Dziś proporcje się odwróciły: prawa medialne i marketingowe to <strong>41 procent</strong> i największe źródło pieniędzy w lidze, a komercyjne spadły do 39. To dobra zmiana - pieniądze z praw medialnych są przewidywalne, wspólne i nie zależą od humoru jednego biznesmena.</p>
<p>Ten filar jest zresztą znacznie starszy niż raporty, z których korzystam. Canal+ wszedł na polski rynek w 1995 r. i od razu zaczął od Ekstraklasy - pierwszą transmisję, Legia z GKS-em Katowice, pokazał 1 kwietnia tamtego roku. Przed nim prawa do ligi były w praktyce nieuregulowane, bez wspólnego schematu sprzedaży i bez standardu realizacji. W 2000 r., z inicjatywy Zbigniewa Bońka, PZPN podpisał z Canal+ pięcioletnią umowę na wyłączność wartą 100 mln dolarów, nazwaną wtedy „kontraktem stulecia". Jak na tamten produkt były to pieniądze duże, prawdopodobnie większe, niż wynikałoby z samej jakości rozgrywek - ale to była decyzja komercyjnej stacji, nie akt dobroczynności: skoro tyle płacono, to znaczy, że tyle wtedy rynek za polską piłkę dawał. Ta stabilizacja pozwoliła klubom przetrwać epokę, w której nie miały ani stadionów, ani sponsorów.</p>
<p>Dwa miejsca na tym wykresie warto obejrzeć osobno. Żółty pasek w 2016 r. puchnie do połowy słupka - to znowu Legia w Lidze Mistrzów, dzięki której wpływy z praw medialnych i UEFA skoczyły ze 162 do 254 mln zł w jeden rok. A niebieski pasek na dole niemal znika w sezonie 2020/2021: przychody z dnia meczowego spadły wtedy do <strong>24 mln zł</strong> dla całej ligi, bo trybuny stały puste.</p>
<p>Jest w tym obrazie coś, co powinno niepokoić bardziej niż cokolwiek innego. Polska zbudowała wokół Euro 2012 kilkanaście nowych stadionów - cztery duże, na których grano turniej (Warszawa, Gdańsk, Wrocław, Poznań), do tego rezerwowy stadion Wisły w Krakowie na 33 tys. miejsc, trzydziestotysięczną arenę Legii i kilkunastotysięczne obiekty w mniejszych miastach. Osobno przeciągnął się remont Stadionu Śląskiego w Chorzowie - skończony dopiero w 2017 r., 54 tys. miejsc, drugi obiekt w kraju po Narodowym. Udział dnia meczowego w przychodach ligi wzrósł przez osiemnaście lat z 17 do 20 procent.</p>
<p>Trzy punkty procentowe za kilkanaście aren. Powód widać w tabeli frekwencji: część obiektów jest po prostu za duża w stosunku do zainteresowania. W sezonie 2024/2025 Śląsk Wrocław wypełniał swój 42-tysięczny stadion średnio w <strong>44 procentach</strong>, a Lech Poznań, ligowy rekordzista frekwencji z 29 tysiącami widzów na mecz, w 68. Najlepiej zapełniają się obiekty mniejsze: Jagiellonia w Białymstoku 88 procent z 15 tysięcy, Pogoń Szczecin 84, Legia 80. Innymi słowy, wielkość areny nie przekłada się na wpływy - decyduje o nich to, czy klub potrafi ją zapełnić.</p>
<p>Warto przy tym wiedzieć, co dokładnie mieści się w „dniu meczowym", bo nazwa jest myląca. To wyłącznie wpływy związane z samym meczem: bilety, karnety, loże i catering na stadionie. Wszystko, co klub zarabia na obiekcie <em>poza</em> meczami - wynajem sal na konferencje, imprezy, muzeum, zwiedzanie - raporty liczą w kategorii komercyjnej. Te trzy punkty procentowe dotyczą więc samych meczów, a nie całego życia stadionu.</p>
</div>
<div class="part">
<p class="part-tag">Część III - Druga strona bilansu</p>
<h2>Ile z tego zostaje, czyli na co idą te pieniądze</h2>
<p>Przychody to dopiero połowa obrazu i sama z siebie niewiele mówi. Klub może zarabiać rekordowo i przy tym się zadłużać - najgłośniejszym przykładem jest FC Barcelona, marka warta miliardy, latami zarządzana tak, że musiała sprzedawać przyszłe wpływy, żeby domknąć bieżący sezon. Zapłaciła za to cenę, jakiej trudno sobie wyobrazić: w 2021 r. nie było jej stać na przedłużenie kontraktu Leo Messiego, wychowanka i najlepszego piłkarza w historii klubu, który odszedł za darmo i zdążył jeszcze zostać mistrzem świata w innych barwach. Można zepsuć nawet bardzo duży potencjał. Warto więc spojrzeć na to, co po drugiej stronie.</p>
<p>Skala jest następująca: w sezonie 2024/2025 kluby Ekstraklasy wygenerowały <strong>1 266 mln zł kosztów operacyjnych</strong> przy 1 270 mln zł przychodów ogółem. Liga jako całość wychodzi więc mniej więcej na zero - i robi to od lat. Rozpiętość między klubami jest przy tym ogromna: koszty Legii to 225 mln zł, a Stali Mielec 23 mln, czyli jedna dziesiąta.</p>
<h3>Wskaźnik, który mówi najwięcej: płace do przychodów</h3>
<p>Największą pozycją kosztową są wynagrodzenia i to je UEFA reguluje wprost. Obowiązujący próg to <strong>80 procent przychodów</strong>, a od sezonu 2025/2026 wprowadzany jest mechanizm docelowo obniżający go do <strong>70 procent</strong>. Poniżej 70 procent uznaje się za strefę zdrową: klub ma zapas na inwestycje, na gorszy sezon i na to, żeby nie wisieć na jednym udanym transferze.</p>
<p>Polska liga wypada tu przyzwoicie, ale nierówno. W sezonie 2024/2025 poniżej progu 70 procent zmieściło się <strong>jedenaście z osiemnastu klubów</strong> - rok wcześniej trzynaście, więc lekko się pogorszyło. Najzdrowszą relację miała Jagiellonia Białystok: 37 procent, przy trzecim miejscu w lidze i ćwierćfinale Ligi Konferencji. Legia jest na 48 procentach, Lech na 52. W strefie ostrzegawczej, między 70 a 80 procentem, znalazły się Piast, Śląsk, Lechia i GKS Katowice. Powyżej limitu wyszły trzy kluby, a rekordzistą jest Puszcza Niepołomice ze <strong>125 procentami</strong> - czyli klub wydał na same pensje jedną czwartą więcej, niż w ogóle zarobił.</p>
<p>To dobrze pokazuje, na czym polega kruchość tego modelu. Klub, który przekracza sto procent, nie utrzymuje się z działalności, tylko z dopłat właściciela albo ze sprzedaży zawodnika. Udany transfer ratuje rok; nieudany sezon oznacza dziurę, którą ktoś musi załatać. Wisła Kraków przerobiła tę lekcję do końca: od zespołu naszpikowanego gwiazdami, przez upadek, po spadek do pierwszej ligi, z której wyciągnęli ją dopiero nowi właściciele. Do Ekstraklasy wróciła dopiero w 2026 r., po czterech sezonach na zapleczu.</p>
<p>Widać tu zresztą sensowną zmianę. Dwadzieścia lat temu polska liga miała jeden z najwyższych wskaźników płac w Europie - Deloitte notował w skali ligi 72 procent, poziom, przy którym każde potknięcie kończy się problemami licencyjnymi. Dziś, w porównywalnej mierze UEFA, wypadamy na 61 procentach. To jest realny postęp w zarządzaniu, nawet jeśli nie widać go w tabeli.</p>
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
<div class="midnote"><strong>Polska - między wszystkimi.</strong> Bogatych właścicieli w Ekstraklasie ostatnio realnie przybyło: Robert Płatek (Cracovia), Zbigniew Jakubas z grupy Multico (Motor Lublin), Robert Dobrzycki z deweloperskiego Panattoni (Widzew, od razu z dużym kapitałem), rodzina Rutkowskich z Amiki (Lech), Alex Haditaghi (Pogoń), Michał Świerczewski ze sklepu X-kom (Raków), Dariusz Mioduski (Legia). Kilku z nich to miliarderzy. Historia zna też tych, którzy się „pobawili" i odeszli - Cupiał w Wiśle, Wojciechowski w Polonii.</div>
<p>Ten wzorzec - prywatny mecenas finansuje zryw, który gaśnie, gdy kończą się pieniądze - jest w polskiej piłce stary. Już jesienią 1992 r. w Legię wszedł pierwszy prywatny sponsor, biznesmen Janusz Romanowski, z umową z FSO i Adidasem; gdy zabrakło środków, drużyna się rozsypała, a zawodnicy rozeszli się do innych klubów.</p>
<p>Najpełniej powtórzyła to Wisła Kraków Bogusława Cupiała (od 1997 r.). Jej złoty zespół - oparty głównie na Polakach, co dziś rzadkie, gdy Raków, Lech czy Jagiellonię niosą obcokrajowcy - niemal zdominował ligę i raz po raz ocierał się o Europę. W Pucharze UEFA sezonu 2002/2003 przeżyła wielkie noce: wyeliminowała Parmę, potem rozbiła Schalke 04 w Gelsenkirchen 4:1, a odpadła dopiero z Lazio - po remisie 3:3 i przegranej 1:2 w rewanżu. W eliminacjach Ligi Mistrzów los raz po raz stawiał jej na drodze gigantów: przegrywała dwukrotnie z Barceloną (raz urywając nawet jeden mecz drużynie Guardioli) i z Realem Madryt. Najbardziej bolało to, że nie przechodziła też rywali w zasięgu - w 2005 r. do fazy grupowej zabrakło pięciu minut w dwumeczu z Panathinaikosem. Ale gdy właścicielowi skończyła się cierpliwość i pieniądze, projekt wygasł.</p>
<p>Sedno leży jednak gdzie indziej i widać je dopiero w danych UEFA, która od 2023 r. publikuje porównywalne wskaźniki dla wszystkich 55 federacji. Polskie kluby wypadają w nich skrajnie nierówno.</p>
<div class="kpis">
<div class="kpi cap"><p class="n">3. miejsce</p><p class="l">w Europie pod względem liczby dużych inwestycji stadionowych w ostatniej dekadzie - 16 projektów</p></div>
<div class="kpi"><p class="n">83%</p><p class="l">stadionów klubów Ekstraklasy należy do miasta albo państwa, nie do klubu</p></div>
<div class="kpi"><p class="n">51. miejsce</p><p class="l">na 55 federacji pod względem kapitału własnego klubów. Jedenaście polskich klubów ma go ujemny</p></div>
</div>
<p>Uwaga na to ostatnie, bo łatwo je pomylić z wielkością budżetu: <strong>kapitał własny to nie przychody</strong>. To różnica między tym, co klub posiada, a tym, co jest winien - majątek minus długi. Można mieć niezłe przychody i ujemny kapitał własny, czyli formalnie więcej zobowiązań niż majątku, i dokładnie tak jest w jedenastu polskich klubach. Pod tym względem wyprzedzają nas prawie wszystkie federacje w Europie.</p>
<p>Trudno o czystszy dowód tezy, którą postawiłem w poprzednim tekście. W stawianiu obiektów jesteśmy w europejskiej czołówce. W kondycji finansowej podmiotów, które w nich grają - w ogonie kontynentu. I to jest jedna i ta sama informacja: <strong>infrastrukturę finansuje u nas ktoś inny niż klub</strong>. Samorząd stawia stadion, prywatny właściciel łata bieżące straty, a klub nie staje się przy tym właścicielem niczego. Gra na cudzym obiekcie, więc nie ma go w swoim majątku - nie może pod niego pożyczyć, nie może go sprzedać, nie zbuduje na nim wartości firmy.</p>
<p class="pull">Stadion da się postawić w kilka lat za publiczne pieniądze. Majątku klubu nie zbuduje za niego nikt - a bez majątku zostaje wieczne życie z bieżących wpływów i kroplówki od właściciela.</p>
</div>
<div class="part">
<p class="part-tag">Część V - Dystans do rdzenia</p>
<h2>Dogoniliśmy Europę. Przepaść i tak się podwoiła</h2>
<p>Szedłem do tych danych z gotową tezą: że polska piłka biegła szybko, ale najbogatsze kluby Europy biegły szybciej, i stąd nasza nieobecność w Lidze Mistrzów. Liczby tę tezę przewracają.</p>
<p>Licząc w euro, przychody Ekstraklasy wzrosły od 2007 r. <strong>4,6-krotnie</strong>. W tym samym czasie dwadzieścia najbogatszych klubów świata z rankingu Deloitte Money League urosło 3,4-krotnie, a najbogatszy klub - 3,2-krotnie. (To mnożniki nominalne; po odliczeniu inflacji w strefie euro wychodzi odpowiednio 3,2, 2,3 i 2,2 raza, ale ponieważ wszystkie trzy dzieli się przez ten sam indeks cen, samo porównanie się nie zmienia.) Udział Ekstraklasy w przychodach tej dwudziestki wzrósł z 1,45 do 2,00 procent. Sprawdziłem to jeszcze na innej mierze, licząc od 2014 r., dla którego UEFA podaje przychody całego europejskiego futbolu: przez dekadę Europa urosła o 81 procent, a Polska o 121. <strong>Rośliśmy szybciej niż rdzeń, i to wyraźnie.</strong></p>
<p>A teraz to samo na wykresie.</p>
<div class="fig">
<div class="plotno" data-punkty="{&quot;punkty&quot;: [{&quot;xs&quot;: 228.0, &quot;x0&quot;: 145.0, &quot;x1&quot;: 311.0, &quot;etykieta&quot;: &quot;2007 (w cenach z 2025)&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;cała Ekstraklasa&quot;, &quot;tekst&quot;: &quot;78 mln €&quot;}, {&quot;kolor&quot;: &quot;#15202B&quot;, &quot;nazwa&quot;: &quot;najbogatszy klub Europy&quot;, &quot;tekst&quot;: &quot;533 mln €&quot;}, {&quot;kolor&quot;: &quot;#8593A0&quot;, &quot;nazwa&quot;: &quot;różnica&quot;, &quot;tekst&quot;: &quot;455 mln €&quot;}]}, {&quot;xs&quot;: 554.0, &quot;x0&quot;: 471.0, &quot;x1&quot;: 637.0, &quot;etykieta&quot;: &quot;sezon 2024/25&quot;, &quot;wiersze&quot;: [{&quot;kolor&quot;: &quot;#C0303A&quot;, &quot;nazwa&quot;: &quot;cała Ekstraklasa&quot;, &quot;tekst&quot;: &quot;248 mln €&quot;}, {&quot;kolor&quot;: &quot;#15202B&quot;, &quot;nazwa&quot;: &quot;najbogatszy klub Europy&quot;, &quot;tekst&quot;: &quot;1161 mln €&quot;}, {&quot;kolor&quot;: &quot;#8593A0&quot;, &quot;nazwa&quot;: &quot;różnica&quot;, &quot;tekst&quot;: &quot;913 mln €&quot;}]}], &quot;h&quot;: 340}"><svg viewBox="0 0 720 340" role="img" aria-label="Wykres slupkowy w cenach z 2025 roku: w 2007 cala Ekstraklasa miala 78 milionow euro przychodow, a najbogatszy klub Europy 533 milionow - roznica 455 milionow. W sezonie 2024/2025 Ekstraklasa ma 248 milionow, a najbogatszy klub 1161 milionow - roznica 913 milionow euro.">
<line x1="52" y1="286" x2="704" y2="286" stroke="#DCE2E8" stroke-width="1"/>
<text x="44" y="290" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">0</text>
<line x1="52" y1="205" x2="704" y2="205" stroke="#EAEEF2" stroke-width="1"/>
<text x="44" y="209" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">400</text>
<line x1="52" y1="125" x2="704" y2="125" stroke="#EAEEF2" stroke-width="1"/>
<text x="44" y="129" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">800</text>
<line x1="52" y1="44" x2="704" y2="44" stroke="#EAEEF2" stroke-width="1"/>
<text x="44" y="48" text-anchor="end" font-family="Bricolage Grotesque, sans-serif" font-size="10.5" font-weight="400" fill="#8593A0">1200</text>
<rect class="wyk-slupek" data-i="0" x="145" y="270" width="74" height="16" rx="4" fill="#C0303A"/>
<text x="182" y="261" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="14" font-weight="600" fill="#C0303A">78</text>
<rect class="wyk-slupek" data-i="0" x="237" y="179" width="74" height="107" rx="4" fill="#15202B"/>
<text x="274" y="170" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="14" font-weight="600" fill="#15202B">533</text>
<line x1="324" y1="179" x2="324" y2="270" stroke="#8593A0" stroke-width="1.2" stroke-dasharray="3 3"/>
<text x="331" y="222" text-anchor="start" font-family="Bricolage Grotesque, sans-serif" font-size="11" font-weight="400" fill="#8593A0">różnica</text>
<text x="331" y="237" text-anchor="start" font-family="Bricolage Grotesque, sans-serif" font-size="13" font-weight="600" fill="#51616C">455 mln</text>
<text x="228" y="308" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="12" font-weight="600" fill="#51616C">2007 (w cenach z 2025)</text>
<rect class="wyk-slupek" data-i="1" x="471" y="236" width="74" height="50" rx="4" fill="#C0303A"/>
<text x="508" y="227" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="14" font-weight="600" fill="#C0303A">248</text>
<rect class="wyk-slupek" data-i="1" x="563" y="52" width="74" height="234" rx="4" fill="#15202B"/>
<text x="600" y="43" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="14" font-weight="600" fill="#15202B">1161</text>
<line x1="650" y1="52" x2="650" y2="236" stroke="#8593A0" stroke-width="1.2" stroke-dasharray="3 3"/>
<text x="657" y="142" text-anchor="start" font-family="Bricolage Grotesque, sans-serif" font-size="11" font-weight="400" fill="#8593A0">różnica</text>
<text x="657" y="157" text-anchor="start" font-family="Bricolage Grotesque, sans-serif" font-size="13" font-weight="600" fill="#51616C">913 mln</text>
<text x="554" y="308" text-anchor="middle" font-family="Bricolage Grotesque, sans-serif" font-size="12" font-weight="600" fill="#51616C">sezon 2024/25</text>
</svg></div>
<p class="legend"><span><i class="dot" style="background:#C0303A"></i>cała Ekstraklasa (18 klubów)</span><span><i class="dot" style="background:#15202B"></i>najbogatszy klub Europy</span></p>
<p class="figcap">Przychody z podstawowej działalności wszystkich klubów Ekstraklasy wobec przychodów najbogatszego klubu Europy (Real Madryt w obu momentach), w mln euro <strong>według cen z 2025 r.</strong> - kwoty z 2007 r. przeliczone indeksem cen strefy euro, inaczej zestawialibyśmy dwie różne jednostki. Świadomie tylko dwa momenty: dla lat pośrednich nie ma w pełni porównywalnych danych. Źródła: Deloitte, Grant Thornton, Deloitte Football Money League, Eurostat, kursy średnioroczne NBP.</p>
</div>
<p>Proporcja rzeczywiście się poprawiła: w 2007 r. najbogatszy klub Europy miał prawie siedmiokrotność przychodów całej naszej ligi, dziś ma niecałe pięć. Tylko że proporcja to nie jest to, czym się płaci za piłkarza.</p>
<p>Różnica w pieniądzach wynosiła w 2007 r. 312 mln euro, a dziś wynosi 913 mln. Zestawianie tych dwóch kwot wprost byłoby jednak tym samym błędem, który opisałem na początku: przez osiemnaście lat ceny w strefie euro wzrosły o 45 procent, więc euro z 2007 r. i euro z 2025 r. to nie ta sama jednostka. Po urealnieniu tamte 312 mln odpowiada dzisiejszym <strong>455 mln euro</strong>. Rzetelne porównanie brzmi więc tak: różnica dzieląca całą polską ligę od jednego klubu <strong>podwoiła się w realnych pieniądzach</strong>, z 455 do 913 mln euro. To mniej dramatycznie niż „potroiła się", ale wciąż jest to podwojenie w okresie, w którym rzekomo doganialiśmy.</p>
<h3>To w takim razie kiedy dogonimy?</h3>
<p>Skoro rośniemy szybciej, pytanie nasuwa się samo. Da się na nie odpowiedzieć, choć odpowiedź jest niewesoła. W latach 2007-2024/25 przychody Ekstraklasy rosły średnio o <strong>8,9 procent rocznie</strong> (w euro), a najbogatszego klubu Europy o <strong>6,6 procent</strong>. Gdyby oba tempa utrzymały się bez zmian, cała polska liga zrównałaby się z jednym Realem Madryt <strong>około roku 2099</strong>.</p>
<p>Gorsza jest jednak druga liczba i warto ją wyłożyć powoli, bo brzmi jak sprzeczność: skoro gonimy, to jak dystans może rosnąć?</p>
<p>Cała rzecz w tym, że <strong>procent liczy się od różnych podstaw</strong>. Nasze 8,9 procent to 8,9 procent z 248 mln euro, czyli około <strong>22 mln euro przyrostu rocznie</strong>. Ich 6,6 procent to 6,6 procent z 1 161 mln, czyli około <strong>77 mln euro rocznie</strong>. Rośniemy szybciej w procentach, ale co roku dokładamy do swojego budżetu trzy i pół razy mniej pieniędzy niż oni do swojego. Dlatego dystans w euro się powiększa, choć tempo mamy lepsze.</p>
<p>I tu dochodzimy do 2085. Nasz roczny przyrost też rośnie z każdym rokiem - bo liczymy 8,9 procent od coraz większej kwoty - i rośnie szybciej niż ich. W pewnym momencie te dwa przyrosty się zrównają: będziemy dokładać rocznie tyle samo euro co oni. To właśnie moment około 2085 roku - nic wtedy nie „pęka", po prostu wtedy pierwszy raz przestajemy zostawać w tyle. Dopiero po tej dacie zaczynamy dokładać więcej niż oni i przepaść wreszcie maleje - aż zniknie około 2099.</p>
<p>Praktyczny wniosek jest taki: przez najbliższe pokolenie i drugie dystans w pieniądzach będzie się <em>powiększał</em>, mimo że wszystkie wskaźniki wzrostu będą po naszej stronie. Za dekadę różnica wyniesie nie 913 mln, lecz około 1,6 mld euro.</p>
<p>To oczywiście nie jest prognoza. Nikt nie wie, co się stanie z prawami telewizyjnymi, czy powstanie jakaś wersja Superligi, czy UEFA nie zmieni zasad podziału pieniędzy. Ten rachunek pokazuje tylko, co naprawdę znaczy „rośniemy szybciej od rdzenia" przy takiej różnicy skali: znaczy tyle, że nadganiamy w tempie, którego pojedyncze pokolenie nie zdąży zauważyć.</p>
<p class="pull">Rośniemy szybciej od najbogatszych i mimo to oddalamy się od nich w pieniądzach. Przy dzisiejszym tempie przepaść przestanie się powiększać dopiero około 2085 roku.</p>
<h3>Za to średniaków Europy wyprzedziliśmy naprawdę</h3>
<p>Jest jednak grupa lig, którą Polska w tym czasie wyprzedziła zupełnie realnie: te ze Skandynawii i z naszej części kontynentu. W raporcie Deloitte za sezon 2018/2019 polskie kluby miały 133 mln euro przychodów i były <em>poniżej</em> Danii, Norwegii i Szwecji - każdej z osobna. Pięć lat później dane UEFA wyglądają tak:</p>
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
<p>Polska jest dziś czternastą ligą Europy pod względem przychodów i pierwszą w swojej części kontynentu. Wyprzedziliśmy Danię, Norwegię i Szwecję, a także Czechy, Chorwację, Rumunię i Serbię. Tyle że wciąż jesteśmy o rząd wielkości od Anglii (7 447 mln euro), Niemiec (3 902) i Hiszpanii (3 881) - a to one, a nie Dania, decydują o tym, kto gra w Lidze Mistrzów.</p>
<p>To wyprzedzanie średniaków ma jednak bardzo konkretną konsekwencję i tu akurat jest powód do optymizmu. Klubowy ranking UEFA, od którego zależy liczba miejsc w pucharach, liczy się z opóźnieniem i kumuluje punkty z pięciu sezonów - a polskie kluby zbierają je dziś regularnie, głównie w Lidze Konferencji, trzecim i najsłabszym pucharze, skrojonym w praktyce dokładnie pod ligi naszego kalibru. Awansujemy w tym rankingu powoli, ale systematycznie. I najprawdopodobniej to właśnie tędy, a nie przez sportowy przełom pojedynczego klubu, Polska wróci kiedyś do fazy grupowej Ligi Mistrzów: nie dlatego, że któryś zespół przejdzie cztery rundy eliminacji, tylko dlatego, że miejsce będzie przysługiwać naszej lidze z automatu, z tytułu pozycji w rankingu.</p>
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
<li><strong>Dzień meczowy: z 17 na 20 procent.</strong> Kilkanaście stadionów światowej klasy po Euro 2012 przesunęło tę pozycję o trzy punkty procentowe. Część aren jest po prostu za duża: Śląsk Wrocław wypełnia swoją średnio w 44 procentach.</li>
<li><strong>Koszty niemal równe przychodom.</strong> 1 266 mln zł kosztów wobec 1 270 mln zł wpływów. Na płace jedenaście z osiemnastu klubów wydaje mniej niż docelowe 70 procent przychodów wymagane przez UEFA, ale Puszcza Niepołomice wydała 125 procent.</li>
<li><strong>Rośliśmy szybciej niż rdzeń.</strong> Ekstraklasa 4,6× w euro wobec 3,4× dla dwudziestu najbogatszych klubów świata; +121 procent wobec +81 dla całej Europy w latach 2014-2024.</li>
<li><strong>I mimo to przepaść się podwoiła.</strong> Różnica między najbogatszym klubem Europy a całą Ekstraklasą: 455 mln euro w 2007 (w dzisiejszych cenach) wobec 913 mln euro obecnie. Nominalnie wygląda to na potrojenie, ale euro sprzed osiemnastu lat nie jest tym samym euro.</li>
<li><strong>Przy tym tempie zrównanie wypada około 2099 r.</strong> A różnica w euro rośnie jeszcze przez jakieś sześćdziesiąt lat, zanim w ogóle zacznie maleć. To nie prognoza, tylko ilustracja tego, co znaczy „rosnąć szybciej" przy takiej różnicy skali.</li>
<li><strong>14. liga Europy, 51. bilans.</strong> Trzecie miejsce na kontynencie w inwestycjach stadionowych, 83 procent stadionów w rękach samorządów, jedenaście klubów z ujemnym kapitałem własnym.</li>
</ul>
</div>
<div class="part">
<p class="part-tag">Nota o danych</p>
<h2>Skąd te liczby, czyli trzy serie raportów i dwie dziury</h2>
<p>Ta część jest dla tych, którzy chcą wiedzieć, na czym stoją liczby powyżej. Reszcie nic nie umknie, jeśli ją pominie.</p>
<p>Seria czasowa opiera się na trzech źródłach. Deloitte prowadził <em>Piłkarską ligę finansową</em> od 2007 r. do sezonu 2021/2022. Równolegle EY wydawał z Ekstraklasą SA <em>Ekstraklasę piłkarskiego biznesu</em>, liczoną inną metodą - przez co jej liczby nigdy nie zgadzały się z Deloitte i to jest główne źródło zamieszania w sieci. Od sezonu 2022/2023 pałeczkę przejął Grant Thornton, który wprost przejął metodykę i dane historyczne Deloitte. Dzięki temu obie serie spinają się co do złotówki.</p>
<p>Nie musiałem mieć każdej edycji z osobna i nie rekonstruowałem niczego z szacunków. Deloitte i Grant Thornton drukują w każdym raporcie <em>pełną tabelę historyczną</em>, przeliczoną własną metodyką. Wystarczą więc dwa raporty, żeby mieć komplet: edycja Deloitte za sezon 2021/2022 obejmuje lata 2007-2021/22, a Grant Thornton za 2024/2025 - lata 2013-2024/25. Zachodzą na siebie i w części wspólnej podają identyczne wartości.</p>
<p>Ile lat wstecz to sięga? Edycja z 2017 r. jest opisana jako jedenasta, więc pierwsza wyszła w 2007 r. i dotyczyła roku 2006. Tej jednej liczby nie ma jednak w żadnej tabeli historycznej, a wartości krążące po sieci dla 2006 r. („182 mln", „120-140 mln", „nieco ponad 100 mln") wykluczają się nawzajem i nie mają pokrycia w źródłach. Dlatego zaczynam od 2007 r.</p>
<p>Są w danych dwie dziury. Pierwsza: od sezonu 2020/2021 raporty przestały liczyć rok kalendarzowy, a zaczęły sezon piłkarski (1 lipca - 30 czerwca). Druga: <strong>sezon 2019/2020 wypadł zupełnie</strong>, w danych jest skok z roku 2019 wprost na 2020/2021. To akurat rok pandemii, więc szkoda podwójna. Obie dziury są w samych raportach, nie w moim zbiorze - Deloitte ten sezon pominął, a Grant Thornton, przejmując dane historyczne, przejął też lukę.</p>
</div>
<div class="zrodla">
<h2>Źródła i metoda</h2>
<p class="src"><strong>Przychody klubów.</strong> Deloitte, <em>Piłkarska Liga Finansowa</em> - edycje za rok 2016 (lipiec 2017), rok 2019 (październik 2020) i sezon 2021/2022 (wrzesień 2022). Grant Thornton, <em>Finansowa Ekstraklasa</em> - sezony 2022/2023, 2023/2024 i 2024/2025. Grant Thornton przejął metodykę i dane historyczne Deloitte, dzięki czemu obie serie są porównywalne. Pomocniczo: EY i Ekstraklasa SA, <em>Ekstraklasa piłkarskiego biznesu</em> (2012, 2016, 2017) - inna metodyka, dlatego nie wchodzi do serii; Grant Thornton, <em>Finansowa pierwsza liga</em> (2022/23, 2023/24, 2024/25); PwC, <em>Ekstraklasa - kibice, kluby i miasto</em> (2025).</p>
<p class="src"><strong>Kontekst europejski.</strong> UEFA, <em>The European Club Finance and Investment Landscape 2025</em> - dane za rok obrotowy 2023/2024 dla wszystkich 55 federacji. Deloitte, <em>Football Money League</em> - edycje 2008 i 2026. Deloitte, <em>Piłkarska liga finansowa - rok 2019</em> (porównanie lig spoza wielkiej piątki za sezon 2018/2019).</p>
<p class="src"><strong>Dane makroekonomiczne.</strong> Przeciętne miesięczne wynagrodzenie brutto - GUS, Bank Danych Lokalnych. PKB w cenach bieżących oraz roczne indeksy cen konsumpcyjnych dla Polski i dla strefy euro - Eurostat. Kursy średnioroczne EUR/PLN - policzone ze wszystkich notowań tabeli A Narodowego Banku Polskiego z danego roku.</p>
<p class="src"><strong>Jak liczyłem.</strong> Wszystkie porównania w czasie oparte są na przychodach z podstawowej działalności (dzień meczowy, prawa medialne i marketingowe, przychody komercyjne), bez transferów - bo tylko ta wielkość jest liczona tak samo od 2007 r. Sezony przypisano do roku, w którym się kończą, zgodnie z rokiem obrotowym klubów. Kwoty złotowe urealniam polskim indeksem cen, a kwoty w euro - indeksem strefy euro; w obu przypadkach do cen z 2025 r. Wskaźnik „w przeciętnych wynagrodzeniach" to roczne przychody klubów podzielone przez przeciętne roczne wynagrodzenie brutto w danym roku. Rachunek dogonienia zakłada, że obie strony rosną dalej w tempie zmierzonym w latach 2007-2024/25 (średnia geometryczna) - to nie jest prognoza, tylko ekstrapolacja obecnego tempa.</p>
<p class="meta">Tekst jest rozwinięciem wątku klubowego z eseju <a href="/polska-sport-a-gospodarka/">Gospodarczy prymus, sportowy maruder</a>. Stan danych: sierpień 2026.</p>
</div>
<script>
/* Odczyt wartosci z wykresow po najechaniu kursorem albo dotknieciu.
   Bez zaleznosci zewnetrznych - strona nie laduje zadnych obcych zasobow. */
(function () {
  var figury = document.querySelectorAll('.esej .fig .plotno[data-punkty]');
  if (!figury.length) return;
  figury.forEach(function (plotno) {
    var dane;
    try { dane = JSON.parse(plotno.getAttribute('data-punkty')); } catch (e) { return; }
    var svg = plotno.querySelector('svg');
    if (!svg || !dane.punkty || !dane.punkty.length) return;
    var fig = plotno.closest('.fig');
    var dymek = document.createElement('div');
    dymek.className = 'wyk-dymek';
    dymek.setAttribute('aria-hidden', 'true');
    fig.appendChild(dymek);
    var prowadnica = svg.querySelector('.wyk-prowadnica');
    var markery = svg.querySelectorAll('.wyk-marker');
    var slupki = svg.querySelectorAll('.wyk-slupek');
    var szerVB = svg.viewBox.baseVal.width;
    var aktywny = -1;
    function schowaj() {
      aktywny = -1;
      dymek.classList.remove('widoczny');
      if (prowadnica) prowadnica.setAttribute('opacity', '0');
      markery.forEach(function (m) { m.setAttribute('opacity', '0'); });
      slupki.forEach(function (b) { b.style.opacity = ''; });
    }
    function pokaz(i, klientX) {
      var p = dane.punkty[i];
      if (!p) return;
      if (i !== aktywny) {
        aktywny = i;
        dymek.classList.toggle('waski', !!p.waski);
        dymek.innerHTML = '<b>' + p.etykieta + '</b>' + p.wiersze.map(function (w) {
          return '<span><i style="background:' + w.kolor + '"></i>' +
                 w.nazwa + '<em>' + w.tekst + '</em></span>';
        }).join('');
        if (prowadnica) {
          prowadnica.setAttribute('x1', p.xs);
          prowadnica.setAttribute('x2', p.xs);
          prowadnica.setAttribute('opacity', '1');
        }
        markery.forEach(function (m) {
          m.setAttribute('opacity', m.getAttribute('data-i') === String(i) ? '1' : '0');
        });
        slupki.forEach(function (b) {
          b.style.opacity = b.getAttribute('data-i') === String(i) ? '1' : '0.45';
        });
        dymek.classList.add('widoczny');
      }
      var rf = fig.getBoundingClientRect();
      var x = klientX - rf.left;
      var szer = dymek.offsetWidth;
      x = Math.max(8, Math.min(x - szer / 2, rf.width - szer - 8));
      dymek.style.left = x + 'px';
    }
    function zBadania(klientX) {
      var r = svg.getBoundingClientRect();
      var wx = (klientX - r.left) / r.width * szerVB;
      var naj = 0, dyst = Infinity;
      dane.punkty.forEach(function (p, i) {
        if (p.x0 !== undefined && wx >= p.x0 && wx <= p.x1) { naj = i; dyst = -1; return; }
        var d = Math.abs(p.xs - wx);
        if (dyst >= 0 && d < dyst) { dyst = d; naj = i; }
      });
      return naj;
    }
    function obsluz(e) {
      var klientX = e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
      if (klientX === undefined) return;
      pokaz(zBadania(klientX), klientX);
    }
    plotno.addEventListener('mousemove', obsluz);
    plotno.addEventListener('mouseleave', schowaj);
    plotno.addEventListener('touchstart', obsluz, { passive: true });
    plotno.addEventListener('touchmove', obsluz, { passive: true });
    plotno.addEventListener('touchend', schowaj);
  });
})();
</script>
</div>
