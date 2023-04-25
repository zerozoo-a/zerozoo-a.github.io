---
title: findMax divide and conquer
date: 2023-04-24 23:04:46
---

전형적인 트리 구조의 재귀형 문제이다.

그리디하게 문제를 풀어낼 수 있지만,
해당 방법 이외의 방법으로 O(nlogn)의 속도를 내는 방법은 
아래와 같이 재귀적으로 배열을 쪼개 들어가면서 가장 큰 값을 찾아 올려주는 것이다.

js는 꼬리재귀 최적화를 안해주므로 알아서 최적화를 해야한다.




```js
/**
 *
 * @param {number[]} arr
 * @param {number} start
 * @param {number} end
 */
const max = (arr, start, end) => {
  if (start === end) return arr[start];
  else {
    const mid = Math.floor((start + end) / 2);
    const leftMax = max(arr, start, mid);
    const rightMax = max(arr, mid + 1, end);

    if (leftMax > rightMax) return leftMax;
    else return rightMax;
  }
};

const main = () => {
  const arr = [1, 2, 3, 4, 2, 1, 9, 7, 9, 71, 9];
  const start = 0;
  const end = arr.length;
  console.log(max(arr, start, end - 1));
};
main(); // 71
```