---
title: backtracking 알고리즘
date: 2023-06-24 13:44:34
coverURL: https://images.unsplash.com/photo-1609631002724-572287d136bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80
---
{% image "../images/photo-1609631002724-572287d136bb.avif","footsteps" %}
<a href="https://unsplash.com/ko/%EC%82%AC%EC%A7%84/QfV6AqEwNBw">이미지 출처</a>
<br />
<br />
<br />

## backtracking 알고리즘이란?

> Backtracking can be defined as a general algorithmic technique that considers searching every possible combination in order to solve a computational problem. -geeks for geeks-

백트레킹 알고리즘은 문제 해결을 위해 가능한 모든 조합을 검색하는 일반적인 알고리즘 기법입니다.


## 구하는 것

주어진 배열의 모든 중복되지 않은 조합을 찾습니다.
int 배열 `int[] nums = {1, 2, 3}`이 주어졌을 때 아래의 답을 반환하면 됩니다.

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
		if(track.size() == nums.length) { // base-case
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

기본적인 프레임은 DFS를 통한 재귀 트리의 순회입니다.

주어진 배열을 반복문으로 순회하면서 재귀 호출을 실행합니다.

재귀 호출의 조건 중 기저조건에 닿으면 

- **값을 반환하고**,
- **해당 콜스택은 사라지고**,
- **tracking하던 값의 마지막 값을 삭제합니다.**


UML을 그려보겠습니다.

배열 `{1, 2}`를 입력받았다고 가정합니다.

트리는 DFS조건을 따라 가장 왼쪽 리프 노드 부터 진행됩니다.

```plantuml
node "0" as n0
node "1" as n1
node "1" as n1_2
node "2" as n2
node "base" as base

n0 --> n1 
n1 --> n1_2:x
n1 --> n2
n2 --> base
```

중복되는 track인 1 노드에 접근한 경우 `continue`를 통해 건너 뛰어줍니다.

리프노드에 도달해 `base case`에 닿은 경우가 발생했습니다.

2번 노드가 base case에 닿은 노드가 되었습니다.

- base case에 도달한 경우 콜스택을 반환합니다.
- track에서 마지막 값을 지웁니다.

track의 상태는 `1 -> 2`에서 `1`이 됩니다.
```plantuml
node "0" as n0
node "1" as n1
node "1" as n1_2
node "2" as n2
node "base" as base

n0 --> n1 
n1 --> n1_2:x
n1 --> n2
n2 --> base
n2 --> n1

base --> n2:return
```
이 상황에서 레벨 1의 노드 1의 상태는 아래와 같습니다.

- 하위 노드에게서 반환을 받음
- 순회중인 반복문의 i 값은 1임
- 하위 노드에게 반환을 받는 위치는 정확히 backtrack함수를 호출한 시점임
- 다음 명령어는 removeLast 함수임

위의 4개 상황이 node 1이 처한 상황이고
앞으로의 행동을 나타냅니다.

node1은 값을 반환받고 다음 명령어로 removeLast를 수행합니다.

track은 `1`에서 순서대로 removeLast 함수에 의해 `1`이 삭제되어 
이제 아무것도 가리키지 않게 됩니다.

그리고 반복문의 `i` 값은 1이였으므로 반복문이 종료되고
레벨 1의 노드 1은 할 일이 이제 없습니다. 스택은 사라지게 되고
레벨 0의 노드는 다음 반복문을 실행합니다.

nums의 배열에 다음 값은 2이므로 `i = 2`가 되고
다음 track의 시작값은 2입니다.
마지막 track의 값을 지우는 이유는 이전 값들을 재활용하기 위해서입니다. 

`{1, 2}` 배열의 경우 1을 구한 순간 남은 값은 2밖에 없어서 별로 티가 나지 않지만

`{1, 2, 3}` 배열의 경우 1을 구한 상태에서 `{1, 2, 3}`을 구할 수 있고, `{1, 3, 2}`를 구할 수도 있기 때문입니다.


```plantuml
node "0" as n0

node "1" as n1
node "2" as n2_2

node "1" as n1_2
node "2" as n2
node "1" as n1_3
node "2" as n2_3

node "base" as base
node "base" as base_2

n0 --> n1 
n0 --> n2_2

n1 --> n1_2:x
n1 --> n2
n2_2 --> n1_3
n2_2 --> n2_3:x

n2 --> base
n1_3 --> base_2

base --> n2:return
base_2 --> n1_3:return

```
위의 트리 노드는 배열 `{1, 2}`를 구하는 과정을 나타낸 것입니다. 

위 트리에서 base case까지 도달한 경우
해당하는 루트들은 조건에 알맞은 값이라고 볼 수 있습니다.

고작 배열 2개 짜리인데 트리의 깊이는 3레벨에 달합니다.
모든 경우의 수를 따지는 것이 기본이기 때문에 최적화에도 한계가 있습니다.
