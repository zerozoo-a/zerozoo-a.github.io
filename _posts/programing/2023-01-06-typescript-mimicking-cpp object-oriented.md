---
layout: post
title: typescript로 모방하는 cpp객체지향
date: 2023-01-06 00:08 +0900
---
# 타입스크립트는 얼마나 cpp를 따라 할 수 있을까
<!--break-->
## index 
--- 
- [타입스크립트는 얼마나 cpp를 따라 할 수 있을까](#타입스크립트는-얼마나-cpp를-따라-할-수-있을까)
  - [index](#index)
  - [문제](#문제)
  - [풀이](#풀이)
  - [recap](#recap)

<br>
<br>
<br>
## 문제 
--- 
cpp의 클래스 선언 방식을 typescript로 모방해보세요.

cpp의 헤더파일, 구현파일, main에서의 호출을 구현하면 됩니다.

```cpp
// Circle.h
class Circle {
private:
    int radius;
public:
    Circle();
    Circle(int r);
    double getArea();
};
```

```cpp
// Circle.cpp
#include <iostream>
using namespace std;

#include "Circle.h"

Circle::Circle() {
    radius = 1;
    cout << "반지름 " << radius;
    cout << "원을 생성합니다." << endl;
}

Circle::Circle(int r) {
    radius = r;
    cout << "반지름 " << radius;
    cout << "원 생성" << endl;
}

double Circle::getArea() {
   return 3.14 * radius * radius;
}
```

```cpp
// main.cpp
#include <iostream>
#include "Circle.h"

int main() {
    Circle c1;
    c1.getArea();
    return 0;
}
```
<br>
<br>

## 풀이 
--- 

```typescript
// circle.h.ts
export abstract class Circle {
  protected radius: number;
  constructor(n = 1) {
    this.radius = n;
  }

  abstract circle(): void;
  abstract circle(n?: number): void;
  abstract getArea(): number;
}
```

```typescript
// circle.ts
import { Circle } from "./circle.h";

export class MyCircle extends Circle {
  constructor() {
    super();
  }
  circle(): void;
  circle(n?: number | undefined): void;
  circle(n?: unknown): void {
    typeof n === "number" ? (this.radius = n) : (this.radius = 1);
    console.log(`radius: ${this.radius}`);
  }

  getArea(): number {
    return 3.14 * this.radius * this.radius;
  }
}
```

```typescript
// main.ts
import { MyCircle } from "./circle";
const main = (() => {
  const circle1 = new MyCircle();
  console.log(circle1.circle());
  console.log(circle1.getArea());

  console.log(circle1.circle(3));
  console.log(circle1.getArea());
})();

```

구현은 abstract 키워드를 적극 사용한다면 typescript 수준에서도 충분히 구현 할 수 있게 된다.

ts의 룰을 강하게 지니고 transpile된 js 파일을 건들지 않고
강하게 타입을 강제할 수 있다면 typescript의 안전성은 js에 비해 비약적으로 올라 갈 수 있기 때문에

위의 코드는 인터프리터인 js로도 method overloading이나 abstract class의 생성이 가능하다는 것을 보여주는 예이다.


위 typescript 코드에서 주의해주어야 할 점은 abstract class를 
타입이라고 생각하면 안된다는 점이다.

그냥 객체이다. 추상 클래스를 extends 하는 것도 실제 class(🍭)를 extends하는 것이기 때문에 class의 extends가 가능한 것이다.


만약 위 추상 class를 사용하면서도 다른 class를 확장하거나 하고 싶은 경우에는 mixin 기법을 통해 늘리거나..

`implements` 키워드를 사용하는 것을 추천한다.
<br>
<br>

## recap 
--- 
`implements`도 좋은 대안입니다
<br>
<br>
