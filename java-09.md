# RideShare — Java 9

## Çfarë ndërtova
Te detajet e udhetimit shtova butonin "Ruaj udhetimin te te preferuarat". Kur e klikoj, butoni ndryshon menjehere ne *(yll i plot) dhe del "Po ruhet…". Udhetimi ruhet ne Neon. Nese ruajtja deshton, butoni kthehet si ishte dhe del "Provo perseri".

## Provat që bëra
### Prova 1: Ruajtja e suksesshme mbetet pas rifreskimit.
Hapat: Hapa udhetimin 2, klikova butonin dhe rifreskova faqen.
Pritshmeria: Udhetimi mbetet i ruajtur pas rifreskimit.
Vezhgimi: Doli "U ruajt." dhe pas rifreskimit butoni mbeti *(yll i plot).Kaloi.

### Prova 2: Gabimi i serverit nuk lë një sukses të rremë në ekran.
Hapat: Hapa udhetimin 1 me ?gabim=1 per te simuluar gabim serveri dhe klikova butonin.
Pritshmeria: Butoni kthehet si ishte dhe del mesazh gabimi.
Vezhgimi: Butoni u kthye *(yll i zbrazet),doli "Ruajtja deshtoi" dhe "Provo perseri".Pas rifreskimit mbeti *(yll i zbrazet).Kaloi.

### Prova 3: Klikimet e përsëritura nuk krijojnë kopje.
Hapat: Klikova butonin shpejt 5 here te udhetimi 3 dhe kontrollova tabelen ne Neon.
Pritshmeria: Udhetimi ruhet vetem nje here.
Vezhgimi: Ne Neon doli vetem 1 rresht. Kaloi.

## Ku gjendet puna
aplikacioni/src/components/RuajTePreferuar.tsx
aplikacioni/src/app/api/te-preferuarat/route.ts
aplikacioni/src/lib/tePreferuarat.ts
aplikacioni/src/app/udhetimi/[id]/page.tsx
schema-java09.sql

## Çfarë mbetet për përmirësim
Perdoruesi eshte fiktiv dhe udhetimi nuk mund te hiqet nga te preferuarat. Hapi tjeter: ta shtoj heqjen.

## Ndihma nga AI (Artificial Intelligence – inteligjencë artificiale)
Perdora AI per nje udhezim tek zevendesimi i nje permbajtjeje.