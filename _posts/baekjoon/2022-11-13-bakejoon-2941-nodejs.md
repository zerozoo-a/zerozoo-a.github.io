---
layout: post
title: bakejoon 2941 nodejs 크로아티아 알파벳
date: 2022-11-13 20:34 +0900
lang: ko
categories: ["algorithm"]
tags: ["BAEKJOON", "NODE.JS"]
---

###  2941 크로아티아 알파벳 정답 및 풀이 node.js 

--- 

![https://brunch.co.kr/@hotelscomkr/571](https://t2.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/1jPF/image/hwXMWBcqIJxmFkGwYdhAHgMp5qo.jpg)
(이미지 출처: https://brunch.co.kr/@hotelscomkr/571)
#### 문제 
예전에는 운영체제에서 크로아티아 알파벳을 입력할 수가 없었다. 따라서, 다음과 같이 크로아티아 알파벳을 변경해서 입력했다.

크로아티아 알파벳	>> 변경

`č	>> c=`
`ć	>> c-`
`dž	>> dz=`
`đ	>> d-`
`lj	>> lj`
`nj	>> nj`
`š	>> s=`
`ž	>> z=`

예를 들어, ljes=njak은 크로아티아 알파벳 6개(lj, e, š, nj, a, k)로 이루어져 있다. 단어가 주어졌을 때, 몇 개의 크로아티아 알파벳으로 이루어져 있는지 출력한다.

dž는 무조건 하나의 알파벳으로 쓰이고, d와 ž가 분리된 것으로 보지 않는다. lj와 nj도 마찬가지이다. 위 목록에 없는 알파벳은 한 글자씩 센다.

--- 

#### 입력
--- 
첫째 줄에 최대 100글자의 단어가 주어진다. 알파벳 소문자와 '-', '='로만 이루어져 있다.

단어는 크로아티아 알파벳으로 이루어져 있다. 문제 설명의 표에 나와있는 알파벳은 변경된 형태로 입력된다.

```
ljes=njak
```
#### 출력
--- 
입력으로 주어진 단어가 몇 개의 크로아티아 알파벳으로 이루어져 있는지 출력한다.
```
6
```
#### 풀이
--- 

```js
const input = require("fs").readFileSync("/dev/stdin").toString().trim();

/**
 * @param {string} input
 * @return {void}
 */
function solution(input) {
  if (input.length === 0) {
    console.log(0);
    return;
  }
  const map = new Map();
  map.set("c=", 1);
  map.set("c-", 1);
  map.set("dz=", 1);
  map.set("d-", 1);
  map.set("lj", 1);
  map.set("nj", 1);
  map.set("s=", 1);
  map.set("z=", 1);

  map.forEach((_, k) => {
    const matched = [...input.matchAll(k)];
    if (matched.length !== 0) {
      for (let j = 0; j < matched.length; j++) {
        input = input.replace(matched[j][0], "_");
      }
    }
  });
  console.log(input.length);
}

solution(input);

```

이번 문제 풀이에서 주의해야 할 점은 입력값으로 주어지는 문자열을 어떻게
잘 카운트 할 것인가..! 입니다.

보통 이런 문제들은 어떤 것을 어떤 것으로 변경하는 문제인데요 이럴 때 가장 유용한게 `map`입니다.

key value 쌍으로 특정 값을 어떠한 값을 치환하는 것이죠.

예를 들어  `č	>>  c=` 를 봅시다. 저희는 크로아티아 문자는 잘 모르니까
그냥 왼쪽의 문자를 오른쪽의 `c=`으로 치환을 해주고 싶다고 칩시다.

그런데 문제에서 바라는 것은 문자열의 수를 원하므로 `c=`을 단 하나의 길이로 인식하게 해주어야 하는데요.

아주 다양한 방법이 있겠습니다만은 저는 해당 문자열을 `matchAll` 함수를 통해 찾아 길이 하나 짜리인 `_`로 변경하였습니다. 여기서 `match`, `matchAll` 함수를 사용하면 사실 좀 반칙이긴 합니다만 `rolling hash`나 `sliding window` 등의 기법을 사용해서 찾는 방법은 아직 저도 모르므로 그냥 구현된것을 사용하자구요


아무튼 이렇게 찾아낸 크로아티아 문자를 한 개의 길이의 문자로 변경하면 이제 다 끝났습니다. map을 순회하면서 전부 크로아티아 문자를 길이 한 개 짜리의 문자로 변경하고 마지막에 길이를 출력해주면 문제는 해결됩니다.
