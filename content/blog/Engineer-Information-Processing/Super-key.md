---
title: Database에서 Super key에 대해
date: 2023-12-02 12:29:17
coverURL: 
---
<br />
<br />
<br />

# Super Key란?

super key는 테이블의 각 행(레코드)을 고유하게 식별 할 수 있는 하나 이상의 속성(열, attribute)의 조합입니다.
테이블에서 각 행을 유일하게 식별하는 데 필요한 모든 정보를 포함합니다.


## 특징
1. unique(유일성): super key는 모든 행을 유일하게 식별 할 수 있기 때문에 unique합니다.
2. redundancy(과잉성): super key는 필요 이상의 속성을 포함할 수 있기 때문에 최소성을 만족하지 않을 수 있습니다.

### 유일성의 예

| 학생 ID | 이름   | 연락처          | 주소          |
|---------|------|---------------|-------------|
| 001     | 김영희 | 010-1234-5678 | 서울시 강남구 |

위 테이블에서
학생 ID는 Super key이자 Primary key입니다. 이는 유일성을 가지는 key입니다.

### 과잉성의 예

| 학생 ID | 이름   | 연락처          | 주소          |
|---------|------|---------------|-------------|
| 001     | 김영희 | 010-1234-5678 | 서울시 강남구 |
| 002     | 이철수 | 010-2345-6789 | 부산시 해운대구 |
| 003     | 박지민 | 010-3456-7890 | 대구시 중구    |

위 테이블에서 과잉성의 예를 위해 
학생 ID, 이름, 연락처, 주소를 super key로 잡아보겠습니다.

(당연하게도 학생 ID만으로 각 튜플을 조회 가능합니다.)

```sql
SELECT * FROM Students
WHERE StudentID = '001' AND Name = '김영희' AND Contact = '010-1234-5678' AND Address = '서울시 강남구';
```
이렇게 분별을 위해 과잉하게 key를 잡는 것을 의미합니다.

## 다른 키와의 관계

- Candidate Key: Super key에서 불필요한 속성을 제거, 최소성을 만족하는 key를 Candidate key라고 합니다.
테이블을 유일하게 식별할 수 있는 가장 작은 속성의 집합입니다.
  - 그냥 key라고도 합니다.  

- Primary Key: Candidate Key에서 선택된 주 Key입니다. 각 행을 고유하게 식별하는데 사용됩니다.

key들의 관계를 정리하면 아래와 같습니다.

$$
Primary Keys ⊆ Candidate Keys ⊆ Super Keys
$$


## 결론

super key에 대해 알아봤습니다.

Primary keys는 Candidate keys의 부분집합이다.
Candidate keys는 Super keys의 부분집합이다.
