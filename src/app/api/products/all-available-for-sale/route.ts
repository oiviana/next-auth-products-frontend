import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  try {
    // 🔹 Pega o token do front-end
    const token = req.headers.get("authorization");

    // 🔹 Extrai query params
    const query = req.nextUrl.search; // ex: "?page=1&limit=10"

    // 🔹 Faz fetch para o backend, repassando token e query
    const res = await fetch(`${backendUrl}/products/all-available-for-sale${query}`, {
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
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
