# RideShare — Java 8

## Çfarë ndërtova
Krijova komponentin Vendtakimi dhe e vura te detajet e udhetimit.Arta mund ta shkruaje vendtakimin dhe ta konfirmoje, ose te klikoje "Perdor vendndodhjen time".Leja kerkohet vetem pas klikimit.Nese leja refuzohet, fusha manuale punon prape.Te /java-08-test perdora te njejtin komponent me udhetimin fiktiv te Dritonit.

## Provat që bëra
### Prova 1: Leja nuk kërkohet sapo hapet faqja.
Hapat:Te Sensors zgjodha Berlin, rifreskova faqen pa klikuar, pastaj klikova butonin.
Pritshmeria:Nuk pyet per leje ne hapje.
Vezhgimi:Nuk pyeti.Pas klikimit doli "Pozicioni u mor" dhe "Saktesia rreth 150 m".Kaloi.

### Prova 2: Refuzimi i lejes nuk e bllokon përdoruesin.
Hapat:Bllokova Location, rifreskova dhe klikova butonin.Pastaj shkruajta Biblioteka dhe konfirmova.
Pritshmeria:Del mesazh refuzimi dhe mund ta shkruaj vendtakimin vete.
Vezhgimi:Doli "Leja u refuzua" dhe u konfirmua Biblioteka.Me "Location unavailable" doli mesazh dhe butoni u be aktiv serish.Kaloi.

### Prova 3: Dëshmitë në GitHub nuk tregojnë adresën time reale.
Hapat: Kontrollova fotot dhe skedaret.
Pritshmeria: Nuk ka adrese reale ose fjalekalime.
Vezhgimi: Fotot jane me Berlinin fiktiv.Ekrani tregon vetem saktesine. .env.local nuk ngarkohet. Kaloi.

## Ku gjendet puna
aplikacioni/src/components/Vendtakimi.tsx
aplikacioni/src/app/udhetimi/[id]/page.tsx
aplikacioni/src/app/java-08-test/page.tsx
mobile-week08.json
Ne Verceel do te publikohet pasi te beje kete push keshtu qe nuk mund ta vendos linkun.

## Çfarë mbetet për përmirësim
Pas rifreskimit vendtakimi humbet dhe Dritoni nuk e sheh.Hapi tjeter: ta ruaj ne Neon.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Perdora Claude per pak udhezim.Provat ne Chrome dhe te tjerat i bera vete.

## Prova me një hyrje të re
- Hyrja qe provova:vetem hapesira,pasi kisha konfirmuar Biblioteka.
- Parashikimi im para klikimit:Do te dale gabim dhe Biblioteka mbetet.
- Çfare pashe realisht:Doli "Shkruaj vendtakimin para se ta konfirmosh" dhe Biblioteka mbeti.
- Skedari dhe funksioni qe e shpjegojne:Vendtakimi.tsx,funksioni konfirmo()
- Çfare kuptova ose korrigjova: trim() i heq hapesirat,teksti behet bosh dhe vendtakimi nuk ndryshon.

