import { FormEvent, useState } from "react";
import { UserProps } from "../../context/authContext";
import { useAuth } from "../../hooks/useAuth";
import "./Login.css";

interface DataProps {
  accessToken: string;
  expiresAt: string;
  refreshToken: string;
  usuario: UserProps;
}

export const Login = () => {
  const { user, setUser } = useAuth();

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
      .then((data: DataProps) => setUser(data.usuario));
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            name="email"
            type="email"
            value={fields.email}
            required
            onChange={(e) => {
              setFields({ ...fields, email: e.target.value });
            }}
          />
        </div>

        <div>
          <label htmlFor="senha">Senha</label>
          <input
            name="senha"
            type="password"
            value={fields.senha}
            required
            onChange={(e) => {
              setFields({ ...fields, senha: e.target.value });
            }}
          />
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
