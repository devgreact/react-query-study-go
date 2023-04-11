# Mutation

Mutation은 서버에 데이터를 변경하는 함수입니다. React Query는 서버에 데이터를 변경하고, 변경 사항을 캐시하고, 상태를 업데이트합니다. Mutation은 useMutation hook을 사용하여 사용됩니다.

```js
const mutation = useMutation((newTodo) => {
  return axios.post("/todos", newTodo);
});
```

- useQuery 보다 더 심플하게 Promise 반환 함수만 있어도 됨.
- 단 Query Key 넣어주면 devtools 에서 볼수 있음.

db.json

```json
{
  "posts": [
    {
      "id": 1,
      "text": "내용 1",
      "isComplete": false
    },
    {
      "id": 2,
      "text": "내용 2",
      "isComplete": false
    },
    {
      "id": 3,
      "text": "내용 3",
      "isComplete": false
    }
  ]
}
```

## 4.Mutation 정의하기

Mutation은 useMutation hook을 사용하여 정의할 수 있습니다.

```js
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
                id: 100,
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
```
