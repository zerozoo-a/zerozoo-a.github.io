---
layout: post
title: iterator can handle
date: 2022-10-03 19:52 +0900
categories: ["Beginning Functional JavaScript"]
tags: ["iterator"]
---

iterator를 활용해 asynchronous를 다루어 보자.

컨셉은 비동기 함수를 실행시키고 iterator를 통해 함수의 실행을 중지시키는 컨셉이다.
```js
const getDataThree = () => {
  setTimeout(() => {
    generator.next("dummy data three");
  }, 1000);
};

const getDataFour = () => {
  setTimeout(() => {
    generator.next("dummy data four");
  }, 1000);
};

function* main() {
    console.log("one");
    let dataThree = yield getDataThree();
    console.log("data three", dataThree);
    let dataFour = yield getDataFour();
    console.log("data four", dataFour);
}

let generator = main();
generator.next();
console.log("two");

```

코드를 따라가보며 흐름을 파악해봅시다.

1. `generator.next()`를 통해서 main 함수가 실행되고 `console.log("one")`이 출력됩니다.
2. `yield getDataThree()`를 통해 비동기 함수를 호출합니다. 
3. 이제 main iterator에서 할 일은 더 이상은 없으니 함수를 정지시키고 빠져나갑니다. 이 때 비동기 함수는 실행중인 상태입니다.
4. main 함수를 정지시키고 나와 `console.log("two")`를 실행시킵니다.
5. 시간이 지나고 `getDataThree()` 함수의 비동기에 대한 응답이 실행되어 `generator.next("dummy data three")`를 실행시킵니다.
6. `generator.next("dummy data three")`는 정지된 iterator를 다시 실행시키면서 `dataThree`에 `dummy data three`를 바인딩시킵니다.


중요한 부분은 다 지나왔다.

### recap
`generator.next()`를 통해 main iterator를 실행시키고,
비동기함수인 `getDataThree`를 실행시키고 iterator를 정시킨 다음 빠져나간다.
비동기함수에 설정한 `1000ms`가 지난 후 `generator.next("dummy data three");`를 통해
정지되어 있던 비동기함수를 다시 실행시키면서 yield를 바인딩하는 변수에 값을 전달하며 다시 비동기 함수로 들어간다.

그 다음은 이 것들이 반복된다.

여기서 주의 할 점은 `iterator` 함수인 main에 접근하는 것이 아니라 `iterator`함수의 인스턴스에 접근해야 하는 것이다.


이렇게 iterable를 통해 비동기를 다루는 방법을 알아봤습니다.

