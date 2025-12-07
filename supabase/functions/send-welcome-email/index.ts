import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input validation schema
const welcomeEmailSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
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

const handler = async (req: Request): Promise<Response> => {
  console.log("Received welcome email request");

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Server-side validation
    const validationResult = welcomeEmailSchema.safeParse(body);
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

    const { name, email } = validationResult.data;

    // Escape all user inputs for HTML
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);

    console.log("Sending welcome email to:", safeName, safeEmail);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Moto Ciclos <onboarding@resend.dev>",
        to: [email],
        subject: `Bem-vindo à Moto Ciclos, ${safeName}!`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #2C3E50; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #2C3E50; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #FFFFFF; margin: 0; font-size: 28px;">🏍️ Moto Ciclos</h1>
            </div>
            
            <div style="background-color: #F4F4F4; padding: 30px; border-radius: 0 0 8px 8px;">
              <h2 style="color: #2C3E50; margin-top: 0;">Olá ${safeName}!</h2>
              
              <p>Bem-vindo à <strong>Moto Ciclos</strong>! A sua conta foi criada com sucesso.</p>
              
              <p>Agora pode aceder à sua <strong>Garagem Virtual</strong> onde pode:</p>
              
              <ul style="padding-left: 20px;">
                <li>📋 Registar as suas motas</li>
                <li>🔧 Acompanhar o histórico de serviços</li>
                <li>⏰ Receber alertas de manutenção</li>
                <li>📅 Agendar serviços online</li>
              </ul>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://lovable.dev" style="background-color: #E74C3C; color: #FFFFFF; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                  Aceder à Garagem
                </a>
              </div>
              
              <p>Se tiver alguma dúvida, não hesite em contactar-nos:</p>
              <p>📞 <a href="tel:+351910392073" style="color: #E74C3C;">+351 910 392 073</a></p>
              <p>📧 <a href="mailto:mecanicomotociclos@gmail.com" style="color: #E74C3C;">mecanicomotociclos@gmail.com</a></p>
              
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              
              <p style="font-size: 12px; color: #666; text-align: center;">
                Este email foi enviado automaticamente. Por favor não responda directamente.
              </p>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const data = await res.json();
    console.log("Resend API response:", data);

    if (!res.ok) {
      throw new Error(data.message || "Failed to send welcome email");
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending welcome email:", error);
    return new Response(
      JSON.stringify({ success: false, error: "An error occurred sending the welcome email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
