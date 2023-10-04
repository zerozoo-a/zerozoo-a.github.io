---
title: 님아 그 JSON.stringify를 함부로 쓰지 마오
date: 2023-10-06 00:00:45
coverURL: https://images.unsplash.com/photo-1445633743309-b60418bedbf2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80
---
<br />
<br />
<br />

# JSON.stringify가 범인..?

node와 browser를 다루고 있는 본인은 JSON 객체를 많이도 사용합니다.

브라우저와 노드 등 가리지 않고 JSON을 남발하고 있는데요.
이 JSON.stringify가 만약 O(n)의 속도라고 한다면
과연 쉽게 쓸 수 있을까요?

요즘이야 cpu 성능이 워낙 좋아 충분히 작은 O(n)은 무시할 정도가 되었다고는 해도,

JSON은 생각보다 커질 수 있다는 점을 간과해서는 안될 것입니다.

## 문제점을 찾아낸 경위

이 블로그의 이미지들은 base64로 encode되어 제공됩니다.
file system을 기반으로 db없이 블로그를 운영하고 server 또한 의존하지 않을 수 있고 빌드타임에 이미 base64는 완성되어 나가므로 유저에게 이미지를 다운받게 network I/O를 발생시키지도 않습니다.

그럼 완벽할까요?

아닙니다. base64 이미지는 이미지를 text로 encode 해놓은 상태이므로 text가 아주 큽니다.

전 해당 text를 json으로 저장해두는데요.

json 파일은 블로그의 post가 쌓일수록 함께 용량이 늘어났습니다.

## 방법은?

threads를 통한 개선(별 의미가 없음)이나 db의 도입 등 여러가지를 생각해봤지만
파일시스템을 유지하면서 기존의 로직을 크게 벗어나지 않는 방법은
json의 encode, decode를 빠르게하면 된다는 것입니다.

JSON.stringify가 실행될 때, 읽어들이고 있는 json이 될 객체의 타입을 알고 있다면,
그렇다면 해당 객체를 string으로 변환할 때,
보다 빠른 방법을 사용해 string으로 변환해줄 수 있지 않을까?
라는 것이 기본 아이디어입니다.

이를 잘 구현해놓은 것이

<a href="https://www.npmjs.com/package/fast-json-stringify">npm의 fast-json-stringify입니다.</a>

## 사용 방법

디테일한 설정은 <a href="https://www.npmjs.com/package/fast-json-stringify">링크를 통해</a>확인 가능합니다. (ajv, integer의 rounding, largeArrayMechanism 등...)


우선 단순한 사용법을 알아보죠
1. stringify 할 object의 schema를 작성하고,
2. fast-json-stringify 라이브러리를 가져와 schema를 인자로 넣는다.
3. 2에서 반환된 함수로 실제 object를 넣으면 끝입니다.

```js
const fastJson = require('fast-json-stringify')
const schema = {
  title: 'Example Schema with required field',
  type: 'object',
  properties: {
    nickname: {
      type: 'string'
    },
    mail: {
      type: 'string'
    }
  },
  required: ['mail']
};

const obj = {
	nickname: 'zerozoo',
	mail:'zoozooClub@sbs.com'
};

const stringifySchema = fastJson(schema);
const result = stringifySchema(obj);
```


감사합니다.
happy hacking!