---
title: 정겨운 피보나치 수열
date: 2023-06-10 21:45:20
coverURL: https://blog.kakaocdn.net/dn/vHbJA/btrfs7ku9SC/JYjYwKITNC2wzspBqNv0Uk/img.png
---
<br />
<br />
<br />

## 시작하기에 앞서
---

자바에 대한 기본적인 문법 공부가 끝나 드디어 알고리즘 문제풀이에 사용 할 정도가 되었습니다.

전세계 공통 알고리즘의 용광로인 leet code에서 기초적인 문제를 하나씩 풀어보겠습니다.

<br>
<br>
<br>

## 피보나치 수열에 대해
---

섬에 토끼를 풀었더니.. 하는 풀이는 대체 이해가 안가더라구요

그냥 어떤 수열인지를 써놓으면 직관적으로 이해가 될 것입니다.

`1 1 2 3 5 ...`

<a href="https://ko.wikipedia.org/wiki/%ED%94%BC%EB%B3%B4%EB%82%98%EC%B9%98_%EC%88%98">초항과 둘째항이 1이며 그 뒤의 모든 항은 바로 앞 두항의 합인 수열입니다. - wiki</a>

<br>
<br>
<br>

## brute force 풀이
---


```java
// java
class Solution {
    public int fib(int n) {
        if(n == 0) return 0;
        if(n == 1 || n == 2) return 1;
        return fib(n-1) + fib(n-2);
    }
}
```
소모된 실행시간과 메모리 비트 수를 그래프로 나타낸 모습
무려 런타임 8ms가 나왔다.
{% image "./profile-fib-brute-force.png", "profile solving brute force method" %}

- 단순 재귀 호출입니다. 

- 재귀 호출을 두번 하여 재귀 트리를 그리게 됩니다.

- 외우기 좋습니다.

- 중복된 계산이 많습니다.

재귀 호출을 통해 n이하의 모든 피보나치 값을 전색합니다.

<br>
<br>
<br>

## memoization을 사용한 풀이
---

```java
// java
import java.util.Arrays;
class Solution {
	public int fib(int n) {
		if(n == 0) return 0;
		int[] memo = new int[n+1];
		Arrays.fill(memo, 0);

		return helper(memo, n);
	}

	public int helper(int[] memo, int n) {
		if(n == 1 || n == 2) return 1;
		if(memo[n] != 0) return memo[n];
		memo[n] = helper(memo, n - 1) + helper(memo, n - 2);
		return memo[n];
	}
}
```
속도는 0ms가 나왔습니다. 기존의 로직에 비하면 놀라운 발전이죠

{% image "./profile-fib-memoization.png", "profile solving memoization method" %}

- 메모 전략을 통해 값을 구한적이 있다면 그냥 반환함
- 아니라면 저장하고 반환 함

해당 전략은 메모리를 사용해 속도를 높인다는 단순하지만 강력한 전략입니다.
요즘 같은 시대에 시간자원과 cpu 처리량은 메모리에 비해 비쌉니다.

간단히 풀이하자면 memo라는 추가적인 변수가 생겼습니다.
메모는 위 풀이에선 배열로 구현했지만 key - value 쌍이여도 구현 할 수 있습니다.

피보나치 수열의 각 값은 고유합니다. 따라서 이런 전략을 세울 수 있습니다.

피보나치 수열의 각 수열은 초항과 그 다음 항인 1, 1을 제외하면 모든 
수열의 항이 다른 값을 가지게 됩니다.

따라서 배열의 각 인덱스에 각 항의 값을 저장합니다.

재귀 트리를 전색하면서 메모에 값이 저장되어 있다면 재귀에 들어가지 않고 바로 값을 반환합니다.

없다면 메모에 값을 저장하고 값을 반환해줍니다.


<br>
<br>
<br>

## dp 배열을 통한 해결
---


dp를 통해 상향식으로 문제를 해결해보겠습니다.

array를 생성하고 dp[1], dp[2]부터 값을 채워 나갑니다.
초항과 그 다음 항은 피보나치 수열을 반복하는데 필수적인 요소이므로
직접 넣어줍니다.

그 다음은 반복문을 돌면서 dp[3], dp[4], ...dp[n]까지
값을 채워줍니다.

```java

class Solution {
    public int fib(int n) {
        if(n == 0) return 0;
        if(n == 1 || n == 2) return 1;
        int[] dp = new int[n + 1];
        dp[1] = dp[2] = 1;
        for(int i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}
```

{% image "./profile-fib-arrayDP.png", "profile solving memoization method" %}

위 알고리즘은 실제 문제 구조를 나타내는 수학식인 상태 전이 방정식과 연결된다.

$$f(n)=\begin{cases}
\text{ if } 1,\space{1}(n = 1, 2) \\
\text { if } f(n - 1) + f(n - 2),\space{1}(n > 2)
\end{cases}$$

상태 전이 방정식은 고급스러운 이름일 뿐이고 
f(n)을 n으로 만들기 위해 $n - 1$과 $n - 2$를 더하고 옮기는 바로 이것을 상태 전이라 한다.


(출처 알고리즘 치트시트 / 푸둥라이 저)

아래의 마지막 예제는 상태 전이 방정식만을 사용한 방법이다.



<br>
<br>
<br>

## 반복문을 통한 해결
---

```java
// java
import java.util.Arrays;

class Solution {
    public int fib(int n) {
        int a = 0;
        int b = 1;
        int added = 0;

        while(n-- >= 1) {
            added = a + b;
            a = b;
            b = added;
        }
        return a;
    }
}
```
메모리와 사용된 비트수가 압도적인 이 방법은 뭘까요?

{% image "./profile-fib-iterate.png", "profile solving iterate method" %}

이 방법은 하나의 아이디어를 통한 해결방법입니다.

이 문제에서 구하는 것은 무엇일까요? 
n번째의 피보나치 항이 무슨 값을 가지고 있는가? 입니다.

사람이 피보나치 수열을 구할 때 재귀 트리를 만들고 이를 순회하진 않습니다.

바로 이런 방식으로 구하죠

1, 1, 2, 3, 5 ... 
이렇게 하나씩 세어가며 구합니다. (보통 그렇지 않나요? 👀)
아무튼 이 방식을 그대로 컴퓨터에게 실행시키는 것입니다.

memo를 할 필요도 사실은 없는 것입니다.

피보나치 수열의 100번째를 구하는데 필요한 항은 98, 99번째 항입니다.
50번째 항이 뭔지는 중요한 것이 아니였다는 거죠


## 정리
---

피보나치를 통해 재귀 트리, 메모, 반복문
각각의 풀이법과 장단점을 알아봤습니다.

실제 프로덕션에선 가장 효율이 좋은 반복문을 쓰는게 좋습니다.

