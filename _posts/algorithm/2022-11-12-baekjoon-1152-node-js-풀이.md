---
layout: post
title: baekjoon 1152 node.js 풀이
date: 2022-11-12 01:00 +0900
lang: ko
categories: ["algorithm"]
tags: ["BAEKJOON", "NODE.JS"]
---

###  node.js 

--- 

#### 문제 
영어 대소문자와 공백으로 이루어진 문자열이 주어진다. 이 문자열에는 몇 개의 단어가 있을까? 이를 구하는 프로그램을 작성하시오. 단, 한 단어가 여러 번 등장하면 등장한 횟수만큼 모두 세어야 한다.
--- 

#### 입력
--- 
첫 줄에 영어 대소문자와 공백으로 이루어진 문자열이 주어진다. 이 문자열의 길이는 1,000,000을 넘지 않는다. 단어는 공백 한 개로 구분되며, 공백이 연속해서 나오는 경우는 없다. 또한 문자열은 공백으로 시작하거나 끝날 수 있다.
```
The Curious Case of Benjamin Button
```
#### 출력
--- 

```
6
```
#### 풀이
--- 

```js
const input = require("fs").readFileSync("../dev/1152/stdin").toString().trim();

/**
 * @param {string} input
 * @return {void}
 */
function solution(input) {
  if (input.length === 0) {
    console.log(0);
    return;
  }

  console.log(input.split(" ").length);
}

solution(input);

```

이 문제의 풀이는 역시나 문제를 잘 이해하는 것에서부터 시작됩니다.

문제에서 거듭 강조하는 부분인 문자열 앞 뒤에 빈 칸이 들어갈 수 있다는 것을 염두해 앞 뒤를 trim method를 통해 잘라줍니다.

이제 split 함수를 통해 각 문자별로 배열에 넣어주고 그 길이를 세어주면 됩니다만

여기서 주의 할 점이 입력되는 값들 중에서 `""` < 이렇게 생긴 친구가 입력이 될 수 있다는 것입니다.


그렇다면 단어가 없으므로 0을 출력하면 되는데 이는 핸들링하기 어렵지 않으므로 위와 같이 처리해주시면 됩니다.