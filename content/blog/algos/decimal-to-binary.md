---
title: 10진수를 2진수로 변환하기
date: 2023-12-05 22:59:59
coverURL: 
---
<br />
<br />
<br />

# 10진수를 2진수로 변환하기

## js의 방법

```js
const dec = 10;
const bin = dec.toString(2);
console.log(bin); // 1010;
```

위와 같은 방법을 사용하는게 좋습니다.

아래는 직접구현하는 방법입니다.
Linked List인 js array로 구현 할 수 있지만

아래는 일반 string으로 구현하는 방법입니다.
방식은 string으로 stack을 쌓는 것과 동일합니다.
```js
/**
 * @param {number} n decimal
*/
function decToBin(n) {
    let b = ``;
    while(n >= 1) {
      b = (n % 2) + b; // 2로 나눈 나머지와 그동안 구한 값을 붙입니다.
      n = ~~(n / 2); // n을 2로 나눈 값을 다시 n에 초기화
    }
    return b;
}
```
