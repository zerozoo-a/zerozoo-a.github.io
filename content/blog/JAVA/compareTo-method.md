---
title: 비교하자 compareTo
date: 2023-05-29 21:58:27
coverURL: https://images.unsplash.com/photo-1528476625962-40d0763c921f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=830&q=80
---
{% image "./Compare.avif", "compare image"%}

compareTo method는 유니코드(아스키보다 넓은 범위)까지 지원하는 비교 함수입니다.

설명의 원문은 아래와 같습니다. 

> Compares two strings lexicographically. The comparison is based on the Unicode value of each character in the strings. The character sequence represented by this String object is compared lexicographically to the character sequence represented by the argument string. The result is a negative integer if this String object lexicographically precedes the argument string. The result is a positive integer if this String object lexicographically follows the argument string. The result is zero if the strings are equal; compareTo returns 0 exactly when the equals(Object) method would return true.

문자열은 유니코드와 사전적 정의를 기반으로 작동합니다. (한글, 중국어, 일본어도 잘 되는 이유);
두 문자열을 비교하여 같으면 0을 반환합니다. 
``` java
		String str1 = "가나다라";
		String str2 = "가나다라";
		System.out.println(str1.compareTo(str2)); // str1과 str2의 비교는 0을 반환
```

> This is the definition of lexicographic ordering. If two strings are different, then either they have different characters at some index that is a valid index for both strings, or their lengths are different, or both. If they have different characters at one or more index positions, let k be the smallest such index; then the string whose character at position k has the smaller value, as determined by using the < operator, lexicographically precedes the other string. In this case, compareTo returns the difference of the two character values at position k in the two string -- that is, the value: this.charAt(k)-anotherString.charAt(k)

사전적 순서에 따라 두 문자를 비교하게 됩니다.
```java
		String a = "Apple";
		String c = "Hola";

		System.out.println(a.compareTo(c)); // -7
		System.out.println("A".compareTo("H")); // -7

		System.out.println("A".compareTo("B")); // -1
		System.out.println("A".compareTo("C")); // -2
		System.out.println("A".compareTo("D")); // -3
		System.out.println("A".compareTo("E")); // -4

```
 
> If there is no index position at which they differ, then the shorter string lexicographically precedes the longer string. In this case, compareTo returns the difference of the lengths of the strings -- that is, the value:
 this.length()-anotherString.length()
 
 길이가 다른 경우 문자열의 길이를 뺀 값을 반환합니다.

```java
String b = "Hello";
System.out.println(b.compareTo("Hell")); // 1
System.out.println(b.compareTo("Hel")); // 2
System.out.println(b.compareTo("He")); // 3
```
