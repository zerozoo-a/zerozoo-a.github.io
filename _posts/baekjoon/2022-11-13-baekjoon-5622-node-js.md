---
layout: post
title: baekjoon 5622 node.js 풀이
date: 2022-11-13 11:40 +0900
lang: ko
categories: ["algorithm"]
tags: ["BAEKJOON", "NODE.JS"]
---

### 5622 다이얼 정답 및 풀이 node.js 풀이

--- 

#### 문제 
상근이의 할머니는 아래 그림과 같이 오래된 다이얼 전화기를 사용한다.
![dial image](https://upload.acmicpc.net/9c88dd24-3a4c-4a09-bc50-e6496958214d/-/preview/)

전화를 걸고 싶은 번호가 있다면, 숫자를 하나를 누른 다음에 금속 핀이 있는 곳 까지 시계방향으로 돌려야 한다. 숫자를 하나 누르면 다이얼이 처음 위치로 돌아가고, 다음 숫자를 누르려면 다이얼을 처음 위치에서 다시 돌려야 한다.

숫자 1을 걸려면 총 2초가 필요하다. 1보다 큰 수를 거는데 걸리는 시간은 이보다 더 걸리며, 한 칸 옆에 있는 숫자를 걸기 위해선 1초씩 더 걸린다.

상근이의 할머니는 전화 번호를 각 숫자에 해당하는 문자로 외운다. 즉, 어떤 단어를 걸 때, 각 알파벳에 해당하는 숫자를 걸면 된다. 예를 들어, UNUCIC는 868242와 같다.

할머니가 외운 단어가 주어졌을 때, 이 전화를 걸기 위해서 필요한 최소 시간을 구하는 프로그램을 작성하시오.

--- 

#### 입력
--- 
첫째 줄에 알파벳 대문자로 이루어진 단어가 주어진다. 단어의 길이는 2보다 크거나 같고, 15보다 작거나 같다.


```
UNUCIC
```
#### 출력
--- 

```
36
```
#### 풀이
--- 

```js
const input = require("fs")
  .readFileSync("../dev/stdin")
  .toString()
  .trim()
  .split("");

/**
 * @param {string[]} input
 * @return {void}
 */
function solution(input) {
  const map = new Map();
  map.set(3, ["A", "B", "C"]);
  map.set(4, ["D", "E", "F"]);
  map.set(5, ["G", "H", "I"]);
  map.set(6, ["J", "K", "L"]);
  map.set(7, ["M", "N", "O"]);
  map.set(8, ["P", "Q", "R", "S"]);
  map.set(9, ["T", "U", "V"]);
  map.set(10, ["W", "X", "Y", "Z"]);

  let result = 0;

  for (let i = 3; i < 11; i++) {
    /** @type {string[]} */
    const target = map.get(i);

    for (let j = 0; j < target.length; j++) {
      for (let k = 0; k < input.length; k++) {
        if (input[k] === target[j]) {
          result += i;
        }
      }
    }
  }
  console.log(result);
}
solution(input);

```

죄송하지만 우아한 풀이법은 도저히 떠오르지 않았습니다.

그럴경우에는 가독성이라도 좋은 알고리즘이 최선이라 생각하기 때문에
map 객체에 각각의 문자에 대응하는 시간을 매핑하는 방법을 사용하였습니다.

풀이는 이렇게 하면 됩니다. 반복문을 통해 다이얼 3부터 10까지 순회합니다.

순회하는 동안 각 key에 대응하는 value인 알파벳 문자열들을 다시 순회합니다.

그 때 들어온 입력값이 순회하는 배열중에 존재한다면 가장 최상단의 key값을 sum해주는 것입니다.

