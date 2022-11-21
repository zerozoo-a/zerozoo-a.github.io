---
layout: post
title: baekjoon-2775-node-js
date: 2022-11-22 02:30 +0900
categories: ["algorithm"]
tags: ["BAEKJOON", "NODE.JS","2775","부녀회장이 될테야"]
---

### 2775 부녀회장이 될테야 정답 및 풀이 node.js 

--- 

#### 문제 
평소 반상회에 참석하는 것을 좋아하는 주희는 이번 기회에 부녀회장이 되고 싶어 각 층의 사람들을 불러 모아 반상회를 주최하려고 한다.

이 아파트에 거주를 하려면 조건이 있는데, “a층의 b호에 살려면 자신의 아래(a-1)층의 1호부터 b호까지 사람들의 수의 합만큼 사람들을 데려와 살아야 한다” 는 계약 조항을 꼭 지키고 들어와야 한다.

아파트에 비어있는 집은 없고 모든 거주민들이 이 계약 조건을 지키고 왔다고 가정했을 때, 주어지는 양의 정수 k와 n에 대해 k층에 n호에는 몇 명이 살고 있는지 출력하라. 단, 아파트에는 0층부터 있고 각층에는 1호부터 있으며, 0층의 i호에는 i명이 산다.

--- 

#### 입력
--- 
첫 번째 줄에 Test case의 수 T가 주어진다. 그리고 각각의 케이스마다 입력으로 첫 번째 줄에 정수 k, 두 번째 줄에 정수 n이 주어진다


> 제한 
> - 1 ≤ k, n ≤ 14

```
2
1
3
2
3
```
```
4
1
2
4
2
5
2
9
6
```
#### 출력
--- 
각각의 Test case에 대해서 해당 집에 거주민 수를 출력하라.
```
6
10
```
```
3
6
7
3003
```
#### 풀이
--- 

```js
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const summation = (a, b) => a + b;
/**
 * @param {number[]} input
 * @return {void}
 */
function solution([T, ...input]) {
  const testCase = [];
  let i, j, q;
  for (i = 0; i < T; i++) {
    const temp = [];
    for (j = 0; j < 2; j++) {
      temp.push(input[j]);
    }
    testCase.push(temp);
    input = input.slice(2);
  }
  for (q = 0; q < T; q++) {
    const [k, n] = testCase[q];
    if (k === 0) {
      console.log(n);
      return;
    }

    const apt = getApt(k, n)[k - 1].reduce(summation);
    console.log(apt);
  }
}

/**
 *
 * @param {number} k
 * @param {number} n
 * @returns {number[][]}
 */
function getApt(k, n) {
  const matrix = [[...new Array(n)].map((_, i) => i + 1)];
  let i, j;
  for (i = 0; i < k - 1; i++) {
    // 층 수
    const temp = [];
    for (j = 0; j < n; j++) {
      // 각 호수까지 반복문을 돌면서 합을 저장한다.
      const sum = matrix[i].slice(0, j + 1).reduce(summation);
      temp.push(sum);
    }
    matrix.push(temp);
  }
  return matrix;
}

solution(input);

```
이번 풀이는 구현문제에 가깝다는 느낌을 받았습니다.

제한을 이용하면 어떤 특정한 패턴을 파악 할 수 있었을 수도 있겠지만,
그러기엔 구현이 더 빠를 것 같다고 생각되어 구현으로 넘어갔습니다.

문제 풀이에 앞서 문제를 이해하는 시간을 가지도록 합시다.

아파트에 입주하기 위한 특정 조건인 n 층의 k 호에 입주하기 위해서는  (n - 1) 층의 k 호 까지의 입주민들의 합을 구해야 합니다.

앞서 말씀드린 것 처럼 특정 패턴을 찾아내기 보다는

`n 층의 k 호까지 직접 해당 2 차원 배열을 생성하는 것입니다.`

`2 차원 배열을 생성`하는데는 한가지 더 조건이 붙습니다.
이 아파트는 0 층부터 시작하고 0 층에 살고 있는 사람들은
`i 호일 경우 i 명이 살고 있습니다.`

0 층의 1 호는 1 명이 사는 것입니다.

계산의 기반이 되어주는 0 층은 호수를 가리키는 k 값을 받으면 생성 할 수 있습니다.

예를 들어 이렇게 말이죠
```js
const foo = [[...new Array(k)].map((_,i)=>i+1)] // k = 3 => [[1, 2, 3]]
```
이제 0 층을 만들었습니다. 0 층부터 각 층의 각 호까지 반복문을 돌면서 
합을 저장합니다. 다음 층을 만드는 것이죠.
예를 들면

0 층이 `[1, 2, 3]`이므로 1 층의 `[1, 3, 6]`을 0 층의 인자들의 합을 통해 만들 수 있습니다. `[1, 2, 3]`을 순회하며
`[1, 1 + 2, 1 + 2 + 3]`을 배열로 저장합니다.

이를 k 층까지 반복하여 아파트를 완성하고 k - 1 층의 값을 추출하여 모두 더 해주면 됩니다.








