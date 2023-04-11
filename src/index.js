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
