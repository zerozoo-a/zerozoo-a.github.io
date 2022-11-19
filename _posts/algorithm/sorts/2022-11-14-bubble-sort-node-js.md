---
layout: post
title: bubble sort node js
date: 2022-11-14 00:56 +0900
categories: ["algorithm"]
tags: ["bubble sort","sort"]
---


## bubble sort
---

```js
/**
 * @description
 *
 * bubbleSort 🫧 의 방식은 두 중첩된 반복문을 통해 이루어진다.
 * 내부의 반복문이 한 번 순회를 하면 가장 큰 값이 배열의 맨 뒤로 이동하게 된다.
 * 두 번 순회하면 그 다음 큰 값이 맨 뒤로 이동하게 된다.
 * n 번 순회하면 n 번 째의 큰 값이 뒤로 이동하게 되어 최종적으로 정렬이 끝난다.
 *
 * [3, 2, 1]을 정렬한다고 가정하면,
 * 0 번과 1 번의 값을 비교해 서로 스왑한다. => [2, 3, 1]
 * 1 번과 2 번의 값을 비교해 서로 스왑한다. => [2, 1, 3]
 *
 * 내부 반복문이 종료되고 외부 반복문에 의해 배열의 마지막에 접근을 못하도록 해주면 된다.
 * 이는 내부 반복문에 i 만큼의 값을 빼주면 배열의 뒷꽁무니를 자르는 듯한 느낌으로 내부 반복문은 이제
 * [2, 1] 배열만을 순회 할 수 있게 된다.
 *
 *
 *
 * @param {number[]} A
 * @returns {number[]}
 */
exports.bubbleSort = function (A) {
  if (A.length < 2) return A;

  let i, j;
  for (i = 0; i < A.length; i++) {
    for (j = 0; j < A.length - 1 - i; j++) {
      if (A[j] > A[j + 1]) {
        [A[j], A[j + 1]] = [A[j + 1], A[j]];
      }
    }
  }
  return A;
};
```