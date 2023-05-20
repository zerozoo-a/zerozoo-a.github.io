---
title: iframe을 다루면서 느낀 점
date: 2023-05-20 01:22:40
---

회사 프로젝트로 iframe을 다루게 되면서 알게된 것들을 정리하겠습니다.

iframe은 개인적으로 사용하는 걸 꺼리는 편입니다.
이유는 무겁기 때문인데요, 브라우저 내부에 하나의 브라우저를 더 띄우는 것은
자바스크립트 환경이 독립적으로 하나 더 생성된다는 말이기도 합니다.

iframe에 대한 자세한 내용은 [MDN](https://developer.mozilla.org/ko/docs/Web/HTML/Element/iframe) 같은 문서를 찾아보는게 가장 정확하고 좋습니다. (혹은 ecmascript 문서)

제가 느낀점 중에 가장 기록해두고 싶은 것은 iframe과 호스트의 이벤트 관계입니다.

예를 들어 호스트의 html 태그에 대한 클릭 이벤트를 걸어놓았다고 가정합시다.

이 때, iframe 내부의 텍스트에도 클릭 이벤트가 발동할까요?

아래 예제의 HTML을 보시면 host에는 event를 걸어두고 iframe에는 걸어두지 않았습니다. 

iframe은 html > iframe의 관계를 가지고 있어서 호스트의 이벤트도 발동 할 것이다! 라고 생각하면 안됩니다.

<script async src="//jsfiddle.net/zoo385/62xfc3pj/embed/js,html,css,result/dark/"></script>


그럼 어떻게 이런 문제를 해결해야 할까요?
바로 호스트에서 iframe내부에 접근하는 방법을 사용하는 것입니다.

[예시: w3schools](https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_iframe_contentdocument)

위 예시를 보면 본인의 Domain 하에 있는 사이트라면 조작이 가능합니다. (CORS 에러에 무관한)

__하지만 위 예시 처럼 구글을 띄워놓고 내가 심어둔 이벤트가 발동하게끔 코드를 짜면 안됩니다.__

(위 예시의 src 파일이 htm인 것은 무시하셔도 됩니다. (같은 뜻임))
