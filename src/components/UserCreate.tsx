import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Input } from "./Input";
import { Sidebar } from "./Sidebar";

export const UserCreate = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    nome: "",
    salario: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:3000/person", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: fields.nome,
          salary: fields.salario,
          approved: true,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    navigate("/");
  };
  return (
    <div className="flex">
      <Sidebar />
      <div className="container p-5 mt-10">
        <h1 className="text-4xl	">Cadastrar usuário</h1>
        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
          <div>
            <Input
              name="nome"
              value={fields.nome}
              onChange={(value) => setFields({ ...fields, nome: value })}
              label="Nome"
            />
          </div>
          <div>
            <Input
              name="salario"
              value={fields.salario}
              onChange={(value) => setFields({ ...fields, salario: value })}
              label="Salário"
            />
          </div>

          <div className="flex justify-end">
            <Button>Cadastrar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
