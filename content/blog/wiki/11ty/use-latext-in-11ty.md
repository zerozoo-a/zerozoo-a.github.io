---
title: 11ty에서-latex-사용하기
date: 2023-07-06 22:42:30
coverURL: https://images.unsplash.com/photo-1635070041409-e63e783ce3c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1679&q=80
---
<br />
<br />
<br />

## latex란? 

<a href="https://namu.wiki/w/LaTeX">latex</a> latex는
md와 비슷하게 특정 형식으로 쓰여진 문자열을 수학 식으로 바꿔 표현해주는 것을 의미합니다.

예를 들어 `log5`를 적으면 로그 5라는 것을 알 수는 있습니다.

단 이쁘지 않고 식이 복잡해지기 시작하면 식이 더 못생겨지고 못생긴 수학식은 서로 다르게 이해할 수 있습니다.

수학의 가장 강한 특징인 전세계 공통 언어라는 특징을 잃어버립니다.

이제 여기서 latex가 하는 일이 무엇인지 아실겁니다.

**바로 수학 식을 이쁘게 바꿔줍니다.**

아래와 같이 말입니다.

$$f(n)=\begin{cases}
\text{ if } 1,\space{1}(n = 1, 2) \\
\text { if } f(n - 1) + f(n - 2),\space{1}(n > 2)
\end{cases}$$

## eleventy에 설치하기

library를 설치합니다.

```bash
# 원하는 lib를 찾아 설치해주세요
npm install @iktakahiro/markdown-it-katex
```


## eleventy.config에 설정하기

```js
// eleventy.config.js 설정하기

const mk = require("@iktakahiro/markdown-it-katex");

// Customize Markdown library settings:
eleventyConfig.amendLibrary("md", (mdLib) => {
    // 여러분들의 md lib들을 추가해주세요
    mdLib.use(mk);
});
```
