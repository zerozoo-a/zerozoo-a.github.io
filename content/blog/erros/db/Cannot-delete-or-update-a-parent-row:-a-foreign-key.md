---
title: Cannot delete or update a parent row a foreign key
date: 2023-10-11 22:21:53
coverURL: https://images.unsplash.com/photo-1515444029923-60569d238ec5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80
---
<br />
<br />
<br />

## 문제
`Cannot delete or update a parent row: a foreign key``

table의 row를 지우려고 하는 경우 위 에러가 발생 할 수 있다.

## 원인 

연결된 fk가 있기 때문에 지울 수 없다는 것입니다.
따라서 지우려는 연결된 테이블의 데이터를 먼저 지워주세요
