import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Navbar } from "../components/Navbar";
import { PostEditor } from "../components/PostEditor";
import { createFetchError } from "../functions/createFetchError";
import { parseError } from "../functions/parseError";

interface FieldsPost {
  title: string;
  imgCover: string;
  content: string;
  tags: string;
  active: boolean;
}

export const EditPost = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [fields, setFields] = useState<FieldsPost>({
    title: "",
    imgCover: "",
    content: "",
    tags: "",
    active: false,
  });

  const fetchPost = async () => {
    try {
      const requestURL = `http://localhost:3001/post/id/${params.id}`;

      const response = await fetch(requestURL);

      if (response.status !== 200) {
        const error = await createFetchError(response);

        throw error;
      }

      const data: Post = await response.json();

      setFields({
        title: data?.title,
        content: data.content,
        imgCover: data.imgCover || "",
        tags: data.tags.toString(),
        active: data.active,
      });
    } catch (err) {
      console.log(JSON.stringify(parseError(err), null, 2));
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const tagsArray = fields.tags
      .split(",")
      .map((tag) => tag.trim().toLowerCase());

    try {
      await fetch(`http://localhost:3001/post/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: fields.title,
          imgCover: fields.imgCover,
          content: fields.content,
          tags: tagsArray,
          active: fields.active,
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
          initialValue={fields?.content}
        />

        <Input
          label="Tags"
          name="tags"
          placeholder="Insira as tags separadas por vírgula"
          value={fields.tags}
          onChange={(value) => setFields({ ...fields, tags: value })}
        />

        <div className="flex justify-between">
          <Button
            className={fields.active ? "bg-red-500" : "bg-green-400"}
            onClick={() => setFields({ ...fields, active: !fields.active })}
            type="button"
          >
            {fields.active ? "Desativar post" : "Ativar post"}
          </Button>

          <Button className="w-max text" type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </div>
  );
};
