interface UserCardProps {
  nome: string;
  salario: number;
}

export const UserCard = ({ nome, salario }: UserCardProps) => {
  return (
    <div className="rounded overflow-hidden shadow-lg w-72">
      <div className="px-6 py-4 mt-7">
        <div className="font-bold text-xl mb-2">Nome: {nome}</div>
        <p className="text-gray-700 text-base">Salario: {salario}</p>
      </div>
    </div>
  );
};
