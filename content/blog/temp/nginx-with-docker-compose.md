---
title: nginx와 docker와 docker-compose의 기본 조합
date: 2024-02-22 23:35:45
coverURL: https://images.unsplash.com/photo-1524626625977-22112ef3c0ea?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<br />
<br />
<br />

# 목표
- `nginx`를 이용해 웹 서버를 생성해보자
- `docker`를 이용해 `nginx`를 말아보자
- `docker-compose`를 이용해 쉽게 `docker`를 사용해보자

- 목표를 통해 이루는 것: `docker`로 띄워진 `nginx` 서버를 이용해 `static file`을 `serve` 할 수 있다. 

## Setting

- 준비물
    - `docker`
        - `docker`가 설치 되어있어야 합니다. 
    - `docker-compose`
    - `nginx`는 `docker`에서 이미지로 받아 사용하기 때문에, `local`에선 굳이 설치 할 필요가 없습니다.
    - `linux 기반 pc (window는 잘 모르겠어요 죄송해요)`

- 프로젝트의 구조는 아래와 같습니다.
    ```sh
        .
    ├── Dockerfile
    ├── README.md
    ├── app
    │   ├── assets
    │   │   └── css
    │   │       └── styles.css // mime를 잘 받는지 테스트하기 위해
    │   ├── index.html  // root
    │   ├── pages // route를 테스트하기 위해
    │   │   ├── eng
    │   │   │   └── index.html
    │   │   ├── index.html
    │   │   └── kr
    │   │       └── index.html
    │   └── src
    │       └── package.json
    ├── docker-compose.yml
    └── nginx.conf
    ```

### 프로젝트 예시

이 프로젝트는 아래의 링크를 통해 clone 받을 수 있습니다.

```sh
git clone https://github.com/zerozoo-a/nginx-docker-setting-1
```

## Dockerfile을 정의하기

- 🐋: `docker`의 역할은 `nginx`와 `node.js`의 이미지를 가져와 일정한 `Container` 환경을 구축하는 것입니다.
이번 글에서 `node.js`를 적극 사용하지 않으나 프로젝트의 골자가 되어줄 `WAS`가 되어줄 것이기에 초반부터 `Dockerfile` 세팅이 섞어두는 것이 좋습니다.


```Dockerfile
# node.js image를 받아옵니다.
# 원하는 언어를 취향에 맞게 세팅해도 좋겠습니다.
FROM node:alpine as build-stage 

WORKDIR /app

COPY . .

# nginx를 세팅하기 위해 nginx를 가져옵니다.
FROM nginx:latest

# 루트에 nginx.conf 파일을 생성해주세요.
# image에서 기본 제공되는 nginx.conf를 덮어 씌울 것입니다.
# image에 있는 conf의 위치를 알 수 있습니다.
COPY nginx.conf /etc/nginx/nginx.conf

# nginx가 제공할 file들을 nginx/html로 복사합니다.
COPY --from=build-stage /app /usr/share/nginx/html

# 원하는 포트를 열어주세요 443은 https를 위해 열어줍니다.
EXPOSE 8080 443

# 이제 세팅이 끝났으니 nginx를 실행합니다.
CMD ["nginx", "-g", "daemon off;"]
```

`Docker`에는 정말 필요한 부분만 작성되어 있습니다.
`node.js` 환경을 설치했지만 따로 `node`를 사용하는 곳이 전혀 없는데요

하지만 `node` 자체는 설치되어 있으므로 이 프로젝트를 기반으로 `node`를 원하는대로 사용하면 됩니다.
`python`이 필요하다면 `python`을 설치하면 되겠습니다.

## docker-compose.yml 파일 정의하기

`docker-compose.yml` 파일은 `Dockerfile`을 원하는 옵션으로 실행시켜주기 위한 `config`가 설정되어 있습니다.
주석으로 각 용도를 간단히 설명했습니다.

```yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile # 읽어들일 Dockerfile
    ports:
      - "8080:8080"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro # conf의 위치 (ro = read only)
      - .:/usr/share/nginx/html # nginx가 가지고 있을 WAS의 위치
      # 환경변수 지정
    environment:
      - NODE_ENV=production

    command: ["nginx", "-g", "daemon off;"]
# 영구적으로 저장할 volume을 지정해주세요
volumes:
  app-data:
```


## nginx.conf 설정하기

- 작동원리를 이해하기 위해 기본적인 내용만 담겨있습니다.

```nginx.conf
http {
    include mime.types;

    server {
        listen 8080;
        root /usr/share/nginx/html/app;

        location /kr {
            root /usr/share/nginx/html/app/pages;
        }

        location /eng {
            alias /usr/share/nginx/html/app/pages;
        }
    }
}
```
- `include mime.types;`: `nginx`에서 데이터를 호출하는 경우 `http`에서 사용하는 `mime`가 필요합니다.
이를 넣어주지 않을 경우 모두 `plain/text`로 받아들이기 때문에 정상적인 데이터 호출이 불가능합니다. 꼭 넣어주세요.

- `server`: 서버는 `nginx`가 요청을 받았을 때 어떻게 처리했으면 좋을지에 대한 설정을 입력받습니다.
  - `listen`: `nginx`가 받아들일 `port`를 설정합니다. `8080` 포트로 요청을 보낼경우 `nginx`가 요청을 가져갑니다.
  - `root`: `nginx`가 바라볼 `root dir`입니다. 위에서 `docker`로 `WAS`를 옮긴 바로 그 곳입니다.
  - `location`: 해당 설정 내부에 `root`를 다시 설정하는 것을 볼 수 있습니다. `/pages/kr`로 요청시 `/pages/kr/index.html`을 반환합니다.


위 설정은 nginx의 이해를 위해 간단한 설정을 넣어본 것입니다.

실제 사용을 위한 config는 이정도로 턱없이 부족 할 것입니다.

## 사용해보기

docker가 준비된 환경에서 아래의 명령어를 통해 환경을 구성합니다.

```sh
git clone https://github.com/zerozoo-a/nginx-docker-setting-1
```

`clone` 받은 경로로 이동합니다.
`docker container app`을 실행해주세요.

`terminal`에 `docker-compose up`명령어를 입력해주세요.
`container`가 실행되면서 의존성이 설치됩니다.

`http://localhost:8080/`에 접속해보면 잘 접속되는 것을 확인해볼 수 있습니다.
`clone` 받은 파일의 `root/index.html` 파일을 수정 후 저장해보면 바로 바로 반영이 되는 것도 확인 할 수 있습니다.

## 정리하기

`docker, nginx, git`의 만만세입니다.

다음에 기회가 되면 node 기반의 front, backend project들을 docker로 말아두고
OCI에 배포해보겠습니다.

감사합니다.







