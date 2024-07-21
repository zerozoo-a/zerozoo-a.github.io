---
title: 프로그래머스 안전지대
date: 2024-07-16 21:27:40
coverURL: 
---
<br />
<br />
<br />

## 문제

> 문제 설명
다음 그림과 같이 지뢰가 있는 지역과 지뢰에 인접한 위, 아래, 좌, 우 대각선 칸을 모두 위험지역으로 분류합니다.

> 지뢰는 2차원 배열 board에 1로 표시되어 있고 board에는 지뢰가 매설 된 지역 1과, 지뢰가 없는 지역 0만 존재합니다.
지뢰가 매설된 지역의 지도 board가 매개변수로 주어질 때, 안전한 지역의 칸 수를 return하도록 solution 함수를 완성해주세요.

### 제한사항

> 제한사항
board는 n * n 배열입니다.
1 ≤ n ≤ 100
지뢰는 1로 표시되어 있습니다.
board에는 지뢰가 있는 지역 1과 지뢰가 없는 지역 0만 존재합니다.

### 풀이

```js
function answer(array) {
  const cols = array[0].length;
  const rows = array.length;

  const dangerous = {};

  const directions = [
    [-1, -1], // up-left
    [-1, 0], // up
    [-1, 1], // up-right
    [1, -1], // down-left
    [1, 0], // down
    [1, 1], // down-right
    [0, -1], // left
    [0, 1], // right
  ];

  let counter = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (array[row][col] === 1) {
        counter++;

        for ([upDown, leftRight] of directions) {
          const newR = row + upDown;
          const newC = col + leftRight;
          if (!array[newR]) continue;

          if (
            array[newR][newC] === 0 &&
            newR >= 0 &&
            newR < rows &&
            newC >= 0 &&
            newC < cols
          ) {
            if (!dangerous[`${newR}_${newC}`]) {
              dangerous[`${newR}_${newC}`] = true;
              counter++;
            }
          }
        }
      }
    }
  }

  return rows * cols - counter;
}
```

## 후술

BFS, DFS의 풀이방법으로 접근하면 풀리는 문제입니다.