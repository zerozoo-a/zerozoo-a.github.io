---
layout: post
title: baekjoon 1193 node.js 문제 풀이 분수찾기
date: 2022-11-17 22:39 +0900
lang: ko
categories: ["algorithm"]
tags: ["BAEKJOON", "NODE.JS"]
---

###  1193 분수찾기 정답 및 풀이 node.js 

--- 

#### 문제 

무한히 큰 배열에 다음과 같이 분수들이 적혀있다.

---
<img 
class="bannerImg"
alt="분수 배열 이미지"
src="https://user-images.githubusercontent.com/80259925/202482097-3affa138-06c9-43b6-a0ed-1706659cbe11.png">


---
이와 같이 나열된 분수들을 1/1 → 1/2 → 2/1 → 3/1 → 2/2 → … 과 같은 지그재그 순서로 차례대로 1번, 2번, 3번, 4번, 5번, … 분수라고 하자.

X가 주어졌을 때, X번째 분수를 구하는 프로그램을 작성하시오.

--- 

#### 입력
--- 
첫째 줄에 X(1 ≤ X ≤ 10,000,000)가 주어진다.
```
1
```
```
2
```
```
3
```
#### 출력
--- 

```
1/1
```
```
1/2
```
```
2/1
```
#### 풀이
--- 

```js
const input = require("fs").readFileSync("/dev/stdin").toString().trim();

function solution(a) {
  let line = 0;
  let max = 0;
  while (a > max) {
    line += 1;
    max += line;
  }
  if (line % 2 === 0) {
    let numerator = line;
    let denominator = 1;
    let condition = max - a;
    while (condition) {
      numerator--;
      denominator++;
      condition--;
    }
    console.log(`${numerator}/${denominator}`);
    return;
  } else {
    let numerator = 1;
    let denominator = line;
    let condition = max - a;
    while (condition) {
      numerator++;
      denominator--;
      condition--;
    }
    console.log(`${numerator}/${denominator}`);
  }
}
solution(parseInt(input));


```
![SCR-20221117-vk4](https://user-images.githubusercontent.com/80259925/202482097-3affa138-06c9-43b6-a0ed-1706659cbe11.png)

 표는 지그재그를 그리면서 순회하므로 line은 사선을 가리킵니다.
  max는 반복문을 돌면서 그려낸 사선에 그려진 모든 숫자들의 갯수입니다.

  함수의 인자로 5가 들어갔다고 가정하겠습니다.
 
  사선 라인 1을 기준으로 사선 1은 1개
  사선 라인 2는 사선 1 + 사선 2입니다. 사선 2에는 1/2, 2/1이 있고 사선 1에는 1/1이 있으므로 총 3개입니다.
 
  입력받은 수가 5라면 2/2를 반환하면 됩니다. 2/2는 사선 3번째에 있으므로 1 + 2 + 3 = 6이므로 max는 6입니다.

  max가 입력된 수를 초과하면 반복문을 멈춰줍니다. 사선은 3번째 사선을 가리키므로 2/2에 더욱 근접하게 되었습니다.
 
  표에는 여러 규칙들이 있지만 가장 단순한 규칙으로는 3번째 사선은 3개의 인자를 가집니다. 3/1, 2/2, 1/3
  이 때 max의 값은 6이고 저희가 찾는 값은 5번째 입니다.
 
  표의 규칙 한 가지를 더 활용하여야 합니다. line의 값이 홀수이면 분자는 감소하고 분모는 증가합니다.
 
  현재 저희의 line 변수의 값은 3입니다. 홀수이고 3/1 부터 시작하게 됩니다.(3/1 부터 시작하는게 우연이 아닙니다! line의 변수가 4라면 4/1 부터 시작하게 됩니다)
  3/1 -> 2/2 -> 1/3의 순서이죠.
 
  이제 line 변수가 홀수이면 분자는 감소하고 분모는 증가시켜주면 됩니다.

  line 변수가 홀수인 경우 시작값의 분모는 무조건 1 부터 시작하게 됩니다.
 
  max 값은 해당 사선까지 최대 몇개의 분수들이 누적되었는지 그 개수의 총 합을 가리키므로 max에서 입력값을 빼주면

  찾은 사선에서 원하는 배열이 몇번째에 있는지 찾을 수 있게 됩니다.
 
  이제 이를 기준으로 짝수인 경우에는 분자의 기본 값은 1 분모의 기본 값은 line 변수이면 됩니다.

  반복문을 돌면서 짝수는 분자는 커지면서 분모는 작아지므로 각각 분자는 ++ 분모는 --를 해줍니다.

  반복문의 조건은 현재 라인까지의 모든 분수 갯수의 총합 - 입력값이면 됩니다.

  따라서 max - input이 condition의 값이 되고 condition의 값까지 --를 해주면 사선에서 원하는 위치까지 값을 찾아가게 됩니다.
 
  반대로 홀수인 경우 분자는 -- 분모는 ++를 해주고 마찬가지로 condition을 빼주면 됩니다.


