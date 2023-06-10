---
title: reduce란 무엇인가
date: 2023-06-10 09:22:10
coverURL: https://us.123rf.com/450wm/kupparock/kupparock1302/kupparock130200033/17797534-%EC%A0%91%ED%9E%8C-%EC%88%98%EA%B1%B4.jpg
---

<br>
<br>
<br>

## reduce란 무엇인가
---

수학을 배우다보면 정의 -> 활용의 순서로 배우게 됩니다.

reduce란 무엇인지 알아봅시다.

> reduce() 메서드는 배열의 각 요소에 대해 주어진 리듀서 (reducer) 함수를 실행하고, 하나의 결과값을 반환합니다.

reduce는 reducer함수를 실행한다.. 아리송합니다.
reducer는 뭘까요?

> 리듀서 함수는 네 개의 인자를 가집니다. <br>
> - 1️⃣ 누산기 (acc)
> - 2️⃣ 현재 값 (cur)
> - 3️⃣ 현재 인덱스 (idx)
> - 4️⃣ 원본 배열 (src)
<br>
> 리듀서 함수의 반환 값은 누산기에 할당되고, 누산기는 순회 중 유지되므로 결국 최종 결과는 하나의 값이 됩니다.


그렇습니다 reduce는 reducer함수를 실행하는 실행부이고 
reducer는 concrete한 함수를 지니고 있는 구현체입니다.

<br>
<br>
<br>

## 그래서 뭔말이야?
---

reduce 함수가 하고 싶은 일을 요약하자면 

시퀀스들을 하나의 어떤 값으로 뽑아낸다는 것입니다.


예를 들어보죠

```js
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```
위의 배열이 있다고 합시다. 위 배열의 인자를 모두 더한 하나의 값으로 만들고 싶다면
어떻게 해야 할까요?

반복문을 실행하면 되겠습니다

```js
let sum = 0;
[1, 2, 3, 4, 5, 6, 7, 8, 9].forEach(a => sum += a);
console.log(sum); // 45
```

이런식입니다. 

전혀 reduce 함수를 사용하지 않아도 구현 할 수 있습니다.

reduce 함수를 사용하면 이런 느낌이겠습니다.
```js
[1,2,3,4,5,6,7,8,9].reduce((acc, cur)=> acc + cur);
```
와! 좀 짧아졌네요! 

reduce 함수는 reducer 함수의 인자가 3개일 때와 2개일 때 다르게 작동합니다.
2개인 경우 시퀀스의 첫 인자를 시작 값으로 합니다.

위의 예를 들면 reducer 함수가 인자를 2개 받으므로 1이 위 reducer 함수의 시작값이 됩니다.

<br>
<br>
<br>

## reduce를 사용해 압축하기 (접기)
---

하나의 상황을 가정해보죠 이런 일은 생각보다 현업에서도 있습니다.

아래의 cars라는 변수에는 객체를 담은 배열이 있습니다.

그런데 좀 정리를 하고 싶습니다. 예를 들어 make 별로 정리를 하고 싶다고 가정하죠
물론 여러 방법이 있겠습니다만 reduce를 사용해 이 문제를 해결해봅시다.

```js
// cars라는 배열을
const cars = [
    { make: 'audi', model: 'r8', year: '2012' },
    { make: 'audi', model: 'rs5', year: '2013' },
    { make: 'ford', model: 'mustang', year: '2012' },
    { make: 'ford', model: 'fusion', year: '2015' },
    { make: 'kia', model: 'optima', year: '2012' }
];

// 이런 형태로 만들고 싶습니다.
{
    "audi": [
        {
            "make": "audi",
            "model": "r8",
            "year": "2012"
        },
        {
            "make": "audi",
            "model": "rs5",
            "year": "2013"
        }
    ],
    "ford": [
        {
            "make": "ford",
            "model": "mustang",
            "year": "2012"
        },
        {
            "make": "ford",
            "model": "fusion",
            "year": "2015"
        }
    ],
    "kia": [
        {
            "make": "kia",
            "model": "optima",
            "year": "2012"
        }
    ]
}
```

여기서 현업의 개발자라면 자동차의 maker는 이것보다 훨씬 많고 앞으로도 늘어날지 모른다라는 점과
확장 가능하면서도 유연한 코드를 작성하고 싶어 할 것입니다.

이제 여기서 reduce가 등장합니다.


<br>
<br>
<br>

## 예제
---

```js
const cars = [{ make: 'audi', model: 'r8', year: '2012' }, { make: 'audi', model: 'rs5', year: '2013' }, { make: 'ford', model: 'mustang', year: '2012' }, { make: 'ford', model: 'fusion', year: '2015' }, { make: 'kia', model: 'optima', year: '2012' }];


cars.reduce((acc,cur)=>{
    if(acc[cur.make]) { // 누적 값에 make가 이미 있다면
        acc[cur.make].push(cur); // 누적 값의 배열에 push
    } else {
        acc[cur.make] = [cur]; // 아니면 make를 key로 배열을 생성
    }
    return acc; // 누적 값을 다음 시퀀스 인자에 넘겨준다.
},{}) // 빈 객체부터 시작
```


<br>
<br>
<br>

## 예제의 설명
---


reduce에 친숙하지 않다면 위 코드는 살짝 머리아플 수 있습니다.
하지만 괜찮습니다.

알고보면 어려울게 하나도 없습니다.


위 코드는 빈 객체부터 시작합니다.

acc에는 빈 객체가 담겨 있습니다.
만약 빈 객체에 make라는 key가 있다면 값을 추가하고
아니라면 key를 기준으로 배열을 만들어줍니다.

이게 끝나면 다음번 순회에 acc값을 넘겨줍니다. 

다음번 순회는 지난 번 acc 값이 그대로 채워진 상태로 시작합니다.

```js
{
    audi: [{
        "make": "audi",
            "model": "r8",
            "year": "2012"  
    }]
}
```

이번 순회하는 cur의 make가 audi라면 if문을 통과해
배열에 push하게 됩니다. 이를 다시 다음 시퀀스에 넘기게 됩니다.


따라서 배열이 하나의 객체로 "접히는" 압축되는 함수인 것이죠.


<br>
<br>
<br>

## 마무리
---


> 보통 pipe나 go 함수를 통과해 시퀀스를 계산 및 필터링하고
reduce를 통해 모두 접어 하나의 객체나 값으로 뽑아내어 주는 것

이게 핵심입니다.

응용은 아주 많습니다. pipe나 go도 모두 reduce를 사용하고 있으니까요


pipe, go는 나중에 기회가 되면 설명하겠습니다.