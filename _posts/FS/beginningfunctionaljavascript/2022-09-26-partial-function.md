---
layout: post
title: partial 함수와 부분 적용에 대해
date: 2022-09-26 21:29 +0900
categories: ["Beginning Functional JavaScript"]
---


이번에 알아볼 함수는 partial 함수입니다.

라이브러리마다 구현이 약간씩 다르지만 구현하고자 하는 형태는 다들 비슷한 것이 함수형 언어의 특징인 것 같습니다.


각설하고 바로 무엇인지 알아볼까요?


### 용도

```js
setTimeout(()=>{console.log('Hello, World!_1')}, 1000)
setTimeout(()=>{console.log('Hello, World!_2')}, 1000)
setTimeout(()=>{console.log('Hello, World!_3')}, 1000)
```
예를 들어 위와 같은 코드가 있다고 가정합시다.


여러분들은 중복되는 부분을 쉽게 찾으실 수 있으실 겁니다. 만약 위와 비슷한 코드가 몇 백번 더 반복되어야 하는 상황이라고 가정한다면
이러한 코드는 추상화를 거쳐야 할 것입니다.


예를 들어 1000이라는 숫자가 계속 중복 되는게 보입니다. 

`setTimeoutOneSec(()=>{console.log('Hello, World!)})` 이러한 코드가 존재한다면 조금은
편해지지 않을까요? 1 초라는 시간을 이미 `setTimeoutOneSec`라는 함수가 미리 내장하고 있는 것입니다.


여기서 커링을 떠올리실 수 있겠습니다. 물론 커링을 활용하여 해결 가능한 문제이기도 합니다.


하지만 `partial`이라는 함수를 사용해 문제를 해결해보도록 합시다.


---


### 코드

```js
export function partial(f, ...partialArgs) {
  let args = partialArgs;

  return function (...fullArguments) {
    let arg = 0;
    for (let i = 0; i < args.length && arg < fullArguments.length; i++) {
      if (args[i] === undefined) {
        args[i] = fullArguments[arg++];
      }
    }
    return f.apply(null, args);
  };
}

const a = partial(setTimeout, undefined, 1000);
a(() => {
  console.log("hola!");
});

```

조금은 복잡해보입니다만 가이드를 따라 읽어보면 크게 어려운 부분은 없습니다.


1. partial 함수는 우선 함수와 인자들을 받습니다.
2. 그리고 인자를 추가로 받는 함수를 반환합니다.
3. 내부에서 반복문이 돌지만 바로 이해하기엔 정보가 부족하므로 넘어갑시다.
4. 클로저로 처음 받아두었던 함수에 접근해 apply 함수를 통해 f 함수에 값을 넘겨주며 실행시킵니다.

넘어간 부분이 있지만 partial 함수를 이해하는데 성공했습니다. 

작동하는 방식이 커링과 비슷하다는 점과 반환된 함수를 통해 인자를 또 받아간다는 사실을 이해했으면 거의 다 온 것입니다.



이제 넘어간 부분을 이해하기 위해 함수를 사용해보며 이해를 더 깊게 해봅시다.


```js
const a = partial(setTimeout, undefined, 1000);
a(() => {
  console.log("hola!");
});
```

눈에 띄는 점은 `undefined`를 인자로 받는다는 점입니다.

원래 setTimeout 함수의 인자로 `undefined`를 넣을만한 이유는 없습니다.

그러곤 a라는 변수는 partial에 의해 반환된 함수입니다. 
이 함수는 인자로 callback 함수를 받는 것을 확인할 수 있습니다.


![깨달은_소년](https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTJfMTY4/MDAxNTg5MjE1ODQyMDM4.YNI2hUs08n7dRnc_oLBRDh57Bd4l7bsXMqdv9jOKz5Mg.Z7QfBAm1ysUYhvOtIUFfctiuaWSrl-obPt4obPBaKCEg.JPEG.z12wow/DA3FC70F-5BC4-441C-A09B-E6D199CC9E05-4613-000001D10EB35418_file.jpg?type=w800)


이제야 이해할 수 있습니다! 🙆‍♂️ 

partial의 정체를 말이죠


반복문은 undefined를 콜백 함수로 치환하기 위해 존재한 것이였습니다.

반복문으로 인자를 순회하면서 undefined를 올바른 인자로 바꾸어내고 순회가 끝난 후 apply 함수를 통해
배열형태의 인자를 함수의 인자로 집어넣어주면서 함수를 실행시켜준 것입니다.

이로써 반복문을 순회하면서 `args = [undefined, 1000] >>> [()=>{console.log("hola")}, 1000]`으로 바뀌게 된 것입니다.


이해가 끝났다면 코드를 다시 봐주시길 바랍니다. 물론 예외처리나 이런 부분이 전혀 안되어 있지만 partial 함수라는
아이디어를 이해하기에는 위 코드만으로도 충분합니다.



    