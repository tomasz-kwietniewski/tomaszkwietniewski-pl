---
title: "Migracja z Evernote do OneNote"
slug: "migracja-z-evernote-do-onenote"
miniatura: "/media/2023/12/2023-12-08_Migracja-z-Evernote-do-OneNote.jpg"
date: "2023-12-08T19:34:00"
modified: "2023-12-09T10:16:21"
url_stara: "https://tomaszkwietniewski.pl/migracja-z-evernote-do-onenote/"
typ: "wpis"
kategorie: ["Nowe technologie", "Tipy ułatwiające życie"]
excerpt: "Korzystałem z Evernote od 22 maja 2012 r., czyli ponad dekadę. Używałem tej aplikacji głównie do archiwizowania ciekawych artykułów, które przeczytałem w Internecie. Najważniejszym elementem były dla mnie “nożyczki sieciowe”, czyli Evernote Web Clipper. Przeważnie działały dobrze i pozwalały mi skopiować i zachować interesujące mnie treści. Przez te ponad 10 lat nazbierałem 193 notatniki z…"
---


<p class="wp-block-paragraph">Korzystałem z Evernote od 22 maja 2012 r., czyli ponad dekadę. Używałem tej aplikacji głównie do archiwizowania ciekawych artykułów, które przeczytałem w Internecie. Najważniejszym elementem były dla mnie “nożyczki sieciowe”, czyli Evernote Web Clipper. Przeważnie działały dobrze i pozwalały mi skopiować i zachować interesujące mnie treści. Przez te ponad 10 lat nazbierałem 193 notatniki z ponad 16 tys. notatek (prawie 9 GB danych). Ten system działał naprawdę dobrze i wygodnie (choć w pewnym momencie apka na telefonie nie dawała rady “wycinać” i działało to tylko na kompie). Było to dużo lepsze niż kopiowanie ręczne i na piechotę tworzenie dokumentów tekstowych na kompie:-) Jednak w tym momencie dochodzimy do problemu, czyli opłat.</p>



<p class="wp-block-paragraph">Za wygodę korzystania z Evernote płaciłem abonament co roku. Wziąłem najniższy pakiet, bo mi wystarczał. Przez wiele lat płaciłem 50 zł rocznie, czyli bardzo niewiele i to było ok. Parę lat temu ta opcja zniknęła w ogóle z cennika dla nowych klientów. Do tego roku jednak, jako stary klient, mogłem dalej z tego korzystać. Evernote zmienił politykę i przeniósł wszystkich na wyższe pakiety, aktualnie dostępne w ofercie. Rachunek miałem teraz na 180 zł za rok, czyli ponad 3x więcej! Tego było za wiele, nie chcę płacić tyle za takie podstawowe funkcje.</p>



<p class="wp-block-paragraph">W międzyczasie testowałem konkurencyjne rozwiązania i ostatecznie do moich zastosowań Evernote był najlepszy, ale niewiele gorzej działa web clipper od Microsoft OneNote, który jest darmowy. Zatem pozostało rozkminić jak dokonać migracji z Evernote do OneNote?</p>



<p class="wp-block-paragraph">Jak można przypuszczać, Evernote nie ułatwia zadania i rzuca kłody pod nogi. Kiedyś wersja desktopowa Evernote przechowywała kopie notatników lokalnie, ale teraz już tak nie jest. Ponadto w najnowszych wersjach pozwala na raz wyeksportować tylko 100 notatek z jednego notatnika! To byłaby mordęga w moim przypadku. Znalazłem taką ścieżkę, którą mogę polecić, jeśli ktoś chciałby zrobić to samo:</p>



<ol class="wp-block-list">
<li>Evernote udostępnia API, które pozwala zalogować się i daje dostęp do wszystkich notatek. Pozostaje użyć narzędzia, które co prawda działa w terminalu/wierszu poleceń, ale jest bardzo proste w obsłudze:</li>
</ol>



<p class="wp-block-paragraph"><a href="https://github.com/vzhd1701/evernote-backup">https://github.com/vzhd1701/evernote-backup</a></p>



<ul class="wp-block-list">
<li>Instalacja</li>



<li>Logowanie</li>



<li>Synchronizacja wszystkich notatników na raz</li>



<li>Eksport wszystkich notatników na raz jako plików *.ENEX</li>
</ul>



<ol class="wp-block-list" start="2">
<li>Import plików ENEX do OneNote (narzędzie Evernote2Onenote)</li>
</ol>



<p class="wp-block-paragraph"><a href="https://tools.stefankueng.com/Evernote2Onenote.html">https://tools.stefankueng.com/Evernote2Onenote.html</a></p>



<ul class="wp-block-list">
<li>Narzędzie wymaga instalacji darmowego .NET Framework 4.8</li>



<li>Trzeba mieć zainstalowaną desktopową wersję OneNote (nie tą wbudowana w Windows 10/11). Tą która jest częścią pakietu Office (OneNote jest darmowy, powinien działać bez licencji; wtedy jest tylko 5 GB przestrzeni do synchronizacji): <a href="https://www.onenote.com/download">https://www.onenote.com/download</a></li>



<li>Import notatnik po notatniku (jeden plik ENEX to jeden notatnik)</li>
</ul>



<p class="wp-block-paragraph">Podsumowując. Krok 1, czyli eksport, jest łatwy i szybki (trzeba poczekać na synchronizację, u mnie to było ok 2 godz.). Krok 2, czyli import, jest nieco bardziej żmudny (każdy notatnik trzeba zaimportować pojedynczo), ale to odbywa się lokalnie, więc idzie sprawnie. Minusem tego rozwiązania jest to, że krok 1 można wykonać na każdym systemie operacyjnym, jednak krok 2 tylko na Windows. Nie znalazłem alternatywnego darmowego rozwiązania dla MacOS i Linux. Mam nadzieję, że komuś to się przyda:-)</p>


<style>.wp-block-kadence-spacer.kt-block-spacer-2233_92ac53-4e .kt-block-spacer{height:60px;}.wp-block-kadence-spacer.kt-block-spacer-2233_92ac53-4e .kt-divider{border-top-width:1px;height:1px;border-top-color:#eee;width:80%;border-top-style:solid;}</style>
<div class="wp-block-kadence-spacer aligncenter kt-block-spacer-2233_92ac53-4e"><div class="kt-block-spacer kt-block-spacer-halign-center"><hr class="kt-divider"/></div></div>


<style>.wp-block-kadence-advancedheading.kt-adv-heading2233_b8ff81-e2, .wp-block-kadence-advancedheading.kt-adv-heading2233_b8ff81-e2[data-kb-block="kb-adv-heading2233_b8ff81-e2"]{font-style:normal;}.wp-block-kadence-advancedheading.kt-adv-heading2233_b8ff81-e2 mark.kt-highlight, .wp-block-kadence-advancedheading.kt-adv-heading2233_b8ff81-e2[data-kb-block="kb-adv-heading2233_b8ff81-e2"] mark.kt-highlight{font-style:normal;color:#f76a0c;-webkit-box-decoration-break:clone;box-decoration-break:clone;padding-top:0px;padding-right:0px;padding-bottom:0px;padding-left:0px;}.wp-block-kadence-advancedheading.kt-adv-heading2233_b8ff81-e2 img.kb-inline-image, .wp-block-kadence-advancedheading.kt-adv-heading2233_b8ff81-e2[data-kb-block="kb-adv-heading2233_b8ff81-e2"] img.kb-inline-image{width:150px;vertical-align:baseline;}</style>
<h2 class="kt-adv-heading2233_b8ff81-e2 wp-block-kadence-advancedheading" data-kb-block="kb-adv-heading2233_b8ff81-e2">Migration from Evernote to OneNote</h2>



<p class="wp-block-paragraph">I have been using Evernote since May 22, 2012, so it&#8217;s been over a decade. I mainly used this app to archive interesting articles I read on the Internet. The most important element for me was the &#8222;network scissors&#8221;, i.e. Evernote Web Clipper. For the most part, it worked well and allowed me to copy and save content that interested me. Over these 10 years, I have collected 193 notebooks with over 16,000 notes (almost 9 GB of data). This system worked really well and conveniently (although at some point the app on the phone couldn&#8217;t &#8222;cut&#8221; and it only worked on the computer). It was much better than copying manually and creating text documents on a computer:-) However, now we come to the problem: fees.</p>



<p class="wp-block-paragraph">I paid a subscription every year for the convenience of using Evernote. I took the lowest package because it was enough for me. For many years I paid PLN 50 a year, which was very little, and that was ok. A few years ago, this option disappeared from the price list for new customers. Until this year, however, as an old customer, I was able to continue using it. Evernote changed its policy and moved everyone to the higher packages currently available. My bill now was PLN 180 per year, which was over 3x more! This was too much, I don&#8217;t want to pay that much for such basic features.</p>



<p class="wp-block-paragraph">In the meantime, I tested competing solutions and ultimately Evernote was the best for my purposes, but the web clipper from Microsoft OneNote, which is free, is not much worse. So all that&#8217;s left to figure out is how to migrate from Evernote to OneNote?</p>



<p class="wp-block-paragraph">As you might expect, Evernote does not make the task easier and creates obstacles. The desktop version of Evernote used to store copies of notebooks locally, but this is no longer the case. Moreover, in the latest versions it only allows you to export 100 notes from one notebook at a time! That would be a pain in my case. I found this path that I can recommend if anyone would like to do the same:</p>



<ol class="wp-block-list">
<li>Evernote provides an API that allows you to log in and gives you access to all your notes. All you need to do is use a tool that, although it works in the terminal/command line, is very easy to use:</li>
</ol>



<p class="wp-block-paragraph"><a href="https://github.com/vzhd1701/evernote-backup">https://github.com/vzhd1701/evernote-backup</a></p>



<ul class="wp-block-list">
<li>Installation</li>



<li>Login</li>



<li>Sync all notebooks at once</li>



<li>Export all notebooks at once as *.ENEX files</li>
</ul>



<ol class="wp-block-list" start="2">
<li>Import ENEX files into OneNote (Evernote2Onenote tool)</li>
</ol>



<p class="wp-block-paragraph"><a href="https://tools.stefankueng.com/Evernote2Onenote.html">https://tools.stefankueng.com/Evernote2Onenote.html</a></p>



<ul class="wp-block-list">
<li>The tool requires installation of the free .NET Framework 4.8</li>



<li>You must have the desktop version of OneNote installed (not the one built into Windows 10/11). The one that is part of the Office suite (OneNote is free, it should work without a license; then there is only 5 GB of space for synchronization):<a href="https://www.onenote.com/download">https://www.onenote.com/download</a></li>



<li>Import notebook by notebook (one ENEX file is one notebook)</li>
</ul>



<p class="wp-block-paragraph">To sum up. Step 1, i.e. export, is easy and quick (you have to wait for synchronization, for me it took about 2 hours). Step 2, import, is a bit more tedious (each notebook needs to be imported individually), but it&#8217;s done locally, so it goes smoothly. The downside of this solution is that step 1 can be performed on any operating system, but step 2 only on Windows. I haven&#8217;t found an alternative free solution for macOS and Linux. I hope this will be useful to someone 🙂</p>
