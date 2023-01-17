---
layout: post
title: 'Repository pattern '
date: 2023-01-17 23:54 +0900
---
<img src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="lego">
<a href="https://images.unsplash.com/photo-1587654780291-39c9404d746b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80]">출처</a>

<!--break-->
## index 
- [index](#index)
- [문제](#문제)
- [그런데 n개의 서비스가 모두 db 접근이라면 비슷한 메서드들이 n개만큼 생길 것이다. 이를 해결해보자.](#그런데-n개의-서비스가-모두-db-접근이라면-비슷한-메서드들이-n개만큼-생길-것이다-이를-해결해보자)
- [풀이](#풀이)
- [recap](#recap)

<br>
<br>

--- 
## 문제 

Repository 패턴에 di를 얹으면 이런 모습이 그려질 수 있다.

```js

class DogRepo {
  constructor(name) {
    this.name = name;
  }

  getOne(compare, id) {
    const query = `SELECT * FROM DOGS WHERE ${compare} = ${id}`;
    const job = () => [{ name: this.name, etc: "A GOOD DOG" }];
    return job();
  }
}

class DogService {
  constructor(dogRepo) {
    this.repo = dogRepo;
  }

  getOne(compare, id) {
    return this.repo.getOne(compare, id);
  }
}

const dr1 = new DogRepo("POPPY");
const drs1 = new DogService(dr1);
const d1 = drs1.getOne("id", 1);
console.log("🚀 ~ file: di.js:70 ~ d1", d1);
// d1 [ { name: 'POPPY', etc: 'A GOOD DOG' } ]
```

위 로직은 특정 레포를 생성하고 해당 레포에 존재하는 메서드들은 특정 레포 서비스를 통해 실행하도록 하는 방법이다.

DogService는 DogRepo를 주입받고 해당 메서드를 실행한다.

하지만 n 개의 Repo가 생성되면 n개의 서비스도 만들어질 것이다.

그런데 n개의 서비스가 모두 db 접근이라면 비슷한 메서드들이 n개만큼 생길 것이다. 이를 해결해보자.
--- 
<br>
<br>

## 풀이 
--- 
```js
class Service {
  constructor(repo) {
    this.repo = repo;
  }

  getOne(id, compare) {
    const table = this.repo.table;
    const name = this.repo.name;
    const query = `SELECT * FROM ${table} WHERE ${compare} = ${id}`;
    const job = (query) => [{ table: table, name: name }]; // execute query using lib like mysql2...
    return job(query);
  }
}

class Table {
  constructor(table) {
    this.table = table;
  }
}

class UserRepo extends Table {
  constructor({ table, name }) {
    super(table);
    this.name = name;
  }
}

class BoardRepo extends Table {
  constructor({ table, name }) {
    super(table);
    this.name = name;
  }
}

const u1 = new UserRepo({ table: "USER", name: "ZEROZOO" });
const s1 = new Service(u1);
const g1 = s1.getOne(1, "id");
console.log("🚀 ~ file: di.js:30 ~ g1", g1);
// 🚀 ~ file: di.js:30 ~ g1 [ { table: 'USER', name: 'ZEROZOO' } ]


const b1 = new BoardRepo({ table: "BOARD", name: "MONTHLY BEST" });
const s2 = new Service(b1);
const g2 = s2.getOne(1, "id");
console.log("🚀 ~ file: di.js:42 ~ g2", g2);
// 🚀 ~ file: di.js:42 ~ g2 [ { table: 'BOARD', name: 'MONTHLY BEST' } ]
```

보통 ORM을 사용하여 db에 쿼리를 날린다면 모두 비슷비슷한 쿼리를 만들 것이다. 그렇다면 해당 쿼리를 정리한 서비스를 하나 만들고 해당 서비스의 인스턴스가 Repo를 주입받고
해당 서비스의 메서드를 사용한다면 한 개의 서비스 클래스로 

n 개의 Repo를 처리 할 수 있다.

특정 Repo가 고유한 쿼리를 실행해야 한다면 해당 서비스를 공통 서비스로 두고 공통 서비스를 확장한 특정 서비스를 만들어 해결해주면 될 것이다.

이로써 서비스와 레포의 연관성을 끊고 서비스는 메서드에, 
레포는 db에 집중 할 수 있게 되었다.
<br>
<br>

## recap 
--- 
이건.. 그냥 제가 짜본거라 어디 책에 나와있는지 어쩐지는
모릅니다요.. 🐟 코드에 정답은 없고.. 평가는 있다고 생각하기 때문에 좋다고 평가한다면 사용하는걸 추천드립니다.
<br>
<br>
