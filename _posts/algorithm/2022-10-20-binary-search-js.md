---
layout: post
title: binary search js
date: 2022-10-20 21:32 +0900
categories: ["algorithm"]
tags: ["binary search"]
---

binary search 의 방식은 간단해서 외울 수 있을 정도이다.
binary search 알고리즘이 찾아주는 값은 target의 값이 배열의 몇번째 index에 있는지를 찾아준다.

찾고자 하는 값과 정렬된 배열을 인자로 받는다.

함수 내부에서는 `left, pivot, right`를 변수로 가지며 이를 변경하며 값을 찾게 된다.


> left = 0
> 
> pivot = (left + right) / 2
> 
> right = array.length - 1

각 변수는 위의 초기값을 가지게 된다.

pivot은 배열의 중간 index에서부터 시작하게 되는데 이미 정렬되어 있는 배열이므로 값으로도 중간 값이다.

이제 값을 찾기 위한 분기를 작성하면서 배열을 반씩 잘라 탐색 구간을 줄여나가게 된다.

예시 배열은 `[1, 3, 5, 7, 11]`라고 하자.  
`target = 7, left = 0, right = 4, pivot = 2`

`array[pivot]`의 값이 target보다 작은 경우 target의 값은 `array[pivot]`의 오른쪽에 위치한다는 의미이다.
이제 배열의 절반을 탐색하지 않아도 된다.

`array[pivot]`의 위치를 기반으로 left의 위치를 현재 pivot의 위치보다 + 1 한 위치로 이동시킨다.
(그냥 left = pivot + 1 이긴 하다.)

이제 left = pivot + 1 = 2 + 1 = 3이다.
right는 그대로이다.
pivot는 반복문에 의해 다시 설정되어 (3 + 4) / 2 = Math.floor(7/2) = 4 이다.
array[pivot] === target에 합당하여 pivot의 위치를 반환해주는 것으로 종료된다.


```js
// 시간복잡도 O(log n)
function binarySearch(target, array) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    let pivot = Math.floor((left + right) / 2);

    if (array[pivot] === target) return pivot;

    if (array[pivot] < target) {
      // pivot이 target보다 작은 경우
      // target은 현재의 pivot보다 더 오른쪽에 있음
      // left의 위치를 현재 pivot + 1의 위치로 옮김
      left = pivot + 1;
    }

    if (array[pivot] > target) {
      // pivot이 target보다 큰 경우
      // target은 현재의 pivot보다 더 왼쪽에 있음
      // left의 위치를 현재 pivot - 1의 위치로 옮김
      right = pivot - 1;
    }
  }
  return -1;
}

const a = [1, 3, 6, 8, 2, 5, 9];
console.log(a.sort());
console.log(
  binarySearch(
    9,
    a.sort((a, b) => a - b)
  )
);

```