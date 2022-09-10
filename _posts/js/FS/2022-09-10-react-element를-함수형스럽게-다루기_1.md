---
layout: post
title: React element를 함수형스럽게 다루기_1
date: 2022-09-10 17:02 +0900
categories: [JS, FS]
---

## 출처 
이 포스트는
[Jack Hsu](https://jaysoo.ca/2017/04/30/learn-fp-with-react-part-1/)
님의 블로그와 [itchallenger](https://itchallenger.tistory.com/m/543)님의 블로그를 보고
저의 해석을 붙이며 만든 포스트입니다.

---

인터넷을 돌아다니던 중 제가 react를 사용하면서 늘 고민이던 부분을 시원하게 그리고 너무나도 잘
설명해준 포스트를 만났습니다. 그게 바로 위 출처입니다. 감사합니다. 🙇‍♂️

---

react의 함수형 component를 사용하다 보면 이런 의문이 들고는 했습니다.
함수형 component이지만 좀 더 함수형스러운 사용법을 취할 수는 없는 것인가?


예를 들어 이런 것입니다.

```js
go(range(1,10),
    odd,
    sum,)
```
위와 같은 함수형 thread를 작성하듯 dom을 다루는 것도 이렇게 다루는게 가능하지 않을까?
라는 생각입니다.

서론이 너무 길어져 바로 코드를 보시는게 좋겠습니다.

제가 바라는 결과물은 간단합니다.
```js
const hello = ({name}) => <span>{name}</span>
const li = (element)=><li>{element}</li>
const ul = (element)=><ul>{element}</ul>
```
위와 같은 함수를 연속적으로 호출하여 `ul > li > hello`의 자식 관계를 가지는 dom을 그려내면 되는 것이죠.

이제 위의 선지자이신 Jack님의 코드를 보며 작성한 코드는 아래와 같습니다.

```js
const View = (computation) => ({
    fold: computation,
    map:(wrapper)=>View((props) => wrapper(computation(props)))
})

const foo = ({foo})=><div>foo: {foo}</div>
const li = (element) => <li>li: {element}</li>
const ul = (element) => <ul>ul: {element}</ul>
const test = View(foo)
    .map(li)
    .map(ul)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      {test.fold({foo:"bar"})}
  </React.StrictMode>
);
```

View 함수를 자세하게 이해하면 어려운 부분은 아마 없을 것 같습니다.


1. View 함수는 함수를 인자로 받습니다.
2. View 함수의 map 메소드는 다시 View 함수를 호출하여 map 함수의 인자인 함수로
computation 즉, 두 번째로 호출 된 View 함수는 바로 직전 함수의 인자값를 
를 호출하는 함수를 인자로 넘겨줍니다.


---
### 이게 대체 무슨 말인가 🤷

처음 View의 인자로 들어간 함수를 a라고 합시다.


map 함수에 인자로 넣어준 함수를 b라고 합시다.


props는 마지막에 입력되어 함수를 실행시킵니다.

map 함수가 반환하는 것은
`View((props)=>b(a))` 이다.
이제 알맹이가 없는 상태의 함수들의 연속적인 호출만 정의 되었다.


```js
(props)=><li><span>{name}</span></li>
```

자 여기서 한 번 더 map을 호출하면

```js
(props)=><ul><li><span>{name}</span></li></ul>
```

wrapper는 계속 중첩되어도 상관 없다.

이제 알맹이만 넣어주면 된다.

```js
test.fold({foo:"bar"}) // 이게 props 값을 넣어주는 행위
```

fold에 저장해둔 computation 함수(a)를 실행시킴으로써 그 순간부터 나머지 함수들도
연속적으로 실행 된다.

이제 원하던 방식으로 react 코드를 다룰 수 있게 되었습니다.


### Recap
제가 생각한 map 함수의 구조입니다.
이렇게 함수들만 중첩하다가 fold를 통해 값을 입력 받으면 그제서야 실행되는 지연평가 함수인 것이죠
```js
const test = {fold:"foo()",
  map:{
    fold:"ul()",
     map:{
        fold:"li()",
         map:"f(x)"
     } 
  }
}
```


---
### of를 추가하자
한가지 더 추가해봅시다.
이런 식의 사용도 가능합니다.
```js
View.of = (x) => View(() => x)
View.of(<a>link</a>).fold() // <a>link</a>
```

---

### 놀랍게도 여기서 끝이 아닙니다.  contramp
(🧎끝내줘..)



```js
const View = (computation) => ({
    fold: computation,
    map:(wrapper)=>View((props) => wrapper(computation(props))),
    contramap:(g) => View(props => computation(g(props)))
})

const foo = ({foo})=><div>foo: {foo}</div>
const li = (element) => <li style={{textTransform:"uppercase"}}>li: {element}</li>
const ul = (element) => <ul style={{fontSize:"large"}}>ul: {element}</ul>
const test = View(foo)
    .map(li)
    .map(ul)

const color = View(({color})=>(<span style={{color}}>{color}</span>))
const blue = color.contramap((props) => ({...props, color:'blue'}))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      {
         test.fold({foo:"bar"})
      }
      {
          blue.fold()
      }
  </React.StrictMode>
);


```

View 함수에 넣어줄 component에 props를 넣어주고 싶어졌다면 어떻게 해야 할까요?


그냥 바로 인라인 스타일을 넣어주어도 같은 결과를 얻을 것입니다만, 
지속 가능한 코드라고 보기에는 어렵죠


위 코드를 보고 contramap을 이해해 봅시다.


View 함수에 contramap이 추가 되었습니다.


```js
const View = (computation) => ({
    fold: computation,
    map:(wrapper)=>View((props) => wrapper(computation(props))),
    contramap:(g) => View(props => computation(g(props)))
})

const color = View(({color})=>(<span style={{color}}>{color}</span>))
const blue = color.contramap((props) => ({...props, color:'blue'}))
```
contramap이 하는 일은 생각보다 단순할지 모르겠습니다. 

color가 가지고 있는 View computation에 인자를 받아 넣어준 것이 전부이죠
color computation은 이미 props를 받을 준비가 되어 있습니다.

이는 위치를 지정하고 props를 내려주는 react의 관계와 다를 바가 없습니다.

contramap은 map과 합성 순서가 반대라는 점이 다릅니다.

---

### 마지막 concat
(세상에..🥲)

마지막은 concat이네요 두 시퀀스들을 이어주는 그 것입니다.

현재 View에서 바라보고 있는 computation과 인자로 받은 값을 fold 해버리면 되겠죠?

점점 함수형에 가까워지고 있는게 보입니다.
```js
const View = (computation) => ({
    fold: computation,
    map:(wrapper)=>View((props) => wrapper(computation(props))),
    contramap:(g) => View((props) => computation(g(props))),
    concat:(other) => View((props)=>(
        <React.Fragment>
            {computation(props)}
            {other.fold(props)}
        </React.Fragment>
    ))
});
View.of = (x)=>View(()=>x)

const foo = ({foo})=><div>foo: {foo}</div>
const li = (element) => <li style={{textTransform:"uppercase"}}>li: {element}</li>
const ul = (element) => <ul style={{fontSize:"large"}}>ul: {element}</ul>
const test = View(foo)
    .map(li)
    .map(ul)

const color = View(({color})=>(<span style={{color}}>{color}</span>))
const blue = color.contramap((props) => ({...props, color:'blue'}))
const red = color.contramap((props)=>({...props, color:'red'}))

const header = View.of(<h1>Awesome App</h1>)
const greeting = View(({name}) => <p>Hello {name}!</p>)
const footer = View.of(<p>Good Footer</p>)

const main = header.map(x=><header style={{color:'red'}}>{x}</header>)
    .concat(greeting.contramap(()=>({name:"zerozoo"})))
    .concat(footer.map(x=><footer style={{color:'blue'}}>{x}</footer>))
const centered = main.map(x=><div style={{textAlign:"center"}}>{x}</div>)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      {
          centered.fold()
      }
  </React.StrictMode>
);


```











