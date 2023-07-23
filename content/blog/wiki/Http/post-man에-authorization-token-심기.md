---
title: post man의 header 다루기
date: 2023-07-23 00:58:53
coverURL: https://images.unsplash.com/photo-1575895901610-ae6503f60136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80
---

<a href="https://images.unsplash.com/photo-1575895901610-ae6503f60136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=928&q=80">이미지 출처</a>

<br />
<br />
<br />

> postman에서 header를 다루어보자

## postman이란?

postman은 각종(http를 포함한) 통신들을
쉽게 다루고 저장, 공유등을 도와주는 소프트웨어입니다.

<a href="https://www.postman.com/">postman site</a>

## header란?

HTTP 헤더는 클라이언트와 서버가 요청 또는 응답으로 부가적인 정보를 전송할 수 있도록 해줍니다.

## 필요한 이유

비즈니스로직이 복잡해질 수록 헤더에는 이런저런 정보들이 올라가게 됩니다.

특정 상황이 될수록 http 통신이 이루어지는 state를 재구현하기 힘든 경우가 생겨나게됩니다.

## 하는 법

아래의 이미지를 보시면 http 통신에 사용되는 옵션들을 설정할 수 있습니다.

{% image "../images/request_1.png", "postman request" %}

Authorization 옵션을 선택합니다.
본인의 환경에 맞는 방법을 선택해주세요

{% image "../images/autho_1.png", "postman Authorization setting" %}

예시로 token을 선택해봅시다. 
{% image "../images/token.png", "postman Authorization setting" %}
토큰의 경우 서버측에서 사용하는 스펙을 알고있다면 더욱 좋습니다.

## 정리

postman은 보통 서버측에서 사용하는 경우가 많습니다.

하지만 클라이언트 측에서도 그 활용도는 막강합니다.
이런 단순 요청 저장이외에도 응답받은 데이터를 그대로 로컬에 저장 할 수도 있습니다.
workspace를 통해 동료와 함께 사용한다면 그 효용성이 더욱 좋을것입니다.