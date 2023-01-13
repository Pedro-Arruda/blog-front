import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import "./Home.css";

export const Home = () => {
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [people, setPeople] = useState([]);

  const handleSubmit = async (e) => {
    console.log({ name, salary });
    e.preventDefault();
    try {
      console.log("ENTROU");
      await fetch("http://localhost:3000/person", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name, salary, approved: true }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:3000/person")
      .then((response) => response.json())
      .then((data) => setPeople(data));
  }, [people]);

  return (
    <>
      <h1>Home</h1>

      <form className="form">
        <div>
          <label htmlFor="">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="">Salario</label>
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        <button onClick={handleSubmit}>Enviar</button>

        <div>
          {people.map((person, index) => (
            <>
              <h1 key={index}>{person.name}</h1>
              <p>{person.salary}</p>
            </>
          ))}
        </div>
      </form>
    </>
  );
};
