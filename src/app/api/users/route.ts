import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  console.log('🔹 Testando conexão com backend:', backendUrl);

  try {
    const body = await req.json();

    if (!body.email || !body.passwordHash) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Primeiro, testa se o backend está respondendo com uma requisição simples
    console.log('🔹 Testando saúde do backend...');
    const healthCheck = await fetch(`${backendUrl}/health`, {
      method: "GET",
    }).catch(() => null);

    if (!healthCheck) {
      console.log('❌ Backend completamente offline');
      return NextResponse.json(
        { error: "Serviço temporariamente indisponível" },
        { status: 503 }
      );
    }

    console.log('🔹 Backend respondeu ao health check:', healthCheck.status);

    // Agora tenta a requisição real
    console.log('🔹 Enviando dados para criação de usuário...');
    const res = await fetch(`${backendUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log('🔹 Status da resposta:', res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.log('❌ Erro do backend:', errorText);
      return NextResponse.json(
        { error: "Erro no servidor backend" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
    
  } catch (error) {
    console.error("❌ Erro de conexão:", {
      error: error instanceof Error ? error.message : error,
      backendUrl
    });
    
    return NextResponse.json(
      { error: "Não foi possível conectar ao servidor" },
      { status: 503 }
    );
  }
}