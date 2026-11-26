import "server-only";
import { getSql } from "./db";
import { profiliIm } from "./lejet";

export type Njoftim = { id: number; kerkesa_id: number; teksti: string; lexuar: boolean; krijuar: string };

export async function njoftimetEMia(): Promise<Njoftim[] | null> {
  const p = await profiliIm();
  if (!p) return null;
  const sql = getSql();
  const rows = await sql`SELECT id, kerkesa_id, teksti, lexuar, krijuar FROM njoftimet
    WHERE perdoruesi_id = ${p.id} ORDER BY krijuar DESC, id DESC`;
  return rows as Njoftim[];
}

export async function numriPalexuara(): Promise<number> {
  const p = await profiliIm();
  if (!p) return 0;
  const sql = getSql();
  const rows = await sql`SELECT count(*)::int AS n FROM njoftimet
    WHERE perdoruesi_id = ${p.id} AND lexuar = false`;
  return rows[0].n;
}

export type KerkesaDetaje = {
  id: number; statusi: "ne_pritje" | "pranuar" | "refuzuar";
  udhetim_id: string; nisja: string; destinacioni: string; ora: string; emri: string;
};

// Hap kerkesen dhe sheno si te lexuar njoftimin e saj (vetem per udhetarin e vet).
export async function hapKerkesen(kerkesaId: number): Promise<KerkesaDetaje | "hyr" | null> {
  const p = await profiliIm();
  if (!p) return "hyr";
  const sql = getSql();
  const rows = await sql`SELECT k.id, k.statusi, u.id AS udhetim_id, u.nisja, u.destinacioni, u.ora, pr.emri
    FROM kerkesat k
    JOIN udhetimet u ON u.id = k.udhetim_id
    JOIN profilet pr ON pr.github_id = k.udhetar_id
    WHERE k.id = ${kerkesaId} AND (k.udhetar_id = ${p.id} OR u.shofer_id = ${p.id})`;
  if (rows.length === 0) return null; // nuk ekziston ose nuk eshte e jotja
  await sql`UPDATE njoftimet SET lexuar = true
    WHERE kerkesa_id = ${kerkesaId} AND perdoruesi_id = ${p.id} AND lexuar = false`;
  return rows[0] as KerkesaDetaje;
}
