---
title: 프로그래머스 한 번만 등장한 문자
date: 2024-06-16 19:02:24
coverURL: https://images.unsplash.com/photo-1581544291234-31340be4b1b8?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<br />
<br />
<br />

## 문제

> 문자열 s가 매개변수로 주어집니다. s에서 한 번만 등장하는 문자를 사전 순으로 정렬한 문자열을 return 하도록 solution 함수를 완성해보세요. 한 번만 등장하는 문자가 없을 경우 빈 문자열을 return 합니다.

### 제한 사항

- 0 < s의 길이 < 1,000
- s는 소문자로만 이루어져 있습니다.

### 입출력 예

| s           | result |
|-------------|--------|
| "abcabcadc" | "d"    |
| "abdc"      | "abcd" |
| "hello"     | "eho"  |



## 풀이

```js
function solution(s) {
    var answer = '';
    var alphaCounts = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    
    
    for(var i = 0; i < s.length; i++) {
        alphaCounts[s[i].charCodeAt() - 97]++;
    }
    
    for(var i = 0; i < alphaCounts.length; i++) {
        if(alphaCounts[i] === 1) {
            answer += String.fromCharCode(97 + i);    
        }
    }
    return answer;
}

```

### 풀이에 대한 설명

해당 문제는 O(n)의 시간 복잡도를 사용해 풀 수 있습니다.

제한사항으로 인해 s는 소문자로만 이루어진 문자열입니다.

따라서 26의 길이를 가지는 배열을 생성하고,
문자가 등장할 때마다 숫자를 카운트합니다.

반복문이 종료되면 카운트가 1인 것과 0인것 2이상인 26길이의 배열이 완성됩니다.

배열을 순회하며 카운트가 1인 것을 찾습니다.
배열은 알파벳 a에 해당하는 배열 인덱스 0부터 순회합니다.
(따라서 이미 정렬을 따로 해줄 필요가 없습니다.)

아스키코드와의 인덱스 조정은

- a = 97이라는 점
- 알파벳은 총 26자라는 점

을 이용합니다.

