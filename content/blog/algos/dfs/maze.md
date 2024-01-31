---
title: dfs로 미로 풀기
date: 2024-01-31 23:20:26
coverURL: https://images.unsplash.com/photo-1574390353491-92705370c72e?q=80&w=2856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<br />
<br />
<br />



```js
function dfs(maze, x, y, visited, path) {
  // 미로의 범위를 벗어나거나 벽(1)인 경우
  if (
    x < 0 || // dfs 재귀에서 좌표가 음수일 경우
    y < 0 || // dfs 재귀에서 좌표가 음수일 경우
    x >= maze.length || // maze를 벗어납니다.
    y >= maze[0].length || // maze를 벗어납니다.
    maze[x][y] === 1 || // 1은 벽입니다.
    visited[x][y] // 이미 방문했다면 stack을 회수
  ) {
    return false;
  }

  // 목표점 'F'에 도달한 경우
  if (maze[x][y] === "F") {
    path.push([x, y]);
    return true;
  }

  // 현재 위치 방문 처리
  visited[x][y] = true;
  path.push([x, y]);

  // 상, 하, 좌, 우 방향으로 DFS 탐색
  if (
    dfs(maze, x + 1, y, visited, path) || // 현 위치에서 x축 기준 오른쪽 한칸 옆의 노드 확인
    dfs(maze, x - 1, y, visited, path) || // 현 위치에서 x축 기준 왼쪽 한칸 옆의 노드 확인
    dfs(maze, x, y + 1, visited, path) || // 현 위치에서 y축 기준 위쪽 한칸 옆의 노드 확인
    dfs(maze, x, y - 1, visited, path) // 현 위치에서 y축 기준 아래쪽 한칸 옆의 노드 확인
  ) {
    return true;
  }  // 위 조건문이 모두 false인 경우, 즉 상하좌우 모두 적당하지 않다면 path를 pop

  // 경로에 포함되지 않는 경우, 되돌리기
  path.pop();
  return false;
}

function findPath(maze) {
  const visited = maze.map((row) => row.map(() => false));
  const path = [];
  for (let x = 0; x < maze.length; x++) {
    for (let y = 0; y < maze[x].length; x++) {
      if (maze[x][y] === "S" && dfs(maze, x, y, visited, path)) {
        return path;
      }
    }
  }
  return "경로가 없습니다.";
}

// 미로 정의
const maze = [
  ["S", 0, 0],
  [0, 1, "F"],
];
const maze2 = [
  ["S", 1, 1, 1],
  [0, 1, 1, 1],
  [0, 1, 1, 1],
  [0, 0, 0, "F"],
];
const maze3 = [
  ["S", 0],
  [0, 1],
  [0, 1],
  [0, 1],
  [0, 1],
  [0, 1],
  [0, 1],
  [0, 1],
  [0, "F"],
];

console.log(findPath(maze));
console.log(findPath(maze2));
console.log(findPath(maze3));

```