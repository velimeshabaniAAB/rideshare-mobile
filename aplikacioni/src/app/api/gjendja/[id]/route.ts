import { dergoKerkese, lexoGjendjen, pranoKerkesen } from "@/lib/kerkesat";

export const dynamic = "force-dynamic";
// Pergjigjja eshte personale: mos e ruaj per nje sesion tjeter.
const pa_cache = { "Cache-Control": "private, no-store" };

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const gjendja = await lexoGjendjen(id);
    if (!gjendja) return Response.json({ error: "Udhetimi nuk u gjet" }, { status: 404, headers: pa_cache });
    return Response.json(gjendja, { headers: pa_cache });
  } catch {
    return Response.json({ error: "Databaza nuk u pergjigj" }, { status: 503, headers: pa_cache });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { veprimi, kerkesaId } = await req.json();
  try {
    const rezultati = veprimi === "prano"
      ? await pranoKerkesen(Number(kerkesaId))
      : await dergoKerkese(id);
    return Response.json({ rezultati }, { headers: pa_cache });
  } catch {
    return Response.json({ error: "Databaza nuk u pergjigj" }, { status: 503, headers: pa_cache });
  }
}