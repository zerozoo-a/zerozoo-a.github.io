---
layout: post
title: bakejoon 1316 nodejs 그룹 단어 체커
date: 2022-11-13 21:22 +0900
lang: ko
categories: ["algorithm"]
tags: ["BAEKJOON", "NODE.JS"]
---
### 1316 그룹 단어 체커 node.js 풀이

--- 

#### 문제 
그룹 단어란 단어에 존재하는 모든 문자에 대해서, 각 문자가 연속해서 나타나는 경우만을 말한다. 예를 들면, ccazzzzbb는 c, a, z, b가 모두 연속해서 나타나고, kin도 k, i, n이 연속해서 나타나기 때문에 그룹 단어이지만, aabbbccb는 b가 떨어져서 나타나기 때문에 그룹 단어가 아니다.

단어 N개를 입력으로 받아 그룹 단어의 개수를 출력하는 프로그램을 작성하시오.
--- 

#### 입력
--- 
첫째 줄에 단어의 개수 N이 들어온다. N은 100보다 작거나 같은 자연수이다. 둘째 줄부터 N개의 줄에 단어가 들어온다. 단어는 알파벳 소문자로만 되어있고 중복되지 않으며, 길이는 최대 100이다.

```
3
happy
new
year
```
```
4
aba
abab
abcabc
a
```
#### 출력
--- 
첫째 줄에 그룹 단어의 개수를 출력한다.
```
3
```
```
1
```
#### 풀이
--- 

```js
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

/**
 * @param {string[]} input
 * @return {void}
 */
function solution(input) {
  const [N, ...strings] = input;

  let count = 0;

  for (let i = 0; i < N; i++) {
    const map = new Map();
    let current = "";

    for (let j = 0; j < strings[i].length; j++) {
      const char = strings[i][j];

      if (map.has(char) && current === char) {
        map.set(char, map.get(char) + 1);
      } else if (map.has(char) && current !== char) {
        count++;
        break;
      } else {
        map.set(char, 1);
      }
      current = char;
    }
  }

  console.log(N - count);
}

solution(input);

```


제 풀이 방식은 이러합니다. 한 번 등장한 적 있는 알파벳이 다시 등장하는 경우 방금 전 알파벳과 같아야 한다. 그렇지 않은데 등장한 경우 그룹 단어라고 할 수 없다.


문제에 대한 정의는 이렇게 내렸으므로 각각의 알파벳이 등장을 셈하는 카운트를 만들어주고 등장한 적이 있는데 바로 이전의 값과 다른 경우 그룹 단어가 아니므로 그룹 단어가 아니다의 카운트를 올려줍니다. `count++`이 바로 이 카운트입니다.

단어의 총 길이 - 그룹 단어가 아닌 개수를 빼주면 원하는 그룹 단어의 개수를 얻을 수 있게 됩니다.