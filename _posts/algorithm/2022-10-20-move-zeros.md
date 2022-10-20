---
layout: post
title: move zeros
date: 2022-10-20 23:02 +0900
categories: ["algorithm"]
tags: ["array","in-place"]
---

leet 코드가 새로운 배열을 만드는 것을 감지하고 test를 실패시키는건지 뭔지는 모르겠지만
filter를 통해 0을 제거하고 마지막에 제거한 만큼 0을 붙여주는 방식은 계속 실패를 받았다.

아래는 코드이다.
```js
function moveZeroes(nums) {
 let wIdx = 0;
 for(let i = 0; i < nums.length; i++){
     if(nums[i] !== 0){
         nums[wIdx] = nums[i];
         wIdx++;
     }
     
 }
 for(;wIdx < nums.length ; wIdx++){
     nums[wIdx] = 0;
 }
 return nums

}

```
아래는 코드에 대한 설명이다.

배열을 다룰 때 인덱스를 적절히 활용하는게 중요한데,
중요한 점은 wIdx는 순회하는 배열의 숫자가 0이 아닐 경우 값의 증가가 없다.

`[0, 1]`을 위 함수에 적용시켜보자.
- <h5>wIdx와 i는 0을 가리킨다.</h5>
- <h5>첫 번째 루프가 시작된다.</h5>
- <h5>루프가 한 번 돌았다. i = 1 wIdx = 0</h5>
- <h5>루프가 두 번째 바퀴를 돈다. if 조건문에 합당하다.</h5>
- <h5>nums[wIdx] = nums[i] 는 이와 같다. nums[0] = nums[1] 는 배열을 변경한다. [1, 1]</h5>
- <h5>루프를 종료한다.</h5>
- <h5>wIdx는 1이고 i는 스코프를 벗어나 접근할 수 없다.</h5>
- <h5>두 번째 루프가 동작한다.</h5>
- <h5>wIdx = 1이다. wIdx < nums.length는 이와 같다. 1 < 2</h5>
- <h5>nums[wIdx] = 0은 이와 같다. nums[1] = 0 은 배열을 변경한다. [1, 0]</h5>
- <h5>루프가 종료된다.</h5>

문제에서 원하는 바를 모두 해결하였다.
