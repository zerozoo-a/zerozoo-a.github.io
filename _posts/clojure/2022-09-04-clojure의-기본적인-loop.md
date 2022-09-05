---
layout: post
title: clojure의 기본적인 loop
date: 2022-09-04 23:44 +0900
categories: [clojure]
tags: [loop]
---
### TOC
1. [기본적인 재귀 loop의 형태 -1](#기본적인-재귀-loop의-형태-1)
2. [기본적인 재귀 loop의 형태 -2](#기본적인-재귀-loop의-형태-2)
3. [알아두면 좋을 점들을 적어보자.](#알아두면-좋을-점들을-적어보자.)

### 기본적인 재귀 loop의 형태-1

아래의 코드는 클로저에서 반복문을 어떻게 하는지를 보여준다.

```clojure
(defn n-time [n]
  (loop [i 1]
   (when (< i n)
    (println i)
    (recur (inc i)))))
(n-time 3)
; 1
; 2
; 3
```


### 기본적인 재귀 loop의 형태-2
이 코드는 처음 보고 상당히 놀라웠던 코드이다.
이 코드 자체가 아닌 이런식으로 재귀할 수 있다는 것이 좋았다.
```clojure
(defn loop-with-args
      ([col]
       (println col))

      ([n col]
       (println "n col" n col)
       (if (= n 5)
         (loop-with-args n)
         (loop-with-args (inc n) col)
         )
       )
      )

(loop-with-args 4 '(123) )
```

### 알아두면 좋을 점들을 적어보자.

recur는 여럿 알아두어야 할 점들이 있지만
loop와 함께 사용하는 경우 recur의 지점이 loop가 된다는 점이다.

loop는 처음 바인딩 한 후 recur를 통해 재귀하였을 때,
recur 함수의 인자로 넘겨받은 값을 다시 바인딩한다.

```clojure
(loop [i 0]
      (recur (inc i))
      )
```
종료식은 없지만 recur의 인자를 통해 넘겨 받은 값을 다시 바인딩 함으로써
i의 값이 변하는 것이 아닌 i의 값을 새로 바인딩하여 결과적으로

변수의 값을 변경하는 것이 아닌 버리고 새 값을 바인딩 하는 것이다.
이거나 저거나 같아보이지만 함수형 언어의 철학이 보이는 부분이다.

---

두 번째 예제에서는 특정 조건이 되었을 경우

> 재귀호출에 인자를 통해 해당 함수와 같은 이름이지만,
다른 일을 하는 함수를 호출한다.

이 아이디어 자체는 상당히 마음에 든다..!

js도 빠르게 이런 좋은 점을 받아들이면 좋겠다.



