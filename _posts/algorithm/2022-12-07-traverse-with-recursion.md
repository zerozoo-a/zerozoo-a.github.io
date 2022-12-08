---
layout: post
title: 선행재귀와 후행재귀
date: 2022-12-07 21:34 +0900
categories: ["algorithm"]
---
<img 
alt="따면(안)갚음" src="https://i.ibb.co/VM0rr2Z/069.jpg" width="350px">
## 먼저 갚는 것과 따서 갚을게의 차이

## index 
--- 
- [먼저 갚는 것과 따서 갚을게의 차이](#먼저-갚는-것과-따서-갚을게의-차이)
- [index](#index)
- [개요](#개요)
- [그래서 어떻게 할 것인가](#그래서-어떻게-할-것인가)
- [선행재귀와 후행재귀](#선행재귀와-후행재귀)
- [recap](#recap)

<br>
<br>
 
## 개요
--- 

js 진영에는 항상 부담스러운 존재가 있습니다.
`vanila javascript`이든 `node`이든 `rescript`이든 `scala.js`이든 뭘 사용하든 껄끄러운 친구..
바로 `Linked List`입니다. (추가로 `stack`, `queue`, `binary tree` 등등 거의 모든 자료구조 추가 좀 해줘..)

알고리즘 문제에서 심심치않게 등장하는 이 친구들을 통해 알고리즘 문제를 해결해주세요라는 요청이 들어오면
일단 눈 앞이 아득해집니다.

<img with="250px" style="display:grid; margin:0 auto;" src="https://media.tenor.com/5aF7np_zPEgAAAAM/pepe-why-pepe-the-frog.gif" alt="sad-pepe">

이유야 간단합니다. 구현을 하고 문제를 해결해야 하기 때문입니다. 구현이 그럼 쉬울까요? 그냥 뚝딱하면 만들 수 있어서
넣어놓지 않았을까요? 그렇지도 않습니다. `Linked List`의 기본적인 기능만 넣어도 200 줄은 가볍게 넘어갑니다.

그럼 어떻게 하면 될까요? (정답은 저도 모르겠습니다.)

아무튼 저는 이렇게 생각하기로 했습니다.

어차피 `Linked List`는 구현해야하니,
1. 다른 언어로 풀던가 `C++ | python | java` 등등 그게 좀 그러면
2. 가장 최소의 최소한만 구현한 채로 문제를 풀자!

> 네 서론이 길어지는데요 오늘은 `(2)`에 대한 내용과
그 구현에 들어가는 `선행 재귀`와 `후행 재귀`에 대한 내용으로 이어집니다.


<br>
<br>


## 그래서 어떻게 할 것인가
--- 
<br>
<br>

문제를 잘 이해했습니다,

이제 문제를 다시 써봅시다.

`Linked List`를 구현하긴 싫고 사용만 하고 싶은 저는 일부분만을 구현하고 사용한다 하였습니다. 그 구현체는 아래와 같습니다.

```javascript
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = null;
  }

  add(val) {
    const node = new Node(val);
    let current = this.head;
    if (this.head === null) {
      this.head = node;
    } else {
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.tail = node;
    this.length++;
    return this;
  }

  /**
   * 선행재귀
   * stack이 해제되는 순서대로 순회합니다.
   * a->b->c의 경우 c->b->a
   *
   * @param {Node} node
   * @param {number} n
   */
  traverse1(node, n = 0) {
    if (node !== null) {
      this.traverse1(node.next, n + 1);
      console.log(`data: ${n}`, node.val);
    }
  }

  /**
   *
   *
   * 후행재귀
   * 출력을 먼저 하고 다음 재귀로 넘어가기 때문에
   * 스택의 안쪽부터 출력이 이미 실행된 채로 다음 재귀로 넘어간다.
   *
   * @param {Node} node
   * @param {number} n
   */
  traverse2(node, n = 0) {
    if (node !== null) {
      console.log(`data: ${n}`, node.val);
      this.traverse2(node.next, n + 1);
    }
  }
}

const conga = new LinkedList();

conga.add("a");
conga.add("b");
conga.add("c");
conga.add("d");
console.log("conga", conga);
conga.traverse1(conga.head); // d c b a
conga.traverse2(conga.head); // a b c d

```

위 코드는 `Linked List`입니다만 아주 일부분의 기능만을 가지고 있습니다.

1. `Node를 추가`
2. `Node를 순회`
만약 이 만큼만의 기능으로 무언가 달성 할 수 있다면 이 것으로 충분한 것입니다.

`Linked List`의 모든 기능을 꼼꼼히 구현 할 필요가 있을까요? 

아무튼 위의 기능 중 눈여겨 볼 만한 것은 traverse1, traverse2입니다.

선행재귀와 후행재귀
---
traverse1은 선행재귀입니다. 선행재귀라고 뭐 거창한게 아닙니다. 

재귀 함수는 3 가지로 분류됩니다.

1. 기저 조건
2. 재귀 호출
3. 함수 비즈니스 로직 실행

선행재귀는 재귀 호출 이전에 함수의 비즈니스 로직을 실행하는 것입니다. 그리고 나서 다음 재귀 호출을 실행합니다.

```js
const recur_1 = (n) => {
    if(n<=0) return;
    console.log(n); // 1
    recur_1(n-1); // 2
}
```
위의 코드는 선행 재귀입니다.

콘솔을 찍는 비즈니스 로직이 재귀 호출보다 먼저 실행 되었기 때문이죠.

반대로 후행 재귀는 아래와 같습니다.

```javascript
const recur_2 = (n) => {
    if(n<=0) return;
    recur_2(n-1); // 2
    console.log(n); // 1
}
```
장난하는 것 같지만 위의 코드가 맞습니다.

그럼 `recur_1(3), recur_2(3)`은어떤 결과가 나타날까요? 

선행 재귀`recur_1`는 `3, 2, 1` 순으로

후행 재귀`recur_2`는 `1, 2, 3`순으로 
콘솔이 찍히게 됩니다.


이유는 재귀함수의 동작 방식에 따라 비즈니스 로직이 언제 실행되는지 실행 시점이 다르기 때문인데요.

선행재귀는 비즈니스 로직을 먼저 수행하기 때문에 기존 함수들과의 동작과 크게 다를 바가 없습니다.

후행재귀는 비즈니스로직이 실행되기 전에 콜스택이 쌓이고 기저조건에 닿은 재귀 함수는 쌓아두었던 콜스택을 하나씩 처리하기 시작합니다.


| 기저조건 |
| --- |
| 1 |
| 2 |
| 3 |

위의 표와 같은 순서대로 쌓인 스택은 기저조건에 닿은 뒤
한 칸씩 뒤로 가며 1, 2, 3을 순서대로 출력하게 됩니다.

이러한 발상은 recursive, dp등에 중요하게 사용되고
기본중의 기본이므로 꼭 숙지를 해두는게 좋겠습니다.
## recap 
--- 
<br>
<br>

가끔은 문제풀이 말고도 이러한 정보성 글을 작성하는게 도움이 됩니다.

글로 작성하면서 제 머리속도 정리가 되는 것 같아요!

