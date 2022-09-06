---
layout: post
title: Problem 26, Fibonacci Sequence-2편
date: 2022-09-06 21:14 +0900
---

TOC
---
1. [lazy-cat🐈](#lazy-cat)


## lazy-cat🐈
> lazy-cat을 사용한 방법 🐈

```text
(lazy-cat & colls)

Expands to code which yields a lazy sequence of the concatenation
of the supplied colls.  Each coll expr is not evaluated until it is
needed. 

(lazy-cat xs ys zs) === (concat (lazy-seq xs) (lazy-seq ys) (lazy-seq zs))
```
[lazy-cat](https://clojuredocs.org/clojure.core/lazy-cat)이란 무엇인지 알아보자

이전 장에서 나왔던 `lazy-seq`가 다시 등장한 것을 볼 수 있는데
`lazy-cat`은 컬렉션을 인자로 받고 각 인자에 `lazy-seq`의 인자로 넘겨준 다음 이를 concat한다.
보통 프로그래밍에서 concat은 `(concat '(0) '(1)) === '(0 1)`의 연산을 해주는 함수이다.

`lazy-seq`는 지연 평가할 `seq`를 인자로 받아 `iterable`하게 만들어준다. `lazy-cat`은 이 일의 반복을
mapping, 하고 reduce를 통해 접어준 것과 마찬가지이다.

즉 인자들에 대해 각각 함수를 적용하고 하나로 접어낸 모양이 된다. 3개의 인자가 하나의 `lazy-seq`가 되니까 말이다.


✨Yehonathan Sharvit✨님의 코드
---
```clojure
(def fib-seq-cat
  (lazy-cat [0 1] (map + (rest fib-seq-cat) fib-seq-cat)))

(take 30 fib-seq-cat)
```
지난 내용과 마찬가지로 간결하고 우아한 코드이다.(🥲)

위 코드를 하나 하나 분석해보자
```clojure
(def fib-seq-cat; 함수가 아니라 심볼의 선언이다.
  (lazy-cat ; lazy-cat 함수는 여러 seq를 인자로 받아 하나의 lazy-seq로 접어준다.
    [0 1] ; == (vector 0 1)이다. 인자를 받고 있다고 착각하면 안된다.
    (map + (rest fib-seq-cat) fib-seq-cat) ; 와..? 😇
    )) 

(take 30 fib-seq-cat)
```

와..? 😇 부분을 다시 진정하고 보자.
`lazy-cat`의 코드는 `(lazy-cat xs ys zs) === (concat (lazy-seq xs) (lazy-seq ys) (lazy-seq zs))`이다.

따라서 아래와 같이 쓸 수 있다.

```clojure
(def test-0
  (concat
    (lazy-seq [0 1])
    (lazy-seq (println test-0))
    )
  )
(println test-0)
; => (0 (0 1) 1)
```
이 이후의 부분은 좀 더 공부한 다음 작성하겠습니다..!

[//]: # (오.. 뭔가 느낌이 슬슬 오는 것 같다. lazy는 iterable한 값으로 만들어준다는 것을 머리에 넣고 생각해보면)

[//]: # ()
[//]: # (test-0을 호출하면 )

[//]: # (1. 가장 처음 yield 되는 것은 0이다.)

[//]: # (2. 그 다음 sequence는 1을 호출하는 것이 아닌 수직으로 내려가 `&#40;println test-0&#41;` 함수를 호출한다.)

[//]: # (3. 그렇다면 test-0은 무엇일까? `&#40;0 1&#41;`이다.)

[//]: # (4. 그 다음은 다시 위에서 아래로 `&#40;lazy-seq [0 1]&#41;`에서 끝내지 못한 1을 yield한다.)













