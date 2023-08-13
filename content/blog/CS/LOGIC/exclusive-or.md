---
title: "xor, exclusive or, 배타적 논리합"
date: 2023-08-13 15:24:06
coverURL: https://images.unsplash.com/photo-1461838432805-dff34fe2d8cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80
---
<sup>
	각주:[1](배너_이미지_출처)
</sup>
<br />
<br />
<br />

# xor (= exclusive or)란?

> 배타적 논리합(排他的論理合, exclusive or)은 수리 논리학에서 주어진 2개의 명제 가운데 1개만 참일 경우를 판단하는 논리 연산이다. 약칭으로 XOR, EOR, EXOR라고도 쓴다.

## 벤다이어그램
벤다이어그램으로 표현하면 아래와 같다.
$A' = A^c$이다. (complement)

{% image "../images/xor.png", "xor venn diagram image" %}

<a href="https://www.geogebra.org/m/Pxm3Hump#material/HXUFNzJF">
출처 geogebra
</a>

## 진리표

진리표로 나타내면 아래와 같다.


| Operand 1 | Operand 2 | Result |
|-----------|-----------|--------|
|   false   |   false   |  false |
|   false   |   true    |  true  |
|   true    |   false   |  true  |
|   true    |   true    |  false |

xor는 Operand 1, 2의 값 중 하나만 true인 경우 결과값으로 true를 반환한다.

이를 이렇게 해석 할 수도 있다.

input 2개의 (이항연산이므로) 인자가 서로 다르면,
true를 반환한다.

같으면,
false를 반환한다.

## code

code로 나타내보자.

```js
// js
const A = true;
const B = false;

// xor operator = ^

B ^ B // 0
B ^ A // 1
A ^ B // 1
A ^ A // 0
```
자바스크립트의 ^ operator는 xor연산과 같다. 

단 그 반환값을 0, 1로 반환하는데 이게 싫고 boolean으로 받고 싶다면 아래와 같이 boolean으로 형변환해줄 수 있습니다.

```js
// js
!!(B ^ A) // true
!!(B ^ B) // false
```

```java
// java
public class xor {
	public static void main(String[] args) {
		boolean a = true;
		boolean b = false;

		boolean result = a ^ b;


		System.out.println("a ^ b: " + result); // a ^ b: true
	}
}
```

## 정리

xor는 서로 다른 인자를 비교하는 경우 true
서로 같은 인자를 비교하는 경우 false를 반환합니다.

---

<a name="배너 이미지 출처" href="https://images.unsplash.com/photo-1461838432805-dff34fe2d8cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80">image 출처</a>