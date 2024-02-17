---
title: docker compose와 nest.js와 5.x typescript 세팅하기
date: 2024-02-14 23:44:58
coverURL: https://images.unsplash.com/photo-1504383633899-a17806f7e9ad?q=80&w=3006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<br />
<br />
<br />



## docker로 nest.js를 말고 compose로 띄워보자
- `docker`와 `docker-compose`의 기본적인 사용법을 알고 있다는 가정하에 진행됩니다.
- `docker, docker-compose, npm, node`등의 개발 환경은 이미 갖추어진 상태라고 가정합니다.
- `nest.js`만을 띄웁니다.
- 완성된 repo: `git clone https://github.com/zerozoo-a/docker_compose_nestjs`

### nest.js 프로젝트 준비
`docker`를 사용해 `nest.js` 프로젝트를 말아보겠습니다.
적당히 `nest.js` 프로젝트를 생성해주세요.

간단히 실험해보고 싶다면 아래의 `repo`를 클론해주세요

```sh
git clone https://github.com/nestjs/typescript-starter.git project
```

### Dockerfile 만들기

아래의 환경을 그대로 사용해도 좋으나 원한다면 조금씩 변경해주세요.
프로젝트의 루트에 `Dockerfile`이라는 이름의 파일을 생성하고 아래의 설정을 작성합니다.

```Dockerfile
FROM node:21-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start:dev"]
```

### docker-compose.yml 파일 만들기

똑같이 프로젝트의 루트에 `docker-compose.yml` 파일을 생성하고
아래의 설정을 넣어주세요

```yml
services:
  nestjs:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
    environment:
      - NODE_ENV=development
```

### 특이사항

`nest.js`는 기본적으로 `typescript template`을 제공합니다.

>typescript 5.1.3버전 부터는 `hot reload`에 `tsconfig.json` 파일의 설정을 추가할 것을 강제합니다.
이 세팅을 추가하지 않을 경우 컨테이너를 띄운 상태에서 volume 범위에 속하는 파일을 변경할 때, 
container는 에러를 표시하고 컨테이너가 내려갑니다.

기존의 `tsconfig.json`에 아래의 옵션을 추가해주세요

<a href="https://blog.stackademic.com/using-docker-compose-to-run-nestjs-applications-with-redis-and-postgres-586ab132b60c">출처</a>

```json
"watchOptions": {
    // Use native file system events for files and directories
    "watchFile": "priorityPollingInterval",
    "watchDirectory": "dynamicprioritypolling",
    // Poll files for updates more frequently
    // when they're updated a lot.
    "fallbackPolling": "dynamicPriority",
    // Don't coalesce watch notification
    "synchronousWatchDirectory": true,
    // Finally, two additional settings for reducing the amount of possible
    // files to track  work from these directories
    "excludeDirectories": ["**/node_modules", "dist"]
  }
```


### 실행하기

`CLI`를 통해 실행해도 좋지만 번거러우므로 `package.json`에 아래의 `script`를 추가해주세요

```json
{
    "scripts":{
        "dev": "docker-compose up --build",
        "stop": "docker-compose down"
    }
}
```

이제 `npm run dev`를 입력하면 `docker-compose`를 통해 `image`가 생성되고 `container`까지 띄워집니다.


