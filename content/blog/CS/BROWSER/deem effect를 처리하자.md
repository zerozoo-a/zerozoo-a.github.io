---
title: deem effect를 처리하자
date: 2023-05-09 22:09:01
---
<div>
<img alt="뭔가 사라지는 인간의 그림" src="https://www.shutterstock.com/image-vector/concept-passing-time-man-who-260nw-1749497999.jpg">  
<a href="https://www.shutterstock.com/ko/search/disappear">출처</a>
</div>
개인적인 일로 바쁜와중에 글을 써봅니다.

frontend 개발자라면 deem effect를 가끔 구현 할 일이 생깁니다.
이번에 제가 effect를 구현하면서 마주한 문제와 해결 방법에 대해 작성해봅니다.

해결은 framework에 관계없이 바닐라js만을 사용하겠습니다.

browser 상에서 동작하는 것을 기본으로 합니다.

deem이라는 것은 기본적으로 애니메이션을 동반하게 됩니다.
<iframe src="https://giphy.com/embed/AQRapWCgC7dThyVEYb" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/bandainamco-dark-souls-dsr-remastered-AQRapWCgC7dThyVEYb">via GIPHY</a></p>

어두웠다가 밝아지고 밝아졌다 어두워지는 등의 애니메이션이 들어가게 됩니다.

deem이 없는 상태

deem 처리가 된 상태

deem을 종료하는 액션이 발생

deem이 종료된 상태

간략하게 4가지 스텝으로 나누고 이에 시간을 두어 이펙트를 주면 애니메이션이 되는 것이죠

제가 마주한 문제는 바로 마지막 deem이 종료된 상태입니다.


무엇이 문제일까요?

바로 deem이 종료되면 해당 DOM은 더 이상 쓸모가 없기에 지워주려한다! 라는 점이 문제입니다.

좀 더 자세히 설명하면

deem의 종료 animation이 2초라고 가정합시다.
deem을 종료시키는 event가 발생하고 어떤 상태 값이 변경되면 해당 DOM을 DOM tree에서 지우려 합니다.


보통 framework에서는 if 혹은 삼항연산자를 통해 해당하는 DOM을 지워주곤 합니다.

**그럼 놀랍게도 animation이 끝나기도 전에 DOM이 삭제됩니다.**


그렇습니다. js는 animation이 끝나고 DOM을 삭제하는 것이 아니라 의존하고 있는 상태값의 변경에 따라 DOM을 삭제합니다.

CSS IN JS를 사용하거나 한다면 JS를 더 사용해 이를 해결 할 수도 있겠습니다. 혹은 timer등을 걸어두어도 해결이 가능하겠죠

하지만 전 위 방법이 지저분하다는 느낌을 강하게 받았습니다.

현재는 JS의 많은 framework들이 각자의 lifecycle 위에서 코드를 짜고 직접 DOM에 개입하는 것은 지양하도록 가이드합니다.

맞습니다. DOM을 직접 건들게 되면 다른 개발자가 보기에 framework에서 가이드하는 패턴이 아닌 JS가 브라우저를 직접 조작하게 되는 것이니까요 코드의 일관성이 깨지게 됩니다.

그건 그거고 우선 문제부터 해결해봅시다.

문제의 해결 방법은 간단합니다.

```js
const animated = document.querySelector(".animated");

animated.addEventListener("animationend", () => {
  console.log("Animation ended");
});
```
바로 animationed를 사용하는 것입니다.
특정 DOM node가 css의 특정 animation을 구독하고
animation이 종료되면 해당 소식을 전파받고 callback 함수를 실행합니다.


이 방법은 DOM node에 직접 접근하여 이벤트를 등록하는 것입니다.

> DOM node에 이벤트가 발생했을 때 해당 callback을 실행시켜주면 그 때 원하는 DOM을 삭제해주세요
그러면 animation이 종료된 후에 DOM노드가 삭제됨을 보장합니다.
