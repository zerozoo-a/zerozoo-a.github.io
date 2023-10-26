---
title: DDL DML DCL
date: 2023-10-26 21:54:45
coverURL: 
---
<br />
<br />
<br />



## DDL (Data Definition Language)

데이터베이스를 정의하는 언어,

데이터를 생성, 수정, 삭제하는 등 전체의 구조를 결정하는 역할을 하는 언어
예를 들어 아래의 명령어들입니다.

- CREATE TABLE (생성)
- ALTER TABLE (수정)
- DROP TABLE (삭제)

## DML (Data Manipulation Language)

정의된 데이터베이스에 입력된 레코드를 조회, 수정, 삭제하는 등의 역할을 하는 언어


예를 들어 아래의 명령어들이 DML에 해당합니다.

- SELECT
- INSERT
- UPDATE
- DELETE


## DCL (Data Control Language)

접근 권한과 보안등을 다룹니다.

예를 들면 아래의 명령어들이 DML에 해당합니다.

- GRANT
- REVOKE

모두 구분 없이 사용하다가 이제보니 오 그렇네 하는 느낌이 옵니다.

- DML의 예제
```sql
SELECT * FROM users WHERE age > 1;

INSERT INTO users (age, name) VALUES (1, 'john doe');
```

- DDL의 예제
```sql
CREATE TABLE users (id INT, age INT, name VARCHAR(30));

ALTER TABLE stores ADD COLUMN location_number INT;
```


- DCL의 예제

```sql
GRANT SELECT ON table_name TO username;
GRANT SELECT ON table_name FROM username;
```