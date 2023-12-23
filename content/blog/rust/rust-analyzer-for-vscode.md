---
title: vscode로 rust 개발시 formatter, prettier처럼 적용하기
date: 2023-12-23 22:25:15
coverURL: 
---
<br />
<br />
<br />

## 개요

rust 개발중 저장시마다 auto format되지 않는 경우

## 해결

1. vscode를 켜줍니다.

2. command + ,를 눌러 settings로 접근합니다.

3. settings.json에서 아래 처럼 json을 추가합니다.
> editor.defaultFormatter에 들어가는 값은 rust-analyzer의 업데이트시 변경될 수 있습니다. 

> 노란 밑줄이 생기면서 vscode가 못알아 먹겠습니다. 라는 warning을 보내면서 대체될만한 value를 추천합니다.

```json
  "rust-analyzer.rustfmt.enableRangeFormatting": true,
  "[rust]": {
      "editor.defaultFormatter":"rust-lang.rust-analyzer" 
  },
```