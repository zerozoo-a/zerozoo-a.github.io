---
layout: post
title: power 함수를 재귀로 구현하기
date: 2022-12-02 01:16 +0900
categories: ["algorithm"]
---

# POWER 함수를 재귀로 구현해보자.


- [POWER 함수를 재귀로 구현해보자.](#power-함수를-재귀로-구현해보자)
  - [문제](#문제)
  - [풀이](#풀이)
  - [recap](#recap)

<br>
<br>
<br>

 
## 문제 
--- 
제곱을 계산하는데 재귀로 구현하세요.

cpp, node.js로 각각 구현하세요.
<br>
<br>

## 풀이 
--- 
<br>
<br>

```cpp
// cpp
int power(int x, int n) {
    if(n == 0) return 1;
    if(x == 1) return x;
    return x * power(x, n - 1);
}
int main() {
    int res = power(2, 4);
    std::cout << res << std::endl;
}
```

```js
// node.js
const power = (x, n) => {
    if(n === 0) return 1;
    if(x === 1) return x;
    return x * power(x, n - 1);
}
const main = () => {
    const res = power(2, 4)
    console.log(res)
}
```

## recap 
--- 
<br>
<br>

