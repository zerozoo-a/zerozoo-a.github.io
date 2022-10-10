---
layout: post
title: An unnecessary mistake of javascript
date: 2022-10-10 22:19 +0900
categories: mjfp
---

## 자바스크립트 실수 줄이기

```js
fetch("url").then((data)=>{
    calcSomething(data)
})
```
이러한 코드는 자바스크립트 개발자에게 있어 친숙한 코드입니다.

하지만 이러한 코드는 아래와 같이 다시 쓸 수 있습니다.

```js
fetch("url").then(caclSomething)
```

위의 코드와 같은 일을 하면서도 더 짧은 코드입니다.

위 코드의 장점은 아래와 같습니다.
1. 더 짧다.
2. 변수 할당에 실수할 일이 없다.
3. 함수 호출이 하나 줄어들기 때문에 위의 코드와 아래의 코드는 미세하지만 차이가 있습니다.

이러한 스타일 `point free style` 혹은 `tatic style`이라고 불립니다.
