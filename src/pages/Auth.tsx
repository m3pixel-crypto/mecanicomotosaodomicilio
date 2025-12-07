import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Mail, Lock, User, ArrowLeft, Bike } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const loginSchema = z.object({
  email: z.string().trim().email("Email inválido").max(255),
  password: z.string().min(6, "A password deve ter pelo menos 6 caracteres").max(100),
});

const signupSchema = loginSchema.extend({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As passwords não coincidem",
  path: ["confirmPassword"],
});

const resetSchema = z.object({
  email: z.string().trim().email("Email inválido").max(255),
});

type AuthMode = "login" | "signup" | "reset";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleResetPassword = async () => {
    const result = resetSchema.safeParse({ email: formData.email });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Email enviado!",
          description: "Verifique a sua caixa de correio para redefinir a password.",
        });
        setMode("login");
        setFormData({ email: "", password: "", name: "", confirmPassword: "" });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (mode === "reset") {
      await handleResetPassword();
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        const result = loginSchema.safeParse(formData);
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach((err) => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors);
          setLoading(false);
          return;
        }

        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast({
              title: "Erro de autenticação",
              description: "Email ou password incorretos.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Erro",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          toast({
            title: "Bem-vindo!",
            description: "Login efectuado com sucesso.",
          });
        }
      } else {
        const result = signupSchema.safeParse(formData);
        if (!result.success) {
          const fieldErrors: Record<string, string> = {};
          result.error.errors.forEach((err) => {
            if (err.path[0]) {
              fieldErrors[err.path[0] as string] = err.message;
            }
          });
          setErrors(fieldErrors);
          setLoading(false);
          return;
        }

        const { error } = await signUp(formData.email, formData.password, formData.name);
        if (error) {
          if (error.message.includes("already registered")) {
            toast({
              title: "Email já registado",
              description: "Este email já está associado a uma conta.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Erro",
              description: error.message,
              variant: "destructive",
            });
          }
        } else {
          // Send welcome email
          try {
            await supabase.functions.invoke("send-welcome-email", {
              body: {
                name: formData.name,
                email: formData.email,
              },
            });
          } catch (emailError) {
            console.error("Failed to send welcome email:", emailError);
          }
          
          toast({
            title: "Conta criada!",
            description: "A sua conta foi criada com sucesso. Verifique o seu email.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const changeMode = (newMode: AuthMode) => {
    setMode(newMode);
    setErrors({});
    setFormData({ email: "", password: "", name: "", confirmPassword: "" });
  };

  const getTitle = () => {
    switch (mode) {
      case "login":
        return "Entrar na Garagem";
      case "signup":
        return "Criar Conta";
      case "reset":
        return "Recuperar Password";
    }
  };

  const getSubtitle = () => {
    switch (mode) {
      case "login":
        return "Aceda à sua garagem virtual";
      case "signup":
        return "Comece a gerir as suas motas";
      case "reset":
        return "Introduza o seu email para recuperar a password";
    }
  };

  const getButtonText = () => {
    if (loading) return "A processar...";
    switch (mode) {
      case "login":
        return "Entrar";
      case "signup":
        return "Criar Conta";
      case "reset":
        return "Enviar Email";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao site
        </Button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Bike className="w-8 h-8 text-accent-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">{getTitle()}</h1>
            <p className="text-muted-foreground mt-2">{getSubtitle()}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="O seu nome"
                    value={formData.name}
                    onChange={handleChange}
                    className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@exemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            {mode !== "reset" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => changeMode("reset")}
                      className="text-sm text-accent hover:underline"
                    >
                      Esqueceu a password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-10 ${errors.password ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>
            )}

            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`pl-10 ${errors.confirmPassword ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            <Button
              type="submit"
              variant="cta"
              className="w-full"
              disabled={loading}
            >
              {getButtonText()}
            </Button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center space-y-2">
            {mode === "reset" ? (
              <p className="text-muted-foreground">
                Lembrou-se da password?
                <button
                  type="button"
                  onClick={() => changeMode("login")}
                  className="ml-2 text-accent hover:underline font-medium"
                >
                  Voltar ao login
                </button>
              </p>
            ) : (
              <p className="text-muted-foreground">
                {mode === "login" ? "Ainda não tem conta?" : "Já tem conta?"}
                <button
                  type="button"
                  onClick={() => changeMode(mode === "login" ? "signup" : "login")}
                  className="ml-2 text-accent hover:underline font-medium"
                >
                  {mode === "login" ? "Criar conta" : "Entrar"}
                </button>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auth;
