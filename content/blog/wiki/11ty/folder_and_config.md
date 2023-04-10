---
title: 폴더 단위로 layout 명시하기
date: 2023-03-27
---

역시 하나 하나 docs를 탐독하다 보면 배우는 것들이 생기기 마련입니다.

정붙이면 고향이라고 벌써 11ty의 좋은 점들이 조금씩 납득되고 있습니다.

아무튼 블로그를 조금씩 제 입맛대로 수정하면서 배운 폴더단위 config를 알아봅시다.




```bash
content
├── blog
│   ├── blog.11tydata.js
│   └── wiki
│       └── 11ty
│           ├── css_config.md
│           ├── folder_and_config.md
│           ├── new_blog.md
│           └── possum.png
...
```
현재 저의 블로그 디렉터리 구조는 위와 같은데요

위 md 파일들 중에 묘하게 거슬리는 친구가 하나 보이실 것 같습니다.


네 바로 `blog.11tydata.js` 입니다.
이 파일은 뭐길레 md 파일들 한 가운데서 저렇게 있는걸까요?


> 해당 파일은 바로 해당 파일이 존재하고 있는 위치와 그 위치의 하위 디렉터리들에 재귀적으로 해당 파일의 설정을 적용시키기 위해 있습니다.



```js
module.exports = {
	tags: [
		"posts"
	],
	"layout": "layouts/post.njk",
};
```
이렇게 생겼습니다.

해당 dir 내부에 존재하는 파일들은 
posts라는 태그를 부여 받고 layout은 post.njk를 사용하라는 뜻이죠

이러면 layout을 어디부터 어디까지 지정할지를 보다 편하게 명시할 수 있습니다.

이런 기능은 참 괜찮네요!
