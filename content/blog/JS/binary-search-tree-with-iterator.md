---
title: BST와 iterator
date: 2023-10-06 00:19:54
coverURL: https://images.unsplash.com/photo-1635815707024-0ce040a15280?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2879&q=80
---
<br />
<br />
<br />

# BST와 iterator

red black tree까지는 아니더라도 
js만으로도 binary search tree는 아래와 같이 구현할 수 있습니다.
기본적인 insert method만 추가해보도록 합시다.

```js
class TreeNode {
  constructor(val, left, right) {
    Object.assign(this, { val, left, right });
  }

  insert(val) {
    if (val < this.val) {
      if (!this.left) {
        this.left = new TreeNode(val);
      } else {
        this.left.insert(val);
      }
    } else if (val > this.val) {
      if (!this.right) {
        this.right = new TreeNode(val);
      } else {
        this.right.insert(val);
      }

    }
  }

}

const root = new TreeNode(4);
root.insert(3);
root.insert(5);
root.insert(1);
root.insert(6);
root.insert(7);
root.insert(2);
root.insert(2); // 중복 무시됨
```

## inorder, preorder, postorder의 구현

inorder, preorder, postorder를 class 내부에 구현하면 아래와 같이 구현 가능합니다.

```js
class TreeNode {
  constructor(val, left, right) {
    Object.assign(this, { val, left, right });
  }

  insert(val) {
    if (val < this.val) {
      if (!this.left) {
        this.left = new TreeNode(val);
      } else {
        this.left.insert(val);
      }
    } else if (val > this.val) {
      if (!this.right) {
        this.right = new TreeNode(val);
      } else {
        this.right.insert(val);
      }
    }
  }

  inorder(node) {
    if (!node) return;
    this.inorder(node.left);
    console.log(node.val);
    this.inorder(node.right);
  }

  preorder(node) {
    if (!node) return;
    console.log(node.val);
    this.preorder(node.left);
    this.preorder(node.right);
  }

  postorder(node) {
    if (!node) return;
    this.postorder(node.left);
    this.postorder(node.right);
    console.log(node.val);
  }
}

const root = new TreeNode(4);
root.insert(3);
root.insert(5);
root.insert(1);
root.insert(6);
root.insert(7);
root.insert(2);

root.preorder(root);
```



## generator 함수를 통해 iterable한 order 구현
```js
class TreeNode {
  constructor(val, left, right) {
    Object.assign(this, { val, left, right });
  }

  insert(val) {
    if (val < this.val) {
      if (!this.left) {
        this.left = new TreeNode(val);
      } else {
        this.left.insert(val);
      }
    } else if (val > this.val) {
      if (!this.right) {
        this.right = new TreeNode(val);
      } else {
        this.right.insert(val);
      }
    }
  }

  inorder(node) {
    if (!node) return;
    this.inorder(node.left);
    console.log(node.val);
    this.inorder(node.right);
  }

  preorder(node) {
    if (!node) return;
    console.log(node.val);
    this.preorder(node.left);
    this.preorder(node.right);
  }

  postorder(node) {
    if (!node) return;
    this.postorder(node.left);
    this.postorder(node.right);
    console.log(node.val);
  }

  *gInorder() {
    if (this.left) yield* this.left.gInorder();
    yield this.val;
    if (this.right) yield* this.right.gInorder();
  }
  *gPreorder() {
    yield this.val;
    if (this.left) yield* this.left.gPreorder();
    if (this.right) yield* this.right.gPreorder();
  }
  *gPostorder() {
    if (this.left) yield* this.left.gPostorder();
    if (this.right) yield* this.right.gPostorder();
    yield this.val;
  }
}

const root = new TreeNode(4);
root.insert(3);
root.insert(5);
root.insert(1);
root.insert(6);
root.insert(7);
root.insert(2);

const pre = root.gPreorder();
console.log(pre.next());
console.log(pre.next());
console.log(pre.next());
console.log(pre.next());
console.log([...pre]);

root.preorder(root);
```
generator 문법을 사용한 경우 구분을 위해 g를 붙여주었습니다.

order 코드 하나만 떼어 보겠습니다.

```js
// ...
  *gPostorder() {
    if (this.left) yield* this.left.gPostorder();
    if (this.right) yield* this.right.gPostorder();
    yield this.val;
  }
// ...
```

*gPostorder 함수는 iterable한 객체를 반환합니다.
해당 객체를 next 메서드로 진행시켜주면 위 함수의 가장 첫째 줄이 실행됩니다.
yield*를 통해 generator 함수 내부에서 다른 generator를 호출하는데요,
tree의 경우 서브트리는 같은 class를 공유하므로 재귀적인 호출이 가능합니다.

## 장점이 무엇일까
일반 postorder 함수와 다른 점은 원하는 시점에 suspend, resume을 할 수 있다는 것이죠

이는 생각보다 장점이 될 수 있는데

만약 트리에서 원하는 값을 찾았다고 합시다.
그럼 더 이상 트리 순회를 지속 할 필요가 있을까요?
이러한 장점은 Lazy evaluation을 구현한 라이브러리와 같은 이점을 가집니다.

또한 자원이 한정적인 js에서의 concurrency 구현에 필수적인 요소가 됩니다.
원하는 시점에 main scope에게 flow를 넘기고,
main scope에서 연산된 값을 다시 resume하는 iterator에게 넘겨줄 수도 있습니다.
이를 활용해서 coroutine을 구현하기도 합니다. 


<a href="https://github.com/tj/co#readme">co</a> << 사용하지 않더라도 공부 목적만으로도 충분히 훌륭한 라이브러리

함수형언어를 기반으로 다양한 패러다임을 수렵하고 있는 논블로킹 언어인 자바스크립트는
이제 worker 패턴으로 thread를, cluster로 멀티 process를,
sharedMemory로 공유되는 메모리의 접근까지(이를 위한 atomic) 언어가 확장되었습니다.

