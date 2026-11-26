import Link from "next/link";
import PushStatusi from "@/components/PushStatusi";
import { njoftimetEMia, type Njoftim } from "@/lib/njoftimet";

export const dynamic = "force-dynamic";

export default async function Njoftimet() {
  let lista: Njoftim[] | null;
  try {
    lista = await njoftimetEMia();
  } catch {
    return <main><h1>Njoftimet</h1><p role="alert">Nuk u lidhëm me databazën. Provo përsëri.</p></main>;
  }
  if (!lista) {
    return <main><h1>Njoftimet</h1><p>Hyr te <Link href="/panel">Paneli im</Link> për të parë njoftimet.</p></main>;
  }
  const palexuara = lista.filter((n) => !n.lexuar).length;

  return (
    <main>
      <Link href="/">← Kthehu te lista</Link>
      <h1>Njoftimet</h1>
      <p>Të palexuara: <strong>{palexuara}</strong></p>
      <PushStatusi />
      {lista.length === 0 ? <p>Nuk ke njoftime.</p> : (
        <ul className="trip-list">
          {lista.map((n) => (
            <li key={n.id} className="trip-card">
              {/* prefetch={false}: njoftimi shenohet i lexuar vetem kur klikohet */}
              <Link href={`/kerkesat/${n.kerkesa_id}`} prefetch={false}>
                {n.lexuar ? "" : "● E re · "}{n.teksti}
              </Link>
              <br />
              <small>Kërkesa #{n.kerkesa_id} · {new Date(n.krijuar).toLocaleString("sq-AL")}</small>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
