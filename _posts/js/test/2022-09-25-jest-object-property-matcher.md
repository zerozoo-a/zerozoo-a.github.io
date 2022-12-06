---
layout: post
title: jest object property matcher
date: 2022-09-25 17:42 +0900
categories: [test]
---

아래의 테스트는 objectAssign 함수에 대한 테스트이다.
objectAssign 함수는 객체 a, b를 받아 a와 b의 property를 합치는 것이다.

이 때 잘 합쳐진 결과를 테스트 하고 싶을때 아래와 같이
toEqual함수로 결과값을 입력해 실제 그렇게 되었는지를 테스트 할 수 있다.

```js
import { objectAssign } from "../src/objectAssign";

test("objectAssign function should mix object with another one", () => {
  const a = { a: "AAkey", c: "ACkey" };
  const b = { b: "BBkey", c: "BCkey" };

  const result = objectAssign(a, b);
  expect(result).toEqual({ a: "AAkey", b: "BBkey", c: "BCkey" });
});

```
