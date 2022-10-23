---
layout: post
title: BAEKJOON NODEJS 10869
date: 2022-10-21 00:01 +0900
categories: ["algorithm"]
tags: ["BAEKJOON", "NODE.JS", "10869"]
---

문제
---
두 자연수 A와 B가 주어진다. 이때, A+B, A-B, A*B, A/B(몫), A%B(나머지)를 출력하는 프로그램을 작성하시오.

입력
---
두 자연수 A와 B가 주어진다. (1 ≤ A, B ≤ 10,000)

입력 예제
---
7 3

출력
---
10
4
21
2
1

나의 답안
---

```js
const { readFileSync: rfs } = require("fs");
const [a, b] = rfs("./dev/stdin")
  .toString()
  .split(" ")
  .map((a) => +a);
console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(~~(a / b));
console.log(a % b);
```

후기
---

>nodejs는 stdin/out의 길고 긴 이름을 축약해야 한다.
예를 들어 `const a = stdin() // 입력 다 받고..`
`const b = stdout() 출력!`
> 

**#1**
첫 줄에 readFileSync는 너무 길기 때문에 rfs로 이름을 변경했다.
파일을 읽어들인 다음 blob -> string -> string[] -> number[]
순으로 변경하였다.

이제 사칙연산에 대한 결과를 콘솔에 찍어주면 되었다.

한가지 거슬리는 부분은 `~~(a / b)`일 것인데 이는 

```js
const a = 5;     // 00000000000000000000000000000101
const b = -3;    // 11111111111111111111111111111101

console.log(~a); // 11111111111111111111111111111010
// expected output: -6

console.log(~b); // 00000000000000000000000000000010
// expected output: 2

```
Bitwise Not 연산이다.
이 연산은 재밌게도 1 -> -2로 바꾸어준다. 이를 두 번하게 되면 `~~1 -> 1`이다.
이게 무슨 의미인가? 싶지만 bitwise 연산이 일어나게 될 때 소수부는 깔끔하게 버려진다.

따라서 `~~1.5 -> 1`로 변경되는데 나누기 연산은 소숫점이 발생할 수 있기 때문에 이렇게 해주었다.

당연히 Math.floor | Math.ceil 등으로의 처리도 가능하다.



