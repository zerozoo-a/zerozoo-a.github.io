---
layout: post
title: web-component와 nunjucks의 조합
date: 2023-02-02 23:15 +0900
---
# web component 웹컴포넌트와 nunjucks의 조합
<img src="https://images.unsplash.com/photo-1516547375098-9efa2ae4f0c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80" loading="lazy">
<a href="https://unsplash.com/ko/%EC%82%AC%EC%A7%84/8hILOCKw5yA">SOURCE</a>


<!--break-->
## index 
--- 
- [web component 웹컴포넌트와 nunjucks의 조합](#web-component-웹컴포넌트와-nunjucks의-조합)
  - [index](#index)
  - [문제](#문제)
  - [풀이](#풀이)
  - [recap](#recap)

<br>

## 문제 
--- 
zero config를 주창하던 그 많던 라이브러리들은 왜 이렇게 쓰기 어려운가
<br>
<br>

## 풀이 
--- 
typescript의 등장으로 안전해진 개발 문화는 놀랍고 감사할 따름이다.

하지만 이런 저런 js 진영은 지각변동이 숨쉬듯 일어나고 최근에는 클라이언트와 서버를 종횡무진 오가는 등 양쪽에서 이런 저런 일을 하곤 한다.

나 또한 개인 프로젝트에서는 js만으로 양쪽을 모두 처리하고 있다.

하지만 node와 web은 비슷하면서도 분명한 차이점을 가진다.

여기에 typescript와 빌드, 번들링 버저닝, 수 많은 라이브러리들과의 호환성 등을 생각하면 벌써부터 어지럽다.


~~답은 어쩌면 `flow`였을지도 모르겠다. 아니..? `php`일지도~~

아무튼 주제로 돌아와서 nunjucks와 web component의 조합이다.


우선 본인의 토이 프로젝트를 만들면서 짜낸 괴상한 조합이긴 하지만 나름 마음에 들어 이 곳에 남긴다.

구성에 이어 순서를 설명한다.

구성은 이러하다.

1. express는 view 엔진으로 nunjucks를 사용한다.
2. nunjucks는 화면의 layout을 담당한다.
3. web component는 화면의 component를 담당한다.

web component의 라이브러리로 유명한 애들은 lit이나 github 자체에서 사용하는 카탈리스트 등이 있다.

하지만 이런걸 필요로 느끼지 못해 사용하지 않을 것이다. (typescript를 변환하고 다시 mjs로 넣고 하는 과정이 너무 피곤하다.)

순서는 이러하다.

1. 유저는 express에 화면에 대한 요청을 던진다.
2. express는 적절히 라우팅하여 반환할 때, 화면에서 사용 할 `component`이름과 필요에 따라 db에 쿼리를 날려 값을 정제해 view 엔진인 nunjucks에 던져준다.
3. `component`이름을 받아 static file에서 component들을 import하고 해당 component들을 사용하여 화면을 구성하고 함께 받은 쿼리의 결과값으로 화면을 그린다.

보통은 모두 nunjucks를 통해 화면을 그려 끝낼 수 있다.

하지만 web component를 사용하는데는 확실히 분리된 namespace 환경과 재활용 가능한 component의 특성을 통해 화면을 구성 할 수 있고 server 측의 리소스를 갉아먹지 않고 유저에게 연산을 위임할 수 있다.

nunjucks로 macro 기능을 통해 ui를 모듈화 할 수 있고 이 또한 좋은 기술이다.

이를 적절히 섞어 쓰면 더 좋은 시너지가 날 수 있을 것이다.


코드는 대략 아래와 같다.

```js
    {# custom-element, current-time #}
        {% for component in components %}
        {{ component| safe }}
        {% endfor %} {# nunjcks + express를 통해 js 파일들을 import 하고 있다. #}

    <div>hello this is home!</div>
    <custom-element></custom-element> <!-- import된 값들을 통해 web component를 그린다.-->
    <current-time></current-time>
```


<br>
<br>

## recap 
--- 

사실 nunjucks고 web component고 모두 비주류이다. ~~현재 한국에서는~~

그럼에도 이런 삽질을 하는 이유에는 front end의 모바일 app이 번들링과 code splitting, tree shaking, server side render, server component 등을 통해 진화하고 있는 모습을 보자면 이건 그냥 php랑 rails가 하던게 아닌가? 라는 생각이 들어서이다.

<br>
<br>