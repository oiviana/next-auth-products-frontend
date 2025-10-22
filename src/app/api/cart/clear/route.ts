import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  try {
    const token = req.headers.get("authorization");
    const res = await fetch(`${backendUrl}/cart/clear`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Erro ao limpar carrinho:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}