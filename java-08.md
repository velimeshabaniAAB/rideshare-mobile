# RideShare — Java 8

## Çfarë ndërtova
Krijova komponentin Vendtakimi dhe e vura te detajet e udhetimit. Arta mund ta shkruaje vendtakimin dhe ta konfirmoje, ose te klikoje "Perdor vendndodhjen time". Leja kerkohet vetem pas klikimit. Nese leja refuzohet, fusha manuale punon prape. Te /java-08-test perdora te njejtin komponent me udhetimin fiktiv te Dritonit.

## Provat që bëra
### Prova 1: Leja nuk kërkohet sapo hapet faqja.
Hapat: Te Sensors zgjodha Berlin, rifreskova faqen pa klikuar, pastaj klikova butonin.
Pritshmeria: Nuk pyet per leje ne hapje.
Vezhgimi: Nuk pyeti. Pas klikimit doli "Pozicioni u mor" dhe "Saktesia rreth 150 m". Kaloi.

### Prova 2: Refuzimi i lejes nuk e bllokon përdoruesin.
Hapat: Bllokova Location, rifreskova dhe klikova butonin. Pastaj shkruajta Biblioteka dhe konfirmova.
Pritshmeria: Del mesazh refuzimi dhe mund ta shkruaj vendtakimin vete.
Vezhgimi: Doli "Leja u refuzua" dhe u konfirmua Biblioteka. Me "Location unavailable" doli mesazh dhe butoni u be aktiv serish. Kaloi.

### Prova 3: Dëshmitë në GitHub nuk tregojnë adresën time reale.
Hapat: Kontrollova fotot dhe skedaret.
Pritshmeria: Nuk ka adrese reale ose fjalekalime.
Vezhgimi: Fotot jane me Berlinin fiktiv. Ekrani tregon vetem saktesine. Skedari .env.local nuk ngarkohet. Kaloi.

## Ku gjendet puna
aplikacioni/src/components/Vendtakimi.tsx
aplikacioni/src/app/udhetimi/[id]/page.tsx
aplikacioni/src/app/java-08-test/page.tsx
mobile-week08.json
Demonstrimi ende nuk eshte publikuar ne Vercel, prandaj nuk ka link.

## Çfarë mbetet për përmirësim
Pas rifreskimit vendtakimi humbet dhe Dritoni nuk e sheh. Hapi tjeter: ta ruaj ne Neon.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Perdora Claude per udhezime hap pas hapi dhe per kodin e komponentit. Provat ne Chrome i bera vete.

## Prova me një hyrje të re
- Hyrja që provova: Ne faqen localhost:3000/java-08-test fillimisht konfirmova "Biblioteka", pastaj ne fushe shkruajta vetem tre hapesira dhe klikova "Konfirmo ne telefon".
- Parashikimi im para klikimit: Prita qe te dale mesazh gabimi dhe vendtakimi i konfirmuar te mbetet "Biblioteka", sepse hapesirat nuk jane vendtakim.
- Çfarë pashë realisht: Poshte butonit doli mesazhi "Shkruaj vendtakimin para se ta konfirmosh." dhe vendtakimi i konfirmuar mbeti "Biblioteka". Parashikimi doli i sakte.
- Skedari dhe funksioni që e shpjegojnë: aplikacioni/src/components/Vendtakimi.tsx, funksioni konfirmo(), ku teksti.trim() kontrollohet para setVendtakimi().
- Çfarë kuptova ose korrigjova: Kuptova qe trim() i heq hapesirat dhe teksti behet bosh, prandaj konfirmo() ndalet me return dhe nuk e ndryshon vendtakimin e meparshem. Teksti ne fushe dhe vendtakimi i konfirmuar jane dy vlera te ndara me useState.

Këtë pjesë e shpjegoj në klasë. Kontrolli automatik nuk verifikon vërtetësinë e provës.