---
layout: post
title: baekjoon 4673 node.js
date: 2022-10-30 23:25 +0900
tags: ["BAEKJOON", "NODE.JS", "4673"]
---

###  node.js 

--- 

#### 문제 
셀프 넘버는 1949년 인도 수학자 D.R. Kaprekar가 이름 붙였다. 양의 정수 n에 대해서 d(n)을 n과 n의 각 자리수를 더하는 함수라고 정의하자. 예를 들어, d(75) = 75+7+5 = 87이다.

양의 정수 n이 주어졌을 때, 이 수를 시작해서 n, d(n), d(d(n)), d(d(d(n))), ...과 같은 무한 수열을 만들 수 있다. 

예를 들어, 33으로 시작한다면 다음 수는 33 + 3 + 3 = 39이고, 그 다음 수는 39 + 3 + 9 = 51, 다음 수는 51 + 5 + 1 = 57이다. 이런식으로 다음과 같은 수열을 만들 수 있다.

33, 39, 51, 57, 69, 84, 96, 111, 114, 120, 123, 129, 141, ...

n을 d(n)의 생성자라고 한다. 위의 수열에서 33은 39의 생성자이고, 39는 51의 생성자, 51은 57의 생성자이다. 생성자가 한 개보다 많은 경우도 있다. 예를 들어, 101은 생성자가 2개(91과 100) 있다. 

생성자가 없는 숫자를 셀프 넘버라고 한다. 100보다 작은 셀프 넘버는 총 13개가 있다. 1, 3, 5, 7, 9, 20, 31, 42, 53, 64, 75, 86, 97

10000보다 작거나 같은 셀프 넘버를 한 줄에 하나씩 출력하는 프로그램을 작성하시오.

--- 

#### 입력
--- 
입력은 없다.

```
```
#### 출력
--- 
10,000보다 작거나 같은 셀프 넘버를 한 줄에 하나씩 증가하는 순서로 출력한다.

```
1
3
5
7
9
20
31
42
53
64
 |
 |       <-- a lot more numbers
 |
9903
9914
9925
9927
9938
9949
9960
9971
9982
9993
```
#### 풀이
--- 

```js
/**
 * @param {number} n
 * @return {void}
 */

const limit = 10_000;
function d() {
  const set = new Set([...seq(limit)]);
  for (let i = 1; i <= limit; i++) {
    set.delete(sub(i));
  }

  let list = "";
  set.forEach((a) => (list += `${a}\n`));
  console.log(list.slice(0, -1));
}

/**
 * @param {number} start
 * @param {number} end 
 */
function* seq(start = 1, end = Infinity) {
  if (end === Infinity) {
    end = start;
    start = 1;
  }
  while (start <= end) {
    yield start++;
  }
}

/**
 * @param {number} n
 * @return {number}
 */
function sub(n) {
  const a = divide(n);
  return a.reduce((a, b) => a + b, 0) + n;
}

/**
 *
 * @param {number} n
 * @return {number[]}
 */
function divide(n) {
  return n.toString().split("").map(Number);
}

d();
```

음.. 해당 코드는 조금 장황하지만 

작은 함수들의 조합이므로 각 함수들을 이해하는 것은 어렵지 않습니다.
이 문제를 푼 메인 컨셉만 이해하면 문제는 간단합니다.

Set을 통해 10,000까지 꽉 채웁니다.

셀프 넘버는 생성자로 만들어지지 않는 값이라고 하니, 생성자로 만들어 진 값들을 모두 지워버리면 셀프 넘버만 남게 됩니다.