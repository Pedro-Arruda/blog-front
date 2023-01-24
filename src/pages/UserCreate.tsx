import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Sidebar } from "../components/Sidebar";

export const UserCreate = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState({
    nome: "",
    preco: "",
    image: "",
    qtd: "",
    active: true,
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
          price: fields.preco,
          image: fields.image,
          qtd: fields.qtd,
          active: true,
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
          <Input
            name="nome"
            value={fields.nome}
            onChange={(value) => setFields({ ...fields, nome: value })}
            label="Nome"
          />
          <Input
            name="preco"
            value={fields.preco}
            onChange={(value) => setFields({ ...fields, preco: value })}
            label="Preço"
          />
          <Input
            name="qtd"
            value={fields.qtd}
            onChange={(value) => setFields({ ...fields, qtd: value })}
            label="Quantidade"
          />
          <Input
            name="image"
            value={fields.image}
            onChange={(value) => setFields({ ...fields, image: value })}
            label="URL da imagem"
          />

          <div className="flex justify-end">
            <Button>Cadastrar</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
