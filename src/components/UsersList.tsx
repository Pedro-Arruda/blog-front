import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { UserCard } from "./UserCard";

interface User {
  name: string;
  salary: number;
  _id: string;
}

export const UserList = () => {
  const [users, setUsers] = useState<User[]>();
  const fetchUsers = () => {
    try {
      fetch("http://localhost:3000/person", {
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
        <h1 className="text-4xl	">Usuários</h1>
        <div className="flex gap-5 flex-wrap">
          {users?.map((user, index) => (
            <UserCard
              nome={user.name}
              salario={user.salary}
              key={index}
              id={user._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
