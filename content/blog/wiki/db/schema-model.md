---
title: schema model
date: 2023-10-04 22:13:05
coverURL: https://images.unsplash.com/photo-1583361704493-d4d4d1b1d70a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80
---
<br />
<br />
<br />

# DB에서의 schema와 model

## schema 스키마

스키마는 데이터베이스 테이블의 명세를 기술한 데이터입니다.

user라는 테이블을 생성하는 경우 해당 테이블에는
- 문자열 20자, user_name
- 숫자 4자리 age

등과 같은 정보가 필요합니다. 이런 정보를 정의한 것을 스키마라합니다.

## model 모델

모델은 데이터베이스의 특정 테이블과 테이블에 있는 컬럼들의 형태를 정의한 클래스입니다.
user 테이블에 대해 모델을 만든다면 User 클래스를 만들고, 변수로 String userName, int age를 선언해야 합니다.

