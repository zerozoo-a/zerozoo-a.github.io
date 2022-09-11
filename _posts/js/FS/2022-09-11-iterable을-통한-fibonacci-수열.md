---
layout: post
title: iterable을 통한 fibonacci 수열
date: 2022-09-11 21:25 +0900
categories: ["js"]
tags: ["fs", "iterable", "lazy"]
---

>! 본 블로그는 문체가 왔다갔다 합니다. 그냥 제가 다시 보려고 기록용으로 작성하다 보니 그러한데요.. 불편하시다면 죄송합니다.
> 
> 또한 주니어 개발자 나부랭이가 작성하는 글이다 보니 여기저기 오류나 잘못된 정보가 많으니 해당 정보를 신용하시면 안되십니다..🧎 🙇‍♂️

면접 준비도 있다 보니 다시 js를 공부중이다..


각설하고 바로 보자.


보통 js에서 피보나치 수열 함수를 작성한다고 하면 아래와 같이 재귀를 통한 함수를 만드는 것이 보통이다.


재귀를 사용하다 보니 코드가 깔끔하고 우아해 보인다는게 큰 장점이다. (그렇다 프로그래밍은 우아하면 점수를 더 쳐준다.)


```js
function fibo(n,memo = {}){
    if(n===0 || n===1) return n;
    
    if(memo[n]){
        return memo[n];
    }
    
    memo[n] = fibo(n-2,memo) + fibo(n-1,memo);
    return memo[n];
}
```
음.. 아마 위 코드가 크게 잘못된 점은 없을 것 같다.

이제 코드를 iterable하게 작성해보고 싶다.


마치 클로저에서 무한히 끝이 없는 피보나치 수열을 lazy하게 다루는데 이걸 js에서도 하고싶다는 말이다.


```clojure
(def lazy-seq-seq
  ((fn fib
     [a b]
     (lazy-seq (cons a 
                     (fib b (+ a b))))
     ) 0 1)
  )

(take 20 lazy-seq-seq)
```
이런 방식으로 클로져는 딱히 생각하고 자시고 할 것도 없이 간단하게 Lazy한 코드를 작성할 수 있다.

js로 이런 비슷한 방식을 작성해보자.


```js
function* fibo(){
    let first = 0;
    let second = 1;
    while(true){
        let cur = first;
        yield cur;
        first = second;
        second += cur;
    }
}
const foo = fibo();
foo.next(); // { value: 0, done: false }
foo.next(); // { value: 1, done: false }
foo.next(); // { value: 1, done: false }
foo.next(); // { value: 2, done: false }
// ...
```

생각보다 간단했다. 

0, 1, 1, 2 ... 피보나치 수열의 계산 방식대로 각 항에 다음 계산에 필요한 인자를 바꿔주기만 하면 된다.

여기서 불만인 것은 first, second의 값을 계속 변경해준다는게 불만이다...
하지만 이걸 어떻게 해결해야 하는지는 아직 방법을 모르겠다.

다음 next iterable 함수 호출에 값을 넘겨줄 수 있다면 좋겠지만 그런 방법을 모르겠는 이상
위 방법은 그래도 잘 작동하니 참아줄만 하다.


그런데 이렇게 사용해서 값을 꺼내는 것도 괜찮은 방법이지만 조금 더 깔끔한 방법을 원하게 되기 마련이다.

clojure가 take 함수로 값을 꺼내온 것 처럼 말이다.

```js
function* take(length, iterable){
  const iterator = iterable[Symbol.iterator]()
  let cur = null;
  while (length-- > 0 && (cur = iterator.next()).done === false) {
    yield cur.value;
  }
}

```
위와 같은 iterable 함수를 선언해본다.
iterable 함수와 길이를 받아 길이만큼 while문을 통해 iterable 함수를 실행시켜주는 것이다.

하지만 이 함수 또한 iterable이기 때문에 while문을 한번에 깨주지 않는다면 
take 함수 없이그냥 호출하는 것과 다름 없이 동작하게 된다.

그렇다면 iterable 함수를 각 단계별로 실행시키지 않고 한번에 모두 실행시켜주면 된다.

바로 아래와 같이 take 함수를 사용하면 stack이 터지지 않고 동작하게 된다.

```js
const a = take(5,fibo())

console.log("a >>>", ...a) // 0 1 1 2 3

const five = [...a]
console.log('five', five) // [0, 1, 1, 2, 3]
```

js는 정말.. 아쉬운 부분도 있고 이런 부분도 가능하네? 라는 부분도 있어서
참 좋다가도 애매하다가도 좋다가도 그런.. 언어이다.







