---
title: 의사결정트리와 순회
date: 2023-06-25 15:56:00
coverURL: https://images.unsplash.com/photo-1429743305873-d4065c15f93e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1767&q=80
---


# 의사결정트리 (decision tree)란?

> 결정 트리(decision tree)는 의사 결정 규칙과 그 결과들을 트리 구조로 도식화한 의사 결정 지원 도구의 일종이다. 결정 트리는 운용 과학, 그 중에서도 의사 결정 분석에서 목표에 가장 가까운 결과를 낼 수 있는 전략을 찾기 위해 주로 사용된다. <a href="https://ko.wikipedia.org/wiki/%EA%B2%B0%EC%A0%95_%ED%8A%B8%EB%A6%AC">wiki 의사결정트리</a>

## 역추적 알고리즘의 의사결정트리

3개의 수 [1, 2, 3]이 주어지고 이 수들의 순열을 찾을때 역추적 알고리즘의 의사결정트리를 사용 할 수 있습니다.

```plantuml
node "Level0" as n0

node "Level1-1" as n1 
node "Level1-2" as n2 
node "Level1-3" as n3 

node "Level2-2" as n4
node "Level2-3" as n5
node "Level2-1" as n6
node "Level2-3" as n7
node "Level2-1" as n8
node "Level2-2" as n9

node "Level3-3" as n10
node "Level3-2" as n11
node "Level3-3" as n12
node "Level3-1" as n13
node "Level3-2" as n14
node "Level3-1" as n15


n0 --> n1
n0 --> n2
n0 --> n3

n1 --> n4
n1 --> n5
n2 --> n6
n2 --> n7
n3 --> n8
n3 --> n9

n4 --> n10
n5 --> n11
n6 --> n12
n7 --> n13
n8 --> n14
n9 --> n15
```

위 UML은 backtracking의 의사결정트리입니다.
순열을 처음 계산할 때 손으로 만들던 그 트리와 비슷합니다.

해당 트리는 루트 노드에서부터 트리를 순회하고 경로를 숫자로 기록합니다.

배열의 길이가 3이므로 트리의 레벨은 출발점부터 계산하면 레벨 3까지 총 길이는 4가 되겠습니다.

이를 의사결정트리라고 부르는 이유는 각 트리의 노드에서 의사결정을 내리기 때문입니다. 

노드에서 하위 트리를 생성할 때, 자신이 기록해둔 값들이 
"1, 2라면 나머지 3을 하위 트리로 만든다" 라는 의사결정이 각 노드들에서 일어나는 것이 위 순열 문제의 의사결정입니다.

## 순회

순회에는 전위, 중위, 후위 순회가 있습니다.

각 순회의 위치는 root 노드의 방문 순서에 따라 이름 지어졌습니다.


```js
// js
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
```

예시를 위해 이진트리를 생성합니다.

```plantuml
node "1" as r
node "2" as r.l
node "3" as r.r
node "4" as r.l.l
node "5" as r.l.r

r --> r.l
r --> r.r
r.l --> r.l.l
r.l --> r.l.r
```
트리는 위와 같은 그림을 그리게 됩니다.

```js
// js
function preOrderTraversal(root) {
  if (root === null) {
    return;
  }

  console.log(root.value); // 현재 노드의 값

  preOrderTraversal(root.left); // 왼쪽 노드로
  preOrderTraversal(root.right); // 오른쪽 노드로
}
```

전위순회 함수인 preOrderTraversal 함수는 
현재 방문한 node의 값을 출력합니다.

그리고 왼쪽 하위 트리로 재귀를 실행합니다.
따라서 왼쪽 하위 트리부터 방문을 하면서 기저조건에 닿은 경우 콜스택이 반환되고 그 다음 오른쪽 트리를 방문하게 됩니다.

따라서 `1 --> 2 --> 4 --> 5 --> 3`의 순서로 방문하게 됩니다.

전위순회는 루트를 가장 먼저 방문하기 때문에 전위입니다.

중위순회는 루트를 중간에 방문하기 때문에 중위순회입니다.

후위순회는 루트를 중간에 방문하기 때문에 후위순회입니다.

<iframe src="https://codesandbox.io/embed/brave-darwin-grqgls?autoresize=1&expanddevtools=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2Findex.js&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="brave-darwin-grqgls"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


따라서 언제 각 노드의 값에 접근하는지에 따라 순회가 결정됩니다.

### 중위순회
```js
// js 
// 중위순회 4 --> 2 --> 5 --> 1 --> 3
function inOrderTraversal(root) {
  if (root === null) {
    return;
  }

  preOrderTraversal(root.left); // 왼쪽 노드로
  console.log(root.value); // 현재 노드의 값
  preOrderTraversal(root.right); // 오른쪽 노드로
}
```

### 후위순회
```js
// js 
// 후위순회 4 --> 5 --> 2 --> 3 --> 1
function postOrderTraversal(root) {
  if (root === null) {
    return;
  }

  preOrderTraversal(root.left); // 왼쪽 노드로
  preOrderTraversal(root.right); // 오른쪽 노드로
  console.log(root.value); // 현재 노드의 값
}
```

이렇게 각 순회 방법을 알아봤습니다.

감사합니다.