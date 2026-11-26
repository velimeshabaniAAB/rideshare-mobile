import Link from "next/link";
import { hapKerkesen, type KerkesaDetaje } from "@/lib/njoftimet";

export const dynamic = "force-dynamic";
const teksti = { ne_pritje: "Në pritje", pranuar: "U pranua", refuzuar: "U refuzua" };

export default async function Kerkesa({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) return <main><h1>Kërkesa nuk u gjet</h1></main>;
  let k: KerkesaDetaje | "hyr" | null;
  try {
    k = await hapKerkesen(Number(id)); // shenon njoftimin si te lexuar
  } catch {
    return <main><h1>Kërkesa</h1><p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p></main>;
  }
  if (k === "hyr") return <main><h1>Kërkesa</h1><p>Hyr te <Link href="/panel">Paneli im</Link>.</p></main>;
  if (!k) return <main><h1>Kërkesa nuk u gjet</h1><p>Kjo kërkesë nuk ekziston ose nuk është e jotja.</p><Link href="/njoftimet">← Njoftimet</Link></main>;

  return (
    <main>
      <Link href="/njoftimet">← Njoftimet</Link>
      <h1>Kërkesa #{k.id}</h1>
      <p>Udhëtimi: {k.nisja} – {k.destinacioni} · Ora {k.ora}</p>
      <p>Udhëtari: {k.emri}</p>
      <p>Statusi: <strong>{teksti[k.statusi]}</strong></p>
      <p>Njoftimi u shënua si i lexuar.</p>
      <Link className="action" href={`/udhetimi/${k.udhetim_id}`}>Hap udhëtimin</Link>
    </main>
  );
}
