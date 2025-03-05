import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/AuthContext"
import { useState } from "react"
import { useNavigate } from "react-router"

export function RegisterForm({ className, ...props }) {

  const { register, error } = useAuth();

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const result = await register(data);
    if (result) {
      navigate('/');
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8"
            onSubmit={handleSubmitForm}
          >
            {error ? <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm font-medium" id="error-message">{error}</div> : null}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Regístrate</h1>
                <p className="text-muted-foreground text-balance">
                  Crea tu cuenta
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  type="name"
                  name="name"
                  value={data.name}
                  onChange={handleInputChange}
                  required />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@ejemplo.com"
                  value={data.email}
                  onChange={handleInputChange}
                  required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleInputChange}
                  required />
              </div>
              <Button type="submit" className="w-full">
                Registrarse
              </Button>
              <div className="text-center text-sm">
                ¿Ya tienes cuenta?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Login
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/images/realState.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale bg-center" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}