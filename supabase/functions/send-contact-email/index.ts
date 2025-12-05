import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(20).optional(),
  service: z.string().max(50).optional(),
  message: z.string().max(2000).optional(),
});

// HTML escape function to prevent injection
const escapeHtml = (str: string): string => {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return str.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
};

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
    const body = await req.json();
    
    // Server-side validation
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      console.error("Validation failed:", validationResult.error.errors);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid input data",
          details: validationResult.error.errors 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, phone, service, message } = validationResult.data;

    // Escape all user inputs for HTML
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : "Não fornecido";
    const safeMessage = message ? escapeHtml(message) : "Sem mensagem adicional";

    console.log("Processing contact from:", safeName, safeEmail);

    const serviceLabel = service ? (serviceLabels[service] || escapeHtml(service)) : "Não especificado";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Formulário de Contacto <onboarding@resend.dev>",
        to: ["mecanicomotociclos@gmail.com"],
        subject: `Novo contacto de ${safeName}`,
        html: `
          <h2>Novo contacto recebido</h2>
          <p><strong>Nome:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Telefone:</strong> ${safePhone}</p>
          <p><strong>Serviço Pretendido:</strong> ${serviceLabel}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${safeMessage}</p>
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
      JSON.stringify({ success: false, error: "An error occurred processing your request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
