---
layout: post
title: pipe 함수에 대해
date: 2022-09-30 00:26 +0900
categories: ["Beginning Functional JavaScript"]
---
## pipe 함수란

함수형 페러다임이 멀리서 보았을 때는 모두 비슷해보이지만 가까이서 지켜보게 되면 서로 추구하는
디자인이 다르다는걸 느낄 수 있습니다.


해당 책에서 알려주는 pipe라인 함수는 제가 선호하는 스타일은 아닙니다.


```js
export function pipe1(a, f) {
    return f(a);
}

export function go(a, ...args) {
    return reduce(pipe1, a, args);
}

export function pipe(...fns) {
  return (a) => go(a, ...fns);
}
```
위의 코드가 제가 선호하는 방식의 pipe 함수 구현입니다.


하나씩 살펴보도록 합시다.

흐름
---

바로 코드를 이해하려고 하기 보다는 먼저 흐름을 파악합시다.

```js
const sumAndLog = pipe(
    a=>a+1,
    console.log
)
sumAndLog(0)
// 1
```

사용법은 무척이나 단순합니다. pipe함수에 함수들을 배치해놓고

나중에 인자를 하나 넣어주면 되는 것입니다.


파악하기
---

pipe함수나 compose등의 함수들을 이해하는데 가장 중요한 것은 reduce를 이해하는 것입니다.


reduce가 받는 배열을 함수로 채우고 단일 인자를 받아,
배열에 있는 함수를 하나씩 꺼내어 단일 인자에 적용하고 이 값을 누산합니다.

이제 go 함수와 pipe 함수는 한 끗 차이라는 것을 알게 되었습니다. 

좀 더 유연하게 만들기
---

```js
export function pipe(...fns) {
  return (a) => go(a, ...fns);
}
```
pipe 함수의 모습을 보면 반환하는 함수가 단 하나의 인자만을 받는 모습입니다.

아주 단순해서 좋지만 조금 더 확장성이 있다면 더욱 좋겠습니다. 
인자를 더 많이 받아볼 수 있도록 수정해본다면 어떨까요?

```js
const sumAndLog = 
    pipe((a,b)=>a+b
    ,console.log)
sumAndLog(1,2); // 3
```

이렇게 변경하려면 어떻게 하면 좋을까요?

```js

function pipe(f,...fns){
    return (...as) => go(f(...as),fns)
}
```
함수 `f`를 받아 구분하고, `...as`를 받아 여러 인자들을 받은 후 `f(...as)`를 통해
첫 함수와 인자들의 계산을 끝낸채로 넘겨주는 것입니다. (위 코드는 유인동님의 코드를 참고하였습니다.)

여기서 한 가지 놓치지 말아야 할 점은 f(...as)입니다. 이는 아래와 같습니다.

```js
const sum = (a,b)=>a+b;
sum(...[1,2]) // == sum(1,2)
```
아..! 놀랍군요

spread연산자를 통해 인자로써 값을 넣어줄 수 있다는 사실..

여기서 한번만 더 유연하게 해볼까요? 사실 이는 유연하다기 보다는 지나친 다형성이아닌가 생각됩니다만..

pipe함수의 인자로 배열까지 받아봅시다.
```js
pipe(sum,console.log)([1,2,3]) // expected value is 6
```
```js
export function pipe(f, ...fns) {
  return (...as) => {
    return Array.isArray(as[0])
      ? go(f(...as[0]), ...fns)
      : go(f(...as), ...fns);
  };
}
```
방법은 생각보다 간단합니다. 인자로 들어오는 값은 이미 spread 연산자를 통해 배열화 하였기 때문에
해당 배열의 0 번째가 배열이라면 배열 인자가 들어온 것입니다.

이제 문제점을 찾았으니 해결법은 자연히 분기문을 추가하는 것으로 완결됩니다.


> 이번 게시글은 원래 책의 흐름과 다릅니다.
> 하지만 함수형 특히 js의 경우 언어차원에서 지원해주는 부분이 적다보니
> 여러 사람들의 각자의 함수가 있고 또 큰 라이브러리들의 패턴들에 의존을 많이하게 됩니다.
> 하지만 자신만의 함수를 만들어보는게 중요하다 생각됩니다.

