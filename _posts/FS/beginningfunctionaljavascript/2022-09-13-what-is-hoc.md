---
layout: post
title: HOC란 무엇인가
date: 2022-09-13 01:37 +0900
categories: ["Beginning Functional JavaScript"]
tags: ["HOC"]
---

이 포스트는 Beginning Functional JavaScript라는 책을 읽으면서
공부한 내용을 바탕으로 작성됩니다.


### HOC란 무엇일까?

책에서 제공하는 간단한 예제를 통해 알아봅시다.

```js
function crazy(){
    return String;
}

const foo = crazy();
foo("Hello") // => "Hello"
```
위 함수 crazy를 살펴보면 함수의 반환값으로 다시 String이라는 클래스를 반환하는데
crazy가 하는 일은 단순히 함수를 반환해주고 반환하는 함수에 어떤 실행도 요구하지 않는다.


---


이런 단순한 예제로는 실용성을 찾아보기 힘들기 때문에 다른 예제 하나를 더 추가하는 것이 좋겠다.

다음은 다른 예제이다.

```js
function forEachObject(obj, fn){
  for(const property in obj){
    if(obj.hasOwnProperty(property)){
      fn(property, obj[property])
    }
  }
}

const a = {foo:"Foo", bar:"Bar", foobar:"FooBar"}
forEachObject(a,console.log)
```

위 예제는 js의 object를 순회하며 전달받은 함수를 object의 각 property와 해당 value를 함수에 전달한다.

`forEachObject`가 하는 일은 단순하다.
전달받은 함수에 전달받은 object를 원하는 형태로 전달하는 역할을 한다. 그게 전부인 것이다.






