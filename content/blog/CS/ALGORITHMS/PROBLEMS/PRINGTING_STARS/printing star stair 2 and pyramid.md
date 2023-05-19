---
title: printing star stair 2
date: 2023-05-19 23:30:13
---

좌우 반전인 계단을 만들어보자

```java
public class Stair2 {
	public static void main(String[] args) {
		int rows = 5;
		for (int i = 0; i <= rows; i++) {
			for (int j = 0; j <= rows - i; j++) {
				System.out.print(' ');
			}
			for (int j = 0; j <= i; j++) {
				System.out.print("*");
			}
			System.out.println("");
		}
	}
}
```

```shell
      *
     **
    ***
   ****
  *****
 ******
```


여기서 잠깐 피라미드에 대해 설명하겠습니다.

피라미드와 역방향 계단찍기는 아주 약간의 차이를 빼고는 거의 같은 코드입니다.

바로 별찍기를 담당하는 반복문의 print 함수에 공백 문자가 하나 추가되었다는 것입니다.
이는 역방향 계단을 피라미드로 바꿔놓습니다.
```java
public class Pyramid {

	public static void main(String[] args) {
		int rows = 5;
		for (int i = 0; i < rows; i++) {
			for (int j = 1; j <= rows - i; j++) {
				System.out.print("_");
			}
			for (int j = 0; j <= i; j++) {
				System.out.print("* ");
			}
			System.out.println("");
		}
	}
}
```

```
_____* 
____* * 
___* * * 
__* * * * 
_* * * * * 
```

{% image "./starTable.png", "startable 예시 이미지" %}

이런 별찍기 문제를 푸는 경우 그림을 그려보는 것이 아주 좋은 풀이법이 된다.

```java
	public static void main(String[] args) {
		int rows = 5;
		for (int i = 0; i < rows; i++) {
			for (int j = 1; j <= rows - i; j++) {
				System.out.print("_");
			}
			for (int j = 0; j <= i; j++) {
				System.out.print("* ");
			}
			System.out.println("");
		}
	}

```
이런 코드만 보고 바로 이해를 한다는건 쉽지 않기 때문이다.
무엇을 뜻하는지도 모르겠고 변수명도 의미가 없기 때문이다.

코드를 좀 수정해보자.

```java
	public static void main(String[] args) {
		int rows = 5;
		for (int row = 0; row < rows; row++) {
			// 빈칸을 찍는다.
			for (int empty = 1; empty <= rows - row; empty++) {
				System.out.print("_");
			}
			// 별을 찍는다.
			for (int printStar = 0; printStar <= row; printStar++) {
				System.out.print("* ");
			}
			// 다 찍었으니 다음 줄로 넘어간다.
			System.out.println("");
		}
	}
```
이제 좀 보기가 편해졌을지 모르겠다. 반복문의 변수를 empty를 찍는 용도
star를 찍는 용도로 나누어 보았다.

하지만 무엇보다 중요한건 왜 이런 함수가 나오는가? 입니다. 


{% image "./starTable.png", "startable 예시 이미지" %}

다시 위 이미지를 보면 공백을 4개 찍습니다. 
4개는 어떻게 나온걸까요? 역계단의 공백 4개를 찍은 것과 같습니다.
하지만 피라미드라 하면 이렇게 생각 할 수 있습니다.

(공백은 설명시에 안좋으니 공백은 a로 별은 ⭐️로 찍겠습니다.)

aa⭐️aa

a⭐️⭐️⭐️a

⭐️⭐️⭐️⭐️⭐️

네 맞습니다. 이것도 피라미드입니다. 그냥 피라미드 모양이면 다 피라미드이죠

그렇다면

aaaa⭐️ 

aaa⭐️a⭐️ 

aa⭐️a⭐️a⭐️

a⭐️a⭐️a⭐️a⭐️

이것도 피라미드라고 할 수 있겠습니다.
그것도 rows의 갯수만큼 나온 피라미드입니다.

감사합니다.