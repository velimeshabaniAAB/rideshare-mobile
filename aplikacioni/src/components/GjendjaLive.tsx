"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type Kerkese = { id: number; emri: string; statusi: "ne_pritje" | "pranuar" };
type Gjendja = { vende: number; roli: "shofer" | "udhetar" | "mysafir"; kerkesat: Kerkese[] };

export default function GjendjaLive({ id }: { id: string }) {
  const [gjendja, setGjendja] = useState<Gjendja | null>(null);
  const [rilidhemi, setRilidhemi] = useState(false);
  const [dergohet, setDergohet] = useState(false);
  const [mesazhi, setMesazhi] = useState("");
  const [koha, setKoha] = useState("");
  const dukeLexuar = useRef(false); // mos nis lexim te dyte para se te mbaroje i pari

  const lexo = useCallback(async () => {
    if (dukeLexuar.current) return;
    dukeLexuar.current = true;
    try {
      const res = await fetch(`/api/gjendja/${id}`, { cache: "no-store" });
      if (!res.ok) throw new Error();
      setGjendja(await res.json());
      setRilidhemi(false); // hiqet vetem pas nje pergjigjeje te suksesshme
      setKoha(new Date().toLocaleTimeString());
    } catch {
      setRilidhemi(true); // mbaj vlerat e fundit
    } finally {
      dukeLexuar.current = false;
    }
  }, [id]);

  useEffect(() => {
    const fillimi = setTimeout(lexo, 0); // leximi i pare menjehere pas hapjes
    const timer = setInterval(lexo, 5000); // lexim automatik cdo 5 sekonda
    window.addEventListener("online", lexo); // pas rikthimit lexo menjehere
    return () => {
      clearTimeout(fillimi);
      clearInterval(timer); // pastro timer-in kur largohesh nga faqja
      window.removeEventListener("online", lexo);
    };
  }, [lexo]);

  async function dergo(veprimi: "kerko" | "prano", kerkesaId?: number) {
    setDergohet(true);
    setMesazhi(veprimi === "prano" ? "Po ruhet pranimi…" : "Po dërgohet kërkesa…");
    try {
      const res = await fetch(`/api/gjendja/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ veprimi, kerkesaId }),
      });
      if (!res.ok) throw new Error();
      const { rezultati } = await res.json();
      // Suksesi shfaqet vetem pas konfirmimit te serverit.
      if (rezultati === "pranuar") setMesazhi("Pranimi u ruajt");
      else if (rezultati === "derguar") setMesazhi(""); // statusi poshte e tregon vete
      else if (rezultati === "hyr") setMesazhi("Hyr në llogari për ta bërë këtë veprim.");
      else setMesazhi("Asgjë nuk ndryshoi: kërkesa ekziston ose nuk ka vende.");
      await lexo();
    } catch {
      setMesazhi("Veprimi nuk u ruajt. Provo përsëri.");
    } finally {
      setDergohet(false);
    }
  }

  if (!gjendja) return <p>{rilidhemi ? "Po rilidhemi…" : "Po lexojmë gjendjen…"}</p>;
  const bllokuar = rilidhemi || dergohet;
  const imja = gjendja.kerkesat[0];

  return (
    <section>
      {rilidhemi && (
        <p role="alert">Po rilidhemi. Veprimet që kërkojnë rrjet janë të bllokuara.</p>
      )}
      <p>Vende të lira: <strong>{gjendja.vende}</strong></p>

      {gjendja.roli === "mysafir" && <p>Hyr te <a href="/panel">Paneli im</a> për të kërkuar vend.</p>}

      {gjendja.roli === "udhetar" && (
        !imja ? (
          <>
            <p>Pa kërkesë</p>
            <button type="button" className="action" disabled={bllokuar || gjendja.vende === 0}
              onClick={() => dergo("kerko")}>Kërko një vend</button>
          </>
        ) : imja.statusi === "ne_pritje" ? (
          <p>Kërkesa u dërgua · <strong>Në pritje</strong></p>
        ) : (
          <p><strong>U pranua</strong> · Vendi u konfirmua</p>
        )
      )}

      {gjendja.roli === "shofer" && (
        gjendja.kerkesat.length === 0 ? <p>Pa kërkesë</p> : (
          <ul>
            {gjendja.kerkesat.map((k) => (
              <li key={k.id}>
                {k.emri} · <strong>{k.statusi === "ne_pritje" ? "Në pritje" : "U pranua"}</strong>{" "}
                {k.statusi === "ne_pritje" && (
                  <button type="button" className="action" disabled={bllokuar || gjendja.vende === 0}
                    onClick={() => dergo("prano", k.id)}>Prano kërkesën</button>
                )}
              </li>
            ))}
          </ul>
        )
      )}

      <p aria-live="polite">{mesazhi}</p>
      <p className="shenim">Gjendja u lexua nga serveri {koha && `në ${koha}`}</p>
    </section>
  );
}