---
layout: post
title: coin change problem
date: 2022-11-28 23:46 +0900
---

###  leet code 322 coin change node.js 

--- 
## 📇 Index


- [📇 Index](#-index)
    - [문제](#문제)
    - [입력](#입력)
    - [출력](#출력)
    - [풀이](#풀이)
    - [1 번](#1-번)
    - [2 번](#2-번)
    - [3 번](#3-번)
- [문제 풀이](#문제-풀이)
    - [🏕️ recap](#️-recap)
---

#### 문제 
You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

숫자 배열과 amount 값을 함수의 인자로 받습니다.

숫자 배열을 가장 최소한으로 조합하여 amount의 값을 만들 수 있도록 하는 갯수를 구하세요.

예를 들어 `[1, 3, 5]`의 코인이 있고 해당 코인으로 amount 6을 만드는 겁니다. 가장 적은 코인의 갯수를 사용해서 만들려면
`1, 5`, `3, 3`등이 있겠습니다. 코인은 두 개가 사용되었으므로 2를 나타내면 됩니다.
만들 수 없는 경우 -1을 반환하세요.

--- 

#### 입력
--- 

```
coins = [1,2,5], amount = 11
```
```
coins = [2], amount = 3
```
```
coins = [1], amount = 0
```
#### 출력
--- 

```
3
```
```
-1
```
```
0
```
#### 풀이
--- 

```js
/**
 *
 * @param {number[]} coins
 * @param {number} amount
 */
const coinChanger = (coins, amount) => {
  const memo = new Map();

  /**
   *
   * @param {number} n
   * @returns {0 | -1}
   */
  const dp = (n) => {
    if (memo.has(n)) return memo.get(n);

    // case: 기저조건
    if (n === 0) return 0; // 맞아 떨어짐
    if (n < 0) return -1; // 맞아 떨어지지 않음

    let res = Infinity,
      i = 0,
      l = coins.length;

    for (; i < l; i++) {
      const subproblem = dp(n - coins[i]);
      if (subproblem === -1) continue; // res에 저장하지 않고 넘어감

      res = Math.min(res, 1 + subproblem); // (n - 1) 개의 하위구조를 구한 셈이므로 + 1 해준다.
    }

    // 반복문이 끝나면 dp의 재귀도 끝났다는 의미이므로 적절한 값을 반환한다.
    // res가 아직도 Infinity인 경우에는 값을 찾지 못했다는 의미이다.
    if (res === Infinity) {
      memo.set(n, -1); // dp 함수에 대한 반환값이다. -1을 반환한 경우 상위 스택은 continue를 발동한다.
    } else {
      memo.set(n, res); // 반환 할 만한 값이 있는 경우 저장한다.
    }

    return memo.get(n);
  };
  return dp(amount);
};
```

이 문제는 dp 문제입니다.

dp로 문제를 푸는 것은 쉽지 않지요...

저도 적응하고 있는 중입니다. 😇

아무튼 dp 문제이므로 재귀와 반복문을 적절히 섞어가면서 사용하면 문제를 해결 할 수 있습니다.


함수의 핵심적인 부분들을 먼저 살펴보고 싶습니다.


1. 반복문을 통해 재귀 함수를 돌린다.
2. n의 값은 기저조건에 한없이 가까워 지다가 접하거나 초과한다.
3. 최적하위구조에 적합하므로 하위문제에서 구한 답에 + 1을 해주면 상위 문제의 답이 된다.

---

#### 1 번
반복문을 통해 재귀 함수를 돌린다.
```js
...
 for (; i < l; i++) {
      const subproblem = dp(n - coins[i]);
      if (subproblem === -1) continue; // res에 저장하지 않고 넘어감

      res = Math.min(res, 1 + subproblem); // (n - 1) 개의 하위구조를 구한 셈이므로 + 1 해준다.
    }
...
```
이 부분입니다. 반복문 내에서 재귀 함수인 dp를 호출하는 것으로
각 코인들에 대해 재귀함수를 반복합니다.

---

#### 2 번
n의 값은 기저조건에 한없이 가까워 지다가 접하거나 초과한다.


```js
...
const subproblem = dp(n - coins[i]);
...
```
이 부분입니다. 계속 코인만큼 n, 즉 amount의 값을 제하면서 기저 조건에 계속 가까워지게 됩니다. 언젠가는 기저조건에 닿아 재귀가 종료됩니다.


#### 3 번
최적하위 구조에 적합하다.

이 문제의 가장 키포인트가 아닌가 싶네요

amount 3을 만족 하는 최소 동전수가 2라고 가정하고 amount 4를 만족하는 최소 동전수를 찾으라는 문제가 있다면 어떻게 풀 수 있을까요?

amount 3을 만족하는 최소 동전수가 이미 2라고 알고 있기 때문에 동전 1 짜리를 하나 사용하면 된다는 것을 바로 알 수 있습니다.

---

## 문제 풀이

```js
coinChanger([1, 2], 3); // 호출했다고 가정합니다.
```

dp 함수에 `amount - coin[i]`를 인자로 콜스택을 쌓아갑니다. (하향식 먼저 풀어나갑니다.)

`배열에서 1을 꺼내어 재귀를 시작합니다.`
그러면 아래와 같은 모양의 함수 호출들이 쌓이게 됩니다.
`fn_3`에서 `_3`에 대해 `3` 은 인자라고 생각해주세요

<img width="379" alt="image" src="https://user-images.githubusercontent.com/80259925/204324161-1a6b27db-7f30-40ef-ac86-125642615a7f.png">
이제 스택이 기저조건인 0에 닿았으므로 아래와 같이 반환합니다.

<img width="197" alt="image" src="https://user-images.githubusercontent.com/80259925/204324177-07e77424-a186-44dd-92d4-1f6ea5ac48ef.png">

`fn_1` 함수는 인자를 받고 0이 아니므로 res에 + 1을 하여 초기화를 하게 됩니다. 이는 바로 이전 함수에서 0을 받으면 정상적으로 끝나 갯수를 헤아릴 가치가 있다고 판단하는 것입니다. 만약 -1을 받았다면 해당 코인들의 합은 amount를 초과하는 경우의 수의 접근이였다는 것을 알 수 있기 때문이죠.


`fn_1` 함수는 res에 1 을 초기화하고 반복문을 다음 반복문으로 넘기게 됩니다. 이제 다음 코인인 2를 기반으로 dp 재귀를 시작합니다.


<img width="181" alt="image" src="https://user-images.githubusercontent.com/80259925/204324189-3b3d8533-fb1b-4d94-a495-3f27e631dab6.png">

`fn_-1`함수는 `fn_1`함수에 다음 코인인 2 를 대입한 값을 반환합니다. 기저조건에 정의된 대로 -1 을 반환 받은 `fn_-1` 함수는 반복문에 작성되어 있는 대로 `continue`를 실행하게 됩니다. res를 초기화 하지 않고 반복문을 종료하게 됩니다. 더 이상 진행 할 수 없기에 -1을 반환하였고 이를 memo에 저장합니다.

그럼 이 -1을 받은 상위 스택의 `subproblem` 값은 이를 어떻게 처리할까요? 놀랍게도 다시 continue를 통해 반복문을 뛰어 넘어버립니다.

`subproblem`은 다시 버려지게 되고 res를 상위로 반환하게 됩니다.
하지만 -1도 계속 버려지는 것이 아닙니다 res가 한번도 초기화 되지 않은 경우 상위에 -1을 반환합니다. 한번도 초기화 되지 않았다는 것은 `subproblem`이 계속 -1 이였다는 뜻이기도 하니까요


이런식으로 -1 과 유효한 값 중 유효한 값을 넘기고 유효한 값이 하나도 없을 경우에는 -1을 상위 함수에 반환합니다.

`res`와 `subproblem` 중 더 작은 값을 가지는 이유는 `Infinity`값은 `Math.min`함수에서 취할 수 없는 값과 마찬가지이므로 res값을 초기화하기 위함이다. 초기화 하지 못한 경우는
`continue`를 통해 초기화 하지 않았기 때문입니다.


---


#### 🏕️ recap

이러한 문제, 문제풀이들은 자주 접하고 직접 생각해보지 않으면 아주 난해하게 느껴집니다.

자주 보고 자주 이해하는 방법을 통해 체득하는게 좋겠습니다.

무차별 재귀는 모든 알고리즘 문제를 푸는데 중요한 열쇠이기도 하니까요