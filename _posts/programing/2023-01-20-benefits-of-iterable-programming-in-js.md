---
layout: post
title: benefits of iterable programming in js
date: 2023-01-20 00:38 +0900
---
<img src="https://images.unsplash.com/photo-1542707309-4f9de5fd1d9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" alt="stop mark">
<a href="https://unsplash.com/ko/%EC%82%AC%EC%A7%84/Cf5kL7vcF6U">출처, cc</a>


<!--break-->
## index 
--- 
- [index](#index)
- [문제](#문제)
- [풀이](#풀이)
- [recap](#recap)

<br>
<br>

## 문제 
--- 
iterable protocol의 이점이 무엇인가요?

<br>
<br>

## 풀이 
--- 
면접질문같은 위 문제를 풀어보자.

```js
function* map(iter, f) {
  for (const a of iter) {
    yield f(a);
  }
}

function* range(l = 1) {
  let i = 0;
  if (l < i) {
    yield 0;
    return;
  }

  while (i <= l) {
    if (i === 3) console.log("!! i is now 3 !!");
    yield ++i;
  }
}

function* take(l = 1, iter) {
  let res = [];
  iter = iter[Symbol.iterator]();
  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      res.push(a);

      if (res.length === l) return res;
    }
    return res;
  })();
}

function toArray(gen) {
  const it = gen[Symbol.iterator]();
  return it.next().value;
}

const k = take(4, range(5));
console.log(`>`, toArray(k));
/**
 * !! i is now 3 !!
 * > (4) [1, 2, 3, 4]
 * */

const k2 = take(3, range(5))
// take {<suspended>}
```

위 코드는 우선 iterable, generator에 대한 이해가 있어야 한다.

이해가 있는 상태라고 가정하므로 설명은 생략한다.

위 코드를 보게 되면 take의 값이 3인 경우에는 range 함수
내부의 console이 실행되었다.

반면 아래의 `take(3, range(5))`는 실행되지 않았다.

왜 그럴까?

iterable protocol을 따르는 함수는 다음과 같은 규칙이 있다.

`함수의 실행을 최대한 미룬다.`

함수의 실행을 미룬다는 것은 이 프로토콜의 중요하면서도 핵심적인 특징이다.

불필요한 연산을 예로 들어보면 바로 이해 할 수 있다.

```js
[1,2,3,4,5].map(a=>a+1).filter(a=>a===2); // [2]
```
이러한 연산은 개발자를 불편하게 하기 충분하다.

위 연산에서 인간의 시선으로 보았을 때 꺼내어 지는 것은 결국 배열 한 개 짜리에 2가 담길 것이 훤히 보인다.

이를 컴퓨터는 1~5 배열을 전부 순회하며 그저 주어진 계산을 수행하여 답에 `접근`해간다.

이는 문제가 있다.

만약 5개 짜리가 아닌 5만의 길이를 가지는 혹은 5차원 배열이라면? 이를 전부 순회할 것인가?

아니다... 현명하지 못하다고 할 수 있다.


이를 계산을 미루는 방법을 통해 개선해보자.


```js
function someFunction(){
    // ...
}

function somePredicateFunction(){
    // ...
}

[1,2,3,4,5].map(someFunction).filter(somePredicateFunction)
```
만약 위 배열 중 하나의 값을 반환받으면 함수를 그만 `멈추고` 싶다고 하자.

> 안다. 물론 `멈추는 것` 자체는 일반 프로그래밍에서도 가능하다는 것을 하지만 굳이 이렇게 하는 이유를 좀 더 참고 보자.


만약 하나의 값만 반환 받아도 된다고 하였을 때 컴퓨터가 이렇게 해주었으면 한다.

1. `[1,2,3,4,5]` 배열의 1번 값을 꺼내어 map을 돌린다.
2. 배열의 1번 인덱스의 값을 꺼내오는 것이 아니라 `1.`에서 계산한 값을 가지고 filter를 돌린다.
3. 함수의 사용자가 원하는 1 개의 값이 채워진 것을 확인하고 함수를 종료한다.


위 방법은 기존의 그 프로그래밍 순서와 다르다.

시퀀스 자료 구조들의 특징을 따르지 않는다는 것이 특징이다.
가로가 아닌 세로로 함수들을 실행하며

각 시퀀스들의 인자들마다 종료 시점을 체크하여 실제 원하는 종료시점에 보다 더 빨리 도달한다.

이러한 방법은 위의 take 함수의 구현으로 간단히 해결 할 수 있다.


무한한 크기의 배열을 기존의 프로그래밍으로는 map을 돌 수 없다는 것을 인정 할 것이다.

하지만 위의 방법으로는 그 것을 가능케한다.




<br>
<br>

## recap 
--- 

유인동님의 강좌를 보는게 백만배 낫겠지만

이 글이 이해된다면 좋겠습니다.
<br>
<br>
