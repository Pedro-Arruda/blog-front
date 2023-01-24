import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Table } from "../components/Table";

interface Products {
  name: string;
  price: number;
  image: string;
  _id: string;
}

export const UserList = () => {
  const [products, setUsers] = useState<Products[]>();

  const fetchUsers = () => {
    try {
      fetch("http://localhost:3000/product", {
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setUsers(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="container p-5 mt-5">
        <h1 className="text-4xl	">Produtos</h1>
        <div className="flex gap-5 flex-wrap">
          {products ? (
            <Table
              items={products}
              columns={[
                {
                  key: "name",
                  label: "Nome",
                },
                {
                  key: `price`,
                  label: "Preço",
                },
              ]}
            />
          ) : (
            <p>Nenhum dado encontrado</p>
          )}
        </div>
      </div>
    </div>
  );
};
