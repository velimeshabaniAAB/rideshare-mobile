import "server-only";
import { getSql } from "./db";
import { profiliIm } from "./lejet";

export type Kerkese = { id: number; emri: string; statusi: "ne_pritje" | "pranuar" };
export type Gjendja = {
  vende: number;
  roli: "shofer" | "udhetar" | "mysafir";
  kerkesat: Kerkese[];
};

export async function lexoGjendjen(udhetimId: string): Promise<Gjendja | null> {
  const sql = getSql();
  const u = await sql`SELECT vende, shofer_id FROM udhetimet WHERE id = ${udhetimId}`;
  if (u.length === 0) return null;
  const p = await profiliIm();
  if (!p) return { vende: u[0].vende, roli: "mysafir", kerkesat: [] };

  if (p.id === u[0].shofer_id) {
    // Shoferi pronar sheh te gjitha kerkesat per udhetimin e vet.
    const rows = await sql`SELECT k.id, pr.emri, k.statusi FROM kerkesat k
      JOIN profilet pr ON pr.github_id = k.udhetar_id
      WHERE k.udhetim_id = ${udhetimId} ORDER BY k.id`;
    return { vende: u[0].vende, roli: "shofer", kerkesat: rows as Kerkese[] };
  }
  // Udhetari sheh vetem kerkesen e vet.
  const rows = await sql`SELECT k.id, pr.emri, k.statusi FROM kerkesat k
    JOIN profilet pr ON pr.github_id = k.udhetar_id
    WHERE k.udhetim_id = ${udhetimId} AND k.udhetar_id = ${p.id}`;
  return { vende: u[0].vende, roli: "udhetar", kerkesat: rows as Kerkese[] };
}

export async function dergoKerkese(udhetimId: string) {
  const p = await profiliIm();
  if (!p) return "hyr";
  const sql = getSql();
  // Udhetari vjen nga sesioni; shoferi nuk mund te kerkoje vend te udhetimi i vet.
  const rows = await sql`INSERT INTO kerkesat (udhetim_id, udhetar_id)
    SELECT id, ${p.id} FROM udhetimet
    WHERE id = ${udhetimId} AND vende > 0 AND shofer_id IS DISTINCT FROM ${p.id}
    ON CONFLICT (udhetim_id, udhetar_id) DO NOTHING
    RETURNING id`;
  return rows.length === 1 ? "derguar" : "jo";
}

export async function pranoKerkesen(kerkesaId: number) {
  const p = await profiliIm();
  if (!p) return "hyr";
  const sql = getSql();
  // Nje komande e vetme: statusi dhe vendet ndryshojne bashke ose aspak.
  // Kerkesa pranohet vetem nese eshte "ne_pritje", shoferi eshte pronar dhe ka vende.
  const rows = await sql`
    WITH k AS (
      SELECT k.id, k.udhetim_id FROM kerkesat k
      JOIN udhetimet u ON u.id = k.udhetim_id
      WHERE k.id = ${kerkesaId} AND k.statusi = 'ne_pritje'
        AND u.shofer_id = ${p.id} AND u.vende > 0
      FOR UPDATE
    ), v AS (
      UPDATE udhetimet SET vende = vende - 1
      WHERE id = (SELECT udhetim_id FROM k) AND vende > 0
      RETURNING id
    )
    UPDATE kerkesat SET statusi = 'pranuar'
    WHERE id = (SELECT id FROM k) AND EXISTS (SELECT 1 FROM v)
    RETURNING id`;
  return rows.length === 1 ? "pranuar" : "jo";
}