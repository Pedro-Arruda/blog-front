import { User } from "phosphor-react";
import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { InputPassword } from "../components/InputPassword";
import { InputWithIcon } from "../components/InputWithIcon";
import { AuthProps } from "../context/authContext";
import { createFetchError } from "../functions/createFetchError";
import { parseError } from "../functions/parseError";
import { useAuth } from "../hooks/useAuth";

export interface DataProps {
  token: string;
  user: AuthProps;
}

export const Login = () => {
  const { updateAuth } = useAuth();
  const [errorMessage, setErrorMessage] = useState();

  const [fields, setFields] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/user/login", {
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
    <div className="flex justify-center flex-col gap-10 items-center h-screen w-screen">
      <h1 className="text-4xl font-bold text-gray-700">
        Bem vindo(a) ao blog!
      </h1>
      <form
        className="flex flex-col gap-7 p-10 w-[500px] bg-white shadow-lg"
        onSubmit={handleSubmit}
      >
        <InputWithIcon
          name="email"
          type="email"
          placeholder="exemplo@email.com"
          label="E-mail"
          value={fields.email}
          onChange={(value) => {
            setFields({ ...fields, email: value });
          }}
          icon={() => <User size={22} weight="fill" color="#44403c" />}
        />

        <InputPassword
          name="senha"
          placeholder="Sua senha"
          value={fields.password}
          label="Senha"
          onChange={(value) => {
            setFields({ ...fields, password: value });
          }}
        />

        {errorMessage && (
          <p className="bg-red-100 border border-red-200 text-red-700 text-center text-sm font-medium py-2.5 px-16 rounded-lg w-max mx-auto">
            {errorMessage}
          </p>
        )}

        <div className="flex justify-center gap-5 flex-col">
          <Button
            type="submit"
            onClick={() => handleSubmit}
            className="bg-neutral-800 hover:bg-neutral-900 transition-colors"
          >
            Entrar
          </Button>

          <Link to="/register" className="underline text-center">
            Registrar conta
          </Link>
        </div>
      </form>
    </div>
  );
};
