---
title: 11ty post에 css 적용하기
---


11ty의 폴더 구조는 jekyll과 매우 흡사합니다.

`_includes/layouts` 파일들이 들어가게 될 것인데요.

```shell
_includes
├── layouts
│   ├── base.njk
│   ├── home.njk
│   └── post.njk
└── postslist.njk
```
이런 식으로 폴더 구조를 잡게 됩니다.

아무튼 css를 작성하고 이를 적용하고 싶은게 목적이죠

- 참고로 post를 위해 작성한 md 파일은 html로 변환되어 브라우저에 render되므로 결과적으로는
css로 스타일을 입히게 됩니다.

그럼 적당한 레이아웃 파일을 만들어주세요

```css
/* css/style.css */
div {
    color: red;
}
```

```njk
<!-- layouts/goodLayout.njk -->
<html>
    <head>
        <link rel="stylesheet" href="{{ 'css/style.css' | url }}">
    </head>
</html>
```

놀랍게도 적용이 잘 안될것입니다.

이유는 11ty가 해당 파일의 존재를 아직 알아차리지 못하였기 때문입니다.

11ty에는 config file이 존재하는데 프로젝트의 `root`에 `eleventy.config.js` 파일을 생성해주세요


```js
module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy({
		"/from": "/to",
	});
}
```
위 설정은 key로 입력된 곳에 있는 파일을 to에 있는 곳으로 옮기겠다는 내용입니다.
당연히 빌드된 결과물이 쌓일 output dir이 좋겠습니다.

`./public/css => _site/css` 이런식으로 이동이 됩니다.

잘 조정이 되었는지 확인하려면 빌드를 해보세요!