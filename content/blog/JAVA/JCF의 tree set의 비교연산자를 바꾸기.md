---
title: JCF의 tree set의 비교연산자를 바꾸기
date: 2023-05-28 17:57:26
---

요약: Comparator interface를 구현한 class를 TreeSet class의 
인자로 넣어주면 해당 TreeSet의 인스턴스는 연산자로
주입된 Comparator class의 compare 메서드를 사용하게 된다.


```java
package org.example;
import java.util.Set;
import java.util.TreeSet;
import java.util.Comparator;

class MyStringComparator implements Comparator<String> {
	@Override
	public int compare(String s1, String s2) {
		return s1.length() - s2.length();
	}

}

public class Ex10_Comparator {
	public static void main(String[] args) {
//		Set<String> tree = new TreeSet<>();
		Set<String> tree = new TreeSet<>(new MyStringComparator());
		tree.add("A1");
		tree.add("B23");
		tree.add("C456");
		tree.add("D789");
		tree.add("E0123");

		for(String s : tree) {
			System.out.println(s.toString() + '\t');
		}
		System.out.println();
	}
}

```