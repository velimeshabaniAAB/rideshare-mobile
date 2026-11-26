# RideShare — Java 11

## Çfarë ndërtova
Shtova njoftimet brenda aplikacionit. Shoferi tani mund ta pranoje ose ta refuzoje kerkesen. Ne te njejten komande ne server ruhet statusi i kerkeses dhe krijohet nje njoftim per udhetarin ne tabelen njoftimet, i lidhur me kerkesen me kerkesa_id. Udhetari i sheh njoftimet te faqja /njoftimet dhe numrin e te palexuarave ne faqen kryesore. Klikimi i njoftimit hap faqen /kerkesat/[id] te asaj kerkese dhe e shenon njoftimin si te lexuar. Cdo kerkese ka vetem nje njoftim (UNIQUE kerkesa_id), prandaj pergjigjet e perseritura nuk krijojne kopje. Push ne pajisje nuk e implementova sepse eshte opsional; aplikacioni tregon qe njoftimet shfaqen brenda aplikacionit.

## Provat që bëra
### Prova 1: Njoftimi tregon përgjigjen e saktë.
Hapat: Udhetari (Incognito, llogari e dyte GitHub) dergoi kerkese per udhetimin 10 dhe per udhetimin 11. Shoferi (dritarja normale) pranoi kerkesen e udhetimit 10 dhe refuzoi kerkesen e udhetimit 11.
Pritshmeria: Udhetari merr dy njoftime: "Shoferi e pranoi kerkesen tende per Ferizaj – AAB." dhe "Shoferi e refuzoi kerkesen tende per Gjilan – AAB.". Vendet e udhetimit 10 behen 1, ato te udhetimit 11 mbeten 2.
Vezhgimi: Te /njoftimet u shfaqen dy njoftime te reja me pergjigjen e sakte per secilin udhetim. Faqja kryesore tregoi "Njoftimet (2)". Vendet ishin 1 dhe 2. Kur klikova perseri pergjigjen, nuk u krijua njoftim i dyte. Kaloi.

### Prova 2: Klikimi hap kërkesën përkatëse.
Hapat: Te /njoftimet udhetari klikoi njoftimin e pranimit, pastaj u kthye dhe klikoi njoftimin e refuzimit.
Pritshmeria: Secili njoftim hap kerkesen e vet me statusin e sakte dhe njoftimi nuk shfaqet me si "E re".
Vezhgimi: Njoftimi i pranimit hapi kerkesen per Ferizaj – AAB me statusin "U pranua"; njoftimi i refuzimit hapi kerkesen per Gjilan – AAB me statusin "U refuzua". Pas hapjes, njoftimi humbi shenjen "E re" dhe numri i te palexuarave u ul. Kaloi.

### Prova 3: Aplikacioni funksionon edhe kur push nuk mbështetet.
Hapat: Hapa /njoftimet?pa_push=1, qe simulon nje shfletues pa mbeshtetje per push, dhe klikova nje njoftim.
Pritshmeria: Del mesazhi qe push nuk mbeshtetet, por njoftimet shfaqen dhe hapen normalisht.
Vezhgimi: U shfaq "Ky shfletues nuk mbeshtet push. Njoftimet shfaqen ketu, brenda aplikacionit." Njoftimet u shfaqen dhe klikimi hapi kerkesen. Kaloi.

## Ku gjendet puna
aplikacioni/schema-java11.sql
aplikacioni/src/lib/kerkesat.ts
aplikacioni/src/lib/njoftimet.ts
aplikacioni/src/app/api/gjendja/[id]/route.ts
aplikacioni/src/components/GjendjaLive.tsx
aplikacioni/src/components/PushStatusi.tsx
aplikacioni/src/app/njoftimet/page.tsx
aplikacioni/src/app/kerkesat/[id]/page.tsx
aplikacioni/src/app/page.tsx

## Çfarë mbetet për përmirësim
Njoftimet shfaqen vetem kur udhetari hap aplikacionin. Hapi tjeter: push ne pajisje me leje pas nje veprimi te qarte te perdoruesit, dhe njoftime edhe per shoferin kur vjen nje kerkese e re.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Perdora Claude per kodin dhe per udhezime. Provat me dy llogari dhe ne Neon i bera vete.
