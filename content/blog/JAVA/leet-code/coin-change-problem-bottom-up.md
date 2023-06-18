---
title: coin-change-problem-bottom-up
date: 2023-06-18 15:14:21
coverURL: 
---
<br />
<br />
<br />

## coin change 문제에서 bottom up의 접근

문제는 이전 게시글인 <a href="/blog/JAVA/leet-code/coin-change-problem/">재귀 트리를 통한 접근</a>에 있습니다.

bottom-up 접근을 통해 call stack이 쌓이는 것을 방지하는 풀이를 해보겠습니다.
이 문제 풀이 법은 접근 방식은 아래와 같습니다.

- amount보다 하나 큰 배열을 만든다.
- amount를 순회한다.
  - 순회하면서 각 인덱스의 값을 가진 coins만큼 순회한다.
  - 이전 dp의 값에서 코인만큼 뒤에 있는 값을 꺼내와 하나를 더해 비교한다.
  - 더 작은 값을 취한다.
  - dp 배열에 저장한다.
  - 반복한다.
  
```java
// java
int[] coins = {1, 2};
int amount = 3;
```

위와 같은 코인 배열과 amount를 예로 들면,

amount + 1만큼 int 배열을 만듭니다.

```java
// java
int[] dp = new int[amount + 1];
```

dp배열의 각 인덱스를
인덱스의 값만큼 최소한의 코인으로 채운 코인의 수라고 합시다.

예를 들어

dp[0]은 index 0입니다. index 0을 코인의 amount로 본다면
amount 0은 코인 0개로 만들 수 있습니다.

dp[1]은 index 1입니다. index 1은 코인 1짜리 한개로 만들 수 있습니다.
dp[1] = 1이 되야합니다.

dp[2]는 index 2입니다. index 2 는 코인 1 짜리 두개 혹은 2 짜리 코인 한개로 만들 수 있습니다.
그럼 둘 중 작은 값을 dp[2]에 넣어줍니다. dp[2] = 1 입니다.

이런 식으로 값을 채워나가는 것입니다.

**여기서 중복계산이 숨어있다는 것을 어렴풋이 느낄 수 있습니다.
바로 dp[2]에는 dp[1]의 값을 활용 할 수 있다는 것입니다.**


```java
// java
int[] coins = {1, 2};
int amount = 3;
```
아래와 같이 이중 반복문을 그려 봅시다.


```java
int[] coins = {1, 2};
int amount = 3;


for(int i = 0; i < coins.length; i ++) {
    for(int coin : coins) {
        // 아직 빈칸
    }
}
```

amount는 3이네요.

0을 만드는 경우를 포함하기 위해 3 보다 하나 큰 배열을 만들고 해당 배열을
4로 초기화 하겠습니다.


```java
// java
int[] coins = {1, 2};
int amount = 3;
int[] dp = new int[amount + 1]; // [0, 0, 0, 0]

Array.fill(dp, amount + 1); // [4, 4, 4, 4]
dp[0] = 0; // [0, 4, 4, 4]

for(int i = 0; i < coins.length; i ++) {
    for(int coin : coins) {
        // 아직 빈칸
    }
}
```
dp[0]의 값은 아무 코인도 넣지 않으면 되고 이미 `dp[0] = 0;`을 통해 값을 초기화 했으므로
적절한 조건문을 통해 넘어가줘야 합니다. 

```java
// java 
// ...
for(int i = 0; i < coins.length; i ++) {
    for(int coin : coins) {
        if(i - coin < 0) continue;
    }
}
```

<br />
<br />
<br />

## coin만큼 뒤로가 값을 꺼내오기

dp 배열에 접근 할 수 있으려면 `i - coin`의 값은 0 이상이여야 합니다.
`i - coin`은 외부 반복문이 dp를 순회하며 이전 `dp[i - coin]`의 값을 가져오는데도 사용됩니다.

`dp[i-coin]`은 dp 배열에 저장한 각 dp 배열의 index 만큼을 coins로 달성하기 위해
최소 몇개가 필요한지를 저장한 저장소입니다.

`dp[i-coin]`으로 접근한다는 것은 현재 dp index에서 지금 순회하고 있는 coin만큼
뒤로 이동한다는 것인데요

coin만큼 뒤로 이동한 결과값에 + 1을 한 경우 이전의 결과값에 수중의 코인 한개를 더하면
dp에 값을 채워넣을 수 있다는 것입니다. (특정 코인이 아닌 코인 한개!)

아래는 디버깅 중인 값을 추출해왔다고 생각해주세요
```java
dp[0] = 0;

// 아래는 반복문

dp[2] = Math.min(dp[2]/** 4 */, dp[2 - 1] /** 1 */ + 1) // 반복문 coin = 1 일 때,

dp[2] = Math.min(dp[2] /** 2 */ , dp[2 - 2] /** 0 */ + 1) // 반복문 coin = 2 일 때
```
coins로 내부에서 반복문이 다시 돌기 때문에 위와 같은 상황이 만들어집니다.

coin = 1일 때 dp에서 코인 1 만큼 이전 데이터 값을 불러옵니다.
dp[2 - 1]이겠네요 이 값은 1이죠 이 값에 코인 1을 더하면 2가 되므로 dp[2]의 값 4와 비교하면 더 작은 값으로 저장됩니다.

이 방식은 dp에서 순회중인 코인만큼의 이전 값을 꺼내와 해당 값에 해당 코인을 하나 더하면 최소 값을 만족하는 것을 이용한 것입니다.

```java
package leetCodes;

import java.util.Arrays;

public class CoinChangeIterate {
	public static void main(String[] args) {
		int[] coins = {1,2};
		int amount = 3;
		int result = coinChange(coins, amount);
		System.out.println("result: " + result);

	}

	public static int coinChange(int[] coins, int amount) {
		int[] dp = new int[amount + 1];

		Arrays.fill(dp, amount + 1);

		dp[0] = 0;

		for(int i = 0; i < dp.length; i++) {
			for(int coin : coins) {
			if(i - coin < 0) continue;
			dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
			}
		}

		return (dp[amount] == amount + 1) ? -1 : dp[amount];
	}
}
```


<br />
<br />
<br />

## 요약

bottom-up 방식의 핵심은 이전 값들에서 새로운 값을 뽑아낸다는 것입니다.
위 문제에선 이전 값을 찾아가는 방식이 핵심입니다.

보통 bottom-up 방식은 각 배열의 index에 해당하는 값이
각 문제의 정답을 가지고 있습니다.

각 문제의 정답을 가지고 있는 index는 이전 값이죠
현재 값인 coin은 이전 값에서 뽑아낼 수 있는데요
현재 index에서 coin의 값만큼 뒤로 이동해 값을 뽑아오는 것입니다.

즉 dp[5]에 값을 넣기 위해 현재 coin이 2라고 가정하죠 
dp[3]은 이미 적절한 값으로 완성 되어 있다고 보고,(이 때 dp[3]은 amount 3을 만들기 위한 최소 동전 수)
dp[3] + 1을 더하면 dp[3]에 2짜리 하나의 동전을 추가하면 dp[5]를 만족할 수 있다는 것을 나타내죠

하지만 만족한다는 것은 amount를 채울 수 있다는 것이지 최소값을 만족한다는 것이 아닙니다.

그래서 Math.min으로 비교를 하는 것입니다.






