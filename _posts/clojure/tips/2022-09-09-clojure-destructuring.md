---
layout: post
title: clojure 구조분해 - 문자열
date: 2022-09-09 19:34 +0900
categories: ["clojure"]
tags: ["tip"]
---

클로져에서 문자열을 구조분해 해보자.

```clojure
(let [[a b] "01"]
     (println a) ; => 0
     (println b) ; => 1
     )
```
각각의 문자열을 알아서 찢어 가져간다
