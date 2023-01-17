import { Trash } from "phosphor-react";

interface UserCardProps {
  nome: string;
  salario: number;
  id: string;
}

export const UserCard = ({ nome, salario, id }: UserCardProps) => {
  const deleleUser = (id: string) => {
    try {
      fetch(`http://localhost:3000/person/${id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="rounded overflow-hidden shadow-lg w-72">
      <div className="px-6 py-4 mt-7">
        <div className="font-bold text-xl mb-2">Nome: {nome}</div>
        <p className="text-gray-700 text-base">Salario: {salario}</p>
        <Trash
          size={24}
          className="mt-2 cursor-pointer"
          onClick={() => deleleUser(id)}
        />
      </div>
    </div>
  );
};
