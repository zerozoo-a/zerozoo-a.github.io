---
layout: post
title: insertion sort node js
date: 2022-11-14 00:56 +0900
categories: ["algorithm"]
tags: ["insertion sort","sort"]
---


## insertion sort
---

```js

/**
 * @description
 * insertion sort는 O(n^2) 정렬중에서는 가장 효율이 좋다.
 * 삽입 정렬은 외부 반복문이 검사할 인덱스를 배열 0 번째부터 하나씩 늘려가고 내부의 반복문은
 * 외부 인덱스에서부터 0 번째 인덱스를 향해 값을 줄여나가면서 스왑한다 while문의 조건에 걸려 있기 때문에
 * swap이 종료되면서 내부 반복문도 종료된다.
 *
 * [2, 3, 4, 1] 정렬:
 *
 * 배열의 0 번째와 1 번째를 서로 비교
 * ...
 * 배열의 2 번째와 3 번째를 서로 비교
 *
 * 스왑 => [2, 3, 1, 4]
 *
 * 배열의 0 번째와 1 번째를 서로 비교
 *
 * 배열의 2 번째와 3 번째를 서로 비교
 *
 * 스왑 => [2, 1, 3, 4]
 *
 * 배열의 0 번째와 1 번째를 서로 비교
 *
 * 스왑 => [1, 2, 3, 4]
 *
 * @param {number[]} A
 * @returns {number[]}
 */

function insertionSortDesc(A) {
  if (A.length < 2) return A;

  let i, j;
  for (i = 0; i < A.length - 1; i++) {
    j = i;
    while (j >= 0 && A[j] < A[j + 1]) {
      [A[j], A[j + 1]] = [A[j + 1], A[j]];
      j--;
    }
  }
  return A;
}

/**
 *
 * @param {number[]} A
 * @returns {number[]}
 */
function insertionSort(A) {
  if (A.length < 2) return A;

  let i, j;
  for (i = 0; i < A.length - 1; i++) {
    j = i;
    while (j >= 0 && A[j] > A[j + 1]) {
      [A[j], A[j + 1]] = [A[j + 1], A[j]];
      j--;
    }
  }
  return A;
}
```