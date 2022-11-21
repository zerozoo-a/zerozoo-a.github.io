---
layout: post
title: baekjoon 2908 node.js 풀이
date: 2022-11-12 01:09 +0900
lang: ko
categories: ["algorithm"]
tags: ["BAEKJOON", "NODE.JS"]
---

###  2908 상수 정답 및 풀이 node.js 

--- 

#### 문제 

--- 
상근이의 동생 상수는 수학을 정말 못한다. 상수는 숫자를 읽는데 문제가 있다. 이렇게 수학을 못하는 상수를 위해서 상근이는 수의 크기를 비교하는 문제를 내주었다. 상근이는 세 자리 수 두 개를 칠판에 써주었다. 그 다음에 크기가 큰 수를 말해보라고 했다.

상수는 수를 다른 사람과 다르게 거꾸로 읽는다. 예를 들어, 734와 893을 칠판에 적었다면, 상수는 이 수를 437과 398로 읽는다. 따라서, 상수는 두 수중 큰 수인 437을 큰 수라고 말할 것이다.

두 수가 주어졌을 때, 상수의 대답을 출력하는 프로그램을 작성하시오.

#### 입력
--- 
첫째 줄에 상근이가 칠판에 적은 두 수 A와 B가 주어진다. 두 수는 같지 않은 세 자리 수이며, 0이 포함되어 있지 않다.
```
734 893
```
#### 출력
--- 
첫째 줄에 상수의 대답을 출력한다.
```
437
```
#### 풀이
--- 

```js
const input = require("fs")
  .readFileSync("../dev/2908/stdin")
  .toString()
  .trim()
  .split(" ");

/**
 * @param {[string, string]} input
 * @return {void}
 */
function solution(input) {
  const [a, b] = input;
  const A = reverseString(a).map(Number).join("");
  const B = reverseString(b).map(Number).join("");
  A > B ? console.log(A) : console.log(B);
}
/**
 * @param {string}  string
 * @param {number}  l
 * @returns {string[]}
 */
function reverseString(string, l = string.length - 1) {
  const str = string.split("");
  for (let i = 0; i < l / 2; i++) {
    [str[i], str[l - i]] = [str[l - i], str[i]];
  }
  return str;
}

solution(input);
```

문제는 두 수를 받아 이 두 수를 반대로 읽는 상근이와 똑같이 수를 다루어주면 됩니다.
그런데 제가 알기로는 js에서 문자열이나 숫자나 뭐든 뒤집는데 메소드를 사용한다면 아래와 같은 방식을 거쳐야 합니다.

```js
const a = 123
Number(a.toString().split("").reverse().join("")) // 321
```
음.. reverse의 내부 구현이 솔직히 어떤지 모르는 상황이고 물론 잘 돌아가는 함수를 두고 저는 굳이비 하나 제 함수를 만들었는데요


```js
/**
 * @param {string}  string
 * @param {number}  l
 * @returns {string[]}
 */
function reverseString(string, l = string.length - 1) {
  const str = string.split("");
  for (let i = 0; i < l / 2; i++) {
    [str[i], str[l - i]] = [str[l - i], str[i]];
  }
  return str;
}
```
위 함수는 이렇습니다. string을 받고 그 값의 길이의 절반을 반복하면서 스왑해줍니다.

즉 123을 받으면 1과 3의 위치를 바꾸고 반환해주는 것이죠.

사실 이 문제는 이 부분이 해결되면 모든게 끝난 것과 마찬가지입니다.
형변환을 통해 문자열을 숫자로 돌려주고 이를 비교 후 큰 값을 출력해주면 끝나게 됩니다.

```js
...
  A > B ? console.log(A) : console.log(B);
```