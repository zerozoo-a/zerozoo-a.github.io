---
title: printing star stair 1
date: 2023-05-19 23:26:54
---

계단을 만들어보자.


```java
public class stair {
	public static void main(String[] args) {
		int rows = 5;
		for (int i = 0; i <= rows; i++) {
			for (int j = 0; j < i; j++) {
				System.out.print('*');
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
```