---
layout: post
title: iterator take args using yields
date: 2022-10-03 13:32 +0900
categories: ["Beginning Functional JavaScript"]
tags: ["iterator"]
---

iterator의 사용을 점진적으로 늘려가고 있지만 iterator에 대해 모르는 부분들은 아직도 많이 존재합니다.


오늘은 iterator에 값을 전달하는 방법 두 가지를 알아보도록 하겠습니다.

### 1. 그냥 인자로 넣기

```js
function* greeting(name){
    yield `Hello, ${name}!`
}

const hello_you = greeting('you')
hello_you.next().value() // === `Hello, you!`
```

### 2. yield를 통해 넣기

```js
function* greetingName(){
    const firstName = yield
    const lastName = yield
    return `${firstName}_${lastName}`
}

const helloZoo = greetingName();
helloZoo.next() // #1
helloZoo.next('zero') // #2 
helloZoo.next('zoo')  // #3
```
위 코드의 경우 인스턴스 생성후의 첫 next 메서드 호출이 있습니다.
일반적으로 필요 없다고 생각될 수 있지 yield에서 명시적으로 반환하는 값이 없는 경우
첫 `next()`를 비운채로 한 번 호출해주지 않는 이상 정상적인 호출이 일어나지 않습니다.

iterator `#1`의 라인이 작동하게 되면 iterator는 코드를 반환시키고
`const firstName = yield` 에서 작동을 멈추게 됩니다. `yield`는 바인딩이 되었고 어떤 값도 내보내지 않았습니다.

따라서 next의 반환값은 undefined입니다.

```js
helloZoo.next() // { value: undefined, done: false }
helloZoo.next('zero') // { value: undefined, done: false }
helloZoo.next('zoo')  // { value: zero_zoo, done: true }
```

```js
function* test2() {
  let a = 0;
  const cond = yield a;
  console.log(`cond >>> `, cond);
}

const test2gen = test2();

console.log(">>> 1", test2gen.next());
console.log(">>> 2", test2gen.next("hi"));


// >>> 1 { value: 0, done: false }
// cond >>>  hi
// >>> 2 { value: undefined, done: true }
```
위 코드를 보시면 반환하는 yield가 있으므로 첫 `next()`에 대한 적절한 값을 반환합니다.
그 후 함수 내부의 콘솔을 찍고, `next("hi")`를 통해 값을 받습니다. 이는 yield 문을 통해 들어오게 됩니다.
이는 cond에 바인딩 되고 이를 출력하게 됩니다.
