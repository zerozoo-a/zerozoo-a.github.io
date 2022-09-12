---
layout: post
title: iterator와 js
date: 2022-09-11 16:17 +0900
categories: ["fs"]
tags: ["iterator"]
---


### js에는 iterator라는 프로토콜이 있다.

```js
function rangeIterator(start=0, end = Infinity, step=1){
  let nextIndex = start;
  let n = 0;

  return {
    next:()=>{
      let result;

      if(nextIndex < end){
        result = { value: nextIndex, done:false }
      } else if(nextIndex === end){
        result = { value: n, done: true}
      } else {
        result = {done: true}
      }

      nextIndex += step;
      n++;
      return result;
    }
  }
}
```
MDN에서 제공하는 기본적인 예시는 위와 같은데 Array 객체나 Object도 iterable 프로토콜을 따르고 있고
js와 관련된 많은 객체들도 해당 프로토콜을 따르기 시작하고 있다.


iterable 프로토콜에는 재밌는 기능이 하나 있다.

```js
function* makeRangeIter(start=0,end=Infinity,step=1){
  for(let i = start; i < end; i += step){
    yield i;
  }
}

const mkr = makeRangeIter(0,2);
console.log(mkr.next()) // { value: 0, done: false }
console.log(mkr.next()) // { value: 1, done: false }
console.log(mkr.next()) // { value: 2, done: false }

```
보통 위와 같이 iterable한 객체를 순회하는데 많이 사용하기도 하지만

```js
function* makeRangeIter(start=0,end=Infinity,step=1){
  for(let i = start; i < end; i += step){
    yield i;
  }
}

const mkr = makeRangeIter(0,2);
console.log(...mkr) // 0 1 
```
이런식으로 spread 해주면 각각을 실행시키는 것이 아닌 값들을 한 번에 모두 받을 수 있다.

이런걸 어디에다 쓸지는 자유이지만 간단한 예시는 아래와 같다.

```js
function* makeRangeIter(start=0,end=Infinity,step=1){
  for(let i = start; i < end; i += step){
    yield i;
  }
}

const mkr = makeRangeIter(0,29);
const max=Math.max(...mkr)
console.log('max?',max) // 28
```

iterable과 Promise를 조합하여 여러 비동기요청을 한번에 보내는 경우에도 사용이 되곤 한다.
애초에 async/await 또한 iterable을 통해 제작 되었으니 그럴법 하다.

