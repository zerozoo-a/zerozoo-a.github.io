---
title: add binary
date: 2024-06-19 22:38:13
coverURL: https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<br />
<br />
<br />

## 문제

> 이진수를 의미하는 두 개의 문자열 bin1과 bin2가 매개변수로 주어질 때, 두 이진수의 합을 return하도록 solution 함수를 완성해주세요.

### 제한사항

- return 값은 이진수를 의미하는 문자열입니다.
- 1 ≤ bin1, bin2의 길이 ≤ 10
- bin1과 bin2는 0과 1로만 이루어져 있습니다.
- bin1과 bin2는 "0"을 제외하고 0으로 시작하지 않습니다.

### 입출력 예

|bin1	| bin2	| result   |
|-------| ------| -----------|
|"10"	| "11"	|   "101"    |
|"1001"	| "1111"| 	"11000"  |

#### 입출력 예 설명

입출력 예 #1

- 10 + 11 = 101 이므로 "101" 을 return합니다.

입출력 예 #2

- 1001 + 1111 = 11000 이므로 "11000"을 return합니다.

## 풀이

```js
function solution(bin1, bin2) {
    let x = BigInt(`0b${bin1}`);
    let y = BigInt(`0b${bin2}`);
    while(y !== 0n) {
        let carry = x & y;
        x = x ^ y;
        y = carry << 1n;
    }
    
    return x.toString(2);
}
```

## 후술

- BigInt는 js에서 기본 제공하는 내장객체입니다.

0b는 해당 값이 binary 값임을 나타냅니다.

`BigInt('0b01')`은 1n으로 나타내어집니다. 
`BigInt('0b10')`은 2n으로 나타내어집니다. 
`BigInt('0b11')`은 3n으로 나타내어집니다. 
`BigInt('0b100')`은 4n으로 나타내어집니다. 


그렇습니다. 이진수를 십진수로 표현해줍니다. 뒤에 붙는 n은 BigInt 리터럴을 의미합니다.


`while(y !== 0n) {...}` 반복문은 y가 0이 아닐때까지 반복합니다.

여기서 bitwise 연산이 시작됩니다.

### 이진수의 자리올림 위치를 파악하는 x & y 연산 (AND)

```js
const x = `0101` // 5n

const y = `0011` // 3n
```
위와 같다고 할 때, `x & y`를 계산해봅시다.

&는 두 피연산자의 비트가 모두 1인 경우에 1을 반환하므로 `0001`이 됩니다.

```js
let carry = x & y; // `0001`
```

`0001`은 자리올림 위치가 됩니다.

### 이진수의 자리올림을 무시한 덧셈 x ^ y 연산 (XOR)

```js
x = x ^ y;
```

위와 같다고 할 때, `x ^ y` 또한 계산해봅시다.

`0101`과 `0011`에 대해 `^` 연산을 할 경우 `0110`이 됩니다.
  - XOR연산의 특성상 두 피연산자가 서로 다르면 1을 반환합니다.


자리올림을 한 비트 왼쪽으로 이동하는 carry << 1 연산 (LEFT SHIFT)

```js
y = carry << 1n;
```

carry 값인 0001n을 왼쪽으로 한 비트 이동시키면 0010n이 됩니다. 이는 자리올림이 발생한 부분을 다음 높은 자리에서 처리하기 위해 이동시킨 것입니다.




### 0b10 + 0b10 계산해보기

```js
let x = BigInt(`0b${bin1}`); // x = 0b10 (2 in decimal)
let y = BigInt(`0b${bin2}`); // y = 0b10 (2 in decimal)
```

### 첫 번째 반복

1. 자리올림 계산 (carry = x & y):

- x = 0b10
- y = 0b10
- x & y = 0b10 & 0b10 = 0b10 (AND 연산은 두 비트가 모두 1인 경우에 1을 반환)

```js
let carry = x & y; // carry = 0b10
```

2. 자리올림을 무시한 덧셈 (x = x ^ y):

- x = 0b10
- y = 0b10
- x ^ y = 0b10 ^ 0b10 = 0b00 (XOR 연산은 두 비트가 다르면 1을 반환)

```js
x = x ^ y; // x = 0b00
```

3. 자리올림을 한 비트 왼쪽으로 이동 (y = carry << 1n):

- carry = 0b10
- carry << 1 = 0b10 << 1 = 0b100 (왼쪽으로 한 비트 이동)

```js
y = carry << 1n; // y = 0b100
```

### 두 번째 반복

1. 자리올림 계산 (carry = x & y):

- x = 0b00
- y = 0b100
- x & y = 0b00 & 0b100 = 0b00

```js
let carry = x & y; // carry = 0b00
```

2. 자리올림을 무시한 덧셈 (x = x ^ y):

- x = 0b00
- y = 0b100
- x ^ y = 0b00 ^ 0b100 = 0b100

```js
x = x ^ y; // x = 0b100
```

3. 자리올림을 한 비트 왼쪽으로 이동 (y = carry << 1n):

- carry = 0b00
- carry << 1 = 0b00 << 1 = 0b00

```js
y = carry << 1n; // y = 0b00
```

y가 0n이 되어 반복문이 종료됩니다.

x를 반환하여 0b100을 확인 합니다.







