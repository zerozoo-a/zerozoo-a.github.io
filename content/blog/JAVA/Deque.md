---
title: Deque
date: 2023-05-28 22:04:24
---

자바에서 Deque의 구현은 두 가지로 나뉘게 된다.

Array를 통한 구현,
LinkedList를 통한 구현이다.

Array를 통해 Deque를 구현하게 되면 Array의 장단점이 그대로 계승된다.
마찬가지로 LinkedList를 통해 Deque를 구현하면 LinkedList의 장단점이 그대로 계승된다.


Most ArrayDeque operations run in amortized constant time. Exceptions include remove, removeFirstOccurrence, removeLastOccurrence, contains, iterator.remove(), and the bulk operations, all of which run in linear time.

위에 언급되어 있는대로 remove, removeFirstOccurrence, removeLastOccurrence, contains, iterator.remove()
는 선형시간의 시간복잡도를 가진다.

우선 Array로 구현되어 있다고한다면 Array 의 단점이 생각나게 되는데 단점은 바로 첫 인자의 추가이다.

`{1,2,3}`의 배열이 있다고 치고 배열의 첫 인자에 0을 추가한다고 하자
그렇다면 0을 추가하기 위해 1, 2, 3은 재정렬이 일어나 index를 다시 세팅해주어야 한다.
`{0, 1, 2, 3} // 1, 2, 3은 이동된다.`

이를 방지하기 위해 어떻게 구현하면 좋을까?

답은 간단하다. 문제를 회피하면 된다.

`{null, null, null, ..., 1, 2, 3, null, null, null, ..., null};`

이런 식으로 구현을 해놓고 0이 추가된다고 가정하면
`{null, ..., 0, 1, 2, 3, null, ..., null}`
이렇게 추가하면 된다. 

```java
    // The main insertion and extraction methods are addFirst,
    // addLast, pollFirst, pollLast. The other methods are defined in
    // terms of these.

    /**
     * Inserts the specified element at the front of this deque.
     *
     * @param e the element to add
     * @throws NullPointerException if the specified element is null
     */
    public void addFirst(E e) {
        if (e == null)
            throw new NullPointerException();
        final Object[] es = elements;
        es[head = dec(head, es.length)] = e;
        if (head == tail)
            grow(1);
    }
```

이는 java의 Deque구현체의 일부이다.

이런식으로 입력된 값과 index를 내부적으로 계산해 적절한 위치로 O(1)시간에 주입할 수 있게 하고
head == tail의 사이즈로 사이즈가 꽉 찬 경우 grow 메서드를 통해 Array 자체를 확장해버린다.

Array를 확장할 때 인자가 모두 이동되므로 연산이 많이 들겠지만 그전까진 잘 사용할 수 있다.

자바스크립트는 이런게 전무하기 때문에 너무 감사하다..
JCF의 설명도 디버거 키고 들어가면 내용을 보도록하자

```java
package org.example;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.LinkedList;

public class Ex13_Deque {

	public static void main(String[] args) {
		Deque<String> deq0 = new ArrayDeque<>();
		Deque<String> deq1 = new LinkedList<>();

		// 앞으로 넣는다 {"C", "B", "A"}
		deq0.offerFirst("A");
		deq0.offerFirst("B");
		deq0.offerFirst("C");

		System.out.println(deq0.pollFirst()); // C
		System.out.println(deq0.pollFirst()); // B
		System.out.println(deq0.pollFirst()); // A

		System.out.println("-----------------------------");

		// 뒤로 넣는다 {"A", "B", "C"}
		deq0.offerLast("A");
		deq0.offerLast("B");
		deq0.offerLast("C");

		System.out.println("-----------------------------");

		// 뒤에서 꺼낸다
		System.out.println(deq0.pollLast()); // C
		System.out.println(deq0.pollLast()); // B
		System.out.println(deq0.pollLast()); // A

		System.out.println("-----------------------------");

		// {}
		// 뒤로 넣는다
		// {"A"}
		// {"A", "B"}
		// {"A", "B", "C"}
		deq0.offerLast("A");
		deq0.offerLast("B");
		deq0.offerLast("C");

		System.out.println(deq0.pollFirst()); // A
		System.out.println(deq0.pollFirst()); // B
		System.out.println(deq0.pollFirst()); // C

	}
}

```