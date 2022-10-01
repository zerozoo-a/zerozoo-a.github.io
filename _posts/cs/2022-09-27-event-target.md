---
layout: post
title: event와 target에 대해
date: 2022-09-27 21:55 +0900
categories: [cs]
tags: [html]
---

## html은 기본적으로 tree 구조를 가집니다.

프론트엔드에서 가장 많이 하는 것은 특정 dom tree의 node에서 발생하는 이벤트를 감지하고
이벤트에 대해 특정 JavaScript를 실행시켜 유저와의 interaction을 수행하는 일입니다.

그럼 이제 `event.target`가 뜻하는 바가 무엇인지 알아봅시다.


> The read-only target property of the Event interface is a reference to the object onto which the event was dispatched. It is different from Event.currentTarget when the event handler is called during the bubbling or capturing phase of the event.

event는 event를 발동시킨 dom만 감지할 수 있는 것이 아닙니다.

트리구조로 인해 버블링, 캡쳐링 과정을 거쳐 DOM 노드들을 돌아다니게 됩니다.


예를 들어 
```html
<body>
    <div id="wrapper">
        div is here!
    <button id="btn" onclick="onClickHandler()">hi</button>
    </div>

    <script text="javascript">
        function onClickHandler(){
            console.log('hi')
        }
    </script>
</body>
```
이벤트를 발생시킬 수 있는 node는 위 코드상에서 볼 때 div 태그입니다.

하지만 button을 눌러도 div의 이벤트 심어져 있는 콜백 함수가 작동합니다.

이는 DOM의 가장 내부에 존재하는 node로 부터 가장 바깥쪽까지 이벤트를 버블링하는 과정이라고 생각하면 됩니다.


즉 가장 내부에서 발생한 이벤트가 외부로 버블링 되면서 외부의 이벤트들도 모두 실행시키게 됩니다.


한가지 예를 더 봅시다.

```html
    <div id="wrapperWrapper" onclick="onClickHandler2()">
        div wrapper is here

    <div id="wrapper" onclick="onClickHandler()">
        div is here!
    <button id="btn">hi</button>
    </div>

    </div>

    <script text="javascript">
        function onClickHandler(){
            console.log('hi')
        }

        function onClickHandler2(){
            console.log('hello')
        }

    </script>
```

div가 하나 더 감싸고 있네요.

이제 버튼에는 이벤트가 달린게 없지만 버튼을 누르면 hi, hello가 차례로 콘솔에 찍히게 됩니다.

> id가 wrapper인 div를 클릭하면 마찬가지로 hi, hello가 찍히고
id가 wrapperWrapper인 div를 클릭하면 hello만 찍히게 됩니다.

이제 확실히 알 수 있습니다. 안에서 바깥으로 나가는 것이 버블링입니다.
거품을 불면 작은 거품이 커지면서 결국 터져버리는 것 처럼 이벤트가 안에서 바깥을 향하는 모습을 추상화 한 것입니다.

여기서 버블링에 대해 생각해보면

버블링은 기본적으로 좋은 현상입니다. 무언가 화면을 잘못 클릭하여 사용자의 이벤트가 무시되는 일이 없게 해주는 역할을 해줍니다.


하지만 결국 무언가 자원을 사용하는 것은 분명할 것입니다. 이를 `event.stopPropagation`을 통해 버블링을 멈출 수 있습니다만.
꼭 필요한 경우가 아니라면 그냥 두는 것이 좋습니다.


한 요소에 여러 이벤트 핸들러가 달려 있다면 `event.stopImmediatePropagation`을 사용해 관련된 모든
버블링을 막을 수 있습니다.



안에서 밖으로 나가는 이벤트가 있다면 반대인 경우도 있습니다.

바로 캡쳐링입니다

사용하는 경우는 저도 못봤습니다만 정리하고자 남겨둡니다.


캡쳐링은 최상단인 window부터 특정 노드까지 이벤트를 캡쳐링하며 내려 보냅니다.


사용하는 방법은

`addEventListener(callback(),{capture: true})`를 통해 사용할 수 있습니다.
이벤트를 걸어둘 때 이 이벤트는 캡쳐링 방식으로 동작한다고 표기해야만 캡쳐링이 동작합니다.

윈도우에서부터 특정 노드를 찾기 위해서는 무언가 표식이 있어야만 찾아갈 수 있기 때문입니다.


한 줄 요약
> target은 부모요소로 부터 실제 이벤트가 발생했는지에 대한 정보를 받을 수 있는 수단입니다.






