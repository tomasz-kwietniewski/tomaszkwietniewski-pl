---
title: Jak powstała strona Fundacji Misja MADA
slug: strona-fundacji-misja-mada
date: "2026-10-03T09:10:00"
kategorie:
  - Technologie i dom
excerpt: Serwis w trzech językach, wpłaty kartą co miesiąc i panel, w którym
  fundacja prowadzi cały program Adopcji Serca zamiast arkuszy. Opisuję, co
  powstało, jakie problemy były najciekawsze i czego się przy tym nauczyłem.
miniatura: /media/2026/10/strona-fundacji-misja-mada.jpg
typ: wpis
---
Fundacja Misja MADA pomaga dzieciom i rodzinom na Madagaskarze. Wspiera Siostry Małe Misjonarki Miłosierdzia (Siostry Orionistki), które prowadzą tam między innymi Centrum Edukacyjne i Atelier Nadziei. Najważniejszy program fundacji to Adopcja Serca: darczyńca z Polski co miesiąc wspiera konkretne dziecko.

W czerwcu 2026 zrobiłem dla fundacji pierwszą stronę internetową, [misjamada.pl](https://misjamada.pl). Zaczęła się jako wizytówka, a z czasem urosła w system, w którym fundacja prowadzi dziś cały ten program. Koncepcję, zakres funkcji i projekt graficzny ustalaliśmy wspólnie z fundacją. Kod, wdrożenie i bieżące utrzymanie są po mojej stronie. Ten tekst opisuje, jak to wygląda od środka - dla kogoś, kto chce zobaczyć, jak pracuję.

## Punkt wyjścia: fanpage i arkusze

Fundacja nie miała strony internetowej, tylko fanpage na Facebooku. Program Adopcji Serca prowadziła w arkuszach Google: w jednym lista darczyńców, w drugim wpłaty, po kolumnie na każdy miesiąc. Każdy przelew z wyciągu ktoś przepisywał ręcznie.

Na początku chodziło o jedno: porządną wizytówkę, która przedstawi fundację, jej działania i misję na Madagaskarze. Od tego zaczęliśmy, a kolejne części dobudowywaliśmy wtedy, gdy okazywało się, że są potrzebne:

- **czerwiec 2026** - wizytówka w trzech językach, formularze, wpłaty jednorazowe przez PayU i newsletter w MailerLite. Zaraz potem panel, w którym fundacja sama dodaje i poprawia wydarzenia oraz sprawozdania.
- **czerwiec i lipiec** - wpłaty co miesiąc kartą.
- **sierpień** - moduł Adopcja Serca: dzieci, darczyńcy, przypisywanie adopcji, wpłaty i maile do darczyńców. Zastąpił arkusze.
- **sierpień i wrzesień** - finanse i import wyciągu z banku.
- **od września** - poprawki według uwag z codziennej pracy fundacji.

Arkusz jest świetny na początek, ale z każdym nowym darczyńcą robi się trudniejszy. Nie pokaże sam, kto zalega z wpłatami, nie wyśle maila i nie zauważy, że ta sama wpłata została wpisana dwa razy. Dlatego największa część pracy to dziś nie sama strona, tylko narzędzia do prowadzenia fundacji, które stoją za nią.

## Co powstało

Serwis ma trzy warstwy.

### Strona publiczna

Strona działa w trzech językach: polskim, angielskim i francuskim. Francuski nie jest tu ozdobą, bo na Madagaskarze to drugi język urzędowy, a fundacja współpracuje z ludźmi na miejscu.

Wesprzeć fundację można jednorazowo (BLIK, karta, szybki przelew przez PayU) albo co miesiąc kartą. Formularz Adopcji Serca prowadzi przez wybór liczby dzieci, sposobu płatności i zgód, a zgłoszenie trzeba potwierdzić kliknięciem w link z maila, żeby nikt nie zapisał cudzego adresu. Do tego zapis na newsletter, wyszukiwarka, wydarzenia i sprawozdania.

<figure>
<a href="/media/2026/10/mada-darowizna-pl-fr.webp"><img src="/media/2026/10/mada-darowizna-pl-fr.webp" alt="Okno darowizny na misjamada.pl w wersji polskiej i francuskiej: wybór kwoty, typu wpłaty (jednorazowo albo co miesiąc) i celu darowizny" width="1264" height="814" loading="lazy"></a>
<figcaption>Kliknij zrzut, żeby otworzyć go w pełnym rozmiarze. Okno darowizny po polsku i po francusku. Kwoty, etykiety i cele zmieniają się razem z językiem.</figcaption>
</figure>

### Panel dla pracowników fundacji

Pracownicy fundacji sami publikują wydarzenia i sprawozdania. Nie muszą przy tym myśleć o układzie strony głównej, bo strona dobiera go sama: gdy jest zaplanowane wydarzenie, pokazuje duży blok z zapowiedzią; gdy zapowiedzi nie ma, przez dwa tygodnie wyróżnia świeżą relację; potem pokazuje trzy ostatnie relacje; gdy nie ma żadnych, sekcja znika. Opis wydarzenia tłumaczy się na angielski i francuski automatycznie (DeepL), z glosariuszem, żeby nazwy programów i miejsc zawsze brzmiały tak samo.

<figure>
<a href="/media/2026/10/mada-wydarzenia.webp"><img src="/media/2026/10/mada-wydarzenia.webp" alt="Lista wydarzeń w panelu: tytuł, data, status nadchodzące albo archiwum, gwiazdka przy wyróżnionym" width="990" height="360" loading="lazy"></a>
<figcaption>Lista wydarzeń w panelu. Gwiazdka oznacza wydarzenie wyróżnione na stronie głównej, a status nadchodzące albo archiwum liczy się z daty - stąd strona wie, co pokazać.</figcaption>
</figure>

Logowanie jest na imienne konta, z ochroną przed zgadywaniem haseł, a każda zmiana danych trafia do dziennika: kto, co i kiedy.

### Adopcja Serca i finanse

To największa część pracy i ta, z której fundacja korzysta codziennie. W panelu są dzieci, darczyńcy, adopcje i wpłaty. Wpłata nie jest tu po prostu kwotą, tylko zakresem miesięcy, za które ktoś zapłacił. Dzięki temu panel sam liczy, kto ma opłacone do kiedy i kto zalega.

Najważniejszy widok celowo wygląda jak dawny arkusz: wiersz na darczyńcę i dziecko, kolumna na miesiąc. Ludzie w fundacji znali ten układ na pamięć, więc nie było sensu wymyślać go od nowa. Różnica jest taka, że kolory liczą się same, a kliknięcie w czerwone pole zapisuje wpłatę.

<figure>
<a href="/media/2026/10/mada-macierz-wplat.webp"><img src="/media/2026/10/mada-macierz-wplat.webp" alt="Macierz wpłat w panelu: wiersze z darczyńcami i dziećmi, kolumny z miesiącami, zielone pola opłacone, czerwone z kwotą 70 zł zaległe" width="990" height="780" loading="lazy"></a>
<figcaption>Macierz wpłat. Zielone opłacone, czerwone nieopłacone, beżowe poza okresem adopcji. Kolumna „Zaległe” nie liczy bieżącego miesiąca, bo na jego wpłatę jest jeszcze czas. Wszystkie osoby, dzieci i kwoty na zrzutach są zmyślone.</figcaption>
</figure>

Karta darczyńcy zbiera wszystko w jednym miejscu: kontakt, notatki fundacji, adopcje, historię wpłat. Stąd też jednym kliknięciem wysyła się darczyńcy maila z przedstawieniem dziecka, a panel zapamiętuje, komu i kiedy to poszło.

<figure>
<a href="/media/2026/10/mada-karta-darczyncy.webp"><img src="/media/2026/10/mada-karta-darczyncy.webp" alt="Karta darczyńcy w panelu: dane kontaktowe, notatki fundacji, tabela adopcji z zaległością, formularz zapisu wpłaty i historia wpłat" width="1130" height="1282" loading="lazy"></a>
<figcaption>Karta darczyńcy (dane fikcyjne).</figcaption>
</figure>

Do tego kilka rzeczy mniej widocznych, ale ważnych: archiwum dzieci i darczyńców, które chowa wpis z listy bez kasowania historii, eksport do Excela w układzie dawnego arkusza na wypadek, gdyby panel kiedyś przestał działać, i filtr danych do przeglądu zgodnie z polityką prywatności. Ten ostatni niczego nie usuwa sam. Wypisuje zgłoszenia, które według polityki należy już skasować, a decyzję podejmuje człowiek.

## Cztery ciekawe problemy

### Płatności co miesiąc: lepiej wstrzymać niż obciążyć dwa razy

Płatność cykliczną kartą zrobiłem na PayU. Numer karty wpisuje się w okienko PayU osadzone na stronie, więc dane karty nigdy nie trafiają na serwer fundacji. Pierwsza płatność przechodzi z pełnym potwierdzeniem w banku, a fundacja dostaje token, którym można obciążać kartę w kolejnych miesiącach. Kolejne raty pobiera codziennie automat po stronie serwera.

Najwięcej myślenia wymagało pytanie: co zrobić, gdy PayU nie odpowie? Ponowienie wygląda na oczywiste rozwiązanie, ale jeśli pierwsze obciążenie jednak przeszło, darczyńca zapłaci dwa razy. Dlatego każde obciążenie ma własny identyfikator, a powtórka z tym samym identyfikatorem jest bezpieczna. Odmowę banku ponawiam najwyżej raz na dobę, do trzech razy. A gdy wynik jest nieznany, subskrypcja się wstrzymuje i czeka na człowieka. Jedna spóźniona rata to drobiazg. Darczyńca, który zobaczy na wyciągu podwójne obciążenie, może przestać ufać fundacji.

### Wyciąg z banku, który nie wygląda jak w dokumentacji

Skoro bank fundacji się nie zmienia, wpłat nie trzeba przepisywać ręcznie - można wgrać plik z bankowości. Opisy formatu w internecie mówiły o średnikach i starym kodowaniu Windows. Prawdziwy plik miał przecinki, kodowanie UTF-8 i w ogóle nie miał wiersza z nazwami kolumn. Zamiast niego w pierwszej linii była metryka rachunku: saldo na początek i koniec, liczba operacji, waluta.

Ta metryka okazała się najcenniejsza. Plik, którego nie da się odczytać, to awaria głośna i nieszkodliwa - widać ją od razu. Groźny jest plik, który wczyta się z przekłamanymi liczbami. Dlatego po każdym wgraniu panel sprawdza, czy liczba operacji zgadza się z zapowiedzianą i czy saldo początkowe plus suma operacji daje saldo końcowe. Jeśli coś się nie zgadza, mówi to wprost. Cały import można też cofnąć jednym przyciskiem.

Potem trzeba przypisać każdy przelew do właściwej osoby i dziecka. Panel szuka po zapamiętanym numerze rachunku, po numerze i imieniu dziecka w tytule, a na końcu po nazwisku - i w nadawcy, i w tytule, także w przybliżeniu. To ważne, bo w kartotece często jest para („Ewa i Piotr Wiśniewscy”), a przelew przychodzi od „EWA WIŚNIEWSKA”. Okres wpłaty bierze z tytułu, jeśli darczyńca go wpisał, a jeśli nie - z kwoty, licząc od pierwszego nieopłaconego miesiąca. Jedna wpłata za dwoje dzieci dzieli się na dwie.

<figure>
<a href="/media/2026/10/mada-import-podzial.webp"><img src="/media/2026/10/mada-import-podzial.webp" alt="Operacja z wyciągu w panelu: przelew 280 zł od darczyńcy z dwojgiem dzieci, rozdzielony na dwie adopcje po 140 zł za wrzesień i październik, pod każdą pasek opłaconych miesięcy" width="945" height="855" loading="lazy"></a>
<figcaption>Jeden przelew za dwoje dzieci. Tytuł nie mówi, za jakie miesiące, więc panel dzieli kwotę po równo i liczy okres od pierwszego nieopłaconego miesiąca. Pod każdą adopcją pasek: zielone opłacone, czerwone zaległe, w ramce miesiące tej wpłaty.</figcaption>
</figure>

Panel tylko podpowiada. Nic nie zapisuje się samo - pracownik widzi propozycję, pasek miesięcy pod spodem i klika. Najbardziej przydatne okazało się ostrzeżenie o możliwym dublu: gdy ktoś wcześniej wpisał wpłatę ręcznie, a potem przychodzi wyciąg z tym samym przelewem, panel mówi, która to wpłata, kto i kiedy ją wpisał, i zostawia wiersz niezaznaczony.

<figure>
<a href="/media/2026/10/mada-import-dubel.webp"><img src="/media/2026/10/mada-import-dubel.webp" alt="Operacja z wyciągu z czerwonym ostrzeżeniem: miesiąc przelewu jest już opłacony wpłatą wpisaną ręcznie, z datą wpisu i loginem osoby, która ją wpisała" width="944" height="879" loading="lazy"></a>
<figcaption>Ostrzeżenie o możliwym dublu. Zapis wymaga świadomej decyzji.</figcaption>
</figure>

Przy przeglądzie importu wyszedł też błąd, którego testy nie łapały. Darczyńca płacący za dwoje dzieci osobnymi przelewami robi dwa identyczne przelewy tego samego dnia: ta sama kwota, ten sam nadawca, ten sam tytuł. Mechanizm, który miał chronić przed wczytaniem tego samego wyciągu dwa razy, uznawał drugi przelew za kopię i go pomijał. Poprawka była prosta, a ten przypadek ma dziś własny test. Takie scenariusze bierze się z życia, nie z wyobraźni.

### Tłumacz Google, który psuł wersję angielską

Z fundacji przyszło zgłoszenie: wersja angielska pokazuje losową mieszankę polskiego i angielskiego, a przełącznik języków wyświetla „PL / PL / FR”. U mnie wszystko działało.

Przyczyna była zabawna. Chrome u polskiego użytkownika widział stronę po angielsku i sam tłumaczył ją z powrotem na polski. Mechanizm tłumaczeń strony zauważał zmienione teksty i tłumaczył je znów na angielski. Wygrywało to, co akurat było w słowniku, a reszta zostawała po polsku. Nawet napis „EN” na przełączniku Google przetłumaczył na „PL”. Naprawa to jedna linijka w nagłówku każdej strony, która mówi przeglądarce, żeby jej nie tłumaczyła. Lekcja jest szersza: „u mnie działa” nic nie znaczy, gdy objaw zależy od ustawień przeglądarki odbiorcy.

Brakujące tłumaczenie ma jeszcze jedną złośliwą cechę - niczego nie psuje. Tekst po prostu zostaje po polsku, a błąd wychodzi dopiero u odwiedzającego. Dlatego automatyczny test przechodzi każdą podstronę i nie przepuszcza zmiany, w której jakakolwiek fraza nie ma wersji angielskiej i francuskiej.

### Przeprowadzka z arkuszy

Arkusze prowadzone latami mają swoje zwyczaje. Wpłaty bywały zwijane w zakresy, część kolumn była ukryta, ta sama osoba raz występowała z imieniem, raz bez, pary zapisane były razem. Skrypt przeniósł do bazy to, co dało się przypisać jednoznacznie. Wiersze niejednoznaczne trafiły na osobny ekran, na którym pracownicy fundacji rozstrzygali je ręcznie, jeden po drugim. Zgadywanie, czyja jest wpłata, to nie jest zadanie dla programu.

Jedna pułapka była szczególnie zdradliwa: eksport arkusza Google do HTML pomija ukryte kolumny. Opłacone miesiące wyglądały przez to jak zaległości. Dopiero pełny plik Excela dał prawdziwy obraz. Od tamtej pory przy każdej migracji porównuję sumy po obu stronach, zanim uznam, że dane się przeniosły.

## Jak to jest zrobione

- **Bez frameworków.** Strona to zwykły HTML, CSS i JavaScript, bez kroku budowania. Ładuje się szybko, a za kilka lat nikt nie będzie musiał aktualizować dziesiątek zależności, żeby poprawić literówkę.
- **Zwykły hosting.** Backend to PHP 8 i MySQL na hostingu współdzielonym. Utrzymanie kosztuje tyle, co zwykła strona, i nie ma serwera do administrowania.
- **Maile, które dochodzą.** Potwierdzenia i powiadomienia wychodzą z uwierzytelnionej skrzynki Gmail fundacji, a gdy ta droga zawiedzie, zapasowo z serwera z poprawnie ustawionymi zabezpieczeniami domeny (SPF, DKIM, DMARC). Wysyłane wprost z serwera bywały łapane jako spam.
- **Lekkie testy.** Zamiast dużego frameworka testowego - własne, minimalne skrypty w PHP i Node, razem kilkaset sprawdzeń: płatności cykliczne, moduł adopcji, odczyt wyciągu, skrypty Google na atrapach API, kompletność tłumaczeń. Uruchamiają się automatycznie przy każdej zmianie, zanim trafi do głównej gałęzi.
- **Automatyczne wdrożenie.** Zmiana w głównej gałęzi sama trafia na serwer przez GitHub Actions. Hasła i klucze żyją tylko na serwerze, poza repozytorium.
- **Kopia bazy co noc.** Zapisana poza katalogiem strony, sprawdzana po zapisie, przechowywana 30 dni. Raz odtworzyłem ją na próbę do osobnej bazy i zgadzała się z produkcją co do rekordu - kopia, której nikt nie próbował odtworzyć, to tylko nadzieja.
- **Z pomocą agentów AI.** Kod piszę razem z agentami AI (Claude Code i Codex). To, co ma powstać, ustalam z fundacją, decyzje projektowe podejmuję sam i każdą zmianę sprawdzam, zanim trafi na produkcję. Agent przyspiesza pisanie, ale za to, co działa u fundacji, odpowiadam ja.
- **Bez śledzenia.** Strona nie ma analityki i nie ustawia odwiedzającym cookies, więc nie potrzebuje banera zgód.

## Jak pracujemy z fundacją

Uwagi przychodzą mailem, jako zrzuty ekranu, a czasem jako nagranie głosowe nagrane w drodze. Każda sprawa to osobna, mała zmiana z opisem, co było nie tak i dlaczego poprawka wygląda tak, a nie inaczej. Wdrażam je pojedynczo, więc gdy coś pójdzie źle, wiadomo, co cofnąć. Po wdrożeniu piszę do fundacji po ludzku: co się zmieniło, co zobaczą w panelu i czego jeszcze od nich potrzebuję.

Jedną zasadę trzymam sztywno: kod poprawiam sam, ale danych fundacji nie zmieniam bez zgody. Jeśli w kartotece jest błąd, buduję narzędzie, które go pokazuje, i mówię, jak go naprawić. Decyzja należy do fundacji.

## Czego się nauczyłem

**Produkcja to nie poligon.** Po jednym z wdrożeń sprawdzałem stronę serią zapytań z linii poleceń. Zapora hostingu uznała to za atak i zablokowała mój domowy adres na ponad półtorej godziny, a z zewnątrz wyglądało to jak awaria strony. Od tamtej pory ciężkie testy robię lokalnie, na pełnej kopii z bazą danych - tak jak przy zrzutach do tego tekstu - a na produkcję zaglądam raz czy dwa, żeby potwierdzić, że zmiana doszła.

**Przeglądarki pamiętają za dużo.** Każdy plik stylów i skryptów ma w adresie numer wersji, który podbijam na wszystkich podstronach naraz. Inaczej część odwiedzających dostaje nową stronę ze starym skryptem, a takie błędy są nie do odtworzenia u siebie.

**Dane osób chroni się od pierwszego dnia.** Zgłoszenia od fundacji dotyczą prawdziwych ludzi. Zanim przykład trafi do testów albo dokumentacji, zamieniam go na fikcyjny: Jan Kowalski, ul. Przykładowa, zmyślone imię dziecka. Wszystkie zrzuty w tym tekście pochodzą z lokalnej kopii panelu zasilonej zmyślonymi danymi.

**Automat nie powinien niczego kasować.** Kuszące jest, żeby system sam usuwał stare zgłoszenia albo zbędne wpisy. Usunięcia nie da się jednak cofnąć, więc panel tylko wystawia listę kandydatów, a klika człowiek. Akcje nieodwracalne są schowane i wymagają przepisania numeru z ekranu, nie samego kliknięcia.

## Gdzie to zobaczyć

Serwis działa na [misjamada.pl](https://misjamada.pl). Kod leży w prywatnym repozytorium, bo zawiera logikę pracy na danych darczyńców. Jeśli chcesz zobaczyć, jak jest napisany, [napisz do mnie](/kontakt/) - chętnie pokażę go na spotkaniu.
