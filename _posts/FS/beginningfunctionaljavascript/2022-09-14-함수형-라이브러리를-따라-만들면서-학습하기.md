---
layout: post
title: 함수형 라이브러리를 따라 만들면서 학습하기
date: 2022-09-14 02:05 +0900
categories: ["Beginning Functional JavaScript"]
---

Beginning Functional JavasScript라는 도서는 함수형 라이브러리들을
직접 제작해보면서 따라 배우는 식의 함슥 방식을 권장한다.


사실 이런 방식은 여러 다른 함수형 관련 도서들이 채택하고 있는 방식이기도 하다.


위 방법에 나만의 학습을 위해 추가로 하고 있는 일은 해당 도서에서 제공하는 코드들을 기반으로
iterable한 코드를 작성해보는 것이 목적이다.


코드를 하나씩 살펴보자
```js
// src/times.js
function times(n=0,f){
  for(let i=0;i<n;i++){
    f(i)
  }
}

export {times}
```

횟수를 입력받고 입력 받은 횟수만큼 i를 늘려가며 전달받은 함수에 그대로 넣어주고 실행하는 함수이다.


이런건 iterable하게 작성할 수 있을 것 같다.


```js
// src/L/times.js
function* times(n=0,f){
    let i = 0;
    while(i < n){
        ++i;
        yield f(i);
    }
}
export {times}
```

그 다음은 predicate를 역으로 만들어주는 함수인 unless를 만들어보자.
이런 함수는 clojure나 다른 모든 함수형 언어에도 기본적으로 탑재 되어 있는 경우가 많다.


```js
// src/unless.js
function unless(predicate,f){
  if(!predicate){
    f()
  }
}
export {unless}
```


간단하지만 아니 간단해야만 하는 함수형 코드들은 정말 매력적이다.



