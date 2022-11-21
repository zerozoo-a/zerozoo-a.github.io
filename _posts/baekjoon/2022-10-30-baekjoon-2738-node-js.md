---
layout: post
title: baekjoon 2738 node.js
date: 2022-10-30 14:35 +0900
categories: ["algorithm"]
tags: ["BAEKJOON", "NODE.JS", "2738"]
---


###  node.js 

--- 

#### 문제 

--- 
N*M크기의 두 행렬 A와 B가 주어졌을 때, 두 행렬을 더하는 프로그램을 작성하시오.

#### 입력
--- 
첫째 줄에 행렬의 크기 N 과 M이 주어진다. 둘째 줄부터 N개의 줄에 행렬 A의 원소 M개가 차례대로 주어진다. 이어서 N개의 줄에 행렬 B의 원소 M개가 차례대로 주어진다. N과 M은 100보다 작거나 같고, 행렬의 원소는 절댓값이 100보다 작거나 같은 정수이다.


```
3 3
1 1 1
2 2 2
0 1 0
3 3 3
4 4 4
5 5 100
```
#### 출력
--- 
첫째 줄부터 N개의 줄에 행렬 A와 B를 더한 행렬을 출력한다. 행렬의 각 원소는 공백으로 구분한다.
```
4 4 4
6 6 6
5 6 100
```
#### 풀이
--- 
```js
var n = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
var k = n.shift().split(" ").map(Number);
var a = n.splice(0, k[0]).map((e) => e.split(" ").map((e) => Number(e)));
var b = n.map((e) => e.split(" ").map((e) => Number(e)));
console.log(a.map((e, i) => e.map((e, j) => e + b[i][j]).join(" ")).join("\n"));
```
위 코드는 var과 const를 사용하는게 시간 차이를 만드는지 보기 위해 작성해봤습니다.

큰 차이는 없는 것 같고 실제 프로덕션에선 var는 사용하지 않는것으로 합시다..

행렬의 합을 구하는 문제이므로 첫 인자가 N, M으로 주어진다고 하는데 N과 M이 같은 값일 것 같습니다.
어떤 인자들이 들어오는지 알 수 없는게 아쉽네요

제가 이 문제 외에도 기타 다른 문제들 중 그리 어렵지 않은 문제들에서 계속 이유를 모르게 실패를 많이 했는데

정상적인 입력의 경우 마지막 입력에 `\n`이 입력된다는 글이 있더라구요.

오피셜인지 아닌지 마지막 개행문자를 지우니 통과되기도 하더라구요..

음.. 이런걸 모아둔 곳이 없는건지 찾고 싶습니다