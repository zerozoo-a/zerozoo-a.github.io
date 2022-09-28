---
layout: post
title: compose 함수에 대해
date: 2022-09-28 01:55 +0900
categories: ["Beginning Functional JavaScript"]
---

## `compose(square, add) // === (1+1)^2`

이번에 알아볼 함수는 compose 함수입니다.

compose의 역할을 먼저 알아보면 이해가 빠를 것 같습니다.


이 글의 제목에 힌트가 있는데요. 바로 

`"함수들을 미리 받아놓고 인자를 마지막에 받아
해당 함수들을 오른쪽에서 부터 왼쪽까지 값을 넘겨주며 실행한다."` 입니다.

뭐.. 실행 순서가 마음에 안드신다면 바꾸셔도 상관없긴 합니다만 보통 괄호를 쓰면 `(a(b(c)))`처럼
가장 먼저 실행되어야 하는 것이 가장 오른쪽에 위치하게 되는게 보통입니다.

그래서 이러한 구조가 나온게 아닌가 싶네요.


코드의 구현은 생각보다 간단합니다.

```js

function compose(a, b){
    return function(c){
        return (a(b(c)))
    }
}
```
함수 a, b를 받고 인자를 받는 c 함수를 반환합니다. c는 인자를 받을경우 함수를 b, a 순으로 실행해 값을 반환하죠


compose는 단일 인자 c 하나만을 받는다는 조건이 있습니다.
위 조건을 위배하지 않고 유닉스 철학을 따르며 
map, filter, partial을 이용해 한 문제를 풀어보도록 하겠습니다.


```js
// n이 5 이상이고 foo만 가져오시오. // expect: [ "bar_6", "bar_7", "bar_8", "bar_9" ]
const a = [ 
    { foo: "bar_0", bar: "foo_0", n: 0 },
    { foo: "bar_1", bar: "foo_1", n: 1 },
    { foo: "bar_2", bar: "foo_2", n: 2 },
    { foo: "bar_3", bar: "foo_3", n: 3 },
    { foo: "bar_4", bar: "foo_4", n: 4 },
    { foo: "bar_5", bar: "foo_5", n: 5 },
    { foo: "bar_6", bar: "foo_6", n: 6 },
    { foo: "bar_7", bar: "foo_7", n: 7 },
    { foo: "bar_8", bar: "foo_8", n: 8 },
    { foo: "bar_9", bar: "foo_9", n: 9 } 
]
```

이제 작은 함수들을 잘 활용하여 위 문제를 해결해보도록 합시다.


먼저 접근법을 구상해봅시다.
1. filter를 통해 n이 5 이상인 것들만 남깁니다.
2. map을 통해 반환값을 변경해 반환받습니다.

이제 partial 함수를 사용해 문제를 조금씩 진전시켜보면

```js
const compA = f.partial(f.filter, undefined, (obj) => obj.n > 5);
const compB = f.partial(f.map, undefined, (obj) => obj.foo);
```
이제 위 두 변수는 단일 인자만 받으면 완성이 되는 함수가 되었습니다.

compose 함수와 결합시킬 명분이 생겼네요


```js
const res = f.compose(compB, compA)(a);
console.log("res ?", res); // [ "bar_6", "bar_7", "bar_8", "bar_9" ]
```

이렇게 문제가 해결되었습니다.

이제 compose 함수를 조금 더 유연하게 바꿔보겠습니다.

```js

/**
 * @param ...fns 함수들을 배열 형태로 받습니다.
 * reverse 함수를 이용하여 입력받은 배열을 재배치합니다.
 *
 * v는 compose가 받는 단일 인자입니다. 해당 인자를 reduce의 initialValue로 넘겨줍니다.
 *
 * 첫 루프에서 reduce는 v를 acc라는 인자로써 받게 됩니다. 그 다음은 배열에서 함수를 꺼내와 함수에 (v = acc)를 넣어주겠군요
 *
 * */
export function compose(...fns) {
  return function (v) {
    return reduce(fns.reverse(), (acc, f) => f(acc), v);
  };
}

```
reduce 함수가 빛을 발휘하는 순간입니다. 

compose 할 함수들을 배열로 받아주면서 reduce를 사용할 수 있게 되었습니다.

compose 함수는 미리 함수들을 받아놓고 인자를 넘겨주면서 연쇄적으로 함수를 실행시키는 것이 목적입니다.


이는 reduce 함수를 통해 구현할 수 있다는 것입니다. reduce 함수도 accumulate를 통해 값을 누산하기 때문이죠.


이제, 함수가 함수를 만들기 시작하였습니다.


