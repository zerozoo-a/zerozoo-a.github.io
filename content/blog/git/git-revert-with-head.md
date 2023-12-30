---
title: git의 revert와 `is a merge but no -m option was given.`
date: 2023-12-29 23:36:31
coverURL: 
---
<br />
<br />
<br />

# git, revert, head, 🪦conflict

프로젝트에 투입되다 보면 여러 작업자들과 함께 일하게 됩니다.

자연스럽게 conflict는 발생하게 됩니다.

conflict를 피하기 위한
revert, head에 대해 알아보겠습니다.


## conflict 만들어보기

conflict를 만들어서 문제 상황을 재현하겠습니다.

> 요약
> 1. main branch에서 foo와 bar 브랜치를 각각 생성합니다.
> 2. 같은 라인을 수정합니다.
> 3. 각각 main branch에 foo를 merge하고, bar를 merge합니다.
> 4. conflict를 만들었습니다.

---
#### [head >] main branch
main branch에서 hello.txt 파일을 생성하고
아래와 같이 Hello, World를 입력합니다.

```md
Hello, World
```


---
#### [head >] foo branch

main branch에서 foo branch를 만들고,
foo branch로 이동합니다.

Hello, world위에 Oh,를 작성하고 커밋하겠습니다.
```md
Hello, World
```
⬇️⬇️⬇️️⬇️️

```md
Oh, 
Hello, World
```

--- 
#### [head >] bar branch

다시 main branch에서 bar branch를 만들고,
bar branch로 이동합니다.

Hello, world위에 Huh,를 작성하고 커밋하겠습니다.
```md
Hello, World
```

⬇️⬇️⬇️️⬇️️

```md
Huh,
Hello, World
```

## conflict 해결하고 merge하기

--- 
#### [head >] main branch

main branch로 이동해 아래와 같이 foo, bar branch를 merge합니다.

- main branch에서 foo branch를 merge합니다.
- main branch에서 bar branch를 merge합니다. 
- 같은 영역을 수정한 foo와 bar의 conflict 발생


conflict가 나면 아래와 같은 화면을 보게 됩니다. (vscode 기준)
```md
<<<<<<< HEAD
Oh,
=======
Huh,
>>>>>>> bar
Hello, World
```
이 때의 git graph를 확인하면 아래와 같습니다.
{% image "./images/Screenshot 2023-12-29 at 11.57.30 PM.png" %}

conflict를 해결하고 commit 하면 merged 상태가 됩니다.
  - 적당히 conflict를 해결만 하면 됩니다.

merge를 하는 것으로 하나의 commit hash가 생긴것을 확인 할 수 있습니다.

{% image "./images/Screenshot 2023-12-30 at 12.02.23 AM.png" %}

- 05bbbb51이라는 이름의 commit 내역이 생겼습니다.

## HEAD에 대해

head란 git의 커밋 혹은 브랜치를 가리키는 pointer입니다.
메모리에서 메모리 주소를 담고 있는 pointer와 같은 역할을 합니다.

git 명령어에서 commit hash를 작성하기 힘들 때,
HEAD~0을 쓰면 현재 가리키고 있는 브랜치의 hash를 의미합니다.

HEAD~1은 브랜치의 부모 커밋을 의미합니다.
HEAD~2는 그 부모의 부모..

이런식입니다.


## merge commit에 revert하는 것이 거절되는 이유

merge commit을 revert

merge commit은 여러 commit들이 **동시**에 merge되어 있는 commit입니다.

revert를 했을 때, 어떤 상태가 되어야 하는 것일까요?


위 예시에서 Oh,와 Huh,는 conflict 발생 후 merge 되었습니다.
revert로 merge를 풀면 git은 main에 merge되어진 foo 혹은 bar 중 어떤 부모를
revert 할 것인지 물어봅니다.

선택한 부모를 revert하고 선택되지 않은 부모의 commit(변경 이력)은 살아남게 됩니다.


### 예시

{% image "./images/Screenshot 2023-12-30 at 12.02.23 AM.png" %}

* 여기서 부모의 번호가 정해지는 기준은 stack입니다.
* 선택된 부모의 commit을 revert합니다.

즉 아래의 명령어는 

```bash
git revert HEAD~0 -m 1
```
- 현재 내가 바라보고 있는 commit을 revert할 것
- 해당 commit은 merge commit
- revert 할 부모는 1번 (foo)
- 즉 bar commit은 살리고 foo commit을 revert 함



### 정리

- HEAD는 branch 혹은 commit을 가리키는 pointer이다.
- HEAD~0은 제자리,
- HEAD~1은 한 부모 위를 가리킨다.
- merge commit을 revert하는 경우 삭제할 부모를 선택해야 한다.






