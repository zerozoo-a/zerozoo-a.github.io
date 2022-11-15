---
layout: post
title: how to find duplicated number in array using node-js
date: 2022-11-15 23:48 +0900
categories: ["algorithm"]
---

## 어떻게 하면 배열 내부의 중복 숫자를 찾을 수 있을까?

반복문을 중첩하는 것으로 해결을 보려는 분들은 조금이나마 알고리즘에 대한 조예가 있다면 
섣불리 그러한 코드를 작성하려 하지 않을 것입니다.

이유는 O(n^2)의 속도로 문제를 해결하는 코드는 개발자에게 알러지를 일으킬 수 있기 때문입니다.

뭐.. 물론 배열이 작은편이고 해당 사이즈의 배열만이 입력으로 들어온다고 하면 크게 개의치 않고 사용하실 수도 있는데요.

아무튼 배열 내부의 중첩값을 확인하는 방법 중 가장 떠올리기 쉬운게 바로 반복문의 중첩인 것은 맞습니다.


이런 방식으로요

```js

function hasDuplicateValueIn(array){
  let result = false;
  for(let i = 0; i < array.length; i++){
    for(let j = 0; j < array.length; j++){
      if(i !== j && array[i] === array[j]){
        result = true;
      }
    }
  }

return result
}
```
이 코드는 아주 잘 작동하는 코드입니다.

하지만 array의 길이가 10, 100, 1,000, 10,000, ... 늘어남에 따라 시행 속도는 지수적 상승 곡선을 그려
아주 느린 속도로 작동하게 됩니다.


만약 이 반복문이 하나라면 어떨까요? 지수 그래프는 그리지 않아도 되므로 더욱 좋겠네요.
아래의 코드는 아주 간단하면서도 중복 여부를 O(n)의 타임컴플렉스로 검사합니다.

```js
function hasDuplicateValue(A) {
  const set = new Set();
  let result = false;

  for (let i = 0; i < A.length; i++) {
    if (set.has(A[i])) {
      result = true;
      break;
    } else {
      set.add(A[i]);
    }
  }

  return result;
}
```
set 객체를 통해 이미 값이 입력 된 적이 있다면 반복문을 끊고 나와 값을 반환해주게 됩니다.

크게 무언가를 하지는 않았지만 위와 같은 테크닉은 여러 문제에서 아주 많이 활용되게 됩니다.