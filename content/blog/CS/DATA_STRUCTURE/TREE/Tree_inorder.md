---
title: Tree inorder (stack)
date: 2023-04-18 15:02:24
---
~ 재미있는 중위순회 이야기 ~


```js

class N {
  constructor(val, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

/**
 * @param {N} root 
 * 
 *     1
 *    / \
 *   2   3
 *      /  \
 *     4    5
 * 
 *  2 -> 1 -> 4 -> 3 -> 5
 * 
 * tree가 이렇게 생겼다고 가정하자
 * 
 * 중위순회는 왼쪽 -> 루트 -> 오른쪽 순으로 탐색하는 것을 의미한다.
 * 위의 트리를 기준으로 중위 순회를 거쳐 나온 답은 [2, 1, 4, 3, 5]가 나오면 된다.
 * 
 * 이렇게 만들기 위해서는 두 가지가 필요하다.
 * 
 * 1. 분석의 대상인 Binary Tree
 * 2. 값을 저장 할 stack
 * 
 * tree와 stack은 궁합이 좋다.
 * 
 * 과정을 수행 할 함수는 tree의 루트부터 탐색을 시작한다.
 * 
 * currentNode를 stack에 push하고
 * currentNode = currentNode.left로 currentNode를 계속 초기화 한다.
 * tree의 왼쪽 자식의 끝까지 도달하면 자식 node들이 null이므로 왼쪽 자식을 찾아
 * 내려가는 프로세스는 중단된다.
 * 
 * 마지막 유효한 값이 있는 왼쪽 자식은 stack에 저장되어 있게 된다.
 * 해당 stack을 pop하면서 값을 꺼내 result에 push한다.
 * currentNode를 currentNode의 오른쪽 자식으로 초기화 한다. 
 * 
 * 위 트리를 예로 들면 2의 왼쪽 자식이 null이므로 stack에서 꺼낼 준비가 되었다.
 * stack에서 2가 든 node를 꺼내어 값을 result에 밀어넣고 currentNode를 오른쪽 자식으로
 * 초기화한다.
 * 
 * 하지만 오른쪽 자식도 null이다.
 * 
 * 오른쪽 자식도 null이므로 stack을 다시 pop해 루트를 꺼내온다.
 * pop하면서 꺼내온 루트의 값을 result에 밀어넣고 currentNode를 오른쪽 자식으로 초기화한다.
 * 오른쪽 자식으로 초기화하면서 루트의 오른쪽 자식의 하위 트리의 왼쪽 자식부터 위의 과정을 반복하게 된다.
 */
function inOrderTraversal(root) {
  if(!root) return []

  const stack = []
  const result = []
  let currentNode = root

  while(stack.length || currentNode) {
    if(currentNode) {
      stack.push(currentNode)
      currentNode = currentNode.left
    } else {
      currentNode = stack.pop()
      result.push(currentNode.val)
      currentNode = currentNode.right
    }
  }

  return result
}

/* 
      1
     / \
    2   3
       /  \
      4    5
*/
const tree = new N(1,
  new N(2),
  new N(3,
            new N(4),
            new N(5)
          )
);

console.log(inOrderTraversal(tree))
```