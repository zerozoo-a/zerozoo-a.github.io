---
layout: post
title: selection sort node.js
date: 2022-11-13 19:27 +0900
categories: ["algorithm"]
tags: ["selection sort","sort"]
---


## selection sort
---

```js

/**
 *
 * @description
 * 선택정렬은 O(n^2)시간을 소요한다.
 *
 * 배열 [3,2,1]을 선택정렬을 통해 정렬한다면,
 *
 * min 값을 Infinity로 설정하여 숫자배열에 대해 가장 큰 인자로 만든다.
 * 이중 배열을 순회하면서 배열 내부의 값 중 min 보다 작은 값을 찾았을 때 min을 초기화한다.
 * 해당하는 작은 값의 위치를 가리키는 index를 초기화한다.
 *
 * i는 내부 배열의 시작지점을 나타내고 index가 변경되었다는 것은 min이 갱신되었음을 의미하므로
 * swap을 할 가치가 있다. 따라서 swap 해준다.
 *
 * @param {number[]} A
 * @returns {number[]}
 *
 */
exports.selectionSort = function (A) {
  let i, j, min, index;
  for (i = 0; i < A.length; i++) {
    min = Infinity;
    for (j = i; j < A.length; j++) {
      if (min > A[j]) {
        min = A[j];
        index = j;
      }
    }
    if (i !== index) [A[i], A[index]] = [A[index], A[i]];
  }
  return A;
};
```