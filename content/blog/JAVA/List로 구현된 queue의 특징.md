---
title: List로 구현된 queue의 특징
date: 2023-05-28 21:33:53
---

List로 구현된 queue는 iterable하다.
List로 구현되어 있기 때문에 LinkedList를 사용 할 때와 같이 생성해주면 된다.

단 구현된 method를 queue 처럼 사용하면 되는데 아래와 같이 사용하면 된다.

offer는 추가,

peek은 앞의 list를 확인만 하는 용도,

poll은 꺼내어 사용하는 용도,

size는 현재 총 남은 작업을 보여준다.

foreach는 모두 소진되기 전에는 사용 할 수 있다. 
peek을 사용하며 돌기 때문에 queue를 소진시키진 않는다.

```java
package org.example;
import java.util.LinkedList;
import java.util.Queue;

public class Ex12_Queue {
	public static void main(String[] args) {
		Queue<String> que = new LinkedList<>();
		// LinkedList는 List<E>, Queue<E>를 동시에 구현해놓았다.

		que.offer("A"); // Que에 item을 추가
		que.offer("B");
		que.offer("C");

		for(String i : que) { // 모두 꺼내기 전에는 작동 함,
			// que를 소비하지 않음,
			// peek을 사용하는 것으로 보임
			System.out.println("iterable " + i);
		}

		System.out.println("que의 사이즈를 확인" + que.size());

		System.out.println("다음에 무엇이 나올지 확인" +que.peek());
		System.out.println(que.poll()); // 첫 번째 객체 꺼내기
		System.out.println("que의 사이즈를 확인" + que.size());

		// -------------

		System.out.println("다음에 무엇이 나올지 확인" +que.peek());
		System.out.println(que.poll()); // 두 번째 객체 꺼내기
		System.out.println("que의 사이즈를 확인" + que.size());

		// -------------

		System.out.println("다음에 무엇이 나올지 확인" +que.peek());
		System.out.println(que.poll()); // 세 번째 객체 꺼내기
		System.out.println("que의 사이즈를 확인" + que.size());

		// -------------

		System.out.println("다음에 무엇이 나올지 확인" +que.peek()); // null
		System.out.println(que.poll()); // 없는 객체 꺼내기 null이 나옴
		System.out.println("que의 사이즈를 확인" + que.size()); // 0


		for(String i : que) { // 다 꺼내고 나서는 작동 안함
			System.out.println("iterable" + i);
		}
	}
}

```