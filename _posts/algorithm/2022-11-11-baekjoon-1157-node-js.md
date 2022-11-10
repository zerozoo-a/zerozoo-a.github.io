---
layout: post
title: baekjoon 1157 node.js
date: 2022-11-11 00:39 +0900
---

###  1157 단어 공부 node.js 

--- 

#### 문제 
알파벳 대소문자로 된 단어가 주어지면, 이 단어에서 가장 많이 사용된 알파벳이 무엇인지 알아내는 프로그램을 작성하시오. 단, 대문자와 소문자를 구분하지 않는다.

--- 

#### 입력
--- 
첫째 줄에 알파벳 대소문자로 이루어진 단어가 주어진다. 주어지는 단어의 길이는 1,000,000을 넘지 않는다.
```
Mississipi
```
```
zZa
```
#### 출력
--- 

```
?
```
```
Z
```
#### 풀이
--- 
>  **이 문제는 input 끝에 `\n`이 붙어 있습니다. 따라서 trim을 통해 지워주셔야 해요.. `🔍 잘.. 체크체크🕵️‍♂️`**

---
```js
const input = require("fs")
  .readFileSync("../dev/stdin")
  .toString()
  .trim()
  .toLocaleUpperCase();

/**
 * @param {string} input
 * @return {void}
 */
function solution(input) {
  const map = new Map();
  let max = 0;

  for (const char of input) {
    if (map.has(char)) {
      map.set(char, map.get(char) + 1);
    } else {
      map.set(char, 1);
    }
    max = map.get(char) > max ? map.get(char) : max;
  }

  let result = "";

  map.forEach((v, k) => {
    if (v === max) {
      result += k;
    }
  });

  if (result.length >= 2) {
    console.log("?");
  } else {
    console.log(result);
  }
}
solution(input);

```

문제 풀이의 아이디어는 단순합니다.
먼저 문제를 잘 이해하면 답은 은연중에 떠오르게 된다는게 제가 가지고 있는 지론입니다 문제를 이해해보도록 하죠.

만약 abbc라는 문자열이 입력되었다고 가정합시다.

b가 가장 많으므로 표준 출력에 B를 보내주면 되겠습니다.

입력이 abc라고 한다면 각각 최대 횟수를 가지므로 ?를 표준 출력에 보내주면 됩니다.

입력이 무조건 들어온다는 것이 전제이므로 빈 string이 올 것은 생각하지 않아도 됩니다.


그럼 컴퓨터에게는 최대 빈도수를 카운트 시켜주도록 합시다. 여기에서는 한 문자열이 입력된 것 만큼 반복문을 돌면서 각 알파벳이 등장한 횟수를 카운트 해주면 됩니다. 

보통 map을 사용하거나 알파벳 배열이나 뭐.. 다양한 방법이 있겠습니다만은 자신만의 방법을 사용하시면 되겠죠

```js
  const map = new Map();
  let max = 0;

  for (const char of input) {
    if (map.has(char)) {
      map.set(char, map.get(char) + 1);
    } else {
      map.set(char, 1);
    }
    max = map.get(char) > max ? map.get(char) : max;
  }
```
위의 코드를 보시면 
전 map 객체를 생성해서 각 객체의 빈도수를 카운트하고 그 중에서도 max 값을 함께 for loop에 녹여내었습니다.

max 변수가 가지는 단순히 얼만큼의 알파벳이 가장 많은 빈도수를 가지는가이지 어떤 알파벳인가에 대한 정보는 없습니다.

해당 정보는 ma 객체가 가지고 있게 됩니다.

```js
let result = "";
map.forEach((v, k) => {
    if (v === max) {
      result += k;
    }
  });

  if (result.length >= 2) {
    console.log("?");
  } else {
    console.log(result);
  }
```

이제 어떤 알파벳이 가장 많은 빈도수를 가지는가를 알아내면 됩니다.
당연하게도 map의 key, value 쌍을 이용하면 되는데요,

 value에 차곡차곡 저장해 두었던 값을 조회하면서 max의 값과 일치한다면 해당 key는 가장 많은 빈도수를 가지는 알파벳임이 자명해집니다.

이제 문제에서 조건으로 둔 최대 빈도수를 가지는 알파벳이 2 개 이상일 경우에는 물음표를, 그 외의 경우에는 그냥 값을 보여주면 됩니다.


