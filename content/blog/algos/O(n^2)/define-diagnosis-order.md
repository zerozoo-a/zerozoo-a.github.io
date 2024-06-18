---
title: define diagnosis order
date: 2024-06-19 00:23:34
coverURL: https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<br />
<br />
<br />

## 문제

외과의사 머쓱이는 응급실에 온 환자의 응급도를 기준으로 진료 순서를 정하려고 합니다. 정수 배열 emergency가 매개변수로 주어질 때 응급도가 높은 순서대로 진료 순서를 정한 배열을 return하도록 solution 함수를 완성해주세요.

### 제한사항
중복된 원소는 없습니다.
1 ≤ emergency의 길이 ≤ 10
1 ≤ emergency의 원소 ≤ 100

### 입출력 예

| emergency            | result           |
|----------------------|------------------|
| [3, 76, 24]          | [3, 1, 2]        |
| [1, 2, 3, 4, 5, 6, 7]| [7, 6, 5, 4, 3, 2, 1] |
| [30, 10, 23, 6, 100] | [2, 4, 3, 5, 1]  |


### 입출력 예 설명
입출력 예 #1

emergency가 [3, 76, 24]이므로 응급도의 크기 순서대로 번호를 매긴 [3, 1, 2]를 return합니다.

## 풀이
---

```js
function solution(emergency) {
    const bst = new BST();
    for (let i = 0; i < emergency.length; i++) {
        bst.insert(i, emergency[i]);
    }
    
    bst.reverseInOrder(bst.root);
    
    let answer = [];
    for (let i = emergency.length; i > 0; i--) {
        answer[bst.res[i - 1]] = i;
    }
    return answer;
}

class N {
  constructor(index, val) {
    this.index = index;
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
    this.res = [];
  }
    
  insert(index, val) {
    const newNode = new N(index, val);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.val < node.val) {
      if (!node.left) node.left = newNode;
      else this.insertNode(node.left, newNode);
    } else {
      if (!node.right) node.right = newNode;
      else this.insertNode(node.right, newNode);
    }
  }
    
  reverseInOrder(node) {
    if (!node) return;
    this.reverseInOrder(node.right);
    this.res.push(node.index);
    this.reverseInOrder(node.left);
  }

}
```


### 후술

위 풀이는 효율적이지 않습니다. 일반 BST를 사용하여, 입력되는 인자에 따라 insert 함수는 최악의 경우 
`O(n^2)`의 시간을 소비합니다. 

AVL 트리, 레드-블랙 트리 등을 사용하면 
`𝑂(log 𝑛)`으로 시간을 줄일 수 있습니다.


배열을 sort하는 방식은 
`𝑂(𝑛 log 𝑛)`의 시간 복잡도를 가지므로 더 간단한 해결법이 됩니다.

다만, 위와 같이 풀이한 이유는 평소 트리를 직접 구현할 일이 많이 없고, reverseInOrder로도 문제가 풀릴 것 같아서 시도해봤습니다. 감사합니다.
