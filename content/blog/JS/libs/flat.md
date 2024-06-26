---
title: 중첩 배열을 평탄화하기
tags: [lib]
date: 2023-04-03
coverUrl: https://images.unsplash.com/photo-1617398759497-261b35e621fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80
---

## 중첩 배열을 평탄화 한다는 것의 의미
- 눈으로 보는게 가장 빠르다

```js
[1, [2], [[3]], [[[4]]]] // 중첩
[1, 2, ,3, 4] // 평탄화
```
위와 같이 여러 배열이 중첩되어 있는 상태를

아래와 같은 형태로 풀어낸다는 것이다.

## 중첩 배열을 평탄화 해보기

이런 저런 잡설을 늘어놓는 것 보다 코드를 이해하는 편이 도움이 될 수 있다.

```js
function* flat(iter) {
  for (const a of iter) {
    if (Array.isArray(a)) yield* flat(a);
    else yield a;
  }
}

const a = [[1], 2, [3]];
const b = [...flat(a)];
console.log("b:", b);
```

위 코드는 이러하다.

배열을 받아 배열을 순회하며 순회한 인자가 배열인 경우 재귀적으로 파고들고
아닌 경우 인자를 반환한다.

이를 iterable 함수로 작성하면 된다.

