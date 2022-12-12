---
layout: post
title: " bubble sort recursion version"
date: 2022-12-13 00:41 +0900
---
# 버블정렬을 재귀로 구현하기
<img 
alt="https://www.technologyreview.com/2019/08/24/102697/the-chemistry-behind-how-you-make-a-record-breaking-giant-soap-bubble/"
src="https://wp.technologyreview.com/wp-content/uploads/2019/08/ball-black-bubble-35016-10.jpg" />

[image source](https://www.technologyreview.com/2019/08/24/102697/the-chemistry-behind-how-you-make-a-record-breaking-giant-soap-bubble/)

## index 
--- 
- [버블정렬을 재귀로 구현하기](#버블정렬을-재귀로-구현하기)
  - [index](#index)
  - [문제](#문제)
  - [풀이](#풀이)
  - [recap](#recap)

<br>
<br>
<br>
 
## 문제 
--- 
bubble sort를 반복문, 재귀를 사용하여 구현하시오.

재귀를 사용하여 구구단을 만들어보세요.
<br>
<br>

## 풀이 
--- 

bubble sort에 대해서는 여러번 다룬바가 있다.
바깥 반복문과 안쪽 반복문을 돌리는데

> 1. 바깥 반복분은 내부 반복문보다 1 높은수로 반복한다.
2. 안쪽 반복문의 j와 바깥의 i의 자리수를 비교한 다음 작은 쪽을 배열의 뒤로 보낸다.
3. 이를 반복하면 바깥 반복문이 종료될 때 정렬이 끝나게 된다.


이를 재귀적으로 구현하기 위해서는
> 1. 기저조건
2. 큰 문제를 작은 문제로 정의하는 것
3. 함수가 할 일

위 세가지를 정의해주면 된다.


기저 조건: 탑다운 방식으로 구현한다고 가정하였을 때,
index의 크기를 줄여가면서 배열의 순회 범위를 좁혀나가 0이 되었을 때 종료한다.

큰 문제를 작은 문제로 정의: 큰 문제는 정렬이고 작은 문제는 한번의 루프에서 하나의 원소를 정렬하는 것이다. 
이를 n번 반복하는 것으로 큰 문제의 정답을 끌어낼 수 있다.

함수가 할 일: swap이다.

<br>
<br>
```cpp
// cpp
#include<iostream>

using namespace std;
void bubbleSort(int *arr, int n);
void bubbleSortRecur(int *arr, int n);
void swap(int *a, int *b);

int main (void){
    int nums[3] = {3, 2, 1};
    bubbleSortRecur(nums,3);
    for(int i = 0; i < 3; i++) {
        cout << "nums: " << nums[i] << endl;
    }
    return 0;
}

void bubbleSortRecur(int *arr, int n) {
    if(n == 1) return;

    for(int i = 0; i < n - 1; i++) {
        if(arr[i] > arr[i+1]) {
            swap(&arr[i], &arr[i+1]);
        }

        bubbleSortRecur(arr, n - 1);
    }
}

void bubbleSort(int *arr, int n) {
    for(int i = 0; i < n - 1; i++) {
        for(int j = 0; j < n - i - 1; j++) {
            if(arr[j] > arr[j+1]) {
                swap(&arr[j], &arr[j+1]);
            }
        }
    }
}

void swap(int *a, int *b) {
    *a ^= *b;
    *b ^= *a;
    *a ^= *b;
}
```

<br>
<br>

```cpp
// 구구단
#include<stdio.h>
void printTable(int n, int i);

int main (void){

    printTable(2, 1);

    return 0;
}

void printTable(int n, int i = 1) {
    if(i == 10) return;

    printf("%d * %d = %d \n",n, i, n * i);

    printTable(n, i + 1);
}
```

## recap 
--- 

재귀로 생각하는 방법이나 c와는 또 다른 면이 많은 cpp을 다루는데 아직 미숙하여 진도가 느린 것 같다.
node로 하는건 cpp로 하는것과 큰 차이가 없어서 굳이 적지는 않았다.

구조나 문법적으로 node쪽을 더 능숙하게 사용하기에 node로 하는 것 자체에 연연 할 필요는 없어보인다.
node로 해야겠다는 느낌이 오는 것들은 당연히 하겠지만 말이다.
<br>
<br>