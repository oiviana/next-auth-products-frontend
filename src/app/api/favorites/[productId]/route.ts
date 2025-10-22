import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const backendUrl = process.env.BACKEND_URL;

  try {
    const token = req.headers.get("authorization");
    
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const productId = pathSegments[pathSegments.length - 1];

    const res = await fetch(`${backendUrl}/favorites/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Erro ao remover favorito:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}