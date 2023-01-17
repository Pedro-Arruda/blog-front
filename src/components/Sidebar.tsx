import { Plus, User } from "phosphor-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Sidebar = () => {
  const { updateAuth } = useAuth();
  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="px-3 py-6 overflow-y-auto rounded bg-gray-800 h-screen flex flex-col justify-between">
        <ul className="space-y-2">
          <li>
            <Link
              to={"/"}
              className="flex items-center p-2 text-base font-normal text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="flex-1 ml-3 text-2xl">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to={"/"}
              className="flex items-center p-2 text-base font-normal text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="flex ml-3 whitespace-nowrap items-center	gap-3">
                <User size={22} />
                Usuários
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={"/create-user"}
              className="flex items-center p-2 text-base font-normal text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="flex ml-3 whitespace-nowrap items-center	gap-3">
                <Plus size={22} />
                Adicionar usuários
              </span>
            </Link>
          </li>
        </ul>
        <button
          className="bg-transparent border-2 border-red-700 hover:bg-red-700 text-white p-2 rounded-md"
          onClick={() => updateAuth(null)}
        >
          Sair
        </button>
      </div>
    </aside>
  );
};
