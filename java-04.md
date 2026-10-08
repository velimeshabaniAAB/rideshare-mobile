# RideShare — Java 4 · Neon dhe PostgreSQL

## Çfarë ndërtova
Lidha aplikacionin me nje databaze PostgreSQL ne Neon. Lista dhe detajet i lexojne udhetimet me SELECT nga src/lib/udhetimet.ts, ndersa DATABASE_URL lexohet vetem ne server.

## Provat që bëra
### Prova 1: Ndryshimi në databazë shfaqet në aplikacion
Ndryshova oren e ID 2 nga 08:15 ne 08:25 ne SQL Editor. Pas rifreskimit, lista dhe detajet treguan 08:25. E ktheva ne 08:15 dhe te dyja faqet treguan 08:15.

### Prova 2: Lista bosh dhe rikthimi
Shtova WHERE false vetem te pyetja e lexoUdhetimet. U shfaq "Nuk ka udhetime per momentin." Pasi e hoqa, u kthyen tri kartat.

### Prova 3: Lidhja mungon, rikthimi dhe siguria
Ndryshova perkohesisht emrin DATABASE_URL ne .env.local dhe rinisa serverin. U shfaq "Nuk u lidhem me databazen. Provo perseri." Pasi e riktheva emrin dhe rinisa serverin, aplikacioni punoi serish. .env.local nuk shfaqet ne listen e GitHub Desktop.

## Ku gjendet puna
- SQL: aplikacioni/schema.sql
- Skedar i ri: src/lib/db.ts
- Ndryshova: src/lib/udhetimet.ts, src/app/page.tsx, src/app/udhetimi/[id]/page.tsx, src/app/udhetimi/[id]/kerkesa/page.tsx
- Repository: https://github.com/velimeshabaniAAB/rideshare-mobile

## Çfarë mbetet për përmirësim
Aplikacioni vetem lexon nga databaza dhe kerkesa "Ne pritje" mbetet simulim; nuk ka rezervim real. Hapi i ardhshem: ruajtja e kerkeses ne databaze.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Perdora Claude per te kuptuar hapat dhe per te kontrolluar raportin. Provat i bera dhe i verifikova vete.