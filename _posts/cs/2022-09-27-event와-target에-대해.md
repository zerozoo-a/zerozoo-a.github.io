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
    <div id="wrapper" onclick="onClickHandler()">
        div is here!
    <button id="btn">hi</button>
    </div>

    <script text="javascript">
        const btn = document.getElementById("btn")
        const div = document.getElementById("wrapper");
        function onClickHandler(){
            console.log('hi')
            console.log(div.e)
        }
    </script>
</body>
```
이벤트를 발생시키는 node는 button이겠지만 div에서도 현재 이벤트가 발생했는지 알아낼 수 있습니다.

위 html 파일을 보게되면 button에는 별 다른 이벤트가 심어져 있지 않습니다.
하지만 button을 누르게 되었을 때 아무 상관도 없는 div의 이벤트가 실행됩니다.


즉 DOM의 부모 node는 자식 node의 이벤트가 어디에서 발생한 것인지 정확히 파악할 수 있다는 말입니다.

따라서 target은 이벤트를 트리거한 node를 가리키게 됩니다.

> 다시 말하면 event.target은 이벤트를 발동시킨 실제 클릭한 요소를 가리킵니다.






