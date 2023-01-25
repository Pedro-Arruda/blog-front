import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createFetchError } from "../functions/createFetchError";
import { parseError } from "../functions/parseError";
import { Button } from "../components/Button";
import { InputWithIcon } from "../components/InputWithIcon";
import {
  ArrowCounterClockwise,
  EnvelopeOpen,
  Lock,
  User,
} from "phosphor-react";

export const Register = () => {
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/user/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          password: fields.password,
          confirmpassword: fields.confirmpassword,
        }),
      });

      if (response.status !== 200) {
        const error = await createFetchError(response);

        throw error;
      }

      navigate("/");
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
        className="flex flex-col gap-6 px-20 py-14 w-[1000px]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-center">Registrar</h1>
        <InputWithIcon
          name="name"
          type="name"
          label="Nome"
          value={fields.name}
          onChange={(value) => {
            setFields({ ...fields, name: value });
          }}
          placeholder="seu nome"
          icon={() => <User size={22} weight="fill" color="#44403c" />}
        />
        <InputWithIcon
          name="email"
          type="email"
          label="E-mail"
          value={fields.email}
          onChange={(value) => {
            setFields({ ...fields, email: value });
          }}
          placeholder="exemplo@email.com"
          icon={() => <EnvelopeOpen size={22} weight="fill" color="#44403c" />}
        />

        <InputWithIcon
          name="senha"
          type="password"
          value={fields.password}
          label="Senha"
          onChange={(value) => {
            setFields({ ...fields, password: value });
          }}
          placeholder="sua senha"
          icon={() => <Lock size={22} weight="fill" color="#44403c" />}
        />

        <InputWithIcon
          name="confirmpassword"
          type="password"
          value={fields.confirmpassword}
          label="Repetir senha"
          onChange={(value) => {
            setFields({ ...fields, confirmpassword: value });
          }}
          placeholder="repita sua senha"
          icon={() => (
            <ArrowCounterClockwise size={22} weight="fill" color="#44403c" />
          )}
        />

        {errorMessage && (
          <p className="bg-red-100 border border-red-200 text-red-700 text-center text-sm font-medium py-2.5 px-16 rounded-lg w-max mx-auto">
            {errorMessage}
          </p>
        )}

        <div className="flex justify-end items-center gap-10">
          <Link to="/" className="underline text-center text-lg">
            Voltar
          </Link>
          <Button
            type="submit"
            className="bg-neutral-800 hover:bg-neutral-900 transition-colors"
            onClick={() => handleSubmit}
          >
            Registrar
          </Button>
        </div>
      </form>
    </div>
  );
};
