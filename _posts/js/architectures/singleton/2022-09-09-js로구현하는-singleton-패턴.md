---
layout: post
title: js로구현하는 singleton 패턴
date: 2022-09-09 10:16 +0900
categories: [js]
tags: [architectures, singleton, jest]
---

이 포스트들은 [이 사이트](https://www.patterns.dev/)를 보고 학습하며
깨달은 점들을 모아놓습니다.

[예시코드](
https://stackblitz.com/edit/js-rxtul7?file=src/singleton.js
)

예제로 나온 코드는 크게 두가이다.

기본 js의 object를 사용한 것과
```js
let count = 0;

const counter = {
  increment(element) {
    element.innerHTML = `counter ${count}`;
    return ++count;
  },
};
Object.freeze(counter);
export { counter };

```


클래스를 사용한 것이다.

```js
let instance
let counter = 0

class Counter {
  constructor() {
    if (instance) {
      throw new Error('You can only create one instance!')
    }
    instance = this
  }

  getInstance() {
    return this
  }

  getCount() {
    return counter
  }

  increment() {
    return ++counter
  }

  decrement() {
    return --counter
  }
}

const singletonCounter = Object.freeze(new Counter())
export default singletonCounter


```

싱글톤은 디자인패턴 중 이해하는게 좀 간단한 편이라서 항상
디자인패턴 책들의 서문에 등장하는 것 같다..

기본적인 내용은 이러하다. 
1. 객체를 생성한다.
2. 객체를 재생성하는 행위에 대해 생성했던 객체를 반환한다.

이게 전부이다. 새로 생성하는 만큼 메모리를 차지하니 재생성해서 사용해도 되는 경우에 대해서는
원래 생성했던 그 객체를 돌려준다.


이제 구현을 해보자

[⚓️link](https://stackblitz.com/edit/js-rxtul7?file=src%2Fcounter.js,style.css,index.html,index.js,package.json)

위 링크의 코드처럼 구현할 수 있게 된다.

jest로 테스트까지 해보자.

물론 환경이 js => node.js로 옮겨가기 때문에 DOM 관련은 빼주거나 주석처리를 해주어야 한다.

```js
import { counter } from "./singletonCounter.js";

test("increment 1 time should be 1", () => {
  counter.increment();
  expect(counter.getCount()).toBe(1);
});

test("increment 1 time should be 1 again", () => {
  counter.increment();
  expect(counter.getCount()).toBe(1);
});
```
위 코드는 아래와 같이 2 테스트 중 한 개의 테스트만 성공했다고 알려준다.

```bash
Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 passed, 2 total
Snapshots:   0 total
Time:        0.123 s, estimated 1 s
Ran all test suites.
```

그 이유는 jest가 코드를 읽을 때 counter 객체를 생성하고 한 테스트 단위당
새로운 counter 객체를 생성하도록 코드를 짠 것이 아니라 첫 테스트에서 다음 테스트로 넘어갈 때
같은 counter를 바라보고 있기 때문에 counter는 누산되어 2가 되었기 때문이다.

jest 설정으로 counter를 새로 호출하거나 기댓값을 2로 변경하면 테스트는 통과하게 된다.



jest에서 import export 문법을 사용하기 위해서는 babel 세팅을 해주어야 한다.
(node 최신버전은 지원하던데..)


package.json

```json
{
  "name": "singleton",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "jest"
  },
  "devDependencies": {
    "@babel/core": "^7.18.5",
    "@babel/preset-env": "^7.18.2",
    "@types/jest": "^28.1.3",
    "jest": "^28.1.1",
    "vite": "^3.1.0"
  },
  "dependencies": {
    "jest": "^29.0.2",
    "prettier": "^2.7.1"
  }
}

```

babel.config.json
```json
{
    "presets": ["@babel/preset-env"]
}

```