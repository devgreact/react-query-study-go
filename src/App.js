import { useMutation } from "react-query";

function App() {
  const mutationFn = async (newTodo) => {
    const { data } = await fetch("http://localhost:4000/posts", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return data;
  };

  const { mutate, isLoading, isError, error, isSuccess } =
    useMutation(mutationFn);

  return (
    <div>
      {isLoading ? (
        "Adding todo..."
      ) : (
        <>
          {isError && <p>error: {error.message}</p>}

          {isSuccess && <p>Todo added!</p>}

          <button
            onClick={() => {
              mutate({
                id: 101,
                text: "새로운 내용 작성",
                isComplete: false,
              });
            }}
          >
            작성 완료
          </button>
        </>
      )}
    </div>
  );
}

export default App;
