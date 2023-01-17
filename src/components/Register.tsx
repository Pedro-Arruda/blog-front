import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createFetchError } from "../functions/createFetchError";
import { parseError } from "../functions/parseError";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./Button";
import { Input } from "./Input";

export const Register = () => {
  const { updateAuth } = useAuth();
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
      const response = await fetch("http://localhost:3000/user/register", {
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

      const data: any = await response.json();

      updateAuth(data);
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
        className="flex flex-col gap-6 px-20 py-14 w-200"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-center">Registrar</h1>
        <Input
          name="name"
          type="name"
          label="Nome"
          value={fields.name}
          required
          onChange={(value) => {
            setFields({ ...fields, name: value });
          }}
        />
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

        <Input
          name="confirmpassword"
          type="password"
          value={fields.confirmpassword}
          label="Repetir senha"
          required
          onChange={(value) => {
            setFields({ ...fields, confirmpassword: value });
          }}
        />

        {errorMessage && (
          <p className="bg-red-100 border border-red-200 text-red-700 text-center text-sm font-medium py-2.5 px-16 rounded-lg w-max mx-auto">
            {errorMessage}
          </p>
        )}

        <div className="flex justify-end gap-5">
          <Button type="button" onClick={() => navigate("/")}>
            Voltar
          </Button>
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600"
            onClick={() => handleSubmit}
          >
            Registrar
          </Button>
        </div>
      </form>
    </div>
  );
};
