---
title: 문자열의 분할과 처리
date: 2024-07-30 22:59:07
coverURL: https://images.unsplash.com/photo-1693278615695-0e8e74d52bdb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<br />
<br />
<br />

## 문자열을 나눈다는것

### 제수를 기준으로 둘로 나누기

> 예제는 자바스크립트입니다.

```js
const dividend = "ayayewoo";
```

문자열을 나눈다면 제수와 피제수가 있어야합니다.
단, 숫자가 아니고 문자다보니 제수와 피제수는 당연히 숫자가 아닌 문자입니다.

아래와 같은 방식입니다.

```js
const dividend = "ayayewoo";
const divisor = "ye";
```

이를 나눈다면 어떻게 나뉘어야 할까요?
정말 단순하게 `divisor`를 기준으로 `aya`, `woo`로 나뉠 수 있겠습니다.

```js
dividend.split(divisor) // ["aya", "woo"]
```

이런 식입니다.

### 제수를 기준으로 나누되 나뉘어진 몫을 빼버리기

```js
const dividend = "ayayewoo";
const divisor = "ye";
```

```js
dividend.replace(divisor, ' ') // aya woo
```

replace로 해당 위치를 적절한 구분자가 되어줄 문자로 대체합니다.


## 이런걸 하는 이유

어떤 문자열이 주어졌을 때, 해당 문자열에 포함되면 안되는 문자를 선별해야 한다고 가정하겠습니다.
예를 들어 아래는 프로그래머스 옹알이 문제의 일부를 예로 사용하겠습니다.

```js
const babbling = ['ayayewoowoo']

function solution(babbling){
    const sounds = ['aya', 'ye', 'woo', 'ma'];

    for(const bab of babbling) { // 'ayayewoowoo'
        let temp = bab; // 'ayayewoowoo'

        for(const sound of sounds) { // 'aya', 'ye', 'woo', 'ma'
            while(bab.includes(sound)) { // true
                temp = temp.replace(sound, ' '); // ' yewwoowoo'
            }

            if(temp.trim() === '') {
                console.log(`${bab}은 sounds의 조합만으로 이루어졌습니다.`)
            }

        }
    }

}

solution(babbling);
```

위의 예제는 검사 할 대상인 변수 `bab`을 피제수
`sounds` 배열의 각 인자를 제수로 생각한다면

`ayayewoowoo`에 대해 `aya`로 나누면 -> ` yewoowoo`
이를 변수 `temp`에 초기화

다시 ` yewoowoo`에 대해 `ye`로 나누면 -> `  woowoo`
이를 변수 `temp`에 초기화

다시 `  woowoo`에 대해 `woo`로 나누면 -> `   woo`
이를 변수 `temp`에 초기화

다시 `   woo`에 대해 `ma`로 나누면 -> `   woo`
이를 변수 `temp`에 초기화

이제 `sounds` 배열의 순회가 종료되었습니다.
완전히 나누어 떨어지지 않고 나머지인 `woo`가 남았습니다.