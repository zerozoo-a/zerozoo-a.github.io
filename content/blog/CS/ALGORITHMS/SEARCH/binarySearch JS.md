---
title: leetcode 704. binarySearch
date: 2023-04-25 15:15:05
---

JS버전의 binary search

`binarySearch` = 재귀

`binarySearch2` = 반복문

```js
const binarySearch = (arr, left, right, x) => {
  let mid = -1;
  if(right >= left) {
    mid = Math.floor((left + right) / 2)

    if(arr[mid] === x) {
      return mid;
    } else if(arr[mid] > x) {
      return binarySearch(arr, left, mid-1, x)
    } else {
      return binarySearch(arr, mid+1, right, x)
    }
  } else {
    return mid;
  }
}

const arr = [1, 2, 3];
const answer = binarySearch(arr, 0, arr.length, 0);
console.log(`answer: ${answer}`);

/**
 * 
 * @param {number[]} arr 
 * @param {number} x 
 * @returns 
 */
const binarySearch2 = (arr, x) => {
  let left = 0, right = arr.length - 1

  while(left <= right) {
    let mid = Math.floor(left + right) / 2

    if(arr[mid] === x) { return mid }
    else if(arr[mid] < x) { 
      left = mid + 1
    } else {
      right = mid - 1
    }
  }
  return -1
}

const answer2 = binarySearch2([1,2,3],2)
console.log(`answer2: ${answer2}`);

```