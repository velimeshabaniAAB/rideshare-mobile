# RideShare — Java 5 · Hyrja dhe lejet

Ruaje si java-05.md pranë README, jashtë aplikacioni/.
Hiqi shenjat. Mos vendos sekrete, email ose pamje të kredencialeve.

## Çfarë ndërtova
Shtova hyrjen me GitHub permes NextAuth dhe nje OAuth App.
- Identiteti: kush je, i verteton GitHub dhe ruhet ne tabelen `profilet` (`github_id`, emri).
- Roli: `udhetar` ose `shofer`. Profili i ri merr `udhetar`; roli ndryshohet vetem ne Neon SQL Editor.
- Pronesia: kolona `shofer_id` te `udhetimet`. Serveri lejon ndryshimin e ores vetem nese `shofer_id` perputhet me perdoruesin qe ka hyre.
ID 2 eshte e imja, ID 1 i perket shoferit fiktiv `DEMO-SHOFER-2`.

## Provat që bëra
### Prova 1: Hyrja, rifreskimi dhe dalja
Pa hyre, `/panel` tregonte vetem butonin e hyrjes. Pas hyrjes me GitHub u shfaqen emri, roli `udhetar` dhe ID-ja ime.Pas F5 mbeta e kycur. Pas **Dil** u shfaq perseri butoni i hyrjes.


### Prova 2: Shoferi ndryshon udhëtimin e vet
Si shofer e pronare e ID 2 e ndryshova oren ne 08:25. Ora e re u shfaq ne panel, liste, detaje dhe ne SQL Editor; ID 1 mbeti e pandryshuar. Pastaj e riktheva ne 08:15.


### Prova 3: Veprimi pa leje refuzohet
Kur ndryshova ID-ne ne 1 dhe klikova **Ruaj**, serveri e refuzoi. Formulari i vjeter u refuzua edhe pasi roli u kthye `udhetar` dhe pas daljes.Ne SQL Editor ora mbeti e pandryshuar ne te gjitha rastet.


## Ku gjendet puna
Repository: https://github.com/velimeshabaniAAB/rideshare-mobile
Skedaret e rinj: `schema-java05.sql`, `src/lib/auth.ts`, `src/app/api/auth/[...nextauth]/route.ts`, faqja `/panel`.
Sekretet ruhen vetem ne `.env.local`, qe nuk ngarkohet ne GitHub.

## Çfarë mbetet për përmirësim
Kerkesa per vend eshte ende simulim. Do te shtoja nje tabele rezervimesh me kontroll ne server per rezervime te dyfishta dhe numrin e vendeve.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Perdora AI per OAuth App tjerat dhe i bera vete sipas udhezimeve nga profesori.