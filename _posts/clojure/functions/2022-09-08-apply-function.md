---
layout: post
title: apply function
date: 2022-09-08 20:52 +0900
categories: [functions]
tag: [apply]
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
```
아마 이런식으로 구현을 할 것 같다.



