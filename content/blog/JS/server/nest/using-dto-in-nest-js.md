---
title: dto를 nest.js에서 사용하기
date: 2023-10-11 00:43:30
coverURL: https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2865&q=80
---
<br />
<br />
<br />

## dto란?

data transfer object

dto는 data를 전달 할 때 사용되는 object입니다.

## 어디에 사용하나요?

data를 전송할 때 사용하면 됩니다. 
이번엔 nest.js에서 dto를 통해 client와 통신하고

validate까지 이어서 진행하겠습니다.

## 설치

```bash
    pnpm add class-transformer class-validator
```
package manager를 통해 라이브러리를 설치합니다.

## 설정

설정에 대한 자세한 내용은 <a href="https://docs.nestjs.com/techniques/validation#auto-validation">
nest.js</a>에서 확인 할 수 있습니다.

(아래 설정은 모든 controller에 validation pipe를 연결하겠다는 표현입니다.)

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()); // auto validation을 위해 추가해주세요

  await app.listen(5050);

  const whitelist = ['http://localhost:3000'];
}
bootstrap();
```

## 사용하기

- dto 클래스를 생성하고 decorator를 붙여줍니다.
```
class-validator는 typescript를 사용하는 많은 유저들에게
많은 사용되고 있고 nest.js의 decorator와도 궁합이 좋아 오래도록 
nest.js에서 사용되어 왔습니다.
```

### dto 파일 생성
```ts
// src/dtos/createUser.dto.ts

import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  name: string;
}
```

위 코드를 보면 실 데이터가 빈 클래스를 생성했습니다.
typescript를 사용한다면 위와 비슷한 interface를 선언하면 비슷한 역할을 할 수 있다고 생각 할 수 있습니다만
typescript의 interface는 metadata를 생성하지 않고 js로 compile시 결국 사라지게 됩니다.

따라서 runtime에 값을 검사하기 위해선 실제 메모리로 저장되어지는 클래스를 선언해주어야 합니다.

같은 맥락으로 위 클래스를 import 할 때, type으로 import 하지 말아주세요
결국 runtime에 사라지게 되므로 pipe라인을 통과하지 않고 그냥 값이 들어오게 됩니다.

### controller에서 사용하기

```ts
...
  @Post('/createHouseUser')
  async createHouseUser(@Body() createUserDto: CreateUserDto) {
    Promise.resolve({ hi: 'done' });
  }
...
```

이렇게 인자를 선언하고 type을 지정해주는 것만으로
이미 validate 함수가 실행됩니다.
(decorator에 의해 실행되어짐)

dto로 인해 보다 방어적인 코드 작성이 가능해졌습니다.

request 객체의 createUserDto 값이 위에서 선언한 DTO에 적합하지 않다면
controller는 자동적으로 생성된 에러 메시지를 반환합니다.

(email 형식이 잘못되었다면 email에 대한 에러 메시지를 반환함)

### client 단에서 요청하기

```ts
  await fetch(
    `your_cool_api/createHouseUser`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }
  );
```

## 정리하기

- library를 설치합니다.
- config를 설정합니다.
- dto class 파일을 생성합니다.
- controller에서 입력으로 들어오는 입력의 타입을 Dto로 입력해줍니다.(입력이 들어올 때 validate pipe를 지나오게 되어 입력을 걸러줌)
- client에서 적당한 option과 함께 요청을 넣어줍시다.







