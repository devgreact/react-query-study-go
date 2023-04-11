import { useState } from "react";
import { useQuery } from "react-query";

function App() {
  const [todos, setTodos] = useState([]);

  const getTodo = async () => {
    const res = await fetch("http://localhost:4000/posts");
    return res.json();
  };

  // const { data, isLoading, isError, error } = useQuery(
  //   "todos",
  //   () => fetch("http://localhost:4000/posts").then((res) => res.json()),
  //   {
  //     staleTime: 10000, // 10초
  //   }
  // );
  const { data, isLoading, isError, error } = useQuery("todos", getTodo, {
    staleTime: 10000, // 10초
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  console.log(data[0].posts);
  return (
    <>
      <ul>
        {data[0].posts.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
