---
layout: post
title: fib bottom up dp
date: 2022-11-24 01:33 +0900
---
bottom up 방식이라 stack을 걱정 할 필요가 없습니다.

속도는 O(n)입니다.

```js
const fibBottomUp = (n) => {
  const array = new Array(n);
  array[0] = 1;
  array[1] = 1;
  for (let i = 2; i <= n; i++) {
    array[i] = array[i - 1] + array[i - 2];
  }
  return array;
};
```