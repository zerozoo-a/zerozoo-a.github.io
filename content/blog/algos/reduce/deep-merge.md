---
title: 자바스크립트의 deepMerge에 대해 - deep merge in js
date: 2023-12-10 12:13:26
coverURL: https://images.unsplash.com/photo-1598177518550-6e6a09b98971?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<br />
<br />
<br />

## 서론
자바스크립트에서 객체를 합치는 작업은 흔히 발생합니다. 
특히, 복잡한 구조를 가진 객체들을 효율적으로 합치는 것은 매우 중요한 작업이 될 수 있습니다.

자바스크립트의 deep merge에 대해 알아보겠습니다.


## deep merge란?

deep merge를 이해하기 위해선 merge를 먼저 알아두는 것이 좋습니다.

### case 1
아래는 흔히 사용되는 덮어 씌우기 merge입니다.
 - key가 중복되면 나중에 덮어 씌우는 쪽인 변수 b의 값으로 덮어 씌웁니다.


```js
const a = {a: 1, b: 2};
const b = {a: 1, b: 3};
const merged = {...a, ...b}; // {a:1, b: 3}
```

### case 2

아래의 경우는 어떨까요?

객체 a, b는 key b를 똑같이 가지고 있습니다.
하지만 b의 value는 서로 다른 값입니다.
```js
const a = {a: 1, b: {c: 3}};
const b = {a: 1, b: {d: 4}};
const merged = {...a, ...b}; // ??
```

이 시점부터는 유저마다 원하는 결과값이 다를 수 있습니다.
예상되는 결과값들은 아래와 같습니다.
1. `{a: 1, b: {c:3, d: 4}}`
2. `{a: 1, b: {d: 4}}`
3. `{a: 1, b: {c: 3}}`

`1`을 반환해주면 별로 할 일이 없어서 좋습니다만
애석하게도 자바스크립트는 그리 친절하지 않습니다.

위 두 객체 `a, b`는 서로 다른 메모리에 있습니다.
서로 `스키마`가 같더라도 다른 객체로 인식합니다.

따라서 나중에 온 값으로 덮어 씌운다는 방식을 그대로 따르게 됩니다.


이제 deep merge라는 함수가 왜 만들어졌는지 알 수 있습니다.

바로 아래와 같은 결과값을 받고 싶기 때문입니다.

```js
const a = {a: 1, b: {c: 3}};
const b = {a: 1, b: {d: 4}};
const merged = deepMerge(a, b); // {a: 1, b: {c:3, d: 4}}
```

## 구현하기

구현하고자 하는 것은 단순합니다.
두 객체의 key를 배열로 뽑아 순회합니다.

- key를 통해 객체의 값을 확인합니다.
- type이 object인 경우 재귀함수를 호출합니다.
  - object가 아닌 경우 result에 obj2의 key, value를 추가합니다.
- object가 아닌 경우는 그냥 추가합니다.




```js
function deepMerge(obj1, obj2) {
	const result = { ...obj1 }; // obj1의 복사본

	Object.keys(obj2).forEach((key) => {
		if (obj2[key] && typeof obj2[key] === "object") {
			if (result[key] && typeof result[key] === "object") {
				result[key] = deepMerge(result[key], obj2[key]); // Recursively merge nested objects
			} else {
				result[key] = obj2[key]; // Assign if the property does not exist in obj1 or is not an object
			}
		} else {
			result[key] = obj2[key]; // Assign non-object properties
		}
	});

	return result;
}
```

## 정리

deep merge에 대해 알아보았습니다.

두 객체를 합칠 때, 서로 다른 키임에도 불구하고 merge로 인해
데이터가 손실되는 것을 막을 수 있습니다.


