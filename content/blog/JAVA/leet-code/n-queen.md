---
title: n-queen 문제
date: 2023-06-26 00:14:50
coverURL: https://images.unsplash.com/photo-1591117752671-541f3495dc93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80
---

{% image "../images/photo-1591117752671-541f3495dc93.avif" %}
<br />
<br />
<br />
n queens 문제

이번 문제는 leet code를 돌아다니다가 좋은 답을 발견하여 이를 이해해보고자 합니다.

```js
// js
var solveNQueens = function (n) {
  //  final result
  let goodPlacement = [];

  // chess board, initialized with '.', of size n x n
  let board = Array.from(Array(n), () => new Array(n).fill("."));

  let colSet = new Set(); // occupy flag for each column
  let priDiagSet = new Set(); // occupy flag for each primary diagonal (i.e., Northwest <-> Southeast direction )
  let secDiagSet = new Set(); // occupy flag for each secondary diagonal (i.e., Northeast <-> Southwest direction )

  var isSafe = function (row, col) {
    return (
      !colSet.has(col) &&
      !priDiagSet.has(col - row) &&
      !secDiagSet.has(col + row)
    );
  };

  var update = function (row, col, putOn) {
    if (putOn == true) {
      // put Queen on specified position, and set corresponding occupy flag
      board[row][col] = "Q";
      colSet.add(col);
      priDiagSet.add(col - row);
      secDiagSet.add(col + row);
    } else {
      // take Queen away from specified position, and clear corresponding occupy flag
      board[row][col] = ".";
      colSet.delete(col);
      priDiagSet.delete(col - row);
      secDiagSet.delete(col + row);
    }
    return;
  };

  // Notice that here we use the DFS + backtracking template, just like what we described before.
  var placeQueen = function (row = 0) {
    // Base case aka stop condition
    // We already placed all N Queens in good position
    if (row == n) {
      goodPlacement.push(board.map((eachRow) => eachRow.join("")));
      return;
    }

    // General cases:
    // Try all possible columns in DFS + backtracking
    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        update(row, col, true); // make a selection
        placeQueen(row + 1); // solve next row in DFS
        update(row, col, false); // undo selection
      }
    }
    return;
  };
  // ---------------------------------------

  // Start placing Queen from row_#0
  placeQueen(0);

  return goodPlacement;
};

solveNQueens(4);
```


<a href="https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/">n-queen</a>의 설명은 링크와 같습니다.


n-queen 문제의 핵심적인 풀이법은 아래와 같습니다.

퀸은 한 행에 하나의 퀸만 놓을 수 있습니다.

각 행의 퀸들은 북서에서 남동 방향 모든 칸들, 북동에서 남서로 이어지는 모든 칸들을 이동할 수 있습니다.

또한 북에서 남으로 동에서 서로 이어지는 모든 칸을 이동 할 수 있습니다.

이동 방향위에 다른 체스 말이 있다면 해당 말을 잡을 수 있습니다.

따라서 각 퀸은 서로의 이동 방향에 놓여있으면 안됩니다.


대략적인 풀이는 아래와 같습니다.

- 첫 행에 퀸을 놓고,
- 다음 행으로 이동합니다. (재귀 호출)
- 다음 행 n개의 열에 퀸을 놓을 수 있는지 검사합니다. (다음 행의 칸만큼 반복문 실행 + promising 검사)
- 퀸을 놓을 수 있다면 퀸을 놓고 다음 행으로 이동합니다.
- 놓을 수 없다면 반복문을 종료하고 재귀 호출한 함수를 반환해 stack을 없애줍니다.
- 다음 열로 이동해 반복합니다.


위 알고리즘에서 배울 점은 아래의 프레임입니다.

```js

    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        update(row, col, true); // make a selection
        placeQueen(row + 1); // solve next row in DFS
        update(row, col, false); // undo selection
      }
    }
	return;
```

n개의 행이 있다면 반복문 n번을 순회합니다.

현재 진행중인 행의 각 칸마다 하위 행 n개 만큼을 재귀호출합니다.

재귀트리를 타고 내려가다 조건에 부합하지 않는 경우
반복문을 빠져나오게 됩니다.

예를 들어 다음 행 모든 칸에 퀸을 놓을 수 없는 경우 반복문이 종료되고 재귀 함수가 반환됩니다.

반환된 재귀함수는 스택을 반환하고 해당 행의 queen을 행에서 지웁니다.

반복문이 돌아가고 다음 칸에 queen을 놓게 됩니다.

아래는 java의 풀이입니다.

```java
class Solution {
    public List<List<String>> solveNQueens(int n) {
        
        // Chess board initialization
        board = new char[n][n];
        
        for (int i = 0; i < n; i++) {
            Arrays.fill(board[i], '.');
        }
        
        //Start placing Queen from row_#0
        placeQueen( 0 );
        
        return goodPlacement;
    }
    
    
    // final result
    private List<List<String>> goodPlacement = new ArrayList();
        
    private char[][] board;
    
    // occupy flag for each column
    private Set<Integer> colSet = new HashSet<Integer>();
    
    // occupy flag for each primary diagonal (i.e., Northwest <-> Southeast direction )
    private Set<Integer> priDiagSet = new HashSet<Integer>();
    
    // occupy flag for each secondary diagonal (i.e., Northeast <-> Southwest direction )
    private Set<Integer> secDiagSet = new HashSet<Integer>();
        
    private boolean isSafe( int row, int col){
        return !colSet.contains( col ) && !priDiagSet.contains( col - row ) && !secDiagSet.contains( col + row );
    }
    
    private void update( int row, int col, boolean putOn ){
        
        if( putOn ){
            // put Queen on specified position, and set corresponding occupy flag
            board[row][col] = 'Q';
            colSet.add( col );
            priDiagSet.add( col - row );
            secDiagSet.add( col + row );
            
        }else{
            // take Queen away from specified position, and clear corresponding occupy flag
            board[row][col] = '.';
            colSet.remove( col );
            priDiagSet.remove( col - row );
            secDiagSet.remove( col + row );
        }
        
        return;
    }
    
    
    // Notice that here we use the DFS + backtracking template, just like what we described before.
    private void placeQueen( int row ){
        
        // Base case aka stop condition
        // We already placed all N Queens in good position
        // Base case
        if( row == board.length ){
            
            List<String> solution = new ArrayList();
            for( char[] perRow : board){
                solution.add( String.copyValueOf(perRow) );
            }
            
            goodPlacement.add( solution );
            return;
        }
        
        // General cases:
        // Try all possible columns in DFS + backtracking
        for( int col = 0 ; col < board.length ; col++){
            
            if( isSafe(row, col) ){
                
                update( row, col, true);        // make a selection
                placeQueen( row + 1 );          // solve next row in DFS 
                update( row, col, false);       // undo selection
            }
            
        }
        return;
    }
    
}
```