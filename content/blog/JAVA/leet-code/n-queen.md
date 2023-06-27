---
title: n-queen
date: 2023-06-26 00:14:50
coverURL: 
---
<br />
<br />
<br />
n queen 문제 풀이


```java
// java
package leetCodes;

import java.util.Arrays;

public class NQueens {

	public static void main(String[] args) {
		int n = 4;
		int[] cols = new int[n + 1];
		traversal(0, cols);
	}

	// promising 통과하면 col 배열의 다음 칸으로 넘어간다. (다음 row를 대상으로 함)
	// promising 을 통과하지 못하면 통과하지 못한 row의 값을 하나 올린다. (다음 col을 대상으로 함)
	static void traversal(int row, int[] cols){
		int n = cols.length + 1;
		if(promising(row, cols)) {
			if(row == n) System.out.println(Arrays.copyOfRange(cols,1,n+1));
			else {
				for(int col = 1; col < n + 1; col++) {
					cols[row + 1] = col;
					traversal(row + 1,cols);
				}
			}
		}

	}

	static boolean promising(int i, int[] cols){
		int k = 1;
		boolean flag = true;

		while(k < i && flag){
			if(cols[i] == cols[k] || Math.abs(cols[i] - cols[k]) == (i - k)) {
				flag = false;
			}
			k += 1;
		}
		return flag;
	}
}

```