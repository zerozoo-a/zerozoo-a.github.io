---
layout: post
title: coin change problem bottom-up
date: 2022-11-29 22:38 +0900
categories: ["algorithm"]
tags: ["dp"]
---

# coin change bottom up 알고리즘

## 📇 Table of Contents 
---
- [coin change bottom up 알고리즘](#coin-change-bottom-up-알고리즘)
  - [📇 Table of Contents](#-table-of-contents)
    - [문제](#문제)
    - [코드](#코드)
    - [설명](#설명)
    - [recap](#recap)



### 문제
---
You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.

---

숫자 배열과 amount 값을 함수의 인자로 받습니다.

숫자 배열을 가장 최소한으로 조합하여 amount의 값을 만들 수 있도록 하는 갯수를 구하세요.

예를 들어 `[1, 3, 5]`의 코인이 있고 해당 코인으로 amount 6을 만드는 겁니다. 가장 적은 코인의 갯수를 사용해서 만들려면
`1, 5`, `3, 3`등이 있겠습니다. 코인은 두 개가 사용되었으므로 2를 나타내면 됩니다.
만들 수 없는 경우 -1을 반환하세요.

<br>
<br>
<br>
### 코드
---

```js
/**
 *
 * @param {number[]} coins
 * @param {number} amount
 */
const coinChangerBottomToUp = (coins, amount) => {
  const dp = new Array(amount + 1).fill(amount + 1);

  /** case: 기저 조건 */
  dp[0] = 0;

  for (let i = 0; i < dp.length; i++) {
    for (const coin of coins) {
      if (i - coin < 0) continue;
      dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
    }
  }
  return dp[amount] === amount + 1 ? -1 : dp[amount];
};
```

<br>
<br>
<br>
### 설명
---

이번엔 bottom-up 방식을 통해 문제풀이를 하게 됩니다.

위 방식을 이해하기 위해서는 가장 단순한 형태의 인자부터 실행해보는게 좋겠습니다.
<br>

`coinChangerBottomUp([1],1)`을 인자로 넣었다고 생각해봅시다.
<br>

1. 내부에서 선언된 `dp`는 `[2,2]` 배열로 초기화 됩니다.
    - dp 배열은 amount + 1개 만큼의 길이를 가집니다.

2. `dp[0]`을 0으로 초기화 해줍니다.
    - 0 번째는 모두 continue로 넘어가게 됩니다.
3. 이중 반복문에 들어가게 됩니다.
    - `(i = 0)` 인 경우 모두 `continue`로 스킵
    - `(i = 1)` 인 경우 `(i - coin) => (1 - 1) < 0`에 대해 `false` 이다.
    - `dp[1]`은 `Math.min(2, 1 + dp[0])`에 대한 계산을 통해 초기화 됩니다.


외부 반복자 i와 내부의 반복자 coin은 i - coin이라는 식으로 연관되어 있습니다.
저는 이 부분이 이 알고리즘의 가장 중요한 부분이라고 생각합니다.


0.  반복자 i가 0 인 경우 `i - coin < 0`이라는 식에는 모두 true를 반환합니다.
1.  i가 1인 경우부터 `dp[i]`에 값을 초기화 할 수 있는 가능성이 생깁니다.
    - 예를 들어서 i = 1 이고 coin의 값이 1 이라고 합시다.
    이러한 경우에는 `i - coin < 0`이라는 조건에 false를 반환합니다.

    `dp[1] = Math.min(dp[1], 1 + dp[0])`이라는 식에 도달하게 되는데요 이는 다시 쓰면
    `dp[1] = Math.min(2, 1 + 0)`이기 때문에 `dp[1]`에는 1 이 초기화됩니다.

    > 이는 이런 뜻입니다. 주어진 코인들 중 1 짜리 코인이 있고, 그 코인으로 amount에 도달하기 위해서는
    1 짜리 코인을 한 개 사용하면 된다.

<br>
<br>
이후에는 반복문의 조건이 모두 소진되어 함수의 반환문에 도달하게 됩니다.

dp배열의 amount 번째의 인덱스에 접근하여 amount + 1인지를 확인합니다.
이는 주어진 코인의 모든 조합 중 가장 많은 조합의 경우의 수 + 1 이라는 숫자이기 때문에 
결국 초기화가 되었는지 아닌지를 확인하는 연산입니다.

만약 초기화를 못했다면 적절한 coin의 조합을 낼 수 없었다는 이야기 이므로 문제에서 원하는 `-1` 을 반환합니다.

아닌 경우에는 `dp[amount]`의 값을 찾아 꺼내옵니다.

이를 보면 반복자 `i` 는 `amount`의 값에 가까워지면서 답을 찾아나서게 되는 형태입니다.

추가적으로 `i - coin < 0` 조건에 부합하면서 `i = 2, coin = 1`인 경우에는 어떨까요?
`amount = 1`을 만족할 수 있는 코인은 오직 1 이거나 1 보다 작은 코인으로만 만들 수 있습니다.

따라서 `continue`를 통해 넘어가게 됩니다.


아래의 두 표를 보면 좀 더 직관적으로 이해가 될 것입니다.

<br>
```
coin      [1, 2]
amount    [0, 1, 2, 3, 4, 5]
index     [0, 1, 2, 3, 4, 5]

before_dp [0, 1, 1, 2, 2, 6]
dp        [0, 1, 1, 2, 2, 3]
```
dp[0]은 0 을 만드는데 필요한 코인의 수입니다.
dp[1]은 현재 가지고 있는 코인들로 1 을 만드는데 필요한 코인의 수 입니다.
dp[2]는 ...

<br>
dp[6]을 만들 때, dp[6 - 2] 번째와 dp[6 - 1] 번째의 값을 확인해보겠습니다.
가지고 있는 코인의 수는 1 아니면 2 이므로 dp[5]를 만드는데 들었던 코인의 수에 코인 1 짜리를 하나
추가해주면 하위 문제의 답을 이용하여 상위 문제를 푸는 꼴이 됩니다.

<br>
마찬가지로 dp[6 - 2]에 접근하여 dp[6 - 2]를 만드는데 들었던 코인의 수에 코인 2 짜리를 하나 추가함으로써 하위 문제를 이용해 상위 문제의 답을 빠르게 풀 수 있습니다.

<br>
물론 둘 다 값이 초기화 되지 않았을 수 있습니다. 그렇다면 해당 배열에 접근 한 것은 의미가 없으므로 
원래의 값을 다시 돌려줍니다. `Math.min(dp[i], 1 + dp[i - coin])`이 코드에서 dp[i]를 다시 넣어주는 이유입니다.

<br>
<br>
<br>
### recap
---

알고리즘에 대한 이해도를 높이는 중요한 방법 중 하나는
결국 알고리즘은 문제 풀이 방식이다 라는 것을 이용하는 것입니다. (개인적 의견입니다.)

dp는 메모리를 이용하여 시간 복잡도를 줄이는 것이므로 이전의 기록을 통해 다음 구해야 하는 값을 날로 먹으려 듭니다. 

coin 문제에서는 코인 6 개 짜리를 만드는 경우의 수에 대해 4 개 짜리를 만들었던 경우의 수의 결과값이
이미 있다면 이걸 이용해보자는 것입니다.

이런 의도를 먼저 이해하고 코드를 보면 좀 더 이해가 쉬워질 것 같습니다. 

