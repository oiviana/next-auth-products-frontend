import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  try {
    const token = req.headers.get("authorization");
    const body = await req.json();

    const res = await fetch(`${backendUrl}/favorites/toggle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Erro ao alternar favorito:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}