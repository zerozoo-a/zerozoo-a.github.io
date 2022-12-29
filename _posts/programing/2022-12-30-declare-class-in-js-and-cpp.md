---
layout: post
title: declare-class-in-js-and-cpp
date: 2022-12-30 01:28 +0900
categories: [cpp,js]
---

<!--break-->
## index 
--- 
- [index](#index)
- [문제](#문제)
- [풀이](#풀이)
- [recap](#recap)

<br>
<br>
<br>
## 문제 
--- 
cpp과 js, node.js의 클래스 선언 방식과 둘의 차이점에 대해 알아보자.
<br>
<br>

## 풀이 
--- 
```cpp
// Point.h
class Point {
    int x, y;
public:
    Point();
    Point(int a, int b);
    int* getCoordinate();

    ~Point();

};
```
```cpp
#include <iostream>
using namespace std;
#include "Point.h"


Point::Point() { x=0; y=0;}
Point::Point(int a,int b) { x=a;y=b;}
Point::~Point() {
    cout << "point 소멸" << x << " ," << y;
}

int *Point::getCoordinate() {
    static int a[2] = {x,y};
    return a;
}
```
위 방식은 cpp의 클래스 선언과
구현이다.


```js
class Point {
    #x;
    #y;
    constructor(x = 0, y = 0){
        this.#x = x;
        this.#y = y;
    }

    get coordinate(){
        return [this.#x, this.#y];
    }
}
```


우선 제가 알고 있는선에서 js 진영에는 cpp처럼
class의 선언과 구현을 깔끔하게 분리하진 못하는 것으로 알고 있습니다.

그냥 사용하는 사용자가 원하는 방식으로 해당 메서드들을 오버라이딩 한다거나

확장하는등의 방법을 사용 할 수 있겠습니다. (하지만 에러를 명시적으로 던져주지는 않으므로 개발하는데 주의가 필요합니다.)


js에서 만약 ts의 타입시스템이나 혹은 flow를 통해 타입을 점검하는 것으로 사전에 발생 할 에러들을 많이 걸러낼 수 있습니다.


```typescript
abstract class AbsPoint {
    protected x:number = 0;
    protected y:number = 0;
    public coordinate():[number,number] {
        return [this.x,this.y] 
    }
}
class Point extends AbsPoint {
    #x = 0;
    #y = 0;
    coordinate(): [number,number]{
        return [this.x,this.y]
    }
}

const p1 = new Point();
console.log(p1.coordinate()); // [0, 0];
```

이렇게 함으로써 좀 더 방어적인 코드를 만들어 낼 수 있게 됩니다.

extends 키워드를 추상 클래스를 상속받는데 사용하기는 하지만
여러 클래스를 받는 것도 가능하므로
코드가 아주 약간 더러워지는 것을 가지고 뭐... 이정도의 안정성이라면

아주 효율이 좋은 교환아닌가 싶습니다.




<br>
<br>

## recap 
--- 

이렇게 차이점을 알아보는 것도 좋은 것 같습니다.
ts의 등장으로 cpp에서만 가능하던 일들을 자바스크립트도 할 수 있게 되었다는게 참 뭐랄까 좋네요!
<br>
<br>
