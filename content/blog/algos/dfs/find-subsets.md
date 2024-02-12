---
title: find subsets
date: 2024-02-06 01:17:30
coverURL: 
---
<br />
<br />
<br />

```js
/**
 * @param {number[]} nums
 * */
const subset = function (nums) {
  const result = [[]]; // 공집합은 미리 넣어둡니다.

/**
 * @param {number} index
 * @param {number[]} stack
 *
 * 제공받은 nums 배열의 길이만큼 반복합니다.
 * 배열의 길이가 2인 경우 2번 반복합니다.
 * 반복문 내에서 i를 증가하며 재귀함수를 호출합니다.
 * 
 * 반복문의 i의 초기화 조건에 따라 제공받은 nums 배열의 i번째
 * 값부터 stack에 push 합니다.
 * 
 * - 재귀 1회차: 1을 push하고 재귀 호출
 * result = [[], [1]] 
 * stack = [1] 
 * 
 * - 재귀 2회차: 2를 push하고 재귀 호출
 * result = [[], [1], [1, 2]] 
 * stack = [1, 2] 
 * 
 * - 재귀 3회차: 반복문이 종료되어 call stack pop 2회차의 재귀 call 다음으로 이어짐
 * 
 * - 재귀 2회차: stack.pop하고 재귀 1회차의 재귀 call 다음으로 이어짐
 * stack = [1] 
 * 
 * - 재귀 1회차: stack.pop하고 반복문 i의 값을 올림
 * stack = [] 
 * 
 * - 이어지는 반복문 i 값이 올라가고 제공받은 nums 배열의 i+1값부터 위 과정을 반복
 * 이 때 stack은 비어져 있고
 * stack에는 2부터 채워짐
 * 
 * 예를 들어 배열 [1, 2, 3, 4]에 대해
 * 
 * result = [[], [1], [1, 2]] 까지 채우고 stack을 pop하며 비움
 * 반복문이 돌아서 2부터 subset을 채움
 * result = [[], [1], [1, 2], [2], [2, 3]]
 * 이를 배열의 길이만큼 반복합니다.
 * */
  function dfs(index, stack) { 
    for (let i = index; i < nums.length; i++) {
      stack.push(nums[i]);
      result.push([...stack]);
      dfs(i + 1, stack);

      stack.pop();
    }
  }

  dfs(0, []); // 빈 배열을 stack으로 넘겨줍니다.
  return result;
};

subset([1, 2]);
```
