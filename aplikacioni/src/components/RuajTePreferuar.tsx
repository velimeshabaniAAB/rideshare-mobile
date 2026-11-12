"use client";
import { useRef, useState } from "react";

export default function RuajTePreferuar({
  id, fillimisht, simuloGabim = false,
}: { id: string; fillimisht: boolean; simuloGabim?: boolean }) {
  const [ruajtur, setRuajtur] = useState(fillimisht);
  const [ruhet, setRuhet] = useState(false);
  const [gabim, setGabim] = useState("");
  const duke = useRef(false); // ndalon klikimin e dyte para se te mbaroje i pari

  async function ruaj() {
    if (duke.current || ruajtur) return;
    duke.current = true;
    const meParje = ruajtur;
    // Optimistic: ekrani ndryshon menjehere.
    setRuajtur(true);
    setRuhet(true);
    setGabim("");
    try {
      const res = await fetch("/api/te-preferuarat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, simuloGabim }),
      });
      if (!res.ok) throw new Error();
    } catch {
      // Ruajtja deshtoi: rikthe gjendjen e meparshme.
      setRuajtur(meParje);
      setGabim("Ruajtja dështoi. Udhëtimi nuk u ruajt.");
    } finally {
      setRuhet(false);
      duke.current = false;
    }
  }

  return (
    <section>
      <button type="button" className="action" onClick={ruaj} disabled={ruhet || ruajtur}>
        {ruajtur ? "★ Te të preferuarat" : "☆ Ruaj udhëtimin te të preferuarat"}
      </button>
      <p aria-live="polite">{ruhet ? "Duke u ruajtur…" : ruajtur ? "U ruajt." : ""}</p>
      {gabim && (
        <p role="alert">
          {gabim}{" "}
          <button type="button" onClick={ruaj}>Provo përsëri</button>
        </p>
      )}
    </section>
  );
}