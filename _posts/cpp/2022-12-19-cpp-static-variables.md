---
layout: post
title: cpp의 static
date: 2022-12-19 23:13 +0900
categories: ["cpp"]
---
# CPP의 Static 알아보기
<img src="https://images.unsplash.com/photo-1519658422992-0c8495f08389?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1710&q=80"
alt="pointing">


## index기
--- 
- [CPP의 Static 알아보기](#cpp의-static-알아보기)
  - [index기](#index기)
  - [문제](#문제)
  - [풀이](#풀이)
  - [recap](#recap)

<br>
<br>
<br>
 
## 문제 
--- 
> cpp에서 지역변수에 사용된 static의 의미를 설명하라.
<br>
<br>

## 풀이 
--- 
`static` 키워드가 지역변수로 사용되는 경우에는 아래와 같은 특별한 속성이 붙는다.

`static 키워드가 붙은 변수는 스코프를 벗어나도 소멸하지 않는다.`

따라서 아래와 같은 사용이 가능합니다.

```cpp
#include<iostream>
void printStaticVar(){
    static int value = 1;
    value++;
    std::cout << value << std::endl;
}

int main(){
    printStaticVar(); // 2
    printStaticVar(); // 3
    printStaticVar(); // 4
    return 0;
}
```
다음은 오피셜은 아니지만 뇌피셜로 이해한 내용이다.

1. 한번 생성된 변수를 죽이지 않고 살려 둔다.
2. 동일한 함수가 재실행 되면 같은 이름의 변수를 새로 생성하지 않고 `1.`에서 기억해둔 메모리 주소를 사용한다.

이를 위해서 여러가지로 무언가 장치가 있겠고 불가능한 이야기도 아니겠지만 

어떤 방법을 사용하는지 지금 알아내는건 중요하지 않기 때문에 넘어간다.


<br>
<br>

## recap 
--- 

js 진영에서는 class의 static method를 사용하여 위와 비슷한 기능을 구현 할 수 있다.

예를 들면

```js
class JsStatic {
    static number = 0;

    add1(){
        JsStatic.number++;
    }
}

const a = new JsStatic();
JsStatic.number // 0;
a.add1(); // undefined;
JsStatic.number // 1;
```
위처럼 class 자체에 속성이 붙어있게 되다보니(실질적으로는 prototype)
위 클래스의 다른 인스턴스도 JsStatic class가 가지고 있는 memory 주소를 바라보게 된다.

따라서 js에서의 구현은 위와 같다고 볼 수 있다.

<br>
<br>

