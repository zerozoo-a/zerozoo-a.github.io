---
title: coin-change-problem
date: 2023-06-13 01:00:27
coverURL: https://images.unsplash.com/photo-1587403335644-fa8fef06b261?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80
---

{% image "../images/coins.avif", "dropping coins picture"%}
(<a href="https://unsplash.com/ko/%EC%82%AC%EC%A7%84/VK7jXtOtEuM">이미지 출처</a>)
<br />
<br />
<br />

## 동전 교환 문제

각 동전의 개수가 무한한 동전과 거슬러 줘야 하는 값이 있습니다.
각각 coins, amount로 표현해보겠습니다.

```java
// java
int[] coins = {1, 2, 5};
int amount = 5;
```
동전을 amount 만큼 거슬러 줘야 합니다.

단, 가장 최소한의 동전 갯수를 사용해 거슬러주면 됩니다.

위 조건의 경우 동전 5짜리를 하나가 최소한의 갯수를 충족하므로 정답은 1입니다.


<br>
<br>
<br>

## 시작하기 전에

이 문제를 풀기에 앞서 이해하면 좋을 내용들
- 트리에 대한 이해
- DP에 대한 이해

### 트리에 대한 이해

텍스트보단 아래와 같은 이미지가 설명에 훨씬 도움이 될 것입니다.
{% image "../images/Treedatastructure.png", "Tree data structure with explain"%}
(출처: <a href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.geeksforgeeks.org%2Fintroduction-to-tree-data-structure-and-algorithm-tutorials%2F&psig=AOvVaw2KMJOaZHuYlqHfLtW1HSdf&ust=1686751012842000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCIiPsqmzwP8CFQAAAAAdAAAAABAE"> geeks for geeks</a>)



<br>
<br>
<br>

## DP에 대한 이해

`이 문제는 최적 하위 구조를 가지므로 동적 계획법 문제이다.`
이런 문구를 어디선가 본 적이 있을겁니다.

이 문제를 예로 최적 하위구조를 설명해보겠습니다.

거스름돈을 거슬러 줄 때 정해진 n개의 종류로 (각 동전의 갯수는 무한인) 거스름 돈을
돌려주면 됩니다. 최소한 몇 개의 동전이 필요한지를 구하는 문제이므로

최적 하위구조에 적합하단 말인데 이 것만으로는 이해가 어려운데요,
극단적으로 문제를 쉽게 만들어 이해력을 높여보겠습니다.

```java
int[] coins = {1, 2};
int amount = 3;
```

거슬러 줄 수 있는 코인은 2개
거슬러 줘야 하는 값은 3입니다.

1짜리 코인으로 amount를 3만큼 거슬러주겠습니다.

`(((amount - 1) - 1) - 1) = 0` 같은 함수를 3번 중첩합니다. 
이는 재귀 함수이자 합성 함수이죠 3번 함수를 실행하면 amount는 0이 됩니다.

0이 된 값은 기저조건에 닿게됩니다.
이렇게 한 번의 조건을 찾아냈습니다. 

`이는 재귀 트리의 왼쪽 노드만 타고 내려온 결과입니다.`

만약 이 왼쪽 최하단 리프 노드에서 바로 위 레벨로 올라가 다시 오른쪽 노드로 내려간다면
2짜리 코인으로 amount를 빼서 amount의 값은 -1입니다.

> 이렇게 왼쪽 노드만 타고 내려간 결과와 그 옆에도 한번 다리를 걸친 결과가
서로 아무 영향을 주지 않기 때문에 최적 하위 구조라고 할 수 있습니다.

<br>
<br>
<br>

## 문제

1. k개의 서로 다른 종류의 동전이 있습니다.
     1. 3개라면 1 동전, 2 동전, 5 동전 각각 종류가 다릅니다.
2. amount가 있습니다. k개의 동전을 최소한으로 사용해 amount 만큼 거슬러주면 됩니다.

동전 배열 `{1, 2, 5}` 가 주어지고 11이라는 amount가 주어지면 5 + 5 + 1로 3개의 동전을 사용해 amount만큼 거슬러 줄 수 있으므로 답은 3이 됩니다.


<br>
<br>
<br>

## 재귀트리

아래의 재귀트리는 주어진 코인 배열을 순회하면서 각 코인을 통해
재귀 함수를 실행합니다.

- 재귀 함수의 기저조건은 `amount = 0`이 되었을 때 0을 반환합니다.
- amount의 값이 `0` 보다 작은 경우 `-1`을 반환합니다. 해당 재귀의 결과는 유효하지 않다는 정보를 나타냅니다.

```java

package leetCodes;

public class CoinChange {
	public static void main(String[] args) {
		int[] coins = {1, 2, 5};

		int result = dp(coins, 11);
		System.out.println("result: " + result);
	}

	static int dp(int[] coins, int amount) {
		// base case
		if (amount == 0) return 0;
		if (amount < 0) return -1;

		float res = Float.POSITIVE_INFINITY;

		for (int coin : coins) {
			int subProblem = dp(coins, amount - coin);

			if (subProblem == -1) continue;
			res = Math.min(res, 1 + subProblem);
		}

		if (res != Float.POSITIVE_INFINITY) {
			return (int) res;
		}
		return -1;
	}


}
```

이런 문제는 재귀 트리를 그려보면 이해가 쉬운데요

꼭 자기 손으로 그려보는게 좋습니다.

블로그에 UML 다이어그램 renderer를 구축하고나면 그림을 추가하겠습니다.
