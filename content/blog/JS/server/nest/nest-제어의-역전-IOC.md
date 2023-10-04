---
title: nest.js 제어의 역전 IOC
date: 2023-10-05 00:35:43
coverURL: https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2215&q=80
---
<br />
<br />
<br />

# 제어의 역전

제어의 역전은 보통 의존성을 다루는 주체가 역전된 것을 가리킵니다.

의존성이란 어떤 객체가 다른 객체에 의존하는 것을 의미합니다.
객체지향에서 이 패턴이 두드러지게 나타나는데요

부모 자식간의 관계에서 자식은 부모에 의존합니다.

자식 클래스는 부모 클레스에 의존하죠. 

부모 클래스를 extend한 자식클래스는 부모 클래스를 항상 명시해야합니다.
```js
class Children extends Parent {
    constructor(){
        super();
        this.house = new House();
    }
}
```
생성자 함수 내에서 House 클래스를 생성해 사용해도 이는 의존적이라 할 수 있습니다.

보통 이를 하나씩 생성하는 주체가 개발자이지만 프레임워크에 맡기는 경우
제어가 역전되었다고 합니다.

## nest.js에서 사용하는 방법

nest에서는 `@Injectable` 데코레이터를 사용해 IOC를 구현합니다.
해당 데코레이터가 붙은 클래스는 이제 nest.js에서 생성과 소멸을 관리합니다.

보통 `controller` 클래스는 `service` 클래스를 사용합니다.

`service` 클래스에 `@Injectable`를 붙이고,
다른 클래스에 주입해 사용하는 클래스가 만들어졌습니다.

해당 클래스는 모듈 클래스(`@Module` 데코레이터가 붙은)의 프로바이더 설정에 추가해주면 됩니다.

이제 constructor에서 아래와 같이 써줍니다.

```ts
@Injectable()
export class GoodService(){}

@Injectable()
export class GoodRepository(){}

export class GoodController(){
    constructor(private goodService: GoodService){}
}

@Module({
    imports: [],
    controllers: [GoodController],
    provider: [GoodService, GoodRepository] // nest.js의 컨테이너에 Injectable 할 class들을 명시해줌
})
export class GoodModule{}
```
