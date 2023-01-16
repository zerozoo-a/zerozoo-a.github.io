---
layout: post
title: 터미널로 vscode를 키는 방법
date: 2023-01-17 01:31 +0900
---
<img src="https://images.unsplash.com/photo-1611172062119-05251ea06de8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="running car in the city at night">

<!--break-->
## index 
- [index](#index)
- [](#)
- [문제](#문제)
- [풀이](#풀이)
- [recap](#recap)

<br>
<br>
--- 
## 문제 
--- 
vscode를 터미널에서 열고 싶은데 잘 안되는 경우

vscode에서 path를 설치해도 껏다 키면 초기화되어 다시 하는게 번거러운 경우
<br>
<br>

## 풀이 
--- 
자신이 사용하는 terminal의 rc파일을 열어 아래의 코드를 입력하고 터미널을 다시 실행하거나 source 명령어로 해당 config를 실행시킨다.

```bash
code () { VSCODE_CWD="$PWD" open -n -b "com.microsoft.VSCode" --args $* ;}
```
<br>
<br>

## recap 
--- 
다른 방법도 많이 나옵니다만 저는 위 방법이 가장 간단했습니다.
<br>
<br>
