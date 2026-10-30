# RideShare · Java 7

## Rasti im
GitHub: velimeshabaniaab
Kodi: P7-720
Skenari i zgjedhur (numri dhe titulli, nga Rastet 1–5): Rasti 2 · Pa vende
ID i udhëtimit në projektin tim: 2
Të dhënat fiktive të rastit: Prizren → AAB, ora 08:00, 1 vend. Ora per proven e re: 08:05. Rasti kufitar: 0 vende.

## Parashikimi
Ne liste pres te shoh udhetimin ID 2 si "Prizren – AAB", me oren 08:00 dhe 1 vend te lire, me butonin "Shiko detajet". Kur e hap, detajet duhet te tregojne te njejtat vlera si lista (Prizren, 08:00, 1 vend) dhe butonin aktiv "Kerko vend". Kur vendet behen 0, pres qe lista dhe detajet te tregojne 0 vende, dhe butoni te jete joaktiv me tekstin "Nuk ka vende te lira", pa premtuar rezervim. Te kerkesa pres qe aplikacioni te tregoje qarte se eshte vetem simulim dhe jo rezervim real; me 0 vende nuk duhet te thote se u gjet ose u rezervua nje vend.

## Dy probleme
1. Faqja e kerkeses me 0 vende ishte e paqarte. Hapat: ne Neon vendosa `vende = 0` per ID 2, pastaj hapa `localhost:3000/udhetimi/2/kerkesa`. Faqja tregonte vetem titullin "Nuk ka vende te lira." pa thene per cilin udhetim behet fjale, pa sqaruar qe kerkesa nuk u dergua dhe pa lidhje per t'u kthyer te lista (vetem "Kthehu te detajet").
2. Ne liste, karta e udhetimit me 0 vende (Prizren – AAB, 08:05, 0 vende) ka te njejtin buton blu "Shiko detajet" si karta me 2 vende. Hapat: hapa `localhost:3000` pasi ID 2 kishte 0 vende. Udhetimi i plote nuk dallohet ne shikim te pare, vetem duke lexuar numrin 0.

## Korrigjimi
Skedari: aplikacioni/src/app/udhetimi/[id]/kerkesa/page.tsx
Ky skedar eshte faqja e kerkeses demonstrative per nje udhetim. Ai lexon udhetimin sipas ID-se nga Neon me `gjejUdhetimin(id)`; nese ID nuk ekziston shfaq "Udhetimi nuk u gjet", nese ka vende (`udhetim.vende > 0`) shfaq "Simulim: Ne pritje". Ndryshova vetem degen kur `vende` eshte 0: ne vend te nje titulli te vetem, tani shfaqet cili udhetim eshte plot (nisja, destinacioni, ora), nje fjali qe kerkesa nuk u dergua dhe nuk u rezervua asnje vend sepse eshte simulim, dhe butoni "Shiko udhetimet e tjera" qe te kthen te lista. E zgjodha kete problem sepse lidhet direkt me Rastin 2: me 0 vende aplikacioni nuk duhet te premtoje rezervim dhe perdoruesi duhet te dije cfare te beje me pas.

## Versionet
Para: https://github.com/velimeshabaniaab/rideshare-mobile/commit/3c1c097aab5b575b2fbda47df0c383b8c5cd560f
Pas: https://github.com/velimeshabaniaab/rideshare-mobile/commit/557167ee65a2fd7b0b96b5c8b5649764abf731b0
## Provat që bëra
### Prova 1
Hapat: Ne Neon vendosa ID 2 si Prizren → AAB, ora 08:00, 1 vend. Hapa listen, pastaj detajet e ID 2 dhe `localhost:3000/udhetimi/2/kerkesa`.
Pritshmëria: Lista dhe detajet tregojne Prizren, 08:00, 1 vend; kerkesa tregon qe eshte simulim dhe nuk premton rezervim real.
Vëzhgimi: Kerkesa shfaqi "Simulim: Ne pritje", "Kerkesa per Prizren nuk eshte derguar te shoferi" dhe "Ruajtjen dhe konfirmimin real do t'i shtojme me vone". Kufiri i simulimit tregohet qarte. Kaloi.

### Prova 2
Hapat: Ne Neon vendosa `vende = 0` per ID 2. Rifreskova `localhost:3000/udhetimi/2/kerkesa` pas korrigjimit.
Pritshmëria: Faqja tregon "Nuk ka vende te lira", per cilin udhetim behet fjale, qe nuk u rezervua asgje dhe nje lidhje te lista.
Vëzhgimi: U shfaq "Nuk ka vende te lira", "Udhetimi Prizren – AAB ne oren 08:00 eshte plot (0 vende).", "Kerkesa nuk u dergua dhe nuk u rezervua asnje vend. Kjo faqe eshte vetem simulim." dhe butoni "Shiko udhetimet e tjera". Para korrigjimit shfaqej vetem titulli. Kaloi.

### Prova 3
Hapat: Ndryshova vetem oren e ID 2 ne 08:05 (vendet mbeten 0). Rifreskova listen dhe faqen e kerkeses.
Pritshmëria: Ora e re 08:05 duhet te shfaqet kudo dhe faqja e kerkeses te mbetet "Nuk ka vende te lira".
Vëzhgimi: Lista tregoi "Prizren – AAB, Ora: 08:05 · Vende te lira: 0". Kerkesa tregoi "Udhetimi Prizren – AAB ne oren 08:05 eshte plot (0 vende)." Ora vjen nga databaza, jo e shkruar ne kod. Kaloi. Ne liste vura re edhe Problemin 2: butoni "Shiko detajet" duket njesoj si per udhetimet me vende.

## Ndryshimi i ri
Ende nuk e kam demonstruar para kolegut ose profesorit. Hyrja qe ndryshova vete ishte ora: nga 08:00 ne 08:05 me 0 vende. Parashikova qe ora e re do te shfaqet ne liste dhe te kerkesa, sepse faqja e lexon udhetimin nga Neon ne cdo kerkese (`force-dynamic`), dhe ashtu doli. Do ta shpjegoj ne takimin e radhes.

## Ndihma nga AI
Perdora AI per sugjerimin e korrigjimit ne `kerkesa/page.tsx` tjerat i bera vete.