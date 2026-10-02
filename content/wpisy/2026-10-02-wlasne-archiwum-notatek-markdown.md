---
title: Własne archiwum notatek w zwykłych plikach Markdown
slug: wlasne-archiwum-notatek-markdown
date: "2026-10-02T21:00:00"
kategorie:
  - Technologie i dom
excerpt: Od 1999 roku zapisuję przeczytane artykuły. Najpierw w Wordzie, potem w
  Evernote i Joplinie. Teraz to zwykłe pliki Markdown na własnym dysku, z wtyczką
  do przeglądarki, aplikacją na telefon i kopiami na NAS. Bez abonamentu.
miniatura: /media/2026/10/wlasne-archiwum-notatek-markdown.jpg
typ: wpis
---
W 2019 roku pisałem o tym, jak [Evernote stał się moim magazynem notatek](https://tomaszkwietniewski.pl/magazyn-notatek-evernote/). W 2023, kiedy Evernote wielokrotnie podniósł mi cenę, opisałem, [jak można przenieść notatki z Evernote do OneNote](https://tomaszkwietniewski.pl/migracja-z-evernote-do-onenote/). Ostatecznie wybrałem jednak inną drogę. Dziś trzecia część tej historii. Mam nadzieję, że ostatnia, bo tym razem przeniosłem notatki tam, skąd nikt mnie już nie wyprosi: do zwykłych plików na własnym dysku.

## Od Worda przez Evernote do Joplina

Przeczytane artykuły zapisuję od 1999 roku. Na początku ręcznie, w Wordzie: kopiuj, wklej, zapisz w folderze tematycznym.

W 2012 roku trafiłem na Evernote i to było świetne narzędzie. Artykuł zapisywałem jednym kliknięciem w przeglądarce, notatki leżały w chmurze, a ja miałem do nich dostęp i na komputerze, i w telefonie, wszystko zsynchronizowane. Nie zawsze działało idealnie, ale spełniało moje oczekiwania i byłem zadowolony.

Zmusiły mnie do zmiany dopiero ceny i warunki. Przez wiele lat płaciłem około 50 zł rocznie, bo Evernote przedłużał mi stary, tani plan, którego nowi użytkownicy nie mogli już kupić. W 2023 roku przestał to robić i nowa cena była wielokrotnie wyższa. Dla porównania dzisiejszy cennik (październik 2026): plan Starter za 139,90 zł rocznie mieści tylko 1000 notatek i 20 notesów, więc przy moich kilkunastu tysiącach notatek zostaje plan Advanced za 349,99 zł rocznie. To siedem razy więcej niż płaciłem przez lata.

Zacząłem więc szukać alternatywy, najlepiej darmowej. Rozważałem OneNote, ale nie mam żadnych subskrypcji Microsoftu. Wybrałem Joplina, darmowy program open source, który dawał większość tego, czego potrzebowałem. W darmowej wersji nie dało się jednak w łatwy sposób podpiąć chmury, więc wszystkie notatki leżały tylko na moim komputerze. Z telefonu nie miałem do nich dostępu, a wtyczka do zapisywania stron bywała zawodna. To było rozwiązanie gorsze niż Evernote.

Dlatego zacząłem szukać własnego rozwiązania. Jeszcze niedawno taki projekt byłby dla mnie poza zasięgiem, ale dziś mam do pomocy agentów AI do programowania i to zmieniło sprawę.

## Czego właściwie potrzebuję

Zanim zacząłem, spisałem wymagania. Okazało się, że jest ich niewiele, a Evernote spełniał je wszystkie poza ostatnim:

- **Zapis artykułu jednym kliknięciem**, z komputera i z telefonu, razem z obrazkami. Obrazki mają być u mnie, a nie jako linki, które za kilka lat przestaną działać.
- **Foldery tematyczne.** Tak układam myśli od lat i nie chcę tego zmieniać.
- **Szybkie wyszukiwanie** po całym archiwum.
- **Dostęp z różnych urządzeń** i porządne kopie zapasowe.
- **Żadnego abonamentu i żadnej firmy pośrodku.** Nie chcę, żeby o moich notatkach decydował cudzy cennik.

Ten ostatni punkt przesądził sprawę. Skoro każdy program kiedyś się zmienia, to notatki nie mogą być zamknięte w żadnym programie.

## Pomysł: zwykłe pliki Markdown

Markdown to zwykły tekst z prostym formatowaniem: nagłówki, pogrubienia, listy, linki, obrazki. Taki plik otworzysz w Notatniku, w VS Code, w Obsidianie albo w czymkolwiek, co powstanie za dwadzieścia lat. Nie potrzebuje żadnej bazy danych ani konta.

Moje archiwum to po prostu folder z podfolderami tematycznymi. Każda notatka to jeden plik o nazwie z datą i tytułem, na przykład `2026-10-02_Koszykarska Legia z kolejnym krajowym trofeum.md`. Na początku pliku są tytuł, data zapisu i adres strony, z której artykuł pochodzi. Obrazki leżą obok, w folderze o tej samej nazwie z dopiskiem `_assets`.

Na co dzień przeglądam archiwum w Obsidianie, który świetnie radzi sobie z takim folderem i ma dobrą wyszukiwarkę. Czasem otwieram je w VS Code. Ale to tylko okna na pliki. Gdyby Obsidian jutro zniknął, notatki zostają.

Synchronizację i kopie zapasowe robi mój domowy NAS Synology. Folder z archiwum synchronizuje się z komputerem, a NAS robi codzienne migawki, których nawet ja nie mogę usunąć przez dwa tygodnie (ochrona przed ransomware), oraz kopie na dysk USB i na serwer poza domem.

## Co musiałem zbudować

Gotowe programy załatwiały mi tylko część potrzeb, więc brakujące elementy zbudowałem razem ze wspomnianymi agentami AI, Claude Code i Codexem. Ja mówiłem, czego potrzebuję, i sprawdzałem efekty, one pisały kod i testy. Całość zajęła kilka dni zamiast kilku miesięcy.

**Wtyczka do przeglądarki Brave.** Klikam ikonę, wtyczka wyciąga ze strony sam artykuł, bez reklam i menu, i zamienia go na Markdown. Używa do tego tej samej biblioteki co tryb czytania w Firefoksie. Mogę poprawić tytuł, wybrać temat z listy istniejących folderów i zapisać. Ciekawostka: Brave celowo nie pozwala wtyczkom zapisywać plików we wskazanym folderze, więc obok wtyczki działa mały program w Windows, który odbiera notatkę, pobiera obrazki i zapisuje wszystko na dysku.

**Aplikacja na Androida.** W Brave na telefonie wybieram „Udostępnij”, potem „Moje archiwum”, i dzieje się to samo co na komputerze.

**Przeprowadzka starych notatek.** To była najcięższa część:

- około 17 tysięcy notatek z Joplina, razem z załącznikami,
- 707 artykułów z dokumentów Worda, zbieranych od 1999 roku,
- 643 dokumenty PDF, z których tekst trafił do notatki, a oryginał leży obok.

Razem około 18 tysięcy notatek, 136 tysięcy plików, 9 GB i 220 tematów. Każdy etap był sprawdzany automatycznie: sumy kontrolne plików, porównanie liczby liter przed i po konwersji, porównanie zawartości komputera i NAS-a. Nauczony poprzednimi migracjami nie chciałem wierzyć na słowo, że „wszystko przeszło”.

## Co poszło nie tak

Nie było idealnie i chyba warto o tym napisać, bo te pułapki czekają na każdego, kto pójdzie podobną drogą.

**Apostrof w nazwie pliku.** Klient Synology Drive na Windowsie po cichu pomija pliki i foldery, które mają w nazwie zwykły apostrof `'`. Nie wysyła ich, nie pobiera, tworzy dziwne kopie konfliktowe. Rozwiązanie: w nazwach plików apostrof zamieniam na typograficzny `’`, który wygląda prawie tak samo.

**„Zsynchronizowano”, które nie było prawdą.** Po wrzuceniu kilkudziesięciu tysięcy plików naraz klient uznał część z nich za wysłane, choć na NAS-ie ich nie było. Od tamtej pory po dużych zmianach porównuję listy plików po obu stronach, zamiast ufać zielonej ikonce.

**Obsidian, który nie chciał się otworzyć.** Pewnego dnia przywitał mnie komunikatem „File system operation timed out”. Najpierw podejrzewałem Synology, ale przyczyna była prozaiczna: archiwum leżało na starym dysku talerzowym w komputerze. Przejrzenie 136 tysięcy plików zajmowało mu kilka minut i Obsidian się poddawał. Po przeniesieniu archiwum na dysk SSD otwiera się w około 40 sekund.

**Telefon, który nie dał rady z całym archiwum.** Aplikacja Synology Drive na Androidzie przed każdą synchronizacją pobiera listę wszystkich plików, a przy kilkunastu tysiącach folderów z obrazkami serwer odrzuca jej zapytanie. Zadanie wisiało w nieskończoność ze statusem „Wait”. Zmieniłem więc podejście: telefon synchronizuje tylko małą skrzynkę „Z telefonu”, a komputer co pięć minut rozkłada notatki z niej do właściwych tematów. Żeby na telefonie dało się wybrać temat bez pomyłek, komputer wrzuca do skrzynki listę tematów, a aplikacja podpowiada je przy wpisywaniu. Straciłem podgląd całego archiwum w telefonie, ale stamtąd i tak zapisuję tylko pojedyncze artykuły.

## Co mam teraz

- Archiwum sięgające 1999 roku w jednym miejscu, w formacie, który przeżyje każdy program.
- Zapis artykułu jednym kliknięciem z komputera i z telefonu, z obrazkami na własnym dysku.
- Kopie zapasowe w trzech miejscach.
- Zero złotych abonamentu.

Uczciwie trzeba dodać, ile to kosztowało: kilka wieczorów pracy, własny NAS i trochę cierpliwości do szczegółów. To rozwiązanie dla kogoś, kto lubi mieć kontrolę i nie boi się technicznych drobiazgów. Jeśli chcesz pójść podobną drogą bez programowania, sam Obsidian z jednym z gotowych clipperów do Markdown da ci większość tych korzyści.

Najważniejsza zmiana jest jednak w głowie. Przez dwadzieścia lat to programy decydowały, gdzie i jak leżą moje notatki. Teraz to ja decyduję, a programy są tylko narzędziami do ich oglądania. Jeśli za kilka lat pojawi się coś lepszego niż Obsidian, po prostu otworzę w tym ten sam folder. Bez eksportu, bez importu i bez wpisu na bloga o kolejnej przeprowadzce.
