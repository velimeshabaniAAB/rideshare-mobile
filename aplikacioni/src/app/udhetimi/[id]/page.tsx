import Link from "next/link";
import { notFound } from "next/navigation";
import { gjejUdhetimin } from "@/lib/udhetimet";
import Vendtakimi from "@/components/Vendtakimi";
import RuajTePreferuar from "@/components/RuajTePreferuar";
import { eshteRuajtur } from "@/lib/tePreferuarat";

export const dynamic = "force-dynamic";

export default async function Detajet({
  params, searchParams,
}: { params: Promise<{ id: string }>; searchParams: Promise<{ gabim?: string }> }) {
  const { id } = await params;
  const { gabim } = await searchParams;
  let udhetim;
  let ruajtur = false;
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
  try {
    ruajtur = await eshteRuajtur(id);
  } catch {
    ruajtur = false; // tabela mungon ose databaza vonon: detajet hapen prape
  }

  return (
    <main>
      <Link href="/">← Kthehu te lista</Link>
      <h1>{udhetim.nisja} – {udhetim.destinacioni}</h1>
      <p>Ora: {udhetim.ora}</p>
      <p>Vendtakimi: {udhetim.vendtakimi}</p>
      <p>Vende të lira: {udhetim.vende}</p>
      {udhetim.vende > 0 ? (
        <Link className="action" href={`/udhetimi/${id}/kerkesa`}>
          Kërko vend
        </Link>
      ) : <button className="action" disabled>Nuk ka vende të lira</button>}
      <RuajTePreferuar id={id} fillimisht={ruajtur} simuloGabim={gabim === "1"} />
      <Vendtakimi />
    </main>
  );
}