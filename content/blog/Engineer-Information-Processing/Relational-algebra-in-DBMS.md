---
title: 관계 데이터베이스 모델 순수 관계 연산자
date: 2023-11-29 22:04:06
coverURL: https://images.unsplash.com/photo-1549116259-d4967e8f8863?q=80&w=2890&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<br />
<br />
<br />

# 순수 관계 연산자란?

RDB에서 데이터를 조작하고 쿼리하는데 사용되는 연산자를 의미합니다.

주요 순수 관계 연산자 6 가지를 알아보겠습니다.

1. 선택 연산자: σ (Sigma)
  - 조건에 맞는 튜플(레코드)을 선택합니다.
    - "남자에 안경을 쓴 사람"의 조건을 만족하는 튜플을 선택할 때 사용됩니다.
2. 프로젝션 연산자: π (Pi)
  - 하나 이상의 속성을 선택해 새로운 릴레이션(테이블)을 생성합니다. 
    - "이름과 부서ID만을 선택"할 때 사용됩니다. 
3. 교집합 연산자: ∩ (Cap)
  - 두 개의 릴레이션 간 공통된 튜플을 찾아 반환합니다.
    - MYSQL 기준 INNER JOIN 연산자
4. 합집합 연산자: ∪ (Cup)
  - 두 개의 릴레이션을 합쳐서 중복을 제거하고 모든 튜플을 반환합니다.
    - MYSQL 기준 UNION 연산자
    - 합집합 연산자를 사용 할 때 각 SELECT 문의 열 수 와 데이터 유형이 동일해야 합니다.
5. 차집합 연산자: - (Minus)
  - 첫 번째 릴레이션에서 두 번째 릴레이션의 튜플을 제외한 결과를 반환합니다. 
6. <a href="/blog/Engineer-Information-Processing/relational-model/">카티션 곱: x (Cross)</a>
  - 카티션 곱 = 카티션 프로덕트 = Cartesian Product
  - 두 개의 릴레이션을 모든 가능한 조합으로 조합해 새 릴레이션을 생성합니다.



## 선택 연산자: σ (Sigma)

선택 연산자는 **WHERE**절에 속합니다.
조건에 맞는 튜플을 선택하기 위해선 WHERE절을 사용하는데 바로 이 것이 선택 연산자
**σ (Sigma)입니다.**

```sql
SELECT *
FROM TABLE1
WHERE age > 18;
```

## 프로젝션 연산자: π (Pi)

프로젝션 연산자는 SQL에서 "선택"을 한다고 했습니다.
특정 column을 선택하고 다른 column을 무시하므로 **SELECT**연산자에 해당합니다.

```sql
SELECT 이름
FROM TABLE1
WHERE age > 18;
```

## 교집합 연산자: ∩ (Cap)

교집합 연산자는 INNER JOIN을 통해 교집합을 얻을 수 있습니다.
조인의 조건에 따라 공통된 값을 가진 행만을 반환합니다.
 - INNER JOIN은 MYSQL에서 INNER를 생략하고 JOIN으로 사용 할 수 있습니다.

#### 테이블 1: 직원
| 직원ID | 이름     | 부서ID |
|--------|---------|--------|
| 1      | 홍길동   | 101    |
| 2      | 이순신   | 102    |
| 3      | 강감찬   | 103    |

#### 테이블 2: 부서
| 부서ID | 부서명       |
|--------|-------------|
| 101    | 개발         |
| 102    | 마케팅       |
| 104    | 인사         |


위 두 테이블을 부서ID로 INNER JOIN 해보겠습니다.

```sql
SELECT *
FROM 직원
INNER JOIN 부서
ON 직원.부서ID = 부서.부서ID
```
#### 결과 테이블
| 직원ID | 이름     | 부서ID | 부서명   |
|--------|---------|--------|---------|
| 1      | 홍길동   | 101    | 개발    |
| 2      | 이순신   | 102    | 마케팅 |


## 합집합 연산자: ∪ (Cup)

합집합 연산자는 UNION 연산자로 표현 할 수 있습니다.
합집합은 집합 연산의 합집합의 그것과 같습니다.

테이블 두 개를 합집합 연산을 해보겠습니다.

**직원 테이블 (employees):**

| 직원ID | 이름     | 직급    |
|--------|---------|---------|
| 1      | 홍길동   | 관리자  |
| 2      | 이순신   | 직원    |
| 3      | 강감찬   | 직원    |

**계약직 테이블 (contractors):**

| 계약직ID | 이름    | 직급    |
|----------|---------|---------|
| 101      | 박재영 | 계약직  |
| 102      | 김민정 | 계약직  |
| 103      | 정성훈 | 계약직  |


```sql
SELECT 직원ID, 이름, 직급
FROM employees
UNION
SELECT 계약직ID, 이름, 직급
FROM contractors;
```

| 직원ID | 이름     | 직급    |
|--------|---------|---------|
| 1      | 홍길동   | 관리자  |
| 2      | 이순신   | 직원    |
| 3      | 강감찬   | 직원    |
| 101    | 박재영 | 계약직  |
| 102    | 김민정 | 계약직  |
| 103    | 정성훈 | 계약직  |

이렇게 두 테이블의 데이터가 하나의 결과로 합쳐졌습니다.


## 차집합 연산자: - (Minus)

차집합 연산자는 두 결과집합에서 첫 번째 집합에만 있는
항목을 선택하는 연산으로 데이터베이스에서 두 테이블의 데이터를 비교,
두 번째 테이블에는 없고 첫 번째 테이블에만 잇는 행을 가져옵니다.

직원 테이블과 이직한 직원 테이블이 있을 때,
직원 테이블에서 이직한 직원 테이블의 차집합을 구해보겠습니다.

**직원 테이블 (employees):**

| 직원ID | 이름     | 부서 |
|--------|---------|------|
| 1      | 홍길동   | 개발 |
| 2      | 이순신   | 마케팅 |
| 3      | 강감찬   | 영업 |
| 4      | 김철수   | 개발 |
| 5      | 박지영   | 인사 |

**이직한_직원 테이블 (former_employees):**

| 직원ID | 이름     | 부서 |
|--------|---------|------|
| 2      | 이순신   | 마케팅 |
| 5      | 박지영   | 인사 |
| 6      | 정미영   | 영업 |


쿼리는 아래와 같이 선택 할 테이블을 앞에
빼줄 테이블을 **MINUS** 연산자 뒤에 둡니다.

```sql
SELECT 직원ID, 이름, 부서
FROM employees
MINUS
SELECT 직원ID, 이름, 부서
FROM former_employees;
```

결과는 다음과 같습니다

| 직원ID | 이름     | 부서 |
|--------|---------|------|
| 1      | 홍길동   | 개발 |
| 3      | 강감찬   | 영업 |
| 4      | 김철수   | 개발 |

## 카티션 프로덕트 : x (Cartesian Product)

<a href="/blog/Engineer-Information-Processing/relational-model/">카티션 곱: x (Cross)</a>에 대한 설명은 해당 링크로 대체합니다.

## 정리

DBMS에서 사용되는 순수 관계 연산자를 알아봤습니다.

Relational algebra로 수학에서 사용되는 집합간 연산의 그 것을
RDB로 사용하는 느낌으로 바라보면 될 것 같습니다.