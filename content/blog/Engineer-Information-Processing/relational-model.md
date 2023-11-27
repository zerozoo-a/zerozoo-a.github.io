---
title: Relational model
date: 2023-11-26 20:18:21
coverURL: https://images.unsplash.com/photo-1610547189313-1fbea2dcd059?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<br />
<br />
<br />

### Logical models
- <a href="/blog/Engineer-Information-Processing/Logical-Database-Design/">논리 데이터베이스의 설계</a>
  1. <a href="/blog/Engineer-Information-Processing/relational-model">Relational model: 관계 모델 ⭐️</a>

# Relational model

- 관계 모델은 논리 데이터베이스 설계시 가장 많이 사용되는 모델입니다.

- 실세계 데이터를 행과 열로 구성된 테이블 형태로 구성한 데이터 모델입니다.


## 관계 데이터 모델의 구성

- 관계 데이터모델은 데이터를 테이블의 형태로 표현합니다.

- 테이블은 논리 데이터베이스 -> 관계 데이터베이스 모델에서 릴레이션이라고 표현합니다. (Relation)

- 관계 데이터 모델은 데이터를 테이블(릴레이션)의 형태로 표현합니다. 각 테이블은 여러 행(튜플)과 열(속성)으로 구성됩니다.


### Relation 예시

#### 속성(열)
- 회원ID: 회원의 고유 식별자
- 이름: 회원의 이름
- 주소: 회원의 주소

#### Relation
| 회원ID | 이름    | 주소          |
|--------|-------|-------------|
| 101    | 김철수 | 서울시 강남구 |
| 102    | 이영희 | 서울시 서초구 |
| 103    | 박지민 | 부산시 해운대구|

릴레이션은 아래 5가지로 나뉩니다.

#### 릴레이션을 이루는 것들

- 각 행은 Tuple (튜플),
    - (101, 김철수, 서울시 강남구) = 튜플
- 각 속성은 Attribute (속성),
  - 회원ID = 속성
- 카디널리티
  - 튜플의 수는 <a href="/blog/MATHEMATICS/Algebraic/Sets/cardinality-of-sets/">카디널리티 = cardinality </a>라고 합니다.

    - 카디널리티란
      - 집합론에서, 집합의 크기 또는 농도는 집합의 "원소 개수"에 대한 척도이다. 유한 집합의 크기의 표현은 자연수로 충분하다. 임의의 집합의 크기는 단사 함수 및 전단사 함수를 통해 비교할 수 있으며, 기수로서 대상화할 수도 있다
    
    - 관계 데이터베이스 모델에서 카디널리티는 위 집합론에서의 의미와 같습니다. 
    
    릴레이션의 튜플의 수를 모두 구하면 그 것이 카디널리티의 값이 됩니다. 
    
    위의 예시로 카디널리티의 값은 3 입니다.
- 스키마(Schema)는 릴레이션의 구조를 설명합니다.
  - 릴레이션의 이름을 정의합니다.
  - 릴레이션의 속성의 이름과 타입을 정의합니다.
    - (회원ID = Integer, 이름 = String, 주소 = String) 

- 인스턴스(Instance)는 릴레이션에 실제 저장된 값들을 인스턴스라고 합니다. 
  - 클래스를 통해 실제 생성된 객체를 인스턴스라고도 합니다. 

## 관계 대수의 개념

테이블(relation)들을 수학적인 관점으로 본다면 집합이라고도 할 수 있습니다.

집합 연산자를 그대로 관계 모델 논리 데이터베이스 설계에 사용 할 수 있습니다.


### 종류
- 합집합: $\cup$
- 교집합: $\cap$
- 차집합: $A^c$
- 카티션 프로덕트

<a href="/blog/Engineer-Information-Processing/SQL-Cross-join/">카티션 프로덕트는 SQL cross join</a>의 개념입니다.

반대로 말하면 cross join은 카티션 프로덕트의 구현이라고 할 수 있습니다.

## 정리

- **관계 모델 데이터베이스**는 논리 모델에서 가장 많이 사용되는
모델입니다.

- relation은 테이블의 개념입니다.
- tuple은 테이블의 row의 개념입니다.
- attribute는 테이블의 column의 개념입니다.
- instance는 relation에 저장된 데이터입니다.
- 관계 대수로는 합집합($\cup$), 교집합($\cap$), 차집합($A^c$), 카티션 프로덕트가 있습니다.







