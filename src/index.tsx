import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// react-query Option 설정
/*
    TanStack - Query => redux가 어렵다.
        react-query: 개발자의 요구사항이 많다. => facebook => open source 그룹

    1. 서버에서 데이터 읽기 => 캐싱(메모리에 저장)
    2. 동일 요청일 경우 => 중복 제거 (서버 연결 X)
        = queryKey: ["aaa", page]
                            ---- 변경
    3. 항상 새로운 데이터 유지
    4. 네트워크 재연결, 요청 실패 시 자동 갱신
    5. 데이터 캐싱: 새로운 데이터 / 기존 데이터 => 키
    6. 단점 : 버전이 변경되면 => 호환성 낮아짐
 */
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // 속도 문제 => 서버와 연결 X
            refetchOnMount: false, // 키를 사용 => 키가 동일한 경우에는 기존의 cache에 저장된 데이터 사용
            refetchOnReconnect: false,
            retry: false,
            staleTime: 5*60*1000 // 5분
        }
    }
});
const rootElement = document.getElementById('root');
if(rootElement) {
    const root=ReactDOM.createRoot(rootElement);
    root.render(
        <QueryClientProvider client = {queryClient}>
            <App />
        </QueryClientProvider>
    );
}



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
