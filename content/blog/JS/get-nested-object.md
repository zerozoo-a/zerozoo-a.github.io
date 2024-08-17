---
title: how to get nested object using js
date: 2024-08-17 21:30:21
coverURL: 
---
<br />
<br />
<br />


## 개요

## nested object란?

nested object는 중첩된 객체를 의미합니다.

이 글에서 중첩된 객체는 이런 객체를 의미합니다.

```js
const nested = {a:{b:{c:...}}}
```

## 개요

js를 이용해 중첩된 객체를 만들어보겠습니다.


## 방법

```js

function getNestedObject(str){
    const strs = str.split('/'); // ['a', 'b', 'c']
    let res = {};
    let cur = res;
    
    for(let i = 0; i < strs.length; i++) {
        cur[strs[i]] = {}; // (1) 객체를 생성
        cur = cur[strs[i]]; // (2) 생성한 객체를 가리킴
    }
    return res;
}

getNestedObject('a/b/c'); // {a: {b: {c: {}}}}

```

위 코드를 이용해 중첩된 객체를 동적으로 생성 할 수 있습니다.

## 설명

res는 객체를 저장 할 메모리 주소를 고정시키기 위해 선언합니다.

객체를 파고들어 nested하게 만들어주는 과정은 cur변수와 반복문이 이용됩니다.

### 순서

`cur[strs[i]] = {}`로 인해 
`res = {a: {}}`로 업데이트 됩니다.

저희는 이제 cur를 다음 작업에 필요한 포인터로 사용 할 것입니다.
다음 작업은 객체 b를 생성하는 것입니다. (a/b/c 이기에..)

객체 b는 a의 값의 객체 안에 생성되어야 합니다.
그 주소값을 알 수 있는 때는 그 변수가 생성될 때가 가장 좋을 것입니다.

그 변수는 바로 cur입니다.

cur는 객체를 생성하고, 이제 그 객체를 가리키게됩니다.
`cur = cur[strs[i]];` 방금 생성한 객체를 다시 가리키게 되면

cur는 res.a를 가리킵니다. 

위 과정을 반복하면 res 객체에 
1. key a, 값으로 {}를 생성,
2. 생성한 값을 가리킴,
3. 생성한 값에 key b, 값으로 {}를 생성,
4. 생성한 값을 가리킴...


이렇게 반복하면 중첩된 객체가 생성됩니다.




