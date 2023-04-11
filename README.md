# React Query

- https://tanstack.com/query/latest

App.js

```js
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
```

# 2. React Query의 핵심 개념은 다음과 같습니다.

## Query

Query는 서버로부터 데이터를 가져오는 함수입니다. React Query는 서버로부터 데이터를 가져오고, 이를 캐시하고, 상태를 업데이트합니다. Query는 useQuery hook을 사용하여 사용됩니다.

```js
import { useQuery } from "react-query";
function App() {
  const info = useQuery("Query Key", Query Fnction);
}
```

### Query Key

Query Key는 Query 및 Mutation을 유일하게 식별하는 키입니다. Query Key는 문자열, 숫자 또는 객체, 배열 일 수 있습니다.

### Query Fnction

Promise 를 반환하는 함수 => 데이터 resolve 하거나 erro를 throw

### useQuery 가 반환하는 내용

- data: 마지막으로 성공한 resolved 된 데이터(Response)
- error: 에러가 발생했을 때 반환되는 객체
- isFetching : Request 가 in-flight 중일 때 true
- status, isLoading, isSuccess, isLoading 등등 : 모두 현재 Query 상태
- refetch : 해당 query refetch 하는 함수 제공
- remove : 해당 query cahce 에서 지우는 함수 제공
- etc.

## useQuery Option

```js
import { useQuery } from "react-query";
function App() {
  const info = useQuery("Query Key", Query Fnction, onptions);
}
```

- onSuccess, onError, onSettled: query fetching 성공/실패/완료 시 실행할 Side Effect 정의
- enabled: 자동으로 query를 실행시킬지 말지 여부
- retry : query 동작 실패 시, 자동으로 retry 할지 결정하는 옵션
- select : 성공 시 가져온 data를 가공해서 전달
- keepPrviousData : 새롭게 fetching 시 이전 데이터 유지 여부
- refetchInterval : 주기적으로 refetch 할지 결정하는 옵션
- etc

### 옵션 상세

다양한 옵션을 제공하여 더욱 세밀한 데이터 관리와 상태 업데이트를 할 수 있습니다. 주요 옵션은 다음과 같습니다.

- staleTime
  staleTime 옵션은 캐시된 데이터가 "stale"한 상태가 되는 시간(밀리초)을 설정합니다. "stale"한 상태란, 캐시된 데이터가 만료되기 전에 이전 데이터를 사용하여 UI를 빠르게 렌더링하는 것입니다. 기본값은 0(데이터가 만료되면 바로 새로운 데이터를 가져옴)입니다.

```js
import { useQuery } from "react-query";

function App() {
  const { data, isLoading } = useQuery(
    "todos",
    () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
    {
      staleTime: 10000, // 10초
    }
  );

  if (isLoading) return "Loading...";

  return (
    <div>
      {data.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}
```

- cacheTime
  cacheTime 옵션은 캐시된 데이터를 유지할 시간(밀리초)을 설정합니다. 기본값은 Infinity(무제한)입니다.

```js
import { useQuery } from "react-query";

function App() {
  const { data, isLoading } = useQuery(
    "todos",
    () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
    {
      cacheTime: 60000, // 1분
    }
  );

  if (isLoading) return "Loading...";

  return (
    <div>
      {data.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}
```

- refetchInterval
  refetchInterval 옵션은 데이터를 주기적으로 다시 가져오는 간격(밀리초)을 설정합니다. 기본값은 false(다시 가져오지 않음)입니다.

```js
import { useQuery } from "react-query";

function App() {
  const { data, isLoading } = useQuery(
    "todos",
    () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
    {
      refetchInterval: 10000, // 10초마다 다시 가져옴
    }
  );

  if (isLoading) return "Loading...";

  return (
    <div>
      {data.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}
```

- retry
  retry 옵션은 데이터 가져오기에 실패했을 때 다시 시도하는 횟수를 설정합니다. 기본값은 3입니다.

```js
import { useQuery } from "react-query";

function App() {
  const { data, isLoading, isError } = useQuery(
    "todos",
    () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
    {
      retry: 5, // 5번 다시 시도
    }
  );

  if (isLoading) return "Loading...";
  if (isError) return "Error!";

  return (
    <div>
      {data.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}
```

위 코드에서는 useQuery를 사용하여 'todos' 쿼리를 정의하고, 데이터를 가져오는 fetch 함수를 지정합니다. 그리고 retry 옵션을 5로 설정하여 데이터 가져오기에 실패했을 때 최대 5번 다시 시도하도록 합니다. 만약 이 옵션을 사용하지 않는다면, 데이터 가져오기에 실패하면 즉시 에러가 발생합니다.

retry 옵션은 유용하지만, 과도한 시도로 인해 서버에 부하를 일으킬 수 있으므로 적절히 조절해야 합니다. 또한, 다시 시도해도 계속 실패하는 경우에는 쿼리 자체를 재설계하는 것이 좋습니다.

- retryDelay
  retryDelay 옵션은 데이터 가져오기에 실패했을 때 다시 시도하는 간격(밀리초)을 설정합니다. 기본값은 0입니다.

```js
import { useQuery } from "react-query";

function App() {
  const { data, isLoading, isError } = useQuery(
    "todos",
    () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
    {
      retry: 5, // 5번 다시 시도
      retryDelay: 1000, // 1초마다 다시 시도
    }
  );

  if (isLoading) return "Loading...";
  if (isError) return "Error!";

  return (
    <div>
      {data.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}
```

- enabled
  enabled 옵션은 쿼리를 사용할지 여부를 설정합니다. 기본값은 true입니다.

```js
import { useQuery } from "react-query";

function App() {
  const { data, isLoading } = useQuery(
    "todos",
    () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
    {
      enabled: false, // 쿼리 사용하지 않음
    }
  );

  if (isLoading) return "Loading...";

  return (
    <div>
      {data.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}
```

- suspense
  suspense 옵션은 useQuery를 사용할 때 React의 Suspense 기능을 사용할지 여부를 설정합니다. 기본값은 false입니다.

```js
import { useQuery } from "react-query";

function Todos() {
  const { data } = useQuery("todos", () =>
    fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
      res.json()
    )
  );

  return (
    <div>
      {data.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div>
      <React.Suspense fallback="Loading...">
        <Todos />
      </React.Suspense>
    </div>
  );
}
```

이외에도 많은 옵션이 존재하며, 이는 React Query의 공식 문서에서 확인할 수 있습니다.
