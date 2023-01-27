import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Navbar } from "../components/Navbar";
import { PostEditor } from "../components/PostEditor";
import { useAuth } from "../hooks/useAuth";

export const NewPost = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    title: "",
    imgCover: "",
    content: "",
    tags: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(fields);

    const tagsArray = fields.tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase());

    try {
      await fetch("http://localhost:3001/post", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: fields.title,
          imgCover: fields.imgCover,
          content: fields.content,
          tags: tagsArray,
          author: auth?.user.name,
        }),
      });

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container  mx-auto flex flex-col gap-10">
      <Navbar />

      <div>
        <h1 className="text-4xl font-semibold mb-3">Criar post</h1>
        <p>Escreva sobre o que quiser e compartilhe seu conhecimento!</p>
      </div>

      <form className="flex flex-col gap-7 mb-10" onSubmit={handleSubmit}>
        <Input
          label="Título"
          name="title"
          placeholder="Pense em um bom título"
          value={fields.title}
          onChange={(value) => setFields({ ...fields, title: value })}
        />

        <Input
          label="URL da imagem"
          name="imgCover"
          placeholder="Insira uma imagem que represente seu post"
          value={fields.imgCover}
          onChange={(value) => setFields({ ...fields, imgCover: value })}
        />

        <PostEditor
          onChange={(value) => setFields({ ...fields, content: value })}
          label="Conteúdo do post"
        />

        <Input
          label="Tags"
          name="tags"
          placeholder="Insira as tags separadas por vírgula"
          value={fields.tags}
          onChange={(value) => setFields({ ...fields, tags: value })}
        />

        <div className="flex justify-end">
          <Button className="w-max text" type="submit">
            POSTAR
          </Button>
        </div>
      </form>
    </div>
  );
};
