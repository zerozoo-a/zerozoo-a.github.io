---
layout: post
title: apply function
date: 2022-09-08 20:52 +0900
categories: [functions]
tag: [apply clojure]
---

## apply 함수가 뭘까

```clojure
(+ 1 2 3) ; => 6
(def numbers-vector [1 2 3])
(def numbers-list '(1 2 3))
(apply + numbers-vector) ; => 6
(apply + numbers-list) ; => 6
```
단일 인자 혹은 인자들을 받는 함수에 vector, list를 넣을 수 있게 해준다.

자바스크립트에도 이런게 있다. 바로 apply이다.
```js
Math.max.apply(null,[3,6,9]) // 9
```

놀랍게도 자바스크립트에는 sum 함수가 없어서 알아서 만들어야 한다.
```js
function sum(numbers){
    let result=0;

    for(const number of numbers){
        result = result + number;
    }

    return result;
}
sum([3, 6, 9]) // 18

// 혹은

function _sum(numbers){
    return numbers.reduce((acc,cur)=>acc+cur,numbers[0]);
}
// 이런식의 작성도 가능하다.
```
js도 어느정도 수고로움이 들긴 하지만 작성이 가능하긴하다 하지만 js의 한계상
위 함수에 엉뚱한 값을 넣을 수도 있고.

typescript라면 타입검사로 막을 수 있기는 하겠지만,
배열이나 맵등 스칼라에 따른 분기 처리를 모두 해주어야 하는 번거로움이 있다.



