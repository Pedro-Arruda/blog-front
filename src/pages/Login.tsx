import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { AuthProps } from "../context/authContext";
import { createFetchError } from "../functions/createFetchError";
import { parseError } from "../functions/parseError";
import { useAuth } from "../hooks/useAuth";

export interface DataProps {
  token: string;
  user: AuthProps;
}

export const Login = () => {
  const navigate = useNavigate();
  const { updateAuth } = useAuth();
  const [errorMessage, setErrorMessage] = useState();

  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: fields.email,
          password: fields.password,
        }),
      });

      if (response.status !== 200) {
        const error = await createFetchError(response);

        throw error;
      }

      const data: any = await response.json();

      updateAuth(data);
    } catch (err: any) {
      if (err.status === 400) {
        setErrorMessage(err?.data?.body?.msg);
      }

      console.log(JSON.stringify(parseError(err), null, 2));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <form
        className="flex flex-col gap-6 px-20 py-14 w-200"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <Input
          name="email"
          type="email"
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
          value={fields.password}
          label="Senha"
          required
          onChange={(value) => {
            setFields({ ...fields, password: value });
          }}
        />

        {errorMessage && (
          <p className="bg-red-100 border border-red-200 text-red-700 text-center text-sm font-medium py-2.5 px-16 rounded-lg w-max mx-auto">
            {errorMessage}
          </p>
        )}

        <div className="flex justify-end gap-5">
          <Button type="submit" onClick={() => handleSubmit}>
            Entrar
          </Button>
          <Button
            type="button"
            className="bg-green-500 hover:bg-green-600"
            onClick={() => navigate("/register")}
          >
            Registrar
          </Button>
        </div>
      </form>
    </div>
  );
};
