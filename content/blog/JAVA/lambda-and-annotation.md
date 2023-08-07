---
title: lambda식과 어노테이션
date: 2023-05-31 22:43:29
coverURL: https://images.unsplash.com/photo-1442570468985-f63ed5de9086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1840&q=80
---

{% image "./images/train.avif", "ahaha"%}

하나의 메서드를 구현하는데 자바는 이런 저런 수고가 든다.

모든게 class 기반인 자바에서는 함수 하나를 생성하는데 class, 생성자, 생성, method 호출까지
여러가지 준비가 필요하다는 것이다.

이는 개발 피로도에 직접적인 영향을 미치게 되는데 이는 당연히 생산성에 악영향을 미치게 된다.


따라서 아래와 같은 방식이 생겨났다.

JVM은 개인적으로 스칼라나 클로져같은 함수형 언어의 기반이기 때문에 java가 못할 이유는 하나도 없다.

함수형 지원이 자바에서도 많이 성숙해졌다고 생각한다. 스트림의 에러처리나 쓰레드등의 운용등 자바스크립트보다 나은 부분이 더 많다고 생각한다.

```java
@FunctionalInterface
interface Unit11 {
	String move();
}

public class Ex11_Functional {
	public static void main(String[] args) {
		Unit11 u = () -> {
			return "String type을 리턴합니다.";
		};

		System.out.println(u.move());
	}
}

```

위와 같은 방식으로 익명함수만을 위한 interface를 만들고 어노테이션을 달아놓자
익명함수는 하나의 메서드만을 가질 수 있도록 제한하기 때문에 
복수의 메서드가 생기면 에러를 뱉어준다. 🤗