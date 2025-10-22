import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const backendUrl = process.env.BACKEND_URL;

  try {
    const token = req.headers.get("authorization");
    const formData = await req.formData();

    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado" },
        { status: 400 }
      );
    }

    const backendFormData = new FormData();
    backendFormData.append("file", file);

    const res = await fetch(`${backendUrl}/upload/csv`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: token } : {}),
      },
      body: backendFormData,
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Erro ao fazer upload do CSV:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}