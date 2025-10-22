import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  try {
    const token = req.headers.get("authorization");

    const res = await fetch(`${backendUrl}/favorites`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Erro ao buscar favoritos:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}