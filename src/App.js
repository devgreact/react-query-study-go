import { useState } from "react";
import { useQuery } from "react-query";

function App() {
  const [todos, setTodos] = useState([]);

  const getTodo = async () => {
    const res = await fetch("http://localhost:4000/posts");
    return res.json();
  };

  const { isLoading, isError, data, error } = useQuery("todos", getTodo);
  console.log(data);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  return (
    <>
      <ul>
        {/* {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))} */}
      </ul>
    </>
  );
}

export default App;
