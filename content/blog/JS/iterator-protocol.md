---
title: 자바스크립트 iterator의 특징
date: 2023-06-24 00:23:37
coverURL: https://images.unsplash.com/photo-1617398759547-4ceb793b9270?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80
---

<br />
<br />
<br />

## iterator란 무엇일까?

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols">iterator란? </a>

iterator의 개념 자체는 단순합니다.
반복문을 사용하기 편하도록 규칙을 세워 이 규칙을 따르면 iterator이고
그렇지 않으면 iterator가 아니다! 라는 것입니다.

즉 iterator 규칙을 따르는 반복문 생성자와 그 반복문입니다.

<br />
<br />
<br />

## 코드로 보기

말로만 봐선 이해가 어려울 수 있습니다.
MDN에서 보여주는 예시입니다, iterable protocol을 따르는 객체를 생성했습니다.

```js
const obj = {
  [Symbol.iterator]() { // 1
    let i = 0;
    return {
      next() { // 2
        i++;
        console.log("Returning", i);
        if (i === 3) return { done: true, value: i };
        return { done: false, value: i };
      },
      return() {
        console.log("Closing");
        return { done: true };
      },
    };
  },
};

const a = obj[Symbol.iterator]; // method를 지정함
a.next() // {done: false, value: 1}
```
1. `Symbol.iterator`라는 Symbol.iterator로 객체의 메서드 키를 지정했습니다.

2. `return`으로 next라는 함수를 반환합니다.
   1. `next()`의 설명은 
      1. `A function that accepts zero or one argument and returns an object conforming to the IteratorResult interface (see below). If a non-object value gets returned (such as false or undefined) when a built-in language feature (such as for...of) is using the iterator, a TypeError ("iterator.next() returned a non-object value") will be thrown.` next 함수는 저희가 제작한게 아닌 언어차원에서 제공됩니다. 예외는
      객체로 값을 반환해야 한다고 합니다.
      2. 예제에서는 i 값을 올려줍니다. 클로저가 적용되어 해당 스코프 내의 값은 외부에서 건들 수 없게 되었습니다. 
3. 가장 큰 특징으로 iterator는 **반복문을 중간 저장**하고 done, value 값을 반환합니다.

이외에도 한번 실행해서 done상태가 된 iterator는 객체를 새로 생성해야 다시 사용할 수 있습니다.
이 외에도 여러 특징들이 있지만 한번에 다 설명하기 힘들정도입니다.

### 장황한 문법을 간단하게

위의 문법은 좀 장황합니다. 사용하기 힘들 정도이죠

그래서 문법설탕이 존재합니다.

```js
function* oddEven(){
    while(true) {
        yield 'odd';
        yield 'even';
    }
}

const oddAndEven = oddEven();

oddAndEven.next()
// {value: 'odd', done: false}
oddAndEven.next().value
// 'even'
```

무한한 반복문을 사용 할 수 있다는 것도 큰 특징 중 하나입니다.
무한루프나 무한수열은 개발언어에서 다루기 힘든 주제이거나
어떤 특정 값 중 도달할 수 없는 값의 비교값 정도로 사용되는 것이 전부입니다.

하지만 이렇게 무한한 루프를 끊어서 사용 할 수 있다는 장점이 있습니다.

물론 iterable을 사용하지 않고도 구현 할 수 있는 방법은 많습니다.

단, iterable을 사용하면 좀 더 편리하다는 것이죠
위 예제는 odd, even을 무한히 반환합니다.

하지만 여기에 2로 나누어 떨어지는가? 에 대한 연산은 없죠
만약 숫자가 무한히 늘어나게 된다면 성능이나 개발 언어가 설정해둔 범위로 에러가 반환될 것입니다.




## 정리

iterable protocol은 protocol이라는 이름답게 해당 조건이 맞으면
iterable하다고 할 수 있습니다.

브라우저의 DOM이나 자바스크립트의 자료형등 이런 요구를 따라가고 있습니다.

iterable의 가장 큰 장점 중 하나에 대해 설명드렸습니다.
바로 무한을 다룰 수 있다는 것입니다,
다른 하나는 최적화입니다만 다른 글에서 작성하도록 하겠습니다.