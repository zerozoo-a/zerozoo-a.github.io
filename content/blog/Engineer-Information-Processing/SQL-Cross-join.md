---
title: SQL cross join
date: 2023-11-24 21:56:29
coverURL: https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<br />
<br />
<br />

## 논리적 joins

논리적 join은 다시 아래의 네 가지로 나뉘어집니다.
오늘은 이 중에서 Cross Join에 대해 알아보겠습니다.

1. <a href="/blog/Engineer-Information-Processing/SQL-Inner-join/">Inner Join</a>
2. <a href="/blog/Engineer-Information-Processing/SQL-Outer-join/">Outer ️Join</a>
3. <a href="/blog/Engineer-Information-Processing/SQL-Cross-join/">Cross Join ⭐</a>
4. <a href="/blog/Engineer-Information-Processing/SQL-Self-join/">Self Join </a>

# Cross Join

Cross Join은 두 테이블 간 가능한 모든 조합을 생성하는 Join입니다.

교차 조인은 테이블 간 일치 조건을 기반으로 조인하지 않습니다.
첫 번째 테이블과 두 번째 테이블의 모든 행을 조합해 결과를 생성합니다.

## 교차 조인: Cross Join

교차 조인의 조인 순서

두 테이블 A, B가 있을 때,

첫 번째 테이블인 A의 첫 행은
두 번째 테이블인 B 테이블의 각 행과 조합되어집니다.

간단한 예시를 들어보겠습니다.

아주 간단한 테이블 A가 있다고 하겠습니다.

|A|
|--|
|1|

교차 조인될 테이블 B는 아래와 같다고 하겠습니다.

|B|
|--|
|X|
|Y|

A 테이블의 첫 행인 1,
B 테이블의 모든 행과 결합해보겠습니다.

|A|B|
|--|--|
|1|X|
|1|Y|

테이블 A의 행은 하나이므로 B 테이블의 X, Y 두 행과 각각 결합되었습니다.

만약 조인의 결과는 행이 총 2개, 열이 2개 나왔습니다.

행의 개수는 1(A 테이블의 행의 수) * 2(B 테이블의 행의 수)가 되었습니다.
열의 개수는 A, B로 2 (1 + 1)개가 되었습니다.

테이블의 조인 방법도 독특합니다만 결과도 독특합니다.

분석이나 테스트용으로 주로 사용됩니다.



