---
title: iterator를 사용해서 main thread 점유 우회하기
date: 2023-10-10 21:59:42
coverURL: https://images.unsplash.com/photo-1635241161466-541f065683ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80
---
<br />
<br />
<br />

## iterator를 통해 a, b 상호 재귀 함수를 만들어보자

generator를 사용해서 함수 a, b를 서로 호출 할 수 있도록
코드를 작성해봤다.


a는 함수 b를
함수 b는 함수 a를 호출합니다.

iterator a, b가 서로 인자 count를 넘기면서 연산을 이어나갑니다.

함수 a, b가 서로를 호출하므로 상호재귀 꼴이되는데요
무한히 호출하므로 stack overflow가 나지 않도록 base case를 추가해줘야 합니다.
```js
function* a(b, count) {
  console.log('in a', count)
  if(count === 0) yield;
  while(count > 0) {
    yield* b(a, count-1);
  }
}

function* b(a, count) {
  console.log('in b', count)
  if(count === 0) yield;
  while(count > 0) {
    yield* a(b, count-1);
  }
}


function main() {
  const start = a(b, 6);
  console.log("🚀 ~ file: index.js:15 ~ main ~ start:", start.next())
}

main();

 in a 6
 in b 5
 in a 4
 in b 3
 in a 2
 in b 1
 in a 0

🚀 ~ file: index.js:15 ~ main ~ start: {value: undefined, done: false}
```

## main thread에서 iterator function 으로 또 그 반대로,


```js
function* gene(max,load,block) {
  let i = 0, curr = load;
  while(i < max) {
    if(curr--) {
      block(i);
      i++;
    } else {
      curr = load;
      console.log(i);
      yield;
    }
  }
}

function nbFor(...maxLoadBlock){
  const iterator = gene(...maxLoadBlock);
  function f(_) {
    iterator.next().done || setTimeout(f,0)
  }

  setTimeout(f, 0)
}


function main() {
  function hi(i){
    console.log('hi',i);
  }
  nbFor(100, 10, hi)
}
```
위 코드는 setTimeout을 통해 iterator가 인자로 받은
함수를 실행하다가 제한으로 둔 조건문에 의해 yield 되어
while 문과 함수 자체를 모두 빠져나옵니다.

함수는 main thread에게 다시 flow를 건네주는 모양이 됩니다.

정확히는 main thread가 iterator 함수를 실행하다가,
멈추고,
다시 iterator 함수 다음을 실행시키다가,
setTimeout에 의해 iterator가 다시 실행되는 모양이 됩니다.

따라서 iterator 함수가 main thread를 계속 점유하지 않고
서로 양보하면서 실행하게 됩니다.

이 모양을 concurrent(실제로는 아니지만) 하다고 할 수 있습니다.

위 코드에 대한 설명은 유튜브의 코드 스피츠를 기반으로 작성되었습니다.


