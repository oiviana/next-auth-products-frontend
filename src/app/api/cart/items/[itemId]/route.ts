import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const backendUrl = process.env.BACKEND_URL;

  try {
    const token = req.headers.get("authorization");

    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const itemId = pathSegments[pathSegments.length - 1];
    const res = await fetch(`${backendUrl}/cart/items/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Erro ao remover item do carrinho:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const backendUrl = process.env.BACKEND_URL;

  try {
    const token = req.headers.get("authorization");

    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const itemId = pathSegments[pathSegments.length - 1];

    const body = await req.json();
    const res = await fetch(`${backendUrl}/cart/items/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: token } : {}),
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Erro ao atualizar item do carrinho:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}