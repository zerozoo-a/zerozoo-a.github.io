---
title: cardinality of sets
date: 2023-08-03 23:50:53
coverURL: 
---
<br />
<br />
<br />

## cardinality란? (= cardinal number)

> 집합론에서, 집합의 크기(영어: cardinality) 또는 농도(濃度)는 집합의 "원소 개수"에 대한 척도이다. 유한 집합의 크기의 표현은 자연수로 충분하다. 임의의 집합의 크기는 단사 함수 및 전단사 함수를 통해 비교할 수 있으며, 기수로서 대상화할 수도 있다. 집합 A의 크기는 |A| 또는 n(A), A, card(A), # A로 표기한다. - 출처 wiki

집합에서 원소 개수에 대한 척도. 즉 원소 개수를 의미합니다.

## 예시

set builder로 만든 유한집합을 예로 예시를 들어봅시다.
$$
\{ A \space | \space A \space is \space 1 \space - \space digit \space number \space \}
$$

위 집합의 경우 1의 자리 숫자를 집합으로 들었으니
A의 cardinality는 `{1, 2, 3, ..., 9}` 총 9개의 원소의 갯수, 즉 9 임을 알 수 있습니다.

아래와 같이 표현할 수 있습니다.
$$
|A| = 2
$$

$$
\{ B \space | \space B는 \space 3 \space 이하의 \space 자연수 \space \}
$$
B의 cardinality는 `${1, 2, 3}` 총 3 입니다.
아래와 같이 표현할 수 있습니다.
$$
|B| = 3
$$

## 특별한 집합

- Empty set
원소가 없는 집합
$$
|\empty| = 0
$$

- Singleton Set
어떤 원소가 단 하나의 원자만을 가지는 경우
$$
|A| = 1
$$

- Equivalent Sets
원소의 갯수가 서로 같은 집합
$$
|A| = |B|
$$

## 유한집합 (= Finite Sets)
원소의 갯수가 정해진 집합 Empty Set이나 원소의 갯수가 n개인 집합
(n != infinity)

$$
|n| = 0\ or\ n
$$

컴퓨터는 집합을 특히 많이 사용하게 되는데 어떤 집합이든
프로그래밍 언어에선 집합에 index가 달립니다.

이를 Encoding of Elements라고 부르게 됩니다.
예를 들면 이런 작업입니다.
$$
A\ =\ \{a,b,c, \dots,x,y,z\}
$$
아래의 각 숫자는 1 = a 부터 z = 26까지 1 대 1 매칭관계를 가집니다.
$$
A_E=\{1,2,3,\dots,24,25,26\}
$$

## 무한집합 (= Infinite Sets)

말 그대로 원소의 갯수가 무한한 집합입니다.
$$
|A| = \infin
$$

무한집합은 두가지로 나뉩니다.

무한하지만 원소의 갯수를 encoding 할 수 있는 집합(Countably Infinite Sets)과, 아닌 집합(UnCountably Infinite Sets)입니다.
무한집합 중 하나인 자연수를 encoding해보겠습니다.

$$
|\mathbb{N}| = \{1, 2, 3, \dots\}
$$

그럼 정수를 encoding 하는 경우 어떻게 해야 할까요?
정수는 음수부터 0, 양수를 포함하기 때문에 음의 무한대에서 0을 지나 양의 무한대로 확장합니다.

따라서 encoding이 불가능할까요?

숫자를 다시 `재배치`하면 됩니다.
$$
|\mathbb{Z}| = \{0,1,-1,2,-2,\dots\}
$$

반대로 재배치할 수 없는 경우 encoding 할 수 없다고 보면 됩니다.
실수를 어떻게 배치할 수 있을까요?

$$
|\mathbb{R}| = \{0,0.1,0.01,\dots\}
$$
음.. 아무래도 불가능해보입니다. 실수 사이사이에 무한한 실수들이 존재하기 때문이죠


## 정리

집합의 cardinality는 집합 원소의 갯수를 나타내며
수 마다 그 정의가 다르다.