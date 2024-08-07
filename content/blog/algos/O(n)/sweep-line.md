---
title: Sweep Line Algorithm | 스위핑 라인 알고리즘
date: 2024-07-22 22:34:17
coverURL: https://images.unsplash.com/photo-1583078379333-e34d6569c406?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fHNlcXVlbmNlfGVufDB8fDB8fHww
---
<br />
<br />
<br />

# 유형: 이 알고리즘이 풀고자 하는 문제 

Sweep Line Algorithm 알고리즘은 2차원 평면에서 여러 구간의 라인을 효율적으로 처리합니다.

예를 들어 타임 테이블이 있고 같은 시간에 근무하는 파트타임 시간은
얼마나 되는지 알아본다고 하겠습니다.

예를 들어 아래와 같이 직원 A, B, C가 근무하고

B는 풀타임, A, C는 파트타임이라고 하겠습니다.

|1|2|3|4|5|6|7|
|-|-|-|-|-|-|-|
|A|A|A| |C|C|C|
| |B|B|B|B|B|B|


세 직원들 중 근무시간이 겹치는 시간을 구한다고 했을 때,
Sweep Line Algorithm이 사용될 수 있습니다.

# 문제로 해석하기

위 테이블을 약간 수정하여 자료구조로 변형해보면 아래와 같이 정의 할 수 있습니다.

```js
const lines = [[1, 3], [2, 7], [5, 7]]; // A, B, C의 [근무 시작, 종료시간]
```
근무 시작 시간과 종료 시간이 주어진다고 했을 때, 최대 코어 근무 시간은 총 몇시간인지 구하는 문제로 만들 수 있습니다.

> 문제
직원 A, B, C가 함께 근무하는 코어 근무시간이 최대 몇시간인지 구하시오

## 풀이

풀이는 크게 세가지 부분으로 나뉩니다.
1. 인자를 기반으로 생성하는 새로운 배열
2. 1.에서 생성한 배열의 정렬
3. 2.에서 정렬한 배열을 순회하며 카운트

---

### 인자를 기반으로 생성하는 새로운 배열

인자로 주어진 시작 및 종료시간에 대응되는 배열 객체를 생성합니다.
이 배열은 시간과 시작, 끝을 표시합니다.

```js
const points = [{time: 1, type: 'start'}, {time: 3, type: 'end'}, /** ... */];

```

### 1.에서 생성한 배열의 정렬

이제 이렇게 생성된 `points`를 time을 기준으로 정렬합니다.

  - 정렬시에 비교군 a, b의 시간이 같을 경우 end를 먼저 앞으로 오게끔합니다.

   ```js
    const points = [{time: 1, type: 'start'}, {time: 1, type: 'end'}];

    points.sort((a,b) => {
        if(a.time === b.time) {
           return a.type === 'start' ? 1 : -1;
        }
        return a.time - b.time;
    });
   ```

이 정렬은 시간순으로 오름차순 정렬을 하되,
서로 시간이 같을 경우 end를 더 앞에 두게 됩니다.

배열을 정렬함으로써 시간순으로 일의 시작, 끝이 늘어서게 되었습니다.
아래와 같은 식입니다.

```js
[{time: 1, type: "start"},
  {time: 2, type: "start"},
  {time: 3, type: "end"},
  {time: 5, type: "start"},
  {time: 7, type: "end"},
  {time: 7, type: "end"},];
```

### 2.에서 정렬한 배열을 순회하며 카운트

이 상태에서 세가지 상태가 더 추가됩니다.

```js
let max = 0; // 최대 이벤트
let cur = 0; // 현재 진행중인 이벤트
let prev = null; // 직전 근무 시간
```

- 최대 이벤트는 근무자끼리의 근무 시간이 겹치는 코어 근무 시간을 카운트합니다.

- 현재 진행중인 이벤트는 현재 진행중인 이벤트가 끝날경우 감소합니다.

- 직전 근무시간을 기록합니다.

따라서 느낌적으로 배열을 순회하면서 start, start가 연속으로 나오면 cur = 2가 되겠죠,

이 때, 

- cur 변수를 하나 올려주는 그런 느낌입니다.
- cur는 2 이상이여야 합니다. 그래야만 같은 시간에 둘이 일을 하고 있다는 의미입니다.



```js
  let max = 0;
  let cur = 0;
  let prev = null;

  points.forEach((p) => {
    if (p.type === "start") {
      cur++;
    } else {
      cur--;
    }

    if (prev && cur >= 2) {
      max += p.time - prev; // 새로 온 사람의 근무시간 - 직전 근무시간 시간순으로 정렬 되어 있으므로 큰값 - 작은값임이 확정됨
    }
    prev = p.time;
  });
  return max;
```

이 부분이 가장 어렵기 때문에 한 줄씩 뜯어보겠습니다.

1. 
```js
    if (prev && cur >= 2) {...} 
```
prev가 있어야 하는 이유는 forEach의 첫 순환은
첫 근무자의 근무 시작입니다. 

(이 때는 함께 근무 할 수가 없는데요
만약 같은 근무 시작 시간을 가지더라도 배열을 동시에 접근하지 않으므로
순차적으로 생각해보면 그렇다는 것입니다.)

2. 
```js
if (prev && cur >= 2) { 
    max += p.time - prev; // 새로 온 사람의 근무시간 - 직전 근무시간 시간순으로 정렬 되어 있으므로 큰값 - 작은값임이 확정됨
}
```

이전 근무시간을 기록해둔 prev가 존재하면서 cur >= 2는 현재 근무자가 최소 2명은 존재한다는 것입니다.

이제 누적된 max를 반환하는 것으로 완료됩니다.

전체 코드는 아래와 같습니다.

```js
/** O(n log n) */
function maxConcurrentEvent(events) {
  const points = [];

  events.forEach((e) => {
    points.push({ time: e[0], type: "start" }, { time: e[1], type: "end" });
  });

  points.sort((a, b) => {
    if (a.time === b.time) {
      return a.type === "start" ? 1 : -1;
    }
    return a.time - b.time;
  });

  let max = 0;
  let cur = 0;
  let prev = null;

  points.forEach((p) => {
    if (p.type === "start") {
      cur++;
    } else {
      cur--;
    }

    if (prev && cur >= 2) {
      max += p.time - prev;
    }
    prev = p.time;
  });
  return console.log(max);
}

maxConcurrentEvent([
  [1, 3],
  [2, 7],
  [5, 7],
]);
```










