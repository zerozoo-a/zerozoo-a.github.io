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
const insertionSorts = {};
/**
 * @description
 * 배열을 두 개의 부분 배열로 나누면서 생각하면 된다.
 *
 * 내부의 while 문은 바깥 배열의 반복문의 현재 인덱스보다 하나 적은 인덱스를 가지며
 * 0까지 반복문을 돌리게 된다. 이 때, 해당 인덱스의 배열 값이 바깥 인덱스가 가리키는 배열의 값보다 큰 경우
 * 내부 인덱스 + 1의 배열 위치에 내부 반복문의 해당 인덱스의 값을 대입한다.
 *
 * @param {number[]} A
 * @returns {number[]}
 */
function insertionSort(A) {
  if (A.length < 2) return A;

  for (let j = 1; j < A.length; j++) {
    const key = A[j]; // 2
    let i = j - 1; // 0
    while (i >= 0 && A[i] > key) {
      A[i + 1] = A[i]; // 3 3 1
      i--;
    }
    A[i + 1] = key; // 3 2 1
  }
  return A;
}

function insertionSortDesc(A) {
  if (A.length < 2) return A;

  for (let j = 1; j < A.length; j++) {
    const key = A[j];
    let i = j - 1;
    while (i >= 0 && A[i] < key) {
      A[i + 1] = A[i];
      i--;
    }
    A[i + 1] = key;
  }
  return A;
}

insertionSorts.insertionSort = insertionSort;
insertionSorts.insertionSortDesc = insertionSortDesc;
exports.insertionSorts = insertionSorts;

```