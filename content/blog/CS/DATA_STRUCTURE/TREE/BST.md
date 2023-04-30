---
title: BST
date: 2023-04-10
---

아래의 자료구조는 BinarySearchTree이다.

특징은 아래와 같다.
- 재귀적으로 구현되었다.
  - 중위순회한다.
  - 재귀적으로 insert한다.


아래의 구조는 좋은 점이 한가지 정도 있다.

그나마 외우기 편하다는 점이다.

단점은 스택이 터질 것이라는 점이며 최적화가 필요하다는 점이다.



```js
/**
 * example
 * new Node(3) // Node {data: 3, left: null, right: null}
 */
class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(keys = []) {
    this.root = null;
    for (const key of keys) {
      this.root = this.insert(this.root, key);
    }
  }

  insert(targetNode, key) {
    if (!targetNode) return new Node(key);

    if (targetNode.data > key) {
      targetNode.left = this.insert(targetNode.left, key); // key
    } else {
      targetNode.right = this.insert(targetNode.right, key);
    }
    return targetNode;
  }

  inorder(node = null) {
    if (!node) return [];

    const result = [];
    result.push(...this.inorder(node.left));
    result.push(node.data);
    result.push(...this.inorder(node.right));
    return result;
  }
}

const main = () => {
  const keys = [3, 2, 1];
  const bst = new BinarySearchTree(keys);
  console.log(bst.inorder(bst.root));
};

main();


```