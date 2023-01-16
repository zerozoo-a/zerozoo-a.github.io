---
layout: post
title: mysql docker container를 원하는 대로 수정하기
date: 2023-01-17 01:44 +0900
---
<img src="https://images.unsplash.com/photo-1613690399151-65ea69478674?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80" alt="container with big ship">
# 컨테이너로 분리된 환경을 만들어 마구 db를 쑤셔보기

<!--break-->
## index 
- [컨테이너로 분리된 환경을 만들어 마구 db를 쑤셔보기](#컨테이너로-분리된-환경을-만들어-마구-db를-쑤셔보기)
  - [index](#index)
  - [](#)
  - [문제](#문제)
  - [풀이](#풀이)
  - [microdnf](#microdnf)
  - [github의 특정 레포의 특정 파일을 다운로드 받는 방법](#github의-특정-레포의-특정-파일을-다운로드-받는-방법)
  - [recap](#recap)

<br>
--- 
## 문제 
--- 

랩탑에 db를 설치하고 세팅하는 것은 아주 귀찮은 일입니다.
또한 각 디비가 점유하는 고유의 포트번호는 그 자리값이 비쌉니다 3306은
항상 mysql이 차지해야 마음이 편합니다.


하지만 mysql을 연습용으로 깔끔한 상태로 띄우고 싶다면 어떻게 해야 할까요?

당연히 도커나 vm를 띄워야 할 것입니다. 현대적으로 도커를 통해 mysql 이미지를 다운 받고
페도라(현재 최신 os 페도라더라구요) os에 bash로 접근한 경우를 가정합시다.

> 해당 도커의 운영체제를 알아내는 방법
`cat /etc/*-release`


제가 필요한 것은 아래와 같습니다.
- vim
- git
- mysql 샘플 sql 파일

이제 위 문제를 풀어봅시다.

<br>
<br>

## 풀이 
--- 

## microdnf

최신의 페도라에서는 dnf가 아닌 microdnf를 사용합니다. 더 빨라지고 좋아졌다고 하는데
제 관심사는 아닙니다.

아무튼 microdnf는 페키지 매니저 같은 친구입니다. 다른 os의..brew나 wget, apt-get
같은 존재라고 이해하면 바로 사용법이 떠오를 것입니다.


microdnf update로 한번 최신화를 해주고 원하는 프로그램을 다운받읍시다.

```bash
microdnf install vim
microdnf install git
```
## github의 특정 레포의 특정 파일을 다운로드 받는 방법
원하는 파일의 raw 주소로 들어간 후 해당 주소를 통해 다운로드

```bash
curl https://raw.githubusercontent.com/datacharmer/test_db/master/employees.sql -o employees.sql
```
emloyees.sql이 다운로드 받아짐
위 링크는 특정 레포의 특정 파일의 raw 파일 접근 url임

-o 는 output이고 인자로 파일 이름과 확장자를 받습니다.

그런데 이런 방법보다는 git을 받았으니 clone을 받아 mysql에 import 하는게 편합니다.


mysql에 들어간 후

```sql
USE emloyees

source ./employees.sql
```

위와 같이 import가 되었다면 db는 준비가 완료 되었습니다.

컨테이너에서 ctrl + z를 누르면 원래 os로 돌아오게 되고
fg로 다시 컨테이너로 돌아갈 수 있습니다.


이제 분리된 환경의 db를 통해 마음껏 연습하고 개발하세요. 포트넘버로 부터 자유로워 진 것은 덤입니다.
<br>
<br>

## recap 
--- 

위 과정은 매우 번거롭기 때문에 docker commit을 통해 현재 내용을 image로 떠놓으십시오

이 과정은 저장하지 않으면 모두 삭제됩니다.
<br>
<br>
