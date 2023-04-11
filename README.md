# React Query

- https://tanstack.com/query/latest
- React Query는 React 애플리케이션에서 데이터를 관리하고 상태를 업데이트하기 위한 라이브러리입니다. React Query를 사용하면 서버와의 데이터 통신을 추상화하고, 데이터를 캐시하고, 로딩 및 에러 상태를 관리할 수 있습니다.

## 1.1. React Query의 사용법은 다음과 같습니다.

React Query 라이브러리 설치하기
React Query는 npm을 통해 설치할 수 있습니다.

```
npm install react-query
```

## 1.2. json-server 설치

- https://www.npmjs.com/package/json-server

```
npm install -g json-server
```

/db.json 생성

```js
{
  "posts": [
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
  ]
}


```

```js
json-server --watch ./db.json --port 4000
```

# 2. React Query의 핵심 개념은 다음과 같습니다.

## Query

Query는 서버로부터 데이터를 가져오는 함수입니다. React Query는 서버로부터 데이터를 가져오고, 이를 캐시하고, 상태를 업데이트합니다. Query는 useQuery hook을 사용하여 사용됩니다.

## Mutation

Mutation은 서버에 데이터를 변경하는 함수입니다. React Query는 서버에 데이터를 변경하고, 변경 사항을 캐시하고, 상태를 업데이트합니다. Mutation은 useMutation hook을 사용하여 사용됩니다.

## Query Key

Query Key는 Query 및 Mutation을 유일하게 식별하는 키입니다. Query Key는 문자열, 숫자 또는 객체일 수 있습니다.

## Query State

Query State는 Query 또는 Mutation의 상태입니다. Query State는 로딩, 에러, 데이터와 같은 정보를 포함합니다.

## Query Cache

Query Cache는 React Query가 캐시하는 데이터를 저장하는 곳입니다. Query Cache는 기본적으로 메모리에 저장되며, 영속적인 저장소에 저장할 수도 있습니다.

# 3. index.js

QueryClientProvider를 사용하여 queryClient를 전달합니다. 이렇게 하면 QueryClientProvider가 애플리케이션 전체에서 queryClient를 사용할 수 있게 됩니다.

queryClient는 React Query의 기능을 구현하는 데 필요한 구성 요소입니다. 예를 들어, 쿼리 데이터 캐싱, 캐시를 만료하는 데 사용되는 캐시 구성 및 전역 쿼리 구성을 구현할 수 있습니다. queryClient를 구성하는 방법에는 다양한 옵션이 있으며, 필요한 옵션에 따라 queryClient를 구성할 수 있습니다.

QueryClientProvider를 사용하면, App 컴포넌트와 그 하위 컴포넌트들이 QueryClientProvider의 자식 컴포넌트가 되므로, App 컴포넌트에서 useQuery나 useMutation 같은 React Query 훅을 사용할 수 있게 됩니다.

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";

// QueryClient 인스턴스를 생성합니다.
const queryClient = new QueryClient();

// ReactDOM.createRoot 메소드를 사용하여 루트 노드를 생성합니다.
const root = ReactDOM.createRoot(document.getElementById("root"));

// QueryClientProvider 컴포넌트를 사용하여 QueryClient를 전역으로 사용할 수 있도록 설정합니다.
// App 컴포넌트를 QueryClientProvider 내부에 렌더링합니다.
root.render(
  <QueryClientProvider client={queryClient}>
    {/* devtools */}
    {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    <App />
  </QueryClientProvider>
);
```

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
```

# 4.Query 정의하기

Query는 useQuery hook을 사용하여 정의할 수 있습니다.

```js
import { useQuery } from "react-query";

function App() {
  const { data, isLoading, isError } = useQuery("todos", () =>
    fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
      res.json()
    )
  );

  if (isLoading) return "Loading...";

  if (isError) return "Error";

  return (
    <div>
      {data.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
}
```

## 4.Mutation 정의하기

Mutation은 useMutation hook을 사용하여 정의할 수 있습니다.

```js
import { useMutation } from "react-query";

function App() {
  const [mutate, { isLoading }] = useMutation((data) =>
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((res) => res.json())
  );

  const handleClick = () => {
    mutate({ title: "New todo", completed: false });
  };

  return (
    <div>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? "Adding todo..." : "Add todo"}
      </button>
    </div>
  );
}
```

## 5.React Query 옵션

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

# React Query Todo

- https://github.com/gopinav/React-Query-Tutorials
