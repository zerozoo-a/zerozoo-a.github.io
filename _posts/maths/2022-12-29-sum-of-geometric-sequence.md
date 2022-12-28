---
layout: post
title: sum of geometric sequence
date: 2022-12-29 00:10 +0900
categories: [math]
---
# 등비수열의 합: $S_n=\frac{a(1-r^{n})}{1-r}$
<!--break-->
## index 
--- 
- [등비수열의 합: $S\_n=\\frac{a(1-r^{n})}{1-r}$](#등비수열의-합-s_nfraca1-rn1-r)
  - [index](#index)
  - [문제](#문제)
  - [풀이](#풀이)
  - [recap](#recap)

<br>
## 문제 
--- 
$S_n=a + ar + ar^2 + ar^3+\dots+ar^{n-1}$

위 등비수열의 합을 구하시오
<br>
<br>

## 풀이 
--- 
$S_n=a + ar + ar^2 + ar^3+\dots+ar^{n-1}$

위 수열에 등비 r을 곱한 수열을 하나 더 만든다.
이런 식으로..

$rS_n=ar + ar^2 + ar^3+\dots+ar^{n-1} + ar^n$

두 수열을 빼주면..

$rS_n-S_n = a + ar^n$

$S_n$으로 묶어주면..

$S_n(r-1) = a + ar^n$

이제 정리만 해줍시다..

$S_n=\frac{a+ar^n}{(r-1)}$

$S_n=\frac{a(1+r^n)}{(r-1)}$


놀랍게도 $S_n$이 구해졌습니다.

$S_n$은 등비수열의 합이였는데 말이죠..

수열에는 보통 이런 식의 접근이 많습니다.
[망원급수](https://namu.wiki/w/%EB%A7%9D%EC%9B%90%EA%B8%89%EC%88%98)도 이런 느낌의 접근입니다.

<br>
<br>

## recap 
--- 
기초적이면서도 중요하다고 생각하여 정리해봤습니다.
<br>
<br>

