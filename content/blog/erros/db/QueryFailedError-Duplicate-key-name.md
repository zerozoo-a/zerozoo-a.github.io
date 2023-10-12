---
title: QueryFailedError Duplicate key name
date: 2023-10-12 22:50:05
coverURL: 
---
<br />
<br />
<br />

table을 생성하던 도중 아래와 같은 에러를 마주했습니다.

```bash
ERROR [TypeOrmModule] Unable to connect to the database. Retrying (2)...
QueryFailedError: Duplicate key name 'IDX_97672ac88f789774dd47f7c8be'
```

indexing을 위해 entity를 변경하다 발생했는데요,

예시와 함께 보겠습니다.

```ts
@Entity('users')
@Unique(['email'])
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Index() // err
  @Column('varchar', { name: 'email', length: 100, unique: true }) // err
  email: string;

  // ...
}

```

위 예시에서 문제되는 부분은 email입니다. 
email은 indexing을 위해 index decorator를 붙여놓은 상태입니다.
게다가 추가적으로 unique로 설정해두었는데요,

이 부분에서 에러가 발생합니다. 

```bash
Error: Duplicate key name 'IDX_97672ac88f789774dd47f7c8be'
query: ROLLBACK
[Nest] 74850  - 10/12/2023, 11:05:58 PM   ERROR [TypeOrmModule] Unable to connect to the database. Retrying (2)...
```

index decorator를 설정하기 위해서는 아래와 같이 고쳐주세요


```ts
@Entity('users')
@Unique(['email'])
export class Users {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Index({ unique: true })
  @Column('varchar', { name: 'email', length: 100 })
  email: string;
  // ...
}

```

