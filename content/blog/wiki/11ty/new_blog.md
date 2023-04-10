---
title: 11ty를 통해 블로그를 새로 단장하기
date: 2023-03-28
---

{% image "./possum.png", "A possum parent and two possum kids hanging from the iconic red balloon" %}

jekyll은 충분히 훌륭한 정적생성기이지만..

💎 루비도 아주 좋은 언어이지만.. 내 숙련도가 부족하고 해당 언어의 환경을 능숙하게
또 지속적으로 그 언어를 사용 할 여건이 되질 않아 늘 불만이 존재했다.


이번에 javascript 기반의 정적생성기로 블로그를 전환하면서 해당 내용을 정리한 한글 블로그가
눈에 띄질 않아 정리해보기로 했다.


GH-Pages에 11ty SSG 블로그를 올리려면..

1. 우선 적당히 github repo를 생성해줍니다.

2. 자신의 repo에서 settings에 들어갑니다.

3. 좌측의 pages 메뉴를 클릭하면 github pages에 대한 config를 할 수 있습니다.

4. Source를 눌러 deploy from a branch로 변경합니다.

5. branch는 gh-pages로 변경 폴더는 root로 둡시다.

이게 기본적인 github의 세팅입니다.

11ty의 세팅은 

1. eleventy.config.js의 pathPrefix에 자신의 브랜치 이름을 적어주는 것입니다.
2. 그리고 모든 링크의 href에 대해 `url` 필터를 추가해줍시다.


만약 본인이 생성한 브랜치가 특별한 브랜치인 github.io라고 한다면 pathPrefix를 굳이 해줄 필요가 없습니다.

기본적으로 빌드와 배포는 github actions를 통해 이루어집니다.

```yml
name: Build Eleventy # /root/.github/worflows/build.yml

on:
  push:
    branches:
      - main # 원하는 브랜치를 선택해주세요

jobs:
  build:
    runs-on: ubuntu-latest # 높은 버전을 씁시다.

    strategy:
      matrix:
        node-version: [19.x] # 마찬가지로 높은 버전이 좋겠습니다.

    steps:
      - uses: actions/checkout@v3 # 높은 버전을 써줍시다.

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}

      - name: Install dependencies & build # yarn을 쓰던 pnpm을 쓰던 상관 없겠죠?
        run: |
          npm ci 
          npm run build-ghpages          

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          publish_dir: ./_site # 원하는대로 빌드 결과물이 생성 될 곳을 정해주세요
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

이제 11ty 사이트에 방문해 적당한 starter project를 클론 받아와 올려줍니다.

방금 생성한 repo에 올리면 됩니다 
클론받은 프로젝트마다 약간의 차이점이 존재하게 됩니다.

## 11ty
11ty는 jekyll의 node.js 버전이라고 생각하면 좋다.
hugo 또한 비슷하다.

## deploy 
gh-pages를 통해 내보낸다.



## jekyll에 비해 장점
장점은 node.js를 사용할 수 있다는 점이다.
js npm 생태계를 좀 더 활용 할 수 있다.

## jekyll에 비해 단점
커뮤니티나 역사가 오래되질 못하고 docs가 부실하다는 점이다.
튜토리얼이 많이 부족해보이고 지속적인 관리가 될지 의문이다.
회사가 붙어서 이를 체계적으로 강하게 관리해주지 않으면 jekyll + ruby3로 다시 갈아탈지도 모르겠다..


