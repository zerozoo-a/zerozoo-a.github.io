---
title: 빼기 | 집합간의 연산 
date: 2023-08-06 21:31:17
coverURL: https://images.unsplash.com/photo-1422207049116-cfaf69531072?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1735&q=80
---

<sup>
각주:  
[1](배너_이미지_출처)
</sup>

<br />
<br />
<br />

# 집합간의 연산이란

집합간의 연산을 통해 새로운 집합을 만들어내는 것을 의미합니다.

## 집합간의 빼기

집합 A, B에 대해 A에는 포함되고 B에는 포함되지 않는 원소들을 모은 집합을 A - B로 나타낸다, 이를 차집합이라고 한다.

$$
A - B
$$

집합 A - B는 무슨 뜻일까요?

- 집합 $A \cap B != \emptyset$인 경우 $A-B=A \cap B^c$
- 집합 $A \cap B = \emptyset$인 경우 $A-B = A$

여기서 case 1번은 집합 A에서 집합 B와의 교집합 부분을 뺀 부분을 나타냅니다.
case 2번은 교집합이 없는 서로소 집합이므로 집합 A에서 빼줄 것이 없으므로 집합 A가 그대로 나오게 됩니다.


{% image "../../images/ven-1.png", "set A and B"%}

<br>

$$
A - B = A \cap B^{c}
$$

위 벤다이어그램에서 A와 B가 아닌 모든 부분을 제거한 집합을 새로 만들어 내는 것이므로

집합 A에서 교집합 부분을 뺀 집합을 의미합니다.

집합간의 뺄셈에서 아래와 같은 연산이 참임을 알 수 있습니다.

$$
B - A = B \cap B^c
$$

$$
P - Q = P \cap P^c
$$

## 다른 표현 방법 - 1

위 처럼 표시하는 것 말고도 다른 여러가지 표현 방법이 있습니다.

$$
A - B = A \cap B^{c} = A - (A \cap B)
$$

$$
A - B = (A \cup B) - B
$$

위에서 사용한 complement를 이용해 `-` 기호를 없애 볼 수 있습니다.

$$
A - B = (A \cup B) - B = (A \cup B) \cap B^c
$$

## 다른 표현 방법 - 2

$$
(A - B) \cup (A \cap B) = (A \cap B^c) \cup (A \cap B)
$$

$$
(A \cap B^c) \cup (A \cap B) = A \cup (B \cap B^c)
$$

이때 독특한 식이 하나 나오게 됩니다.
바로 $B \cap B^c$입니다.

이게 무슨 뜻일까요? 집합 B와 여집합 B의 교집합..
집합 B에 속하면서 B에 속하지 않는 원소들의 집합이란 것은 공집합을 가리킵니다.

$$
A \cup (B \cap B^c) = A \cup \emptyset
$$

다시 독특한 식인 $A \cup \emptyset$이 나옵니다.
이는 A와 공집합의 교집합을 의미하므로 $A$만 나오게 됩니다.(이는 마치 5 - 0과 같습니다.)

따라서 정리하면

$$
A \cup (B \cap B^c) = A
$$
라고 할 수 있습니다.


## 정리

- $B \cap B^c = \emptyset$
- $A \cup \emptyset = A$
- $A \cap \emptyset = \emptyset$


---

<a name="배너 이미지 출처" href="https://images.unsplash.com/photo-1422207049116-cfaf69531072?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1735&q=80">image 출처</a>
