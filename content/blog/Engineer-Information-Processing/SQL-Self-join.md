---
title: SQL Join의 Self Join에 대해
date: 2023-11-27 21:45:56
coverURL: https://images.unsplash.com/photo-1620416265040-cc777cad1883?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<br />
<br />
<br />


## 논리적 joins

논리적 join은 크게 아래의 네 가지로 나뉘어집니다.
오늘은 이 중에서 Cross Join에 대해 알아보겠습니다.

1. <a href="/blog/Engineer-Information-Processing/SQL-Inner-join/">Inner Join</a>
2. <a href="/blog/Engineer-Information-Processing/SQL-Outer-join/">Outer ️Join</a>
3. <a href="/blog/Engineer-Information-Processing/SQL-Cross-join/">Cross Join </a>
4. <a href="/blog/Engineer-Information-Processing/SQL-Self-join/">Self Join ⭐</a>


# Self Join이란

Self Join은 단일 테이블을 자기 자신과 조인하는 것을 의미합니다.

- 조인은 Binary Operation입니다. 즉 피연산자가 둘이 필요합니다.
- Inner, Outer, Cross는 모두 각각 서로 다른 테이블을 두 개 사용해 하나의 조인된 결과를 만들었습니다.
- Self Join은 테이블 하나로 조인합니다.


## 테이블 하나로 조인하는 방법

하나의 테이블로 자기 자신과 조인하는 방법은

하나의 테이블에 별칭을 붙여 두 번 참조하는 것으로 Binary Operation인 join을 수행합니다.

### 예시

아래와 같은 직원 테이블이 있습니다.

#### 직원 테이블
| 직원ID | 이름     | 상사ID |
|--------|---------|--------|
| 1      | 노튼 소장 | NULL   |
| 2      | 캡틴 해들리 | 1      |
| 3      |  레드 레딩 | 1      |
| 4      | 앤디 | 2      |

상사ID와 직원ID는 서로 관련된 행입니다.
직원은 상사ID를 속성으로 가지며 상사는 직원ID를 속성으로 갖습니다.
튜플의 상사ID가 NULL인 경우 상사가 없는 것을 의미합니다.

#### SQL 쿼리 (Self Join)
```sql
SELECT A.이름 AS 직원, B.이름 AS 상사
FROM 직원 A # Alias 직원 테이블 = A
JOIN 직원 B ON A.상사ID = B.직원ID; # Alias 직원 테이블 = B
```

위 쿼리를 통해 하나의 테이블로 조인을 할 수 있습니다.

#### 결과
| 직원   | 상사   |
|-------|-------|
| 캡틴 해들리 | 노튼 소장 |
| 레드 레딩 | 노튼 소장 |
| 앤디 | 캡틴 해들리 |

직원 테이블을 A, B로 한 쿼리에서 두 번 참조함으로써
join의 테이블 두 개 참조 조건을 달성했습니다.

## 사용례

같은 테이블을 두 번 참조하는 self join은 아래와 같은 용도로 사용됩니다.

- 위의 예와 같이 테이블 내에서의 연관 관계를 확인하는 용도,
혹은 데이터 분석등을 위해 사용합니다.

- 동일한 테이블 내의 행들을 서로 비교할 때 사용합니다.
같은 테이블 내 다른 행들의 데이터 값을 비교해 차이점을 찾을 수 있습니다.


## Alias 별칭

아래 쿼리에서 별칭을 부여하는 방식에 대해 알아보겠습니다.

```sql
SELECT A.이름 AS 직원, B.이름 AS 상사
FROM 직원 A
JOIN 직원 B ON A.상사ID = B.직원ID;
```

직원이라는 하나의 테이블에서 A, B로 별칭을 붙여주었는데요

별칭이 붙은 포인트를 짚어보겠습니다.

```sql
...
FROM <테이블명> A
JOIN <테이블명> B ...
```

별칭을 붙일 테이블의 이름을 FROM과 JOIN 뒤에 붙이고
별칭을 붙여줍니다.

이 외에도 AS 등의 키워드로 참조를 하는 등의 방법이 있습니다.

## 정리

- self join은 하나의 테이블을 별칭을 통해 두 개의 테이블인 것 처럼
join하는 것입니다.
- 다른 테이블과 조인하지 않아 쿼리는 간소화됩니다.
- 여러 테이블에 데이터를 중복 저장하지 않습니다. (왜나면 이미 하나거든요!)
- 동일한 테이블 내에서 행들을 서로 비교하는 경우 유용합니다.
