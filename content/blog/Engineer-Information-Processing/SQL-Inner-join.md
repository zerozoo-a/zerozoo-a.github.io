---
title: SQL Join의 Inner Join에 대해
date: 2023-11-22 23:36:25
coverURL: https://images.unsplash.com/photo-1536700106091-24e6057a6fb0?q=80&w=2860&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<br />
<br />
<br />

## 논리적 joins

논리적 join은 다시 아래의 네 가지로 나뉘어집니다.
오늘은 이 중에서 Inner Join에 대해 알아보겠습니다.

1. <a href="/blog/Engineer-Information-Processing/SQL-Inner-join/">Inner Join ⭐</a>
2. <a href="/blog/Engineer-Information-Processing/SQL-Outer-join/">Outer Join ️</a>
3. <a href="/blog/Engineer-Information-Processing/SQL-Cross-join/">Cross Join </a>
4. <a href="/blog/Engineer-Information-Processing/SQL-Self-join/">Self Join </a>


# Inner Join

내부조인은 두 테이블을 결합해 하나의 조인된 결과를 반환합니다.

두 테이블이 조인 될 때, **일치하는 값들만을 포함**합니다.


## join이란

- RDB에서 join이란 정규화로 인해 나뉘어진 테이블에 대해 쿼리시
마치 하나의 테이블에서 데이터를 뽑아오듯이 테이블을 이어주는 역할을 한다.

   - 정규화란 데이터베이스 설계에서 중복을 최소화하고 무결성을 지키기 위해 데이터 구조를 조정한 것을 의미함


## join의 종류

join은 크게 두 가지로 나뉘어진다.

1. 논리적 join
2. 물리적 join

#### 내부 join: Inner join

내부 join은 두 테이블의 공통된 column을 기준으로 데이터를 결합합니다.

아래의 직원, 부서 테이블은 서로 공통된 column인 부서ID column이 있습니다.

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

두 테이블을 공통 column인 부서ID로 내부 Join(Inner Join)해보겠습니다.

```sql
SELECT 직원.직원ID, 직원.이름, 부서.부서명
FROM 직원
INNER JOIN 부서 ON 직원.부서ID = 부서.부서ID;
```

결과는 아래와 같습니다.

#### Inner Join 결과: 직원과 부서의 내부 조인
| 직원ID | 이름     | 부서명   |
|--------|---------|---------|
| 1      | 홍길동   | 개발     |
| 2      | 이순신   | 마케팅   |



## 마치며

join의 종류는 상당히 많고 깊이 들어가면 한도 끝도 없으므로 Inner Join에 대해서만 간단히
알아봤습니다.

하나의 article로 끝내기보단 join 중에서 논리, 물리 join을 하나씩 알아보도록 하겠습니다.
