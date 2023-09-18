---
title: nest js jwt토큰 발행시 .env 파일을 읽지 못할 때
date: 2023-09-17 11:55:08
coverURL: https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2333&q=80
---
<br />
<br />
<br />

# .env 세팅하기

Nest.js로 .env 값을 읽어오려면 보통 아래와 같이 합니다.

```ts
@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

타 모듈에서 아래와 같이 process.env.xxx를 통해 접근하게 되면
이상하게 아무 값도 읽어오지 못하고 undefined를 받습니다.

```ts
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET, // undefined 😵‍💫
      signOptions: { expiresIn: '300s' },
    }),
    PassportModule,
    UsersModule,
    TypeOrmModule.forFeature([User, UserAuthority]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy],
})
export class AuthModule {}
```

nest.js 프로젝트가 실행될 때, env file을 읽는 작업은 비동기로 실행됩니다.
프로젝트는 비동기 함수가 끝나는 것을 기다리지 않고 nest 프로젝트를 모두 읽어버리기 때문에
이런 현상이 발생합니다.

아래와 같이 변경해줍시다.

```ts
@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '300s' },
      }),
    }),
    PassportModule,
    UsersModule,
    TypeOrmModule.forFeature([User, UserAuthority]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy],
})
export class AuthModule {}
```
