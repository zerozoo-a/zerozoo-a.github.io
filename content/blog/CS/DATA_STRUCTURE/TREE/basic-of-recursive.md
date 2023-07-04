---
title: 재귀 함수의 기본 1
date: 2023-07-04 22:58:00
coverURL: https://images.unsplash.com/photo-1635002962487-2c1d4d2f63c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80
---
{% image "../../images/photo-1635002962487-2c1d4d2f63c2.avif", "https://unsplash.com/ko/%EC%82%AC%EC%A7%84/2UjheC7FBWQ"%}
<a href="https://unsplash.com/ko/%EC%82%AC%EC%A7%84/2UjheC7FBWQ">출처</a>

<br />
<br />
<br />

## 재귀를 호출하기 전, 후의 차이

```java
// java
public class recursiveTree {
	public static void main(String[] args) {
		recur(3);
	}

	static void recur (int count) {
		if(count == 0) return;
		System.out.println("before call recur count" + count);
		recur(count - 1);
		System.out.println("after call recur count" + count);
	}
}
```
위 함수의 출력은 아래와 같습니다.

```bash
before call recur count3
before call recur count2
before call recur count1
after call recur count1
after call recur count2
after call recur count3
```

재귀는 보통 콜스택에 쌓이는 형태입니다.

또한 재귀는 특정 데이터를 재귀 함수의 연속적인 호출을 통해 
데이터를 넘겨줍니다.

이를 활용할 수 있습니다.

1. 콜스택에 쌓이기 전에 데이터를 조회합니다.
2. 콜스택에 쌓이고 난 후에 데이터를 조회합니다.

위의 예를 통해 이해해보자면 3이라는 데이터를 넘기면서
다음 함수에 넘겨줄 인자로 3 - 1의 값을 넘겨줍니다.

이 값을 다음 함수에 넘겨주기 전에 호출한다면 

콜스택에 쌓이기 전에 데이터를 조회한 것입니다.

그렇다면 콜스택에 쌓이고 난 후에 데이터를 조회하는 방법은
그 반대입니다.

`if(count == 0) return;`

재귀 함수는 기저조건에 닿게 되면 재귀 함수의 종료를 의미합니다.
따라서 콜스택은 쌓아둔 스택을 하나씩 해제합니다.

해제하면서 쌓아둔 `스택을 역으로 순회`합니다.



## 정리

재귀에서 이어지는 데이터를 언제 조회하는지에 따라
오름차순, 내림차순을 조회할 수 있다는 것을 알아보았습니다.


