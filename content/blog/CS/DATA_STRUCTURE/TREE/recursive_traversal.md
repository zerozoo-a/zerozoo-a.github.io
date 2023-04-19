---
title: Tree preorder 
date: 2023-04-19:14:06
---
~ 재미있는 재귀순회 이야기 ~

재귀 순회는 구현이 매우 간단하다는 장점이 있다.

작은 크기의 트리라면 이정도의 구현만으로 쉽게 구현이 가능하다.

```js
class N {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * 
 * @param {N} root 
 * 
 * 전위 순회는 루트 -> 왼쪽 자식 -> 오른쪽 자식 순으로 순회한다.
 * 
 * 순회의 포인트는 왼쪽 자식이 없다면 오른쪽 자식으로 점프하는게 아닌,
 * 왼쪽 자식이 없으므로 node의 오른쪽 자식을 재귀 함수의 인자로 넣는다는 것이다.
 * 재귀 함수는 매번 해당 함수를 노드의 뿌리로 인식하기 때문에 왼쪽과 오른쪽 자식을
 * 재귀호출하게 된다.
 */
function preOrderTraversal(root) {
  const result = []

  function traverse(node) {
    if(!node) return;

    result.push(node.val);
    traverse(node.left);
    traverse(node.right);
  }
  traverse(root);
  return result;
}

/*
    1
   /  \
  2    3
 /  \    
4    5 
 */

function postOrderTraversal(root) {
  const result = [];
  function traverse(node) {
    if(!node) return;

    traverse(node.left);
    traverse(node.right);
    result.push(node.val);
  }
  traverse(root);
  return result;
}

function inOrderTraversal(root) {
  const result = [];
  function traverse(node) {
    if(!node) return;

    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }

  traverse(root);
  return result;
}

const tree = new N(1, new N(2, new N(4), new N(5)), new N(3));
console.log("🚀 ~ file: preorderTraversal.js:24 ~ tree:", tree)
/*
    1
   /  \
  2    3
 /  \    
4    5 

뿌리 -> 왼쪽 -> 오른쪽

결과: 1 > 2 > 4 > 5 > 3
구조: root(1) == 1 -> root(1).left == 2 -> root(1).left.left == 4 -> root(1).left.right == 5 -> root(1).right == 3
 */
console.log(preOrderTraversal(tree)); // [1, 2, 4 ,5 ,3]
/*
    1
   /  \
  2    3
 /  \    
4    5 

왼쪽 -> 오른쪽 -> 뿌리

결과: 4 > 5 > 2 > 3 > 1
구조: root(1).left.left == 4 -> root(1).left.right == 5 -> root(1).left == 2 -> root(1).right == 3 -> root(1) == 1
 */
console.log(postOrderTraversal(tree)); // [4, 5, 2, 3, 1]

/*
    1
   /  \
  2    3
 /  \    
4    5 

왼쪽 -> 뿌리 -> 오른쪽

결과: 4 > 2 > 5 > 1 > 3
 */
console.log(inOrderTraversal(tree)); // 


```
