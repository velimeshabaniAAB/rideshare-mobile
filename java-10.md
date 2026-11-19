# RideShare — Java 10

## Çfarë ndërtova
Udhetari dergon kerkese per vend dhe shoferi e pranon. Te dy ekranet lexojne gjendjen nga serveri cdo 5 sekonda pa Refresh manual. Kerkesa ruhet ne Neon ne tabelen kerkesat me statuset ne_pritje dhe pranuar. Serveri e merr udhetarin nga sesioni dhe shoferin pronar nga udhetimi. Pranimi ndryshon statusin dhe vendet ne nje komande te vetme, ul vendet vetem nje here dhe kurre nen 0. Nese leximi deshton, mbahen vlerat e fundit dhe del "Po rilidhemi".

## Përgatitja e provës
Krijova udhetimin fiktiv 10 (Ferizaj - AAB) me 2 vende ne Neon, me llogarine time velimeshabaniAAB si shofer. Shoferi ishte ne dritaren normale te Chrome dhe udhetari ne dritaren Incognito me nje llogari tjeter GitHub, qe sesionet te jene te ndara.

## Provat që bëra
### Prova 1: Rasti 1 · Kërkesa mbërrin te shoferi
- Hapat: Ne Incognito udhetari klikoi "Kerko nje vend". Ne dritaren e shoferit nuk shtypa Refresh.
- Çfarë prisja: Shoferi e sheh kerkesen "Ne pritje" pas leximit te radhes dhe vendet mbeten 2.
- Çfarë pa realisht shoferi dhe udhëtari, pa Refresh: Udhetari pa "Kerkesa u dergua · Ne pritje". Shoferi pa "velimeshabani · Ne pritje" me butonin "Prano kerkesen" brenda pak sekondave. Vendet mbeten 2.
- Ku e verifikova ruajtjen: Ne Neon me SELECT * FROM kerkesat; doli kerkesa me statusin ne_pritje.

### Prova 2: Rasti 2 · Pranimi përditëson të dy ekranet
- Hapat dhe vendet para/pas: Shoferi klikoi "Prano kerkesen". Para: 2 vende, pas: 1 vend.
- Përsëritja e pranimit dhe prova me 0 vende: Pas pranimit butoni zhduket. Serveri pranon vetem kerkesa ne_pritje dhe vetem kur vende > 0, prandaj nje pranim i dyte nuk i ul vendet perseri. Ne Neon doli pranuar | 1. Kur vura vende = 0 ne Neon, te dy ekranet treguan 0 vende pas leximit te radhes dhe nuk mund te konfirmohej vend i ri.
- Çfarë pashë realisht te të dy përdoruesit: Shoferi pa "U pranua", "Pranimi u ruajt" dhe 1 vend. Udhetari pa "U pranua · Vendi u konfirmua" dhe 1 vend.

### Prova 3: Rasti 3 · Ndërprerja dhe rilidhja
- ID-ja e udhëtimit të ri të provës, cila dritare ishte offline dhe si e provova: Udhetimi 10. Dritarja e udhetarit (Incognito) ishte offline me DevTools, Network, Offline. Shoferi mbeti online.
- Pamja e fundit gjatë ndërprerjes: Doli "Po rilidhemi. Veprimet qe kerkojne rrjet jane te bllokuara." Vendet mbeten 2 dhe statusi "Ne pritje", nuk u bene 0. Te Network leximet dolen (failed).
- Çfarë ndryshoi pas rilidhjes: Shoferi pranoi kerkesen gjate kohes qe udhetari ishte offline. Pasi e ktheva udhetarin ne No throttling, ai pa "U pranua · Vendi u konfirmua" dhe 1 vend, pa paralajmerim.

## Ku gjendet puna
aplikacioni/src/lib/kerkesat.ts
aplikacioni/src/app/api/gjendja/[id]/route.ts
aplikacioni/src/components/GjendjaLive.tsx
aplikacioni/src/app/udhetimi/[id]/page.tsx
aplikacioni/schema-java10.sql

## Prova me kolegun
Proven e bera me dy llogari GitHub ne dy dritare te ndara: njera si shofer dhe tjetra si udhetar. Te dy ekranet treguan te njejtin rezultat pa Refresh manual.

## Çfarë mbetet për përmirësim
Leximi cdo 5 sekonda ben kerkesa edhe kur asgje nuk ndryshon. Hapi tjeter: te lexoj vetem kur faqja eshte e dukshme ose te perdor nje menyre me efikase per perditesimin.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Perdora Claude per udhezime tek nje kod.

## Pas dorëzimit të parë — përditëso më vonë
Do ta plotesoj pas pergjigjes se GitHub.