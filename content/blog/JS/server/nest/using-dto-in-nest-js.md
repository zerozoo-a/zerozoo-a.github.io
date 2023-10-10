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

- dto는 데이터를 전송할 때 쓴다.

## 설치

```bash
    pnpm add class-transformer class-validator
```
적당한 package manager를 통해 라이브러리를 설치합니ㅏㄷ.

## 설정

설정에 대한 자세한 내용은 <a href="https://docs.nestjs.com/techniques/validation#auto-validation">
nest.js</a>에서 확인 할 수 있습니다.

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(5050);

  const whitelist = ['http://localhost:3000'];
}
bootstrap();
```

## 사용하기

dto 클래스를 생성하고 decorator를 붙여줍니다.

class-validator는 typescript를 사용하는 많은 유저들에게
많은 사용되고 있고 nest.js의 decorator와도 궁합이 좋아 오래도록 
nest.js에서 사용되어 왔습니다.

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


### controller에서 사용하기

```ts
...
  @Post('/createHouseUser')
  async createHouseUser(@Body() createUserDto: CreateUserDto) {
    Promise.resolve({ hi: 'done' });
  }
...
```

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
- controller에서 입력으로 들어오는 입력의 타입을 Dto로 입력해줍니다.
- client에서 적당한 option과 함께 요청을 넣어줍시다.







