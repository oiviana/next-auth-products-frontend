import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const backendUrl = process.env.BACKEND_URL;

  try {
    const body = await req.json();

    if (!body.email || !body.passwordHash) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    const healthCheck = await fetch(`${backendUrl}/health`, {
      method: "GET",
    }).catch(() => null);

    if (!healthCheck) {
      return NextResponse.json(
        { error: "Serviço temporariamente indisponível" },
        { status: 503 }
      );
    }

    const res = await fetch(`${backendUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: "Erro no servidor backend" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
    
  } catch (error) {
    return NextResponse.json(
      { error: "Não foi possível conectar ao servidor" },
      { status: 503 }
    );
  }
}