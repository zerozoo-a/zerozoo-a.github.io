---
title: Tree preorder 
date: 2023-04-19:14:00
---
~ 재미있는 전위순회 이야기 ~

```js
class N {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

/**
 * @param {N} root 
 * @returns 
 * 
 */
function preorderTraversal(root) {
  if(!root) {
    return
  }
  console.log(`${root.val}`)
  preorderTraversal(root.left)
  preorderTraversal(root.right)
}

/**
 * @param {N} root
 * 
 * stack: [N{root}]
 * root 노드가 왼쪽 자식 오른쪽 자식이 존재한다면
 * 
 * 오른쪽 자식 노드를 stack에 push하고 
 * 왼쪽 자식 노드를 stack에 push하면
 * 
 * 왼쪽 자식 노드가 항상 stack의 위쪽에 위치하게 된다.
 * stack: [N{오른쪽 자식}, N{왼쪽 자식}]
 * 위와 같은 형태로 stack은 쌓이게 된다.
 * 
 * 이제 반복문이 실행되면서 stack을 pop하게 되면 왼쪽 자식은 pop 되고
 * node = N{왼쪽 자식}이 된다. 이 상태로 다시 push를 하게 되면
 * 
 * stack: [N{오른쪽 자식}, N{왼쪽 자식의 오른쪽 자식}, N{왼쪽 자식의 왼쪽 자식}]
 * 이를 반복하게 되는데 참으로 영리한 것이 pop은 O(1)연산으로 매우 빠르고
 * pop을 통해 계속 valuable한 왼쪽 자식을 DFS로 계속 찾아간다는 것이다.
 * 
 * 또한 읽는 재미가 있다. (이해하기 위해선 잠깐 멈춰서 생각해야 하지만)
 * 더군다나 한 메모리 주소를 반복적으로 쓰고 지우기만 하기 때문에 메모리 효율성과 stack이 넘쳐 망해버릴 일이 없다는 것이 좋다.
 */
function preorderTraversal2(root){
  if(!root) return

  const stack = [root]
  while(stack.length > 0) {
    const node = stack.pop()
    console.log(node.val);
    if(node.right) stack.push(node.right)
    if(node.left) stack.push(node.left)
  }  
}

const root = new N(1)
root.left = new N(2)
root.right = new N(3)
root.left.left = new N(4)
root.left.right = new N(5)

/*
      1
     / \
    2   3
   / \
  4   5
*/

preorderTraversal(root)
preorderTraversal2(root)

```
