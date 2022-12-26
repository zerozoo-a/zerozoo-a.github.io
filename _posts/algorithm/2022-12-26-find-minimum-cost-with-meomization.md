---
layout: post
title: find-minimum-cost-with-meomization
date: 2022-12-26 14:10 +0900
categories: [math]
---
# 📝 최저비용을 찾는 문제에 대한 최적화
## index 
--- 
- [📝 최저비용을 찾는 문제에 대한 최적화](#-최저비용을-찾는-문제에-대한-최적화)
  - [index](#index)
  - [문제: 최저비용을 찾는 문제에 대해 meomization을 도입하라.](#문제-최저비용을-찾는-문제에-대해-meomization을-도입하라)
  - [풀이](#풀이)
  - [recap](#recap)

<br>
<br>
<br>
 
## 문제: 최저비용을 찾는 문제에 대해 meomization을 도입하라.
---
[최저비용을 찾는 문제](https://zerozoo-a.github.io/2022/12/22/find-minimum-cost.html)의 최적화 버전이 필요합니다.

위 코드는 작동하긴 하지만 중첩되는 연산이 너무나도 많은지라 실사용하는 것은 무리가 있습니다.

meomization 전략은 간단합니다.

입력에 대한 결과값을 저장하고 해당 결과값이 입력으로 들어왔을 경우,
연산하지 않고 저장되어 있는 값을 반환합니다.



<br>
<br>

## 풀이 
--- 
```js
const N = 4;
const COST = [
  [0, 10, 75, 94],
  [-1, 0, 35, 50],
  [-1, -1, 0, 80],
  [-1, -1, -1, 0],
];
const memo = new Array(N).fill(new Array(N).fill(0));

/**
 *
 * @param {number} s
 * @param {number} d
 */
const minCost = (s, d) => {
  if (s === d || s === d - 1) return COST[s][d]; // (base case)

  if (memo[s][d] === 0) {
    let minValue = COST[s][d]; // (1)

    for (let i = s + 1 /** (2) */; i < d; i++) {
      const temp = minCost(s, i) + minCost(i, d);

      if (temp < minValue) minValue = temp;
    }
    memo[s][d] = minValue;
  }

  return memo[s][d];
};

const main = (() => {
  const result = minCost(0, 2); // 45
  console.log("result : ", result);
})();

```
<br>
<br>

문제는 재귀 함수에 들어가는 입력이 이차원 배열의 각 인덱스 값과 같으므로
2차원 배열을 생성하였습니다. 이로써 공간비용이 늘어나긴 하지만 더 빠른 연산을 끌어낼 수 있습니다.

## recap 
--- 
해시맵을 사용하여 문제를 풀어낼 수 있겠지만 입력 형태가 s, d처럼 두 integer를 받는 함수이므로
이차원 배열의 형태도 괜찮습니다.
<br>
<br>
