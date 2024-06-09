---
title: 개미 군단 기초적인 그리디 알고리즘 풀이 greedy
date: 2024-06-09 13:26:36
coverURL: https://images.unsplash.com/photo-1611748939902-060e1ae99f32?q=80&w=2914&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<br />
<br />
<br />

## 문제

개미 군단은 아래와 같이 3 종류입니다.
```js
const ants = {
    장군개미: 5,
    병정개미: 3,
    일개미: 1
};
```

- 적군의 체력이 인자로 주어집니다.
- 개미를 가장 적게 사용해 체력을 0으로 만들어야 합니다.

체력이 6 주어진다면 대략 아래와 같이 개미들을 출동시킬 수 있습니다.
- 장군개미 하나, 일개미 하나
- 병정개미 둘,
- 일개미 여섯

위 예시들 중 개미의 수가 가정 적은 `장군개미 하나, 일개미 하나`를 선택하면 됩니다.


## 풀이

필요한 개미의 수를 누산하는 count 변수를 생성합니다. -> `let count = 0;`
개미들을 공격력이 높은 순서대로 배열로 만들고 -> `[5, 3, 1]`
배열을 순회하며 인자로 주어지는 hp에 대해 나눗셈 연산을 진행합니다.
- 배열은 내림차순 정렬이 되어 있어 최소한의 필요 개미를 골라낼 수 있습니다.
- 배열이 주어지고 배열을 정렬해야 하는 경우 `O(1)`이 아닌 `O(log)`의 시간을 가질 것입니다.

인자로 체력 6이 주어질 경우 

`6 / 5`에 대한 연산이 진행됩니다.
hp에 대해 장군 개미가 몇이 필요한지 알 수 있게됩니다.

count라는 변수에 누산해줍니다.

이제 남은 hp는 1이 되어야합니다. hp의 값을 초기화해줍니다. -> `hp = hp % ant;`


```js
function solution(hp) {
  let count = 0;
  const ants = [5, 3, 1];
  for (const ant of ants) {
    if (!hp) break;
    const mountOfAnt = ~~(hp / ant);
    count += mountOfAnt;
    const restHp = hp % ant;
    hp = restHp;
  }
  return count;
}

solution(23); // 5
```

## 후술

- 주어지는 인자의 hp 값에 따라 고정길이 3인 배열을 순회하므로
해당 알고리즘의 `Big O notation은 O(1)`입니다.

- 고정길이의 배열을 순회하면서 매번 세 개미들 중 최적의 선택을 합니다.
  - 해당 선택은 이전 선택과 이후 선택을 고려하지 않습니다.
- 예전에 풀었던 <a href="https://zerozoo-a.github.io/blog/CS/ALGORITHMS/[coin-change]basic-greedy-with-dp/">동전 문제도 위 문제와 같은 방식입니다.</a>




