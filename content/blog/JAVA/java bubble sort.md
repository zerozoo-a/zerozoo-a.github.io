---
title: java bubble sort
date: 2023-05-28 12:15:12
---

```java
package org.example;

import java.util.Arrays;

public class BubbleSort {
	public static void main(String[] args) {
		int[] nums = {3,2,1};

		for(int i = 0; i < nums.length; i++) {
			for(int j = 0; j < nums.length - i - 1; j++){
				if(nums[j] > nums[j + 1]) {
					swap(nums, j, j+1);
				}
			}
		}
		System.out.println("nums: " + Arrays.toString(nums));

	}

	public static void swap(int[] arr, int from, int to) {
		int temp = arr[from];
		arr[from] = arr[to];
		arr[to] = temp;
	}
}
```