---
title: 데이터베이스 필드의 값이 원자적이여야 하는 이유
date: 2023-12-02 11:44:34
coverURL: 
---
<br />
<br />
<br />

# 정규화의 원자성

정규화의 1NF에서 DB의 속성값은 원자성을 가져야 한다는 말이 나옵니다.

## 원자성이란

원자성은 테이블의 속성값이 원자적이여야 한다는 말입니다.

이는 테이블을 보면 바로 이해 할 수 있습니다.

#### 원자성을 지키지 않는 테이블
| 이름   | 등록번호         | 주소                | 성별 | 나이 | 연락처                |
|------|---------------|-------------------|----|-----|-------------------|
| 김민수 | 900101-1****** | 서울시 강남구         | 남  | 30  | 010-1234-5678, 02-1234-5678 |

주민 테이블이 있고 테이블에는 연락처 속성이 있습니다. 
테이블의 연락처에는 김민수씨의 휴대전화 번호와 집 전화번호가 함께 들어있습니다.

이는 원자성을 지키지 않은 테이블입니다.

---

#### 원자성을 지키는 테이블
| 이름   | 등록번호         | 주소                | 성별 | 나이 |  휴대전화               | 집전화|
|------|---------------|-------------------|----|-----|-------------------|---|
| 김민수 | 900101-1****** | 서울시 강남구         | 남  | 30  | 010-1234-5678 |02-1234-5678|

연락처 속성을 나누어 휴대전화, 집전화로 분리했습니다.

이제 각 필드는 고유하며 원자성을 가집니다.

