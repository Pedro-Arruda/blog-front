import { FormEvent, useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { AuthProps } from "../../context/authContext";
import { useAuth } from "../../hooks/useAuth";
import "./Login.css";

interface DataProps {
  accessToken: string;
  expiresAt: string;
  refreshToken: string;
  usuario: AuthProps;
}

export const Login = () => {
  const { updateAuth } = useAuth();

  const [fields, setFields] = useState({
    email: "",
    senha: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetch("https://help-go-auth-dev.allcom.dev/auth/usuarios/sign-in", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: fields.email,
        senha: fields.senha,
      }),
    })
      .then((response) => response.json())
      .then((data: DataProps) => updateAuth(data.usuario));
  };

  return (
    <div className=" flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <Input
          name="email"
          type="email"
          className="w-72"
          label="E-mail"
          value={fields.email}
          required
          onChange={(value) => {
            setFields({ ...fields, email: value });
          }}
        />

        <Input
          name="senha"
          type="password"
          value={fields.senha}
          label="Senha"
          required
          onChange={(value) => {
            setFields({ ...fields, senha: value });
          }}
        />

        <Button type="submit">Enviar</Button>
      </form>
    </div>
  );
};
