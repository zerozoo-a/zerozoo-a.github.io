---
title: create deep object
date: 2023-12-10 18:56:09
coverURL: https://images.unsplash.com/photo-1562575228-c8e99d410017?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<br />
<br />
<br />

# 깊은 객체를 만드는 것

배열을 객체로 만드는 방법은 보통 reduce를 사용합니다.
reduce로 배열을 접어가며 객체를 생성합니다.

다만 만들고 싶은 것은 깊이가 깊은 객체입니다.
예를 들어 아래와 같습니다.

```js
const a = ['a', 'b', 'c'];
const b = arrToObj(a); // { a: { b: {c:{} } } }
```

## 구현

구현은 아래와 같습니다.


```js
function arrToObj(arr) {
  let res = {};
  for (let i = arr.length; i >= 0; i--) {
    res = { [arr[i]]: res };
  }
  return res;
}
```