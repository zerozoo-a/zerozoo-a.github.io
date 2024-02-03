---
title: dfs로 미로 풀기
date: 2024-01-31 23:20:26
coverURL: https://images.unsplash.com/photo-1574390353491-92705370c72e?q=80&w=2856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<br />
<br />
<br />

## dfs와 미로
dfs는 그래프를 탐색하는 방법의 하나입니다.

이 dfs를 통해 미로를 빠져 나올 수 있을지 알아보겠습니다.

## 미로와 그래프

미로는 그래프로 표현할 수 있습니다.
예를 들어 아래와 같은 그래프가 있다고 하겠습니다.


```js
/**
 * S = 시작,
 * 1 = 길,
 * 0 = 벽,
 * E = 출구
 */
const graph = [
    ["S",1,1],
    [0,0,"E"],
    ]
```
- 시작을 S에서부터
- 0은 벽으로 지나갈 수 없음
- 1은 길로 지나갈 수 있음
- E는 종료조건

시작위치에서 부터 이동가능한 방향은 동서남북입니다.

동서남북 모두 이동해보고 더 이상 진행이 불가능하면 해당 루트를 포기합니다.
물론 모든 위치이동마다 visited 변수에 기록하는 것과
이동했던 행적을 표시하는 path 변수도 필수입니다.


## 미로찾기는 현위치에서 사방을 둘러보는 것의 반복

S에서 부터 시작해 반복문을 통해 미로를 탈출해야 합니다.
아래 미로를 S vertex에서 부터 시작해 탈출해보겠습니다.

```js
/**
 * S = 시작,
 * 1 = 길,
 * 0 = 벽,
 * E = 출구
 */
const graph = [
    ["S",1,1],
    [0,0,"E"],
    ]
```

S에서 사방을 둘러봅니다. 현재 위치는 2차원 배열을 기준으로 0, 0입니다.
현 위치를 기준으로 사방의 효율적인 길찾기가 아닌, 
현 vertex를 기준으로 이동 가능한 4가지 방향을 모두 탐색합니다.

1. 현 위치를 x, y라고 하겠습니다. 
2. graph의 현 위치가 종료 지점인지 파악합니다. 맞다면 종료, 아니면 진행합니다.
3. x, y에 `[-1, 0], [0, -1], [1, 0], [0, 1]`을 각각 대입해봅니다. 
   1. `(x, y) = (0, 0)`일 때, 순서대로
   2. `0 -1, 0 + 0`의 좌표에 대한 검사가 진행됩니다.
      1. 해당 좌표가 maze 범위 내인지,
      2. 벽이 아닌지
      3. 이미 방문했던 좌표인지
      4. x, y중 하나라도 음수인지
   3. 확인이 끝나고 위 조건을 모두 통과한다면 종료지점이거나 길인 경우입니다.
4. 이 과정을 반복해 길을 찾아갑니다.

## 코드

```js
function solveMaze(maze, startX, startY) {
  const rows = maze.length;
  const cols = maze[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const stack = [[[startX, startY], []]]; // 시작점 좌표를 stack에 쌓습니다.

  // 이동 할 방향을 정의합니다.
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  visited[startX][startY] = true;

  while (stack.length > 0) {
    const [[x, y], path] = stack.pop(); // stack의 값을 pop합니다.

    if (maze[x][y] === "E") { // pop으로 꺼낸 좌표가 종료 좌표라면 마지막 좌표와 path를 merge해 반환합니다.
      return [...path, [x, y]];
    }

    // 주변 탐색을 위해 이동 가능한 경로의 2차원 배열을 순회합니다.
    for (const [dx, dy] of directions) {
      const newX = x + dx; // 현재 위치에서 dx를 더합니다.
      const newY = y + dy; // 현재 위치에서 dy를 더합니다.

      if ( // 아래 조건은 모두 and 조건, 
      // 현재 vertex에 대한 탐색이 아닌 현재 vertex에 인접한 vertex에 대한 탐색
        newX >= 0 && // newX는 0 이상이여야 합니다. 음수인경우 maze의 범위를 벗어납니다.
        newX < rows && // newX는 maze의 가로길이를 넘어선 안됩니다.
        newY >= 0 && // newY는 0 이상이여야 합니다. 음수인경우 maze의 범위를 벗어납니다.
        newY < cols && // newY는 maze의 세로길이를 넘어선 안됩니다.
        !visited[newX][newY] // 이미 방문했는지 확인
        maze[newX][newY] !== "0" && // 탐색중인 주변 vertex가 벽이 아닌지 확인합니다.
      ) {
        stack.push([ // 위 조건들을 통과했다면
          [newX, newY], // stack에 이동 가능한 다음 vertex 좌표를 stack에 밀어 넣습니다.
          [...path, [x, y]], // stack은 이동 가능한 다음 vertex를 모두 모아둡니다. 
          // (해결 가능한 다른 루트가 있다고 하더라도 먼저 pop되어 탐색하는 루트를 기준으로 출구까지 찾아감)
        ]);
        visited[newX][newY] = true; // 길 혹은 출구라면 visited에 기록합니다.
      }
    }
  }

  // stack이 모두 소진되는 경우 
  return null;
}

// Example maze
// 0 = wall, 1 = path, S = start, E = end
const maze = [
  ["S", "1"],
  ["1", "E"],
];

console.log(solveMaze(maze, 0, 0)); // The starting point coordinates
```