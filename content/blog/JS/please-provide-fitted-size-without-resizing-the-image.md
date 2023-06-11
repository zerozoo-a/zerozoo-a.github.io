---
title: 리사이즈 하지 않고 이미지를 제공하는게 좋은 이유
date: 2023-06-11 10:35:50
coverURL: https://images.unsplash.com/photo-1510193806518-f731c70a35bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80
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
<a target="_blank" href="https://developers.google.com/speed/docs/insights/browser-reflow?hl=ko">브라우저 리플로우 최소화</a>


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

3. image의 사이즈를 resize(width, height값 조정)하여 레이아웃에 맞게 변경합니다.
{% image "./explain-reflow.png", "reflow" %}

**이 때 reflow가 발생합니다.**


<!-- 브라우저의 메인 쓰레드는 CSS를 읽어들여 DOM 노드에 computed style을 확정합니다. -->

1. 브라우저의 메인 쓰레드는 DOM(document object model)을 먼저 그려 
DOM Tree를 생성합니다. (DOM Tree의 레이아웃이 확정됩니다.)

2. 다시 메인 쓰레드는 CSS 파일을 parsing해 그려놓은 DOM Tree에 스타일을 입히게 됩니다. 

3. **layout이 깨지게 되어 layout에 영향을 받은 모든 DOM 노드가 새로 계산됩니다.**

4. reflow에 의해 새로 그려진 화면을 유저가 봅니다. 👀

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

92 * 92의 사이즈를 정해놓고 해당 사이즈만 사용한다고 하면

reflow를 방지 할 수 있습니다.

어떻게 하면 좋을까요?

바로 리사이즈 작업을 클라이언트에서 서버로 옮기는 것입니다.

1. 이미지를 서버에서 사이즈 width * height로 변환한다.
2. client에서 css를 제거한다.

~~(이렇게 말은 참 쉽습니다. 🙈)~~


서버 측에서 이미지를 고정해놓고 보내준다면 client 개발자는
그저 사용하기만 하면 될 뿐입니다.


반응형 사이트의 경우 small, medium, large등으로 사이즈를
정해놓고 

<a target="_blank" href="https://developer.mozilla.org/ko/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images">img태그에 srcset과 sizes을 제공하면 됩니다.</a>


```html
<img srcset="/examples/images/people_960.jpg 960w,
             /examples/images/people_575.jpg 575w"
     sizes="(min-width: 960px) 50vw,
            (min-width: 575px) 75vw,
            100vw"
     src="/examples/images/people_575.jpg" alt="people">
```

이렇게 반응형에도 대응 할 수 있도록 작성한다면 불필요한 css를 제거 할 수 있습니다.

<br>
<br>
<br>

## 예시
---

예시 코드로 지금 이 블로그 게시글의 cover image를 리사이즈 한 코드입니다.

이미지의 resize를 위해 node.js의 <a target="_blank" href="https://www.npmjs.com/package/sharp?activeTab=readme">sharp</a>라는 라이브러리를 많이 사용하겠습니다.
```js
			const convertedBase64 = new Promise((resolve, reject) => {
				https.get( // url을 통해 image chunk를 받아옴
					url,
					{
						headers: {
							"User-Agent": "Mozilla/5.0",
						},
					},
					(res) => {
						const chunks = []; // chunks가 쌓일 배열

						res.on("data", (chunk) => { // data가 수신 될 경우 실행될 콜백 함수
							chunks.push(chunk); // event로 data를 chunks에 밀어 넣어 줌
						});

						res
							.on("end", () => { // 받아오는게 다 끝났다면 실행되는 콜백 함수
								const buffer = Buffer.concat(chunks); // Buffer를 통해 합쳐 줍니다.
								new Promise((res) => { // async await을 지원하지 않기 때문에 Promise 객체 사용
									res(sharp(buffer).resize(92, 92).toBuffer()); // image resize to 92, 92 라이브러리를 통한 리사이즈
								}).then((res) => {
									const base64 = res.toString("base64");
									resolve(base64); // base64 포멧으로 출력
								});
							})
							.on("error", (err) => {
								console.error(err);
								reject(err); // 에러 처리는 이 곳에서..
							});
					}
				);
			});

			return `data:image/png;base64,${await convertedBase64}`;
```

이런식으로 사용하게 되면 충분히 서버측에서도 이미지의 리사이즈가 가능합니다.
서버는 browser render와는 무관하므로 열심히 리사이즈를 할 수 있습니다.

이제 클라이언트는 이 이미지를 사용하기만 하면 됩니다.

서버측에서 이미지를 리사이즈 했을 때와 아닐 때의 차이를 보면..

- 🔽 882kb의 크기를 가진 이미지이며 css를 통해 사이즈를 줄여 92 * 92의 크기로 보여집니다.

{% image "./image-size-compare-a.png", "image 882kb"%}


- ️🔽 서버에서 리사이즈 되어 그냥 렌더링만 했습니다. 마찬가지로 92 * 92 사이즈입니다.

{% image "./image-size-compare-b.png", "image 18.3kb"%}

이미지 사이즈는 18.3kb입니다.

리사이즈를 통해 이미지 자체도 화질과 크기가 변경되어
이미지의 외곽이 잘릴 수 있다는 것을 명심해야합니다.


<br>
<br>
<br>

## 정리
---


CSS에 의해 reflow, repaint등이 일어나는 것은 
버그도 에러도 아닙니다. 따라서 IDE나 compiler 등이 경고해주지 않죠

하지만 최적화를 하면 눈에 띄게 좋아지는 부분이기도 합니다.

물론 이미지를 제공하기전에 가공한다면 그 비용은 클라이언트에서 서버로 옮겨 갔을 뿐
비용이 존재한다는 사실이 변하는 것은 아닙니다.

이미지를 재조정하는 것은 서버에서도 아주 가벼운 작업은 아닌 것을 알아야 합니다.
