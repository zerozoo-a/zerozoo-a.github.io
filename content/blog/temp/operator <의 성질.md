---
title: operator <의 성질
date: 2023-05-03 23:05:33
---

operator를 알게 모르게 자주 사용하는데 
cs에서 어떻게 이 operator를 사용하는지 보자. 아래는 js의 예제이다.

다른 언어(c++)등은 이 operator overloading을 통해 해당 로직을 최적화 한다 ;;;;


```js
const a = 1;
const b = 1;
const c = 2

a < a // false 비반사성 (irreflexivity)
a > a // false 비대칭성 (asymmertry)

// a < b가 참이고 b < c가 참이면 a < c가 참이다. 이는 전이성(transitivity)이라한다.
(a < b && b < c), // true
(a < c) // true

// a < b, b < a가 모두 거짓이면 a와 b는 같은 값으로 간주한다 (숫자 한정)
a < b // false
b > a // false
a == b // 간주한다

// a == b && b == c 이므로 a == c라 한다. 이는 상등 관계의 전이성(transitivity of equivalence)
```