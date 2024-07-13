---
title: 2차원 배열을 탐색하는 BFS, DFS
date: 2024-07-09 23:31:03
coverURL: 
---
<br />
<br />
<br />

# DFS로 2차원 배열 탐색하기

## 2차원 배열 이해하기

깊이 우선 탐색으로 2차원 배열을 탐색해보겠습니다.
탐색을 한다면 어떤 목적이 있어야겠습니다.

깊이 우선 탐색으로 아래의 2차원 배열에서 1을 찾아보겠습니다.
시작은 `arr2D[0][0]`에서 시작합니다.

```js
const arr2D = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 1, 0],
]
```
아래와 같은 그림으로 이해 할 수 있습니다.

<img src='/img/blog/dfs-bfs-2DArray/tdr1.png' alt='이차원배열-1' >

## 2차원 배열을 이동하는 DFS 이해하기

좌표 `arr2D[0][0]`에서 부터 탐색을 시작해 아래와 같은 규칙을 통해 움직입니다.

1. 탐색을 완료한 경우 좌표를 남긴다.
2. 완료한 탐색의 좌표는 누적한다.
3. 누적된 탐색의 좌표를 따라가면 마지막이 찾고자 하는 좌표이다. 찾지 못하면 null을 반환한다.

DFS 함수로 1을 찾은 경로는 아래와 같을 것입니다.

```js
/**
 * x, y로 이해하기 보다,
 * arr2D[row, column]로 해석해주세요
 * */
[[ 0, 0 ], // 0, 0에 있다.
 [ 0, 1 ], // 직전 좌표에서 column 한칸을 오른쪽 이동했다.
 [ 0, 2 ], // 직전 좌표에서 column 한칸을 오른쪽 이동했다.
 [ 1, 2 ], // 직전 좌표에서 row 한칸을 아래로 이동했다.
 [ 2, 2 ], // 직전 좌표에서 row 한칸을 아래로 이동했다.
 [ 2, 1 ]  // 직전 좌표에서 column 한칸을 왼쪽 이동했다.
 ]
```

위 좌표들은 2차원 배열을 DFS로 이동하고, 경로를 저장한 값입니다.

위 그림에 좌표를 추가해보겠습니다.

<img src='/img/blog/dfs-bfs-2DArray/tdr2.png' alt='이차원배열-2' >

자세히 살펴보면 최단경로로 이동하고 있지 않다는 것을 알 수 있습니다.

이유는 DFS의 특징을 따르기 때문입니다.
이차원 배열을 뒤져보면서 갈 수 있는한 최대한 깊은 곳까지 이동하고, 막히면 다시 뒤로 돌아와 찾습니다.

## DFS를 구현해보기

### 1. cols, rows 선언
```js
function dfs(){
  const array = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 1, 0],
  ];
  const cols = array[0].length;
  const rows = array.length;
}
```

- cols: 2차원 배열의 열의 수
- rows: 2차원 배열의 행의 수

### 2. visited, stack의 선언

```js
// rows 밑에
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const stack = [[[0, 0], []]];
```

- visited: 한번 방문한 좌표는 또 방문 할 필요가 없기에 이를 체크하기 위한 변수
- stack: 이동 경로를 저장하기 위한 3차원 배열 변수
  - 초기값으로 [0, 0] 좌표를 저장합니다.
  - 그동안 축적될 좌표를 저장할 빈 배열도 함께 저장합니다.


### 3. direction

```js
// stack 밑에
  const directions = [
    [-1, 0], // up
    [1, 0], // down
    [0, 1], // right
    [0, -1], // left
  ];
```

- directions: 2차원 배열의 이동방향을 저장해둔 변수

`arr2D[row][column]`에서 탐색을 시작했을 경우
해당 좌표에서는 `up, down, right, left`의 근접 좌표를 방문합니다.

### 4. while 반복문

### 4-1. stack에서 값 꺼내오기

stack의 길이가 존재하는 경우
stack에서 현재 좌표, 그동안 이동한 path를 꺼내옵니다.

최초의 currentX, currentY는 각각 0,
path는 빈 배열입니다.

```js
  while (stack.length > 0) {
    const [[currentX, currentY], path] = stack.pop();

    // if (array[currentX][currentY] === 1) {
    //   return [...path, [currentX, currentY]];
    // }

    // ...
  }
  return null;
```

- currentX: 현재 방문한 좌표의 row 값
- currentY: 현재 방문한 좌표의 column 값
- path: 축적된 좌표들의 배열 즉, 경로

### 4-2. 현재 방문한 좌표가 당첨인지 확인하기

stack에서 꺼내온 현재 방문한 2차원 배열의 좌표가 원하는 값인지 확인합니다.

우리의 경우 값이 1이면 당첨인 경우입니다.

그동안 축적한 path와 현재 방문 좌표를 배열에 담아 반환하고 함수는 종료됩니다. 

```js
  while (stack.length > 0) {
    // const [[currentX, currentY], path] = stack.pop();

    if (array[currentX][currentY] === 1) {
       return [...path, [currentX, currentY]];
    }
    // for ([dx, dy] of directions) { ... }
  }
  return null;
```

### 4-3. 방문한 좌표에서 directions만큼 탐색하기

DFS는 방문한 좌표(vertex, node 등)에서 주변을 탐색합니다.
탐색의 조건은 if문에 의해 더 탐색이 가능한 곳인지를 확인합니다.

- newX, newY: 현재 방문한 좌표에 새 좌표값을 더합니다.

- if문에 대해: 새로 정의된 좌표의 값이 0 미만이거나 rows, cols의 값을 넘는다면 배열의 인덱스 범위를 벗어나므로 무시합니다.
- `!visited[newX][newY]`: 방문한적 있다면 무시합니다.

```js
//   while (stack.length > 0) {
// ...
    for ([dx, dy] of directions) {
      const newX = currentX + dx;
      const newY = currentY + dy;
      if (
        newX >= 0 &&
        newX < rows &&
        newY >= 0 &&
        newY < cols &&
        !visited[newX][newY]
      ) {
        stack.push([
          [newX, newY], // 새 좌표는 이동 가능하다는 판정
          [...path, [currentX, currentY]], // 그동안의 좌표와 현재 좌표를 path에 추가
        ]);
        visited[newX][newY] = true;
      }
    }
// }
// return null // 만약 못찾았다면 null을 반환
```



