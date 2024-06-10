---
title: 2.4 Inclusion and Exclusion | 집합의 포함 관계
date: 2024-06-10 23:29:56
coverURL: 
---
<br />
<br />
<br />

### Inclusion of Elements | 원소가 어떤 집합에 포함됨

$(The\ Element\ a\ is\ included\ in\ the\ set\ A)=a\in A$

$(The\ Element\ a\ is\ not\ included\ in\ the\ set\ A)=a\ \notin  A$

### Equal Sets | 같은 집합

집합 A, B에 대해 $A=B$이려면 아래와 같은 조건을 만족해야 한다.

$[(\forall a \in A)\in B] \wedge [(\forall b \in B)\in A]$

이는 풀어쓰면 아래와 같이 정리 할 수 있다.

- 위 조건은 아래 두 조건을 모두 만족하면 서로 두 집합이 동일하다고 볼 수 있다는 내용이다.
- 집합 A에 속하는 모든 원소는 집합 B에 속해야한다.
- 집합 B에 속하는 모든 원소는 집합 A에 속해야한다.

위 내용을 압축하면 한마디로 줄일 수 있다.

집합 A의 모든 원소가 집합 B에 포함되면서, 반대도 성립되면 서로 같은 집합이다.

### Sub Set

집합 A의 모든 원소가 집합 B에 포함되며 그 반대는 만족하지 않아도 되는 경우,

집합 A는 집합 B의 Sub Set이라고 한다.

즉 집합 B는 집합 A보다 커도 상관 없다.

집합 기호로 정의하면 아래와 같다.
$\forall$ 기호는 모든 원소를 의미한다.(\forall)

$A\subseteq B \longleftrightarrow (\forall a \in A) \in B$

이는 풀어쓰면 아래와 같이 정리 할 수 있다.

- 집합 B는 집합 A의 모든 원소를 지니면서 그보다 많아도 괜찮다.
- 집합의 모든 원소 a는 집합 A에 포함된다, 이는 집합 B에 포함된다.

### Super Set

집합 B의 모든 원소가 집합 A에 포함될 때, A는 B의 Super Set이다.

만약 집합 A가 집합 B의 Sub Set인 경우 집합 B는 집합 A의 Super Set이다.

이를 다시 집합 기호로 표현하면 아래와 같다.

$A\supseteq B \longleftrightarrow (\forall b \in B)\in A$

### Proper subsets / Proper supersets

집합 A가 B의 subset이면서 동등 관계는 만족하지 않는 경우 proper subset이라 한다.

이를 집합 기호로 나타내면 아래와 같다.

$A \subset B \longleftrightarrow [(\forall a \in A) \in B] \wedge [A \ne B]$

이는 집합 A는 집합 B의 subset이면서 동등하지 않다는 말이다.

super set도 똑같이 표현 할 수 있다.

$A \supset B \longleftrightarrow [(\forall a \in A) \in B] \wedge  [A\ne B]$

### Increasing / Decreasing Sequences of  Sets

증감하는 집합들의 나열에 대한 내용으로 기호를 사용하여 표현하면 아래와 같다.

$A_1 \subseteq A_2 \subseteq A_3...\subseteq A_n$ 

임의의 k 번째 집합에 대해 아래와 같이 정의 할 수 있고

$A_k \subseteq A_{k+1}$

k의 범위에 대해 아래와 같이 정의 할 수 있다.

$\ 1 \leq k \in \N \leq n-1$

k의 범위 내인 값인 3을 대입하면

$A_3\subseteq A_4$가 된다.