import { ruajTePreferuar } from "@/lib/tePreferuarat";

export async function POST(request: Request) {
  const { id, simuloGabim } = await request.json();
  if (simuloGabim) {
    // Vetem per proven e gabimit te serverit.
    return Response.json({ error: "Gabim i simuluar" }, { status: 500 });
  }
  if (!/^\d+$/.test(String(id))) {
    return Response.json({ error: "ID e pavlefshme" }, { status: 400 });
  }
  try {
    await ruajTePreferuar(String(id));
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Databaza nuk u pergjigj" }, { status: 503 });
  }
}