---
layout: post
title: inductive-definition-of-sequence-3
date: 2022-12-31 20:20 +0900
categories: [math]
---

<!--break-->
## index 
--- 
- [index](#index)
- [문제](#문제)
- [풀이](#풀이)
- [recap](#recap)

<br>

## 문제 
--- 
$a_{n+1} = pa_{n}+q$

에 대한 일반항을 구하세요.
<br>
<br>

## 풀이 
--- 

$a_{n+1} = pa_{n}+q$
는 수열이므로 아래의 식도 존재함을 알 수 있다.

$a_{n+2} = pa_{n+1}+q$

위 식과 아래의 식을 변변 빼준다면..

$$ a_{n+2} - a_{n+1} = p(a_{n+1} - a_{n}) $$이므로

$$ a_{n+1} - a_{n} = b_n $$는 하나의 수열로 볼 수 있으므로 수열 b라고 하자.

$a_{n+2} - a_{n+1} = p(b_{n})$

$$b_{n} = a_{n+1} - a_{n}$$ 이므로
$$a_{n+2} - a_{n+1} = b_{n+1}$$이다.

$$b_1$$을 구하려면 $$b_n$$에 1을 대입하여 구하면 되므로 $$ b_1 = a_2 - a_1 $$이다.


따라서 이와 같이 수열 b에 대한 귀납적 정의가 만들어진다.
$$\begin{cases}
    b_{n+1} = p(b_{n}) \\
    b_1 = a_2-a_1
\end{cases}$$

$b_n = a_2-a_1$인 수열에 대해 
<a href="https://zerozoo-a.github.io/math/2022/12/29/inductive-definition-of-sequence-2.html">
이 글에서 보인 것과 같이</a>

$a_n = a_1 + \sum_{k=1}^{n-1}{bk}$
공식을 사용할 수 있다.

따라서

$a_n = a_1 + \frac{(a_2-a_1)(p^{n-1}-1)}{p-1}$
<br>
<br>

## recap 
--- 
<br>
<br>

