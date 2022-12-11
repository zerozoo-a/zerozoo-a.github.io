---
layout: post
title: binary tree in-order traverse (중위 순회 알아보기)
date: 2022-12-11 03:02 +0900
categories: ["algorithm"]
tags: ["binary search","data-structure"]
---
# tree의 기본: binary tree의 inOrder traverse

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
```



## index 
--- 
- [tree의 기본: binary tree의 inOrder traverse](#tree의-기본-binary-tree의-inorder-traverse)
  - [index](#index)
  - [문제](#문제)
  - [풀이](#풀이)
  - [recap](#recap)

<br>
<br>
<br>
 

## 문제 
--- 
binary tree의 inOrder traverse method를 구현하세요.
<br>
<br>


## 풀이 
--- 
문제를 해석하면 binary tree를 구현해야 할 것 같지만,
inOrder traverse만을 구현하면 됩니다.

binary tree 구조에 `[1, 2, 3, 4, 5]`를 순차적으로 집어넣을 경우
in order한 방식으로 순회하게 되면

`4, 2, 5, 1, 3`의 순서로 출력되게 됩니다.

이런 방식으로 출력되는 이유를 알기 위해선 두 가지를 알야아 합니다.
>   1. tree 구조
>  2. in order traverse 함수의 원리


1. tree 구조
---
입력: `[1, 2, 3, 4, 5]`에 대해 binary tree는 아래와 같은 구조를 가집니다.

```mermaid
graph TD;
  1 --> 2
  1 --> 3
  2 --> 4
  2 --> 5
```

in order는 재귀호출을 통해 보통 구현이 됩니다.
재귀호출은 이런 끝을 정확히 알기 어려운 구조를 탐색하는데 아주 최적화 되어 있습니다.

2. in order traverse 함수의 원리
---
> 중위 순회
>   1. 왼쪽 서브트리를 중위 순회한다.
>   2. 노드를 방문한다.
>   3. 오른쪽 서브 트리를 중위순회한다.

위 내용은 [이 곳](https://en.wikipedia.org/wiki/Tree_traversal#In-order,_LNR)
을 참고하였습니다.

재귀적으로 서브트리를 왼쪽 -> 오른쪽으로 이동하며 방문하는게 중위 순회입니다. 
중위 순회가 뭔지 정확히 알았습니다. 이게 전부이고 더 뭔가 의미가 있지 않습니다. 

이를 어떻게 활용하여 어떤 문제를 해결할지는 직접 알아내야하는게 어려운 부분입니다. 😭

그럼 동작을 머리로 이해해보겠습니다.

in order 함수는 재귀적으로 root 노드에서부터 왼쪽의 자식 노드만을 먼저 재귀적으로 순회합니다.

`1, 2, 4`를 먼저 탐색하게 되겠네요.

`기저조건은 도착한 노드에 데이터가 없는 경우입니다.`

이제 콜스택은 아래와 같은 방식으로 쌓였습니다.

| call stack |
| -- |
| null |
| 4 |
| 2 |
| 1 |

스택에 null이 들어왔네요, 기저조건에 도달한 상태입니다. void를 반환하고 null이라는 스택은 터트려줍시다.


이제 4를 출력하고 4의 스택에서 해야 할 남은 일들을 처리해줍니다. 바로 해당 노드의 오른쪽을 순회하는 것입니다.

함수에 오른쪽 노드를 넣어주면 됩니다.

| call stack |
| -- |
| 4 |
| 2 |
| 1 |

<br>

그럼 스택은 아래와 같이 쌓입니다. 다시 기저조건에 닿게 되고 위와 같은 과정을 반복합니다.

그러면 in order 순회를 마치게 됩니다.
<a href="https://zerozoo-a.github.io/algorithm/2022/12/07/traverse-with-recursion.html">
이전 글에서</a> 설명한 것과 연계되는 내용이 많습니다. 

구현은 아래와 같습니다.

```js
// node.js
class Node {
  constructor(val) {
    this.data = val;
    this.left = this.right = null;
  }
}
/**
 * @param {Node} node
 *
 */
const printInOrder = (node) => {
  if (!node) return;

  printInOrder(node.left);
  console.log(node.data);
  printInOrder(node.right);
};

const main = (() => {
  const root = new Node(1);
  root.left = new Node(2);
  root.right = new Node(3);
  root.left.left = new Node(4);
  root.left.right = new Node(5);

  printInOrder(root);
  console.log(`InOrder traversal of binary tree \n`);
  return 0;
})();

```

```cpp
#include<iostream>

struct Node {
    int data;
    struct Node *left, *right;
};

Node* newNode(int data) {
    Node* temp = new Node;
    temp->data = data;
    temp->left = temp->right = NULL;
    return temp;
}

void printInOrder(struct Node* node) {
    if(node == NULL) return;

    printInOrder(node -> left);
    std::cout << node -> data << " ";
    printInOrder(node -> right);
}

int main() {
    struct Node* root = newNode(1);
    root->left = newNode(2);
    root->right = newNode(3);
    root->left->left = newNode(4);
    root->left->right = newNode(5);


    std::cout << "\n InOrder traversal of binary tree is \n";
    printInOrder(root);
    return 0;
}
```



<br>
<br>

## recap 
--- 
in order traverse는 한국어로는 중위순회라는 이름을 가집니다.

<br>
<br>


