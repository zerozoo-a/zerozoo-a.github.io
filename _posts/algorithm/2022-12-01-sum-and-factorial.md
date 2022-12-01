---
layout: post
title: sum and factorial
date: 2022-12-01 00:45 +0900
---


## index 
- [index](#index)
- [문제](#문제)
- [풀이](#풀이)
- [recap](#recap)

<br>
<br>
<br>

 
## 문제 
--- 

1. 재귀를 사용하여 sum 함수를 작성하세요.
2. 재귀를 사용하지 않고 sum 함수를 작성하세요.
3. 재귀를 사용하여 factorial 함수를 작성하세요.
4. 재귀를 사용하지 않고 factorial 함수를 작성하세요.
5. 정수 배열이 주어졌을 때 배열의 각 원소를 누적합으로 갱신하는 재귀 함수를 작성하시오. `([1, 2, 3] => [1, 3, 6])`
<br>
<br>

## 풀이 
--- 
`sum(n) = n + sum(n - 1) (n > 1 일 때)`
`sum(n) = 1 (n = 1 일 때)`


```js
/**
 * # 1 
 * 
 * @Params {number} n
 * */
const sum1 = (n) => {
    if(n <= 0 || !Number.isInteger(n)) return 0;
    return n === 1 ? 1 : n + sum(n - 1)
}

/**
 * #2
 *
 * @param {number} n
 * @returns {number}
 */
const sum2 = (n) => {
    if(n <= 0 || !Number.isInteger(n)) return 0;
    let result = 0, i = 0;
    for(; i <= n ; i ++) {
        result += i;
    }
    return result;
}
```

```js
const N = 5;

/**
 * #3
 *
 * @param {number} n
 * @returns {number}
 */
const factorial = (n) => {
  if (n <= 1) return 1;

  return n * factorial(n - 1);
};

console.log(factorial(N));

/**
 * #4
 *
 * @param {number} n
 * @returns {number}
 */
const factorial2 = (n) => {
  if (n <= 1) return 1;

  let result = 1,
    i = 2;
  for (; i <= n; i++) {
    result *= i;
  }

  return result;
};

console.log(factorial2(N));

```


```js
/**
 * #5
 * 
 * @param {number[]} numbers
 */
const accumulate = (numbers) => {
  /**
   *
   * @param {number} c
   */
  const dp = (c) => {
    if (c === numbers.length - 1) return numbers;

    numbers[c + 1] += numbers[c];
    dp(c+1);
  };
  dp(0);
  return numbers;
};

const calc = accumulate([1, 2, 3, 4, 5, 6]);
console.log(calc); // [1, 3, 6, 10, 15, 21]

```
<br>
<br>

## recap 
--- 
<br>
<br>

위의 1 ~ 4 번 까지의 문제는 그냥 저냥 풀 수 있는 반면
5 번의 문제는 약간의 생각을 하게 만든다.

저는 재귀와 카운트 변수를 사용하여 문제를 풀었습니다.

재귀 함수 dp의 인자는 index를 가리키는 포인터 역할을 합니다.

0 번째 배열의 값은 1 번째 배열의 값에 합산되어야 하므로 
`numbers[c + 1] += numbers[c];` 와 같은 연산이 이루어집니다.

그리고 그 다음 재귀에 값을 넘겨주기 위해서는 포인터인 `c`에 대해 `c+1`을 해줌으로써 `c`는 배열의 다음 인덱스를 가리킬 수 있습니다.

기저조건은 배열의 총 길이 - 1 인데, 이는 0 번째 배열부터 초기화 하는 것이 아닌
1 번째 배열부터 합산이 시작되었기 때문입니다.