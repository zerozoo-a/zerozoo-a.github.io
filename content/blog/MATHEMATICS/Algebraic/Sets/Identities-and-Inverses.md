---
title: 항등원과 역원에 대해 | Identities and Inverses
date: 2023-07-23 13:21:31
coverURL: https://images.unsplash.com/photo-1583265567466-4d9b4e7f63cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80
---
<a href="https://images.unsplash.com/photo-1583265567466-4d9b4e7f63cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80">이미지 출처</a>
<br />
<br />
<br />

## Identities(항등원)

어떤 값과 연산이 있을 때, 이 값에 연산을 진행한 결과가 원래의 값과 동일하게 만드는 값
어떠한 연산을 k라고 하겠습니다.

$$
a\space (k)\space e = a
$$
연산의 결과로 a가 반환되었습니다.
e를 이렇게 정의 할 수 있습니다.
> e는 연산 k에 대한 항등원이다.

## Inverses(역원)

Inverse는 Identity를 통해 구할 수 있습니다.

$$
a\space (k)\space e = a
$$
일 때,

$$
a\space (k)\space x = e
$$
인 식에 대해

x는 연산 (k)에 대한 Inverse다. 라고 할 수 있습니다.

## Additive Identities (덧셈에 대한 항등원 구하기)

$$
a + e = a
$$

양변에 - a를 취합니다.
$$
(a + e) - a = a - a  
$$
 
<a href="https://www.britannica.com/science/commutative-law">commutativity law</a>를 통해 위치를 변경합니다.
(더하기 연산은 commutativity law를 만족합니다. ex: a + b = b + a)
$$
(e + a) - a = a - a
$$

<a href="https://www.britannica.com/science/associative-law">associativity law</a>를 통해 연산의 순서를 변경합니다.
(더하기 연산은 associativity law를 만족합니다. ex: a + (b + c) = (a + b) + c)
$$
e + (a - a) = 0 
$$

$$
e = 0
$$

> 0은 임의의 a에 대해 additive Identity(덧셈에 대한 항등원)이다.

### example

$$
2 + 0 = 2
$$
$$
\pi + 0 = \pi
$$

## Additive Inverses 구하기 (덧셈에 대한 역원 구하기)

$$
a + x = e
$$
에 대해 additive Identity는 0 이라는 것을 증명했으므로 e는 0이다. (e = 0)

$$
a + x = 0
$$

$$
(a + x) - a = 0 - a
$$
- by commutative law 

$$
(x + a) - a = - a
$$

$$
x + (a - a) = - a
$$
- by associative law

$$
x = - a
$$

> -a는 임의의 a의 additive inverse이다. 

### example
$$
2 + x = 0
$$

$$
\pi + x = 0 
$$

## Multiplicative Identities (곱셈에 대한 항등원)

$$
a * e = a
$$

$$
(a \cdot e) \cdot a^{-1} = a \cdot a^{-1}
$$

$$
(e \cdot a) \cdot a^{-1} = 1
$$
- by commutative

$$
(e \cdot a) \cdot a^{-1} = 1
$$
- by associative

$$
e \cdot (a \cdot a^{-1}) = 1
$$

$$
e \cdot 1 = 1
$$

$$
e = 1
$$

> 1은 임의의 a의 multiplicative identity이다.

### example

$$
\pi \cdot 1 = \pi
$$

## Multiplicative Inverses (곱셈에 대한 역원)

$$
a \cdot x = e
$$
에 대해 e는 Multiplicative identity임을 보였으므로 e = 1이다.

$$
a \cdot x = 1
$$

$$
(a \cdot x) \cdot a^{-1} = 1 \cdot a^{-1}
$$
by commutative

$$
(x \cdot a) \cdot a^{-1} = a^{-1}
$$
by associative

이제 정리해주면
$$
x \cdot (a \cdot a^{-1}) = a^{-1}
$$

$$
x \cdot 1 = a^{-1}
$$

$$
x = a^{-1}
$$

$$
x = \frac{1}{a}
$$

임을 알 수 있다.

> a{^-1}은 임의의 a의 multiplicative inverse다.

### example
$$
\pi \cdot x = 1 \rightarrow x = \pi^{-1}(x = \frac{1}{\pi})
$$

## 정리

기초적이지만 정리할 필요가 있음을 느낍니다.
