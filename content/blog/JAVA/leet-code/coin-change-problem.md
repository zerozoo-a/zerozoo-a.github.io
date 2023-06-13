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

트리의 용어 중 레벨은 루트 노드에서 특정 노드까지의 edge(간선)의 수를 뜻합니다.

아래의 이미지를 통해 확인 가능합니다.
{% image "../images/Treedatastructure.png", "Tree data structure with explain"%}
(출처: <a href="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.geeksforgeeks.org%2Fintroduction-to-tree-data-structure-and-algorithm-tutorials%2F&psig=AOvVaw2KMJOaZHuYlqHfLtW1HSdf&ust=1686751012842000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCIiPsqmzwP8CFQAAAAAdAAAAABAE"> geeks for geeks</a>)



<br>
<br>
<br>

### DP에 대한 이해

이 문제가 DP 문제인지 바로 판단 할 수 있다면 좋겠습니다만
그런 문제는 없습니다.

DP는 최적 하위 구조를 가져야 합니다.

> 최적 하위 구조란 하위 문제가 상호 독립적인 구조를 가져야 합니다.
상호 독립적이란 것은 각 영역이 다른 영역을 침범하지 않는 것을 말합니다. 
<br> 
<br> 
예를 들어 동물원의 각 우리는 다른 영역을 침범 할 수 없어 상호 독립적입니다.
하지만 동물원 중 최고 인기 스타를 고르라면 서로의 영역이 섞이므로 독립적이지 않습니다. (🐼, 🐧)



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

간단한 재귀 트리를 그려보면 이해가 쉬워집니다.

아직 미완성의 글

