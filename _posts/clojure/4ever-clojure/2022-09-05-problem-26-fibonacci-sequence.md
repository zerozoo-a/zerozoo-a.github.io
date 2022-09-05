---
layout: post
title: Problem 26, Fibonacci Sequence
date: 2022-09-05 21:40 +0900
categories: [clojure]
tags: [4ever-clojure]
---
### TOC
1. [피보나치수열](#피보나치수열)
2. [자바스크립트의 풀이법](#자바스크립트의-풀이법)
3. [클로져의 풀이법](#클로져의-풀이법)

## 피보나치수열
[피보나치수열이란?](https://ko.wikipedia.org/wiki/%ED%94%BC%EB%B3%B4%EB%82%98%EC%B9%98_%EC%88%98)

> 🧨 주의! 제가 작성한 코드는 틀릴(아주 구릴) 가능성이 있습니다...!!


```clojure
Write a function which returns the first X fibonacci numbers.

(= (__ 3) '(1 1 2))
(= (__ 6) '(1 1 2 3 5 8))
(= (__ 8) '(1 1 2 3 5 8 13 21))
```

## 자바스크립트의 풀이법
만약 자바스크립트로 위 문제를 푼다고 하면
```js
function fib(n){
    if(n===0 || n===1){
        return n;
    }
    return fib(n-2) + fib(n-1);
}
```
이런식으로 먼저 문제를 해결한 다음 여기에 memoization 기법을 붙여
중복되는 계산을 저장하는 방식을 사용했을 것이다.

```js
function memoizedFib(n, memo){
    if(n === 0 || n === 1){
        return n;
    }
    
    if(memo[n] === undefined){
        memo[n] = fib(n-2) + fib(n-1);
    }
    
    memo[n];
    return;
}
```

이게 보통 일반의 프로그래밍 언어에서 할 수 있는 것들이다.



---
## 클로져의 풀이법

이제 클로져스럽게 코드를 작성해보자.
우선 js에서 하던 느낌을 그대로 살리는 것도 가능하다.

```clojure
(defn fib-js [n]
        (if (or (= n 0) (= n 1))
          n
          (+
            (fib-js (- n 2))
            (fib-js (- n 1))
             )
          )
        )
(fib-js 11)
```

이런식의 작성이 가능하다. 하지만 위 코드는 아직 클로져스럽지 못하다.


### 이제 ✨Yehonathan Sharvit ✨님의 코드를 알현해보겠습니다.
```clojure
(def fib-seq-seq
  ((fn fib [a b]
       (lazy-seq (cons a (fib b (+ a b)))))
   0 1))

(take 12 fib-seq-seq)
; (take 3 fib-seq-seq)
; => (0 1 1)
```
위 코드의 좋은 점은 피보나치 수열의 특성을 잘 활용하여 lazy하게 다루었다는 점이다.
위 코드는 매우 짧고 간결하게 느껴지는데 이런 코드를 나도 작성하고 싶다.

아무튼 코드를 하나씩 분석해보도록 합시다.

```clojure
(def fib-seq-seq ; 함수 이름
  ((fn fib [a b] ; 함수 fib 선언 인자로 a, b를 받음
       (lazy-seq ; ✨ lazy-seq 선언
         (cons a ; 뒤에 나올 값에 a를 추가해줌
               (fib b ; fib 함수를 호출하여 b를 전달함
                    (+ a b))))  ; 나머지 인자를 (+ a b)의 결과값으로 전달함
       ) 0 1 ; fib 함수에 각각 0, 1 을 넣어 줌
   ))

(take 12 fib-seq-seq)
; (take 3 fib-seq-seq)
; => (0 1 1)
```

위 함수에서 가장 key가 되는 부분은 `lazy-seq`의 선언이다.
`lazy-seq` 함수는 아래와 같은 주석이 달려 있는 함수이다.
> (lazy-seq & body)
Takes a body of expressions that returns an ISeq or nil, and yields
a Seqable object that will invoke the body only the first time seq
is called, and will cache the result and return it on all subsequent
seq calls. See also - realized?

간단히 해석해보면 반환값이 ISeq이거나 nil을 반환하는 표현식 본문을 인자로 받고
그러고는 해당 함수가 호출 될 때 한 번 yield 해줍니다. 그리고 값을 캐싱하고 반환하죠

그러니까 요약하자면 js의 iterator와 똑같이 작동한다는 것입니다.

피보나치 수열은 기본적으로 무한이기 때문에 메모리의 제약이 있는 컴퓨터로는
해당 수열을 나타내는 함수를 그냥 실행 -> 평가를 하게 되면 stack이 넘쳐버리기 때문에
필요한 만큼만 함수를 실행시키고 그 값을 꺼내오게 하는 것이 위 코드의 핵심입니다.

평가를 뒤로 미루었기 때문에 lazy라고도 부르지요.

글이 길어지니 다음 글에 이어가도록 하겠습니다.