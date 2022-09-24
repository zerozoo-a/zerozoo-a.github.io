---
layout: post
title: github actions를 사용해보았다.
date: 2022-09-24 15:38 +0900
---

![image](https://user-images.githubusercontent.com/80259925/192083926-fda0f110-6af1-41e8-8a77-f4032610af38.png)

## github actions란?

CI/CD platform이다. 즉 지속적인 개발 배포를 도와주는 도구라고 생각하면 됩니다.

굳이 platform이라는 이름을 붙인데는 이유가 있는데요. 바로 CI/CD마다 각각 환경이나 설정해주어야 하는 것들이 
전부 각각 다르고 그 환경 설정은 쉽지 않습니다.


그래서 기본적으로 만들어져 있는 세팅을 가져와 자신에 입맛에 맞게 조금씩 수정하여 사용하기 편하게  되어 있습니다.


마치 docker hub에서 spring환경이나 node 환경을 세팅해놓고 뿌려 놓은걸 사용하는 것과 같습니다.



그래서 지금 만들며 학습하고 있는 함수형 라이브러리에 적용을 해보려합니다.


먼저 사용하는 이유가 있어야 하겠죠?
```
(condition) origin에 push 할 때마다,
    (do) ubuntu, node등을 설치
    (do) babel로 compile
    (do) jest로 test
```

우선 하고싶은 것은 이게 전부입니다.

이제 github에 널려있는 actions 파일 중 저한테 적합한 것을 찾아 조금 수정해보겠습니다.

```yml
name: Node.js CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:

    runs-on: ubuntu-latest

    #    strategy:
    #      matrix:
    #        node-version: [18.x]
    #        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: 'npm'
      - run: npm ci
      - run: npm run babel
      - run: npm run test

```

위의 내용을 간략하게 설명해보자면,

> name -> 이름.. 다른 actions와 구분해주는 것 이외에 큰 역할은 없는 듯 하다.

> on -> actions를 발동시킬 조건을 의미합니다. git의 push와 pull_request이면서 main인 경우에
액션이 발동하겠네요

> jobs -> 가장 중요합니다. build의 하위에 runs-on은 환경을 뜻합니다. 전 우분투 최신버전에서 작동하겠군요
> 그 다음 steps인데 checkout은 저장소 데이터를 가져오는 역할을 한다고 합니다. [정확한 내용 보러가기](https://github.com/actions/checkout)

> steps -> actions/setup-node@v3은 이미 생성되어 있는 환경 사용한다는 뜻입니다.
> run은 이제 환경 세팅이 끝난 다음 실행할 명령어들이네요. npm run start를 통해 package.json에 심어놓은 scripts를 실행하듯 다음 명령어를 넣어주시면 됩니다.


제가 actions를 제 프로젝트에 맞게 세팅한건 처음인데요.
우선 무료 사용량 만큼은 사용해도 문제가 없으니.. 여러분도 시도해보시는걸 추천드립니다.