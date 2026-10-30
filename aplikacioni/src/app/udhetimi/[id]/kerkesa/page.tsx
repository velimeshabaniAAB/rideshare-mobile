import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";

export const dynamic = "force-dynamic";

export default async function Kerkesa({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let udhetim;
  try {
    udhetim = await gjejUdhetimin(id);
  } catch {
    return (
      <main>
        <h1>RideShare</h1>
        <p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p>
        <Link href="/">← Kthehu te lista</Link>
      </main>
    );
  }
  if (!udhetim) notFound();

  return (
    <main>
      <Link href={`/udhetimi/${id}`}>← Kthehu te detajet</Link>
      {udhetim.vende > 0 ? (
        <>
          <h1>Simulim: Në pritje</h1>
          <p>Kërkesa për {udhetim.nisja} nuk është dërguar te shoferi.</p>
          <p>Ruajtjen dhe konfirmimin real do t’i shtojmë më vonë.</p>
        </>
               ) : (
           <>
             <h1>Nuk ka vende të lira</h1>
             <p>Udhëtimi {udhetim.nisja} – {udhetim.destinacioni} në orën {udhetim.ora} është plot (0 vende).</p>
             <p>Kërkesa nuk u dërgua dhe nuk u rezervua asnjë vend. Kjo faqe është vetëm simulim.</p>
             <Link className="action" href="/">Shiko udhëtimet e tjera</Link>
           </>
         )}
    </main>
  );
}