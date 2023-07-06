---
title: recursive-power
date: 2023-07-06 22:33:12
coverURL: 
---

<br />
<br />
<br />

임의의 수 x의 n제곱을 점화식으로 나타내면 다음과 같이 정의할 수 있습니다.

$$
x^n = 
\begin{cases}
x * x^n-1, \space{1} (n > 1)\\
1, \space{1} (n = 1)
\end{cases}
$$

이를 재귀로 표현합니다.

```java
// java
package recursiveTree;

public class Recurisves {

	public static void main(String[] args) {
		int p = power(5,5);
		System.out.println(p);
	}
	static int power(int x, int n) {
		if(n == 0) return 1;
		else if(n == 1) return x;
		else return x * power(x, n - 1);
	}
}
```