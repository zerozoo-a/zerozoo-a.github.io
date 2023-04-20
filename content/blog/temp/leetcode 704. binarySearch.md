---
title: leetcode 704. binarySearch
date: 2023-04-21 00:15:42
---

```md
Given an array of integers nums 
which is sorted in ascending order,
and an integer target, 
write a function to search target in nums.
오름차순으로 정렬된 배열과 배열에서 찾으려는 숫자를 입력으로 받는다.
 
If target exists, then return its index. 
Otherwise, return -1.
You must write an algorithm 
with O(log n) runtime complexity.

있으면 index 값을 없으면 -1을 반환하라.
제한은 O(log n) runtime complexity를 가진다.
```


```md
**Example 1:**

`Input: nums = [-1,0,3,5,9,12], target = 9`
`Output: 4`

Explanation: 9 exists in nums and its index is 4
Example 2:

Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1
```

```kts
// 해답코드는 아래와 같다
import kotlin.math.floor
class Solution {
    fun search(nums: IntArray, target: Int): Int {
        var left = 0;
        var right = nums.size - 1;
        
        while(left <= right) {
            var pivot = floor(((left + right) / 2).toDouble()).toInt()

            if(nums[pivot] == target) {
                return pivot;
            }

            if(nums[pivot] < target) {
                left = pivot + 1;
            }

            if(nums[pivot] > target) {
                right = pivot - 1;
            }
        }

        return -1;
    }
}
```

위 문제의 핵심은 정렬 되어진 값을 받는다는 것이다.

정렬이 이미 오름차순으로 되어 있기 때문에 오름차순 정렬을 적극 활용하면 된다.

처음 입력받은 배열의 0번째 인덱스를 `left` 배열의 마지막 인덱스를 `right`라고 정의하자.
배열의 중앙값을 찾아내어야 하는데 실수 범위로 확장되므로 이를 적절히 수정해주도록 하자.
이는 배열의 중앙을 나타내는 `pivot`이라 하겠다.

중앙 값을 찾아내었는데 해당 값이 찾고 있는 target 값이 맞다면 반환하고 끝.

중앙 값이 target 값 보다 크다면 `right` 포인터를 중앙값 - 1 만큼 옮겨준다.

`[1, 2, 3, 4, 5]` 이러한 배열이 있을 때 현재 `pivot`은 3 찾는 값이 2라고 하자.
`right`포인터는 5에 가있으므로 `right`포인터는 2까지 이동해주면 된다.

이제 제외 되어진 값들을 빼면 `[1, 2]`가 남게 된다. 반복문이 돌면서 답을 찾게 된다.


이렇게 찾는 범위를 반씩 툭툭 잘라 버리기 때문에 O(log n)이라는 효율이 나올 수 있다.
c like언어들은 전부 위의 방법을 통해 문제를 풀 수 있다.