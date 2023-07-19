---
title: 선행재귀를 알아보는 법
date: 2023-07-19 22:37:08
coverURL: https://images.unsplash.com/photo-1562516155-e0c1ee44059b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80
---
<a href="https://images.unsplash.com/photo-1562516155-e0c1ee44059b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80">이미지 출처</a>
<br />
<br />
<br />

# 선행재귀란?

재귀함수는 보통 재귀 호출부와 작업 수행부로 나눌 수 있습니다.

선행재귀는 작업을 수행하기 전에 재귀 호출부를 먼저 수행하는 재귀함수를 뜻합니다.

# 예시

아래의 함수는 실행부인 덧셈이 시작되긴하지만 완료되기 전에 재귀함수를 호출합니다.
따라서 재귀는 연속적으로 호출되다 기저조건을 만나 재귀호출부가 완전히 종료됩니다.

그 다음 실행부인 덧셈이 연속적으로 실행되고 콜스택이 모두 소진되면 답을 반환합니다.

```js
/**
 * @param {number} n
 * */
function sum(n) {
    if(n <= 0) return;
    return n + sum(n - 1);
}
```

