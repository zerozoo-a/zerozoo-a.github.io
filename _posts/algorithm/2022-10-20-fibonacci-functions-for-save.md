---
layout: post
title: fibonacci functions for save
date: 2022-10-20 01:50 +0900
categories: ["algorithm"]
tags: ["fibonacci","DP"]
---

## 피보나치 수열을 알아보자

피보나치 수열 자체에 대한 설명은 생략하도록 하겠습니다.

보통 피보나치 수열은 한.. 2 ~ 3 단계를 거쳐 진화를 하게 됩니다. (저는 그랬습니다.)

재귀로 문제를 풀 때는 js나 파이썬은 콜스택이 제한적이다 보니 언어에 대한 제약조건에 잡히게 됩니다.

1️⃣ 첫번째 피보나치 수열은 보통 이렇습니다.
---
```js
function fibo1(n){
    if(n == 0 || n == 1) return n;
    return fibo1(n-2) + fibo1(n-1);
}
fibo1(10) // 55
```
입력값이 적다면 큰 문제 없이 작동하게 됩니다.

> 좋은 점: 외울 수 있을정도의 간결함
> 나쁜 점: 성능

2️⃣ 두번째 피보나치 수열
---

```js
function fibo2(n, m = {}){
    if(n == 0 || n == 1){
        return n;
    }
    if(m[n] === undefined){
        const fibo = fibo2(n - 2, m) + fibo2(n-1, m);
        m[n] = fibo;
    }
    return m[n]
}
// fibo2(55) 139583862445
```

> 좋은 점: memo를 통해 불필요한 계산을 줄임으로써 `O^n`이 되었다.
> 
> 나쁜 점: 숫자가 커지면 콜스택이 터지게 된다. 


3️⃣ 세번째 피보나치 수열
---

>이 알고리즘에는 range 함수가 사용되었습니다.
> js에는 range 같은 함수가 없습니다. 그래서 직접 구현을 해주어야 하는데
필자는 아래와 같이 구현하였습니다.
```js
// helper
function range(start, end) {
    if (start >= end) {
        return [];
    }
    return new Array(end - start)
        .fill(undefined)
        .map((_, i) => i)
        .map((n) => n + start);
}
// range(2, 6) ; => [2, 3, 4, 5]
// range(5, 4) ; => []
```

```js
// bottom - up fibo
const fib_array = [0, 1];
function fibo_bottom_up(n) {
    if (n == 0 || n == 1) {
        return n;
    }


    for (const i of range(2, n + 1)) {
        const n = fib_array[i - 2] + fib_array[i - 1];
        fib_array.push(n);
    }
    return fib_array[n];
}
// fibo_bottom_up(555) ; => 4.3516638122555e+115
```

bottom - up 방식은 피보나치 수열 0, 1, 1, 2, ...를 0, 1 부터 차례로 채워나가기 위해
for loop을 돌게 됩니다. 물론 문제들을 하위 문제로 쪼개어 해당 값을 다시 사용하는 개념은 같습니다.

이를 통해 큰 수가 들어오게 되더라도 예를 들어 100000의 숫자가 오더라도 `fibo(100000 - 2) + fibo(100000 - 1)`
의 순서로 문제를 해결하지 않게 된거죠 위 함수들을 미리 쭈욱 걸어놓는다면 그 시점에서 콜스택은 터져버릴 것입니다.

그 반대로 [0, 1, ...]의 순서로 하위문제의 memoization을 채워 나가기 때문에
memozation을 저장하는 순간 쌓였던 스택은 그대로 종료되어 스택에서 사라지게 됩니다.
콜스택 문제도 멋지게 해결 되었네요


이번엔 객체가 아닌 배열을 통해 memoization을 구현하게 되었습니다 
fibo 함수를 통해서 결과값이 나오게 되면 그걸 배열에 저장하는 방식이죠

피보나치 수열은 초반에 [0, 1, 1]의 1을 제외하고는 서로 겹치는 수가 나오지 않기 때문에 배열에 넣게 되어도
상관이 없습니다.

자 그러면 타임컴플렉스가 줄어드는 이유는 무엇일까요?

이유는 간단합니다 메모된 값을 꺼내어 사용하기 때문입니다.
메모된 값을 꺼내지 않게 된다면 `fibo(15)`의 값을 구하기 위해 재귀함수는 `fibo(15-2) + fibo(15-1) ...`부터 시작하게 되는 것이죠


