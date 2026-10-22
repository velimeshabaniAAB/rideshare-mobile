# RideShare — Java 6 · PWA dhe puna offline

Ruaje si java-06.md pranë README të repository-t, jashtë aplikacioni/.
Hiqi. Mos vendos sekrete, email ose fotografi kredencialesh.

## Çfarë ndërtova
Shpjego çfarë bëjnë manifesti, service worker dhe kopja publike në pajisje.

Manifesti (`src/app/manifest.ts`) i jep aplikacionit emrin RideShare AAB, ngjyrat dhe dy ikonat, qe shfletuesi ta njohe si aplikacion te instalueshem. Service worker-i (`public/sw.js`) ruan ne cache (`rideshare-public-v1`) listen `/api/udhetimet` dhe faqen offline, dhe i kthen ato kur nuk ka internet. Kopja ne pajisje eshte vetem per lexim dhe mund te jete e vjeter.


## Provat që bëra
### Prova 1: Manifesti dhe vizita online
Shkruaj URL-në që hape, emrin dhe përmasat e ikonave që pe, si dhe nëse u ruajt lista. Nëse shfletuesi nuk ofroi instalim, shënoje.

Hapa `localhost:3000/manifest.webmanifest`. Emri ishte RideShare AAB dhe ikonat 192×192 dhe 512×512 u hapen. Service worker-i `sw.js` ishte aktiv dhe `/api/udhetimet` u ruajt ne Cache Storage. Chrome e ofroi instalimin, por nuk e provova.


### Prova 2: Pa internet dhe pas rifreskimit
Si e simulove ndërprerjen? A u hapën tri kartat pas rifreskimit? Çfarë kohe ruajtjeje dhe mesazhi pe? Pse nuk ishte konfirmim rezervimi?

Aktivizova Network → Offline dhe rifreskova faqen. U hapen tri kartat (Prishtine 08:00, Fushe Kosove 08:15, Lipjan 07:45), koha e ruajtjes 10/22/2026, 10:32:48 AM dhe mesazhi "Lista e fundit e ruajtur · Mund te jete vjetruar." Butoni Kerko vend ishte i caktivizuar, sepse pa server nuk mund te konfirmohet rezervim.


### Prova 3: Lidhja rikthehet
Shëno orën e vjetër dhe të renë të ID 2 në Neon, çfarë shfaqej offline dhe çfarë ndodhi pas Rifresko listën. Rikthe orën fillestare.

Ne Neon ndryshova oren e ID 2 nga 08:15 ne 08:25. Offline faqja tregonte ende 08:15. Pasi rikthova rrjetin dhe klikova Rifresko listen, u shfaq 08:25 nga serveri me kohe te re. Ne fund e ktheva oren ne 08:15.


## Ku gjendet puna
Linku i repository-t, skedarët e shtuar dhe demo në Vercel nëse e ke publikuar.

Repository: https://github.com/velimeshabaniAAB/rideshare-mobile
Skedaret: `public/icons/`, `src/app/manifest.ts`, `src/app/layout.tsx`, `src/components/Pwa.tsx`, `public/sw.js`, `public/offline.html`.

## Çfarë mbetet për përmirësim
Çfarë ndodh në vizitën e parë pa kopje? Cili është kufizimi i leximit offline?

Ne viziten e pare pa internet nuk ka kopje, prandaj lista nuk hapet. Leximi offline tregon te dhena qe mund te jene te vjetra dhe nuk lejon rezervime.


## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Çfarë ndihme more dhe çfarë provove vetë, ose: Nuk përdora AI.

Te gjitha i bera vete.
