---
title: backtracking 알고리즘
date: 2023-06-24 13:44:34
coverURL: https://images.unsplash.com/photo-1561229474-1f22e022dfd4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80
---

<br />
<br />
<br />

## backtracking 알고리즘이란?

`backtracking` (이하 백트레킹이라 하겠습니다.) 이란 주어진 모든 문제의
가능한 후보군을 탐색하면서 조건에 맞지 않는 후보를 즉시 포기하며 가능한 후보군들의
집합을 모으는 알고리즘입니다.


## 구하는 것

간단히 설명해보겠습니다.

순열에서 <a href="https://ko.wikipedia.org/wiki/%EC%88%9C%EC%97%B4">permutation</a>을 찾는다고 합시다. 중복을 허용하지 않는 경우를 찾아야 하는데요

언제나처럼 간단한 예로 설명해보겠습니다.

$$_{n}P_{r} = \dfrac{n!}{(n - r)!}$$

permutation은 보통 위와 같은 공식임을 알고 있습니다.

숫자 1, 2, 3의 3 permutation을 찾는다고 합시다.

$$_{3}P_{3} = \dfrac{3!}{(3-3)!} = 6$$

수학적으로는 위와 같이 나타낼 수 있습니다.
물론 위 방법을 통해 갯수를 찾아내는 것은 간단합니다만

선택되어진 원소들의 나열 된 값, 바로 **이게 구하는 것**입니다.
```java
res: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
```


## 주어진 것

문제에서 주어지는 것은 숫자 배열입니다.

```java
// java
        int[] nums = {1,2,3};
        ...
		List<List<Integer>> result = permute(nums);
        ...
```

## 풀이

풀이는 아래와 같습니다.

```java
// java

package leetCodes;


import java.util.LinkedList;
import java.util.List;

public class Backtracking {
	static List<List<Integer>> res = new LinkedList<>();

	public static void main(String[] args) {
		int[] nums = new int[] {1,2,3};
		List<List<Integer>> result = permute(nums);
		System.out.println("res: "+res);
	}

	static List<List<Integer>> permute(int[] nums) {
		LinkedList<Integer> track = new LinkedList<>();
		backtrack(nums, track);
		return res;
	}

	static void backtrack(int[] nums, LinkedList<Integer> track){
		if(track.size() == nums.length) {
			res.add(new LinkedList<>(track));
			return;
		}

		for(int i = 0; i < nums.length; i++) {
			if(track.contains(nums[i])) {
				continue;
			}
			track.add(nums[i]);
			backtrack(nums, track);
			track.removeLast();
		}
	}
}

```


## 해석

이전에 풀어본 코인 문제와 비슷합니다.

단 배열이 아니라 값을 저장하는 용도로 LinkedList를 사용했습니다.

nums의 배열만큼 반복문 내부의 재귀를 호출합니다.
```java
int[] nums = {1, 2};
```
인 경우가 가장 간단하겠습니다.

루트에서 왼쪽 자식 노드로 1을 track에 넣어준 뒤 실행합니다.

왼쪽 자식 노드에서 호출된 재귀는 다시 track에 1을 넣으려 시도합니다만 이미 track에 값이 있으므로 반복문을 다음으로 넘깁니다.

2를 담을 수 있습니다.

재귀를 호출하면 기저조건에 닿게 됩니다.
그리고 track의 마지막 값을 지우면 반복문도 모두 돌게 됩니다. 

만약 여기서 배열이 1, 2가 아닌 

```java
int[] nums = {1, 2, 3};
```
였다면 track은 반복문에서 2의 값을 순회할 때,
`{1, 2, 3}`을 채우고,

3의 값을 순회할 때 `{1, 3, 2}`를 채울 수 있게 됩니다.

이렇게 마지막 list를 지우면 맨 처음 고른 1의 값은 유지한채 `{1, 2, 3}`를 만들 수 있게 됩니다.

이렇게 간단한 방법으로 알아본 backtracking입니다만,

실제 프로덕션 레벨에서 사용하려면 좀 더 최적화를 해줘야 합니다.

물론 모든 순회를 한다는 점에서 N!이라는 속도를 어찌 할 방법은 없습니다.







