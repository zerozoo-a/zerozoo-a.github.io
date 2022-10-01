---
layout: post
title: Intellij jdk module 설정하기
date: 2022-09-09 00:07 +0900
categories: [config]
tags: [jdk, intellij, lein]
---

제 pc는 이상하게도 lein을 통해 clojure project를 생성한 경우
intellij에서 jdk를 스스로 찾지 못합니다.

그래서 설정하는 방법을 기록해둡니다.

intellij에서 `command + ;`를 통해 Project Structure 화면을 엽니다.
![Project-Structure](https://user-images.githubusercontent.com/80259925/189159323-e53e048f-b95f-44b0-b955-13778a172eb0.png)

[크게보기](https://user-images.githubusercontent.com/80259925/189159323-e53e048f-b95f-44b0-b955-13778a172eb0.png)

이제 원하는 버전을 세팅해주면 됩니다.
