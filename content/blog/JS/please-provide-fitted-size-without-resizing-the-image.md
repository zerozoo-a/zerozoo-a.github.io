---
title: reflow 하지 않고 이미지를 제공하는게 좋은 이유
date: 2023-06-11 10:35:50
coverURL: 
---

<br />
<br />
<br />

## reflow에 대해
---

reflow는 브라우저의 메인 쓰레드가 그려놓은 DOM의 레이아웃이 변경되어
새로 그리는 것을 가리킵니다.

결과적으로 렌더링 성능을 악화시킵니다.

이 글에선 이미지 태그를 통해 reflow가 브라우저 렌더링 과정에 미치는 영향을
알아보도록 하겠습니다. 

**자세한 기술적 내용은 링크를 참조해주세요**
<a href="https://developers.google.com/speed/docs/insights/browser-reflow?hl=ko">브라우저 리플로우 최소화</a>


<br>
<br>
<br>

## 리플로우가 일어나는 시점 🤔
---

이미지의 리사이즈는 브라우저 렌더링 과정에서 reflow를 유발합니다.

아래의 예시는 대략적인 브라우저 렌더링 과정을 설명한 것입니다.

- 분홍색 사각형은 보라색 이미지 태그의 부모 태그입니다.
- 보라색 사각형은 유저가 입력한 imageURL을 기반으로 img 태그를 렌더링한 결과입니다.

1. 사이트는 아래와 같은 레이아웃을 가지고 있습니다.
{% image "./explain-reflow.png", "reflow" %}

<br>
<br>

2. 보라색 사각형은 유저들이 입력한 image로 사이즈가 제각기 다릅니다.
{% image "./explain-reflow-2.png", "reflow" %}

<br>
<br>

3. 따라서 image의 사이즈를 resize(width, height값 조정)하여 레이아웃에 맞게 변경합니다.
{% image "./explain-reflow.png", "reflow" %}

**이 때 reflow가 발생합니다.**


<!-- 브라우저의 메인 쓰레드는 CSS를 읽어들여 DOM 노드에 computed style을 확정합니다. -->

1. 브라우저의 메인 쓰레드는 DOM(document object model)을 먼저 그려 
DOM Tree를 생성합니다. (DOM Tree의 레이아웃이 확정됩니다.)

2. 다시 메인 쓰레드는 CSS 파일을 parsing해 그려놓은 DOM Tree에 스타일을 입히게 됩니다. (DOM Tree의 레이아웃이 CSS의 width, height 속성에 의해 재정의 되며 레이아웃을 다시 정의하게 됩니다.)

3. reflow에 의해 새로 그려진 화면을 유저가 봅니다. 👀

문제는 reflow를 유발하는 것이고
해결방법은 reflow를 유발하지 않는 것입니다.

단순하죠?

<br>
<br>
<br>

## reflow를 방지하는 단순하지만 강력한 방법
---

유저들이 가져온 이미지들은 사이즈를 알 수 없습니다.
물론 width, height를 정하는 등의 제약을 걸 수 있습니다만

위의 예시로 든 보라색 사각형은 게시글의 cover 이미지로
모든 게시글마다 같은 사이즈를 부여 할 것입니다.

90 * 90의 사이즈를 정해놓고 해당 사이즈만 사용한다고 하면

reflow를 방지 할 수 있습니다.

어떻게 하면 좋을까요?

바로 리사이즈 작업을 클라이언트에서 서버로 옮기는 것입니다.

1. 이미지를 서버에서 사이즈 width * height로 변환한다.
2. client에서 css를 제거한다.

(이렇게 말은 참 쉽습니다. 🙈)

서버 측에서 이미지를 고정해놓고 보내준다면 client 개발자는
그저 사용하기만 하면 될 뿐입니다.

반응형 사이트의 경우 small, medium, large등으로 사이즈를
정해놓고 

<a href="https://developer.mozilla.org/ko/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images">img태그에 srcset과 sizes을 제공하면 됩니다.</a>


```html
<img srcset="/examples/images/people_960.jpg 960w,
             /examples/images/people_575.jpg 575w"
     sizes="(min-width: 960px) 50vw,
            (min-width: 575px) 75vw,
            100vw"
     src="/examples/images/people_575.jpg" alt="people">
```

이렇게 반응형에도 대응 할 수 있도록 작성한다면 불필요한 css를 제거 할 수 있습니다.

## 정리

CSS에 의해 reflow, repaint등이 일어나는 것은 
버그도 에러도 아닙니다. 따라서 IDE나 compiler 등이 경고해주지 않죠

하지만 최적화를 하면 눈에 띄게 좋아지는 부분이기도 합니다.

물론 이미지를 제공하기전에 가공한다면 그 비용은 클라이언트에서 서버로 옮겨 갔을 뿐
비용이 존재한다는 사실이 변하는 것은 아닙니다.

이미지를 재조정하는 것은 서버에서도 아주 가벼운 작업은 아닌 것을 알아야 합니다.
