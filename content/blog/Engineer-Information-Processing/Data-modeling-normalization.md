---
title: 데이터 모델링 및 설계 - 정규화
date: 2023-11-30 23:00:49
coverURL: https://images.unsplash.com/photo-1604364409914-dd21eb8ed25c?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<br />
<br />
<br />

# 모델링에서 정규화에 대해 

DB 정규화는 데이터를 구조화하여 중복을 최소화하고
데이터 조작시 발생할 수 있는 오류와 데이터 중복을 방지합니다.

## 정규화의 단계

정규화는 1NF, 2NF, 3NF, BCNF, 4NF, 5NF 단계를 거칩니다.

  - NF = Normal Form

NF 단계는 테이블이 달성한 정규화 수준을 나타내는 척도를 말합니다.

### 제 1 정규형

1. 모든 필드의 값이 원자적이어야 합니다.
2. 각 레코드가 유일해야 합니다.
3. 테이블의 모든 컬럼은 중복되지 않고 단일 값을 가져야 합니다.

### 제 2 정규형

1. 1 NF를 만족합니다.
2. 모든 비주요 속성이 완전 함수적 종속을 이루어야 합니다.
  - 비주요 속성: 테이블의 기본키가 아닌 다른 모든 속성을 뜻합니다.
  - <a href="/blog/Engineer-Information-Processing/Dependent-attribute/">함수적 종속성: 하나의 속성이 다른 속성에 의해 결정되는 관계를 뜻합니다.</a>
3. 모든 비주요 속성이 기본키(PK)에만 의존합니다.

### 제 3 정규형

1. 2 NF를 만족합니다.
2. <a href="/blog/Engineer-Information-Processing/transitive-dependency/">모든 비주요 속성이 이행적 종속성을 갖지 않아야 합니다. (transitive-dependency)</a>
3. 비주요 속성이 다른 비주요 속성을 의존하지 않아야 합니다.

