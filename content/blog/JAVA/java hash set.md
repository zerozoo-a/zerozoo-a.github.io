---
title: java hash set
date: 2023-05-28 14:16:51
---

java의 HashSet은 JCF 프레임워크에 소속되어 있다.

HashSet의 강점은 Override 할 수 있는 hashCode와 equals를 제공한다는 점이다.
이를 통해 고유한 class에 대해 hash set을 생성 할 수 있다.

```java
package org.example;

import java.util.HashSet;

public class Ex02_Set {
	public static void main(String[] args) {
		HashSet<Student> set = new HashSet<>();
		set.add(new Student("ABC", 1));
		set.add(new Student("DEF", 3));
		set.add(new Student("HIJ", 3));
		System.out.println("set size = 2" + set.size()); // 2

		for(Student s: set) {
			System.out.println(s.toString() + '\t');
		}
		System.out.println();
	}
}

class Student {
	private String name;
	private int age;

	public Student(String name, int age) {
		this.name = name;
		this.age = age;
	}

	@Override
	public String toString() {
		return name + ":" + age;
	}

	@Override
	public int hashCode() {
		int num = age % 3;
		System.out.println(num);
		return num;
	}

	@Override
	public boolean equals(Object obj) {
		System.out.println("compare to");
		if(age == ((Student)obj).age) {
			return true;
		} else {
			return false;
		}
	}
}

```

javascript에선 어떻게 해야 할 까?
```js

class A {
    constructor(name){
        this.name = name || "";
    }
}

const hashSet = new Set();
const a1 = new A("a1");
const a2 = new A("a1");
hashSet.add(a1);
hashSet.add(a2);

hashSet.forEach(a => console.log(a.name));
// a1 a1 Set이 예상과는 다르게 작동한다.
```
javascript는 prototype toolchain 언어이기 때문에 java를 그대로 따라하면 안된다.

이런식으로 하자

```js
class A {
  constructor(id) {
    this.id = id;
  }

  hashCode() {
    return "hash_" + this.id;
  }
}

Set.prototype.addCustom = function (element) {
  const hash = element.hashCode();
  this.add(hash);
};

const mySet = new Set();

const obj1 = new A("a");
const obj2 = new A("a");
const obj3 = new A("b");

mySet.addCustom(obj1);
mySet.addCustom(obj2);
mySet.addCustom(obj3);

console.log(mySet.size); // 2
```

custom method를 생성해 chain에 연결해주는 것으로 끝난다.
자바스크립트는 할 수 없는게 아니라 다른 방식일 뿐이다.
