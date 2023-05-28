---
title: java bubble, insert sort
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

```java
package org.example;

import java.util.Arrays;

public class InsertSort {
	public static void main(String[] args) {

		int[] nums = {3,2,1};
		insertSort(nums);
		System.out.println(Arrays.toString(nums));

	}

	/**
	 *
	 * j는 항상 외부 반복문인 i보다 하나 앞의 값을 가리킨다.
	 * j는 0보다 커야한다 (배열이므로),
	 * 하나 앞의 값인 j가 i보다 큰 경우 둘의 자리를 스왑한다.
	 */
	public static void insertSort(int[] nums) {
		int size = nums.length;
		int temp = 0;
		int j = 0;

		for(int i=1; i < size; i++) {
			temp = nums[i];
			for(j=i-1; j >= 0 && nums[j] > temp; j--) {
				nums[j+1] = nums[j];
			}
			nums[j+1] = temp;
		}
	}
}
```