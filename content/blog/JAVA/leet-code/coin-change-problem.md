---
title: coin-change-problem
date: 2023-06-13 01:00:27
coverURL: 
---
<br />
<br />
<br />

## 동전 교환 문제
---

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

---


<br>
<br>
<br>

## 시작하기 전에
---

이 문제를 풀기에 앞서 이해하면 좋을 내용들
- 트리에 대한 이해
- DP에 대한 이해

### 트리에 대한 이해

트리의 용어 중 level은 루트 노드에서 특정 노드까지의 edge(간선)의 수를 뜻합니다.

### DP에 대한 이해

DP는 특정 조건을 만족하는 문제들에 대해서 유효한 해결법입니다.
만능이 아니므로 DP가 적용 가능한 문제인지 아닌지 판별 할 수 있어야 합니다.


<br>
<br>
<br>

## 재귀트리
___

이 문제는 재귀트리를 그려 나갑니다.

재귀트리는 coins 배열의 반복문을 돌며 amount - coin의 값을 계산하며
dp 함수에 인자로 넘겨줍니다. 하향식 구조를 띄고 있습니다.

amount - coin의 값이 0인 경우 기저조건에 닿게 됩니다.
해당 기저조건은 coin이 정상적으로 amount를 모두 소진했다는 뜻입니다.

amount가 0이 될때까지 재귀 트리는 amount - coin이 실행된 횟수만큼 트리의 깊이가 깊어집니다. level의 값 만큼 코인이 사용되었다는 것을 의미하며

최소 횟수를 반환하면 되니까 상위 노드에게 전달 할 값으로는 subProblem과 res 값 중
적은 값을 고르면 됩니다.


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

본 글은 임시글입니다!