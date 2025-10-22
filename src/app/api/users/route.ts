import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  try {
    const body = await req.json();

    if (!body.email || !body.passwordHash) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    console.log('🔹 Tentando criar usuário no backend:', {
      backendUrl: `${backendUrl}/users`,
      email: body.email,
      hasPassword: !!body.passwordHash
    });

    const res = await fetch(`${backendUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log('🔹 Resposta do backend:', {
      status: res.status,
      statusText: res.statusText,
      ok: res.ok
    });

    const data = await res.json();
    console.log('🔹 Dados da resposta:', data);

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("❌ Erro ao criar usuário:", {
      error: error instanceof Error ? error.message : 'Unknown error',
      backendUrl,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}