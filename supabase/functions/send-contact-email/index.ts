import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
}

const serviceLabels: Record<string, string> = {
  revisao: "Revisão Completa",
  oleo: "Troca de Óleo",
  diagnostico: "Diagnóstico Eletrónico",
  pneus: "Pneus e Travões",
  motor: "Reparação Motor",
  customizacao: "Customização",
  outro: "Outro",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("Received contact email request");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service, message }: ContactEmailRequest = await req.json();

    console.log("Processing contact from:", name, email);

    const serviceLabel = service ? serviceLabels[service] || service : "Não especificado";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Formulário de Contacto <onboarding@resend.dev>",
        to: ["mecanicomotociclos@gmail.com"],
        subject: `Novo contacto de ${name}`,
        html: `
          <h2>Novo contacto recebido</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefone:</strong> ${phone || "Não fornecido"}</p>
          <p><strong>Serviço Pretendido:</strong> ${serviceLabel}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${message || "Sem mensagem adicional"}</p>
          <hr>
          <p><em>Enviado através do formulário de contacto do website</em></p>
        `,
      }),
    });

    const data = await res.json();
    console.log("Resend API response:", data);

    if (!res.ok) {
      throw new Error(data.message || "Failed to send email");
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
