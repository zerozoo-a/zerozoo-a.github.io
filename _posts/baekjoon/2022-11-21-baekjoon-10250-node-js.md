---
layout: post
title: baekjoon-10250-node-js
date: 2022-11-21 01:03 +0900
categories: ["algorithm"]
tags: ["BAEKJOON", "NODE.JS","10250","ACM 호텔"]
---


### 10250 ACM 호텔 정답 및 풀이 node.js

<img width="350" alt="https://www.imdb.com/title/tt2278388/ 출처" src="https://user-images.githubusercontent.com/80259925/202912660-d6e16d1e-2bea-4ae5-ba92-28b97b0672af.png">
--- 
 <a href="https://www.imdb.com/title/tt2278388/"> image source </a>

#### 문제 
<p>
 ACM 호텔 매니저 지우는 손님이 도착하는 대로 빈 방을 배정하고 있다. 고객 설문조사에 따르면 손님들은 호텔 정문으로부터 걸어서 가장 짧은 거리에 있는 방을 선호한다고 한다. 여러분은 지우를 도와 줄 프로그램을 작성하고자 한다. 즉 설문조사 결과 대로 호텔 정문으로부터 걷는 거리가 가장 짧도록 방을 배정하는 프로그램을 작성하고자 한다.

 <img width="545" alt="image" src="https://user-images.githubusercontent.com/80259925/202913024-c9cfbf09-223b-4ace-b37d-c38f0549caaa.png">


 문제를 단순화하기 위해서 호텔은 직사각형 모양이라고 가정하자. 각 층에 W 개의 방이 있는 H 층 건물이라고 가정하자 `(1 ≤ H, W ≤ 99)`. 그리고 엘리베이터는 가장 왼쪽에 있다고 가정하자(그림 1 참고). 이런 형태의 호텔을 H × W 형태 호텔이라고 부른다. 호텔 정문은 일층 엘리베이터 바로 앞에 있는데, 정문에서 엘리베이터까지의 거리는 무시한다. 또 모든 인접한 두 방 사이의 거리는 같은 거리(거리 1)라고 가정하고 호텔의 정면 쪽에만 방이 있다고 가정한다.
</p>


--- 

#### 입력
--- 

```
2
6 12 10
30 50 72
```
```
4
33 2 10
35 50 72
9 12 72
50 50 1500
```
#### 출력
--- 

```
402
1203
```
```
1001
203
908
5030
```
#### 풀이
--- 

```js
const input = require("fs")
  .readFileSync("../dev/10250/stdin")
  .toString()
  .trim()
  .split("\n");

/**
 * @param {string[]} input
 * @return {void}
 */
function solution([t, ...input]) {
  const T = Number(t);
  const NS = [];
  for (let i = 0; i < T; i++) {
    NS.push(input[i].split(" ").map(Number));
  }

  NS.forEach(([H, W, N]) => {
    findNextRoom(H, N);
  });
}

/**
 *
 * @param {number} H
 * @param {number} N
 * @returns {number}
 */
function findNextRoom(H, N) {
  const head = N % H === 0 ? H : N % H;
  const tail = N % H === 0 ? ~~(N / H) : ~~(N / H) + 1;
  const _tail = tail.toString().length === 1 ? `0${tail}` : tail;
  const result = `${head}${_tail}`;
  console.log(result);
}

solution(input);
```

문제의 풀이는 생각보다 간단합니다.

지문의 길이가 길어 지레 겁먹고 이건 못풀겠다..! 라고 생각하긴 했지만 말이죠. 🤦

자 문제풀이는 정확한 문제의 이해에서 시작되므로 문제를 이해해봅시다.


<img width="545" alt="image" src="https://user-images.githubusercontent.com/80259925/202913106-4d153010-9076-471b-819a-b927b9b57869.png">

문제에서 손님은 가장 엘레베이터로부터 이동 동선이 짧은 객실을 선호하고,
그 중에서도 낮은 층의 객실을 더 선호합니다.

따라서 모든 객실은 `101, 201, 301 ...`의 순서로 배정되게 됩니다.
만약 `H = 6`인 상태에서 7 번째 손님의 방을 정해주어야 할 때에는 
102 호가 됩니다. 이제 문제의 절반이 풀린 느낌입니다.

`손님의 번호 / H`의 값으로 위 이야기를 풀어보면
`7 / 6 = 1`입니다. 이는 1호의 1을 가리키게 됩니다.

이 문제는 이런식으로 풀게 되는 것입니다.

만약 여기서 손님의 번호가 7 이면서 H의 값도 7 인 경우 어떻게 해야 할까요? 나누어 떨어지는 경우에는 그냥 H의 값을 사용해주면 됩니다. 손님은 해당 층의 마지막 방에 들어간다고 생각하면 이해가 편합니다.


이제 가로축의 숫자를 찾아주면 됩니다. 위의 호의 번호는 세로축을 찾은 것과 마찬가지니까요.

> `N % H`는 가로축을 나타냅니다. 예를 들어보면 `7 번째` 손님과 `H = 6`이라고 하죠, 이 때 두 나눗셈의 나머지는 1 입니다.

> 모든 손님이 위의 표시해둔 1 번 마크에 들어차 있는 상태임을 나타내며 그러고도 한 개가 남은 것입니다. 

그런데 코드 상에는 `N % H + 1`로 표기 되어 있습니다. 이는 방 번호가 0이 아닌 1 부터 시작해서이며 마찬가지로 나누어 떨어지는 경우에는 H를 사용해주면 됩니다. 나누어 떨어졌을 경우에도 딱 맞게 들어간 상황이기 때문에 해당 층의 꼭대기 방에 배정되었다고 생각하면 되겠네요.


감사합니다.