import "server-only";
import { getSql } from "./db";

// Perdoruesi fiktiv i laboratorit (pa login).
export const PERDORUESI = "arta-demo";

export async function eshteRuajtur(udhetimId: string): Promise<boolean> {
  const sql = getSql();
  const rows = await sql`SELECT 1 FROM te_preferuarat
    WHERE perdoruesi = ${PERDORUESI} AND udhetim_id = ${udhetimId}`;
  return rows.length > 0;
}

export async function ruajTePreferuar(udhetimId: string) {
  const sql = getSql();
  // ON CONFLICT: klikimet e perseritura nuk krijojne kopje.
  await sql`INSERT INTO te_preferuarat (perdoruesi, udhetim_id)
    VALUES (${PERDORUESI}, ${udhetimId})
    ON CONFLICT (perdoruesi, udhetim_id) DO NOTHING`;
}