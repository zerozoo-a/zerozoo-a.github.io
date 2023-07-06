---
title: recursive-power
date: 2023-07-06 22:33:12
coverURL: 
---

<br />
<br />
<br />

```

```

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