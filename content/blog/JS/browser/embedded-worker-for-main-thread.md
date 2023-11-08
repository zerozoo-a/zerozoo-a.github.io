---
title: embedded worker의 기초
date: 2023-11-08 12:38:10
coverURL: https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---

<br>
<br>
<br>

# embedded worker에 대해


## embedded 이전에 worker에 대해
javascript에서 worker를 사용하기 위해서는 
1. worker 객체를 생성,
2. worker 객체에 넘겨줄 script 파일의 path를 입력하게 됩니다.
3. worker와 main thread의 통신은 모두 message로 이루어집니다.
   1. postMessage를 통해 worker에게 데이터를 보냅니다.
   2. worker는 onmessage를 통해 message를 받습니다.
   3. main thread도 마찬가지로 응답을 onmessage를 통해 받습니다.
   4. message들은 Event 객체를 상속받습니다.
   ```mermaid
    %%{init: {'theme':'dark'}}%%
    classDiagram

    MessageEvent --> Event
   ```
   5. Event emitter를 상속 받기 때문에 Worker의 생성이 비동기여도 정상 작동하게 됩니다.

### worker의 생성과 사용
```js
// main.js
const worker = new Worker('/work.js')
worker.postMessage(5);
worker.onmessage = function (e) {
  console.log(e)
}
// work.js
self.onmessage = function(e) {
  postMessage(e.data + 1);
}
```
위 방식의 불편한 점은 항상 파일을 분리해두어야 한다는 점입니다.

아래와 같이 작성 할 순 없을까요?
```js
function add (a, b) { return a + b; }
const worker = new Worker(add) // thread 생성
worker(1, 2); // 3 반환
```
아쉽지만 위와 같은 함수는 현재 스펙에는 없습니다.

아예 방법이 없는 것은 아닌데요 embedded worker라는 방법을 통해
위와 같이 worker thread에 함수를 넘겨주는 방식을 구현해보겠습니다.

embedded worker에 대한 자세한 내용은 MDN의 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">using web workers라는 페이지에 소개되어 있습니다.</a>

embedded worker 방식은 일반 자바스크립트를 다른 파일을 생성하지 않고,
worker를 사용하는 방법입니다.

worker의 스펙을 보면 아래와 같습니다.
```js
new Worker(aURL)
new Worker(aURL, options)
```
`aURL`을 받습니다. 즉 path만을 받는 것이 아닌 URL이면 됩니다.
자바스크립트 함수를 놀랍게도 URL로 변환하는 작업을 거쳐보겠습니다.

순서는 아래와 같습니다.
- 코드를 blob으로 쪼갭니다.
- blob을 url로 변환합니다.
- worker 객체를 생성해 url을 넘겨줍니다.

구현은 아래와 같습니다.

```js
    function f() {}
    const blob = new Blob([`onmessage = ({data}) => postMessage((${f})(data));`], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
```

이제 위 함수를 잘 다듬어 worker에 함수를 넘겨주고, 결과값을 받는 함수를 만들어보도록 하겠습니다.

함수에 필요한 스펙을 정리해보면
  - inline으로 함수를 입력하고 값을 반환받고 싶습니다.
  - worker를 사용 할 수 없다면 입력받은 함수를 main thread에서 그대로 실행시켰으면 좋겠습니다.

worker의 생성은 오버헤드가 존재하므로 브라우저에서는 비동기로 생성됩니다.

Promise를 이용해 async await을 사용 할 수 있도록 수정합니다.

물론 onmessage를 통해 event emit방식을 사용 할 수 있지만 그러고 싶은 분은 많지 않으리라 생각합니다.

아래는 해당 내용을 구현한 함수입니다.

```js
const process = f => {
  const isOkWorker = Blob && URL && URL.createObjectURL;

  if(isOkWorker) {
    const blob = new Blob([`onmessage = ({data}) => postMessage((${f})(data));`], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);

    const onMessage = (res) => worker.onmessage = ({data}) => res(data);
    const onError = (rej) => worker.onerror = ({data}) => rej(data);

    return data => new Promise((res, rej) => {
      onMessage(res);
      onError(rej);
      worker.postMessage(data)
    })
  } else {
    return data => f(data);
  }
}
```

사용하는 방법은 아래와 같습니다.
```js
const fib = process(blockCpuFor1Sec);
fib().then(res => console.log('result: ', res));
```
- 위 코드는 hikaMaeng님의 블로그와 MDN을 참조했습니다.

위 함수에는 약간의 문제점이 있습니다.
바로 subroutine을 호출 할 수 없다는 것입니다.

위의 구현대로는 subroutine을 호출 하는 경우 rejected 되고 마는데요,
이유는 생성된 worker thread에서 subroutine의 존재를 알 수 없기 때문입니다.

message로 넘겨준 것은 단일 함수이므로 scope가 서로 다른 worker는 넘겨받은 함수만을 이해할 뿐,
다른 객체에 대한 것을 알 수 없습니다.

따라서 아래와 같이 수정해줍니다.

```js
/**
 * 
 * @param {Function} f
 * @param {Function[]} fs  
 * @returns 
 */
export const process = (f = () => {}, ...fs) => {
  const isOkWorker = Blob && URL && URL.createObjectURL;

  if(isOkWorker) {
    const meta = `onmessage = ({data}) => {
      ${[fs]} // subroutine 함수를 함께 넘겨주고 여기서 함수는 thread memory heap에 올라감
      return postMessage((${f})(data))
    };`
    const blob = new Blob([meta], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);

    const onMessage = (res) => worker.onmessage = ({data}) => res(data)
    const onError = (rej) => worker.onerror = (err) => rej(err)

    return data => new Promise((res, rej) => {
      onMessage(res);
      onError(rej);
      worker.postMessage(data)
    })
  } else {
    return data => f(data);
  }
}
```

사용 방법도 함께 알아보겠습니다.

```js
function caller(a){
  return callee(a)
}

function callee(a){
  return a
}

async function main () {
  const ca = process(caller, callee)
  const awaitedCa = await ca('hi');
  console.log("🚀 ~ file: main.js:22 ~ main ~ awaitedCa:", awaitedCa) // hi
}
main();
```
여기서 재밌는 점은 caller와 callee 내부에 log를 찍어도 보여지지 않는다는 것인데요,
log는 생성 및 분리된 스코프인 thread 스코프에서 실행되므로,
main에서는 해당 출력을 확인 할 수 없습니다.

아쉽게도, 위 코드에서 다시 한가지 문제점을 더 발견 할 수 있습니다. 

인자가 1개 이상인 함수의 경우 **변수 meta**는 **worker thread에서 실행 할 함수의 첫 인자에만
데이터를 넣어준다는 것입니다.**

merge sort를 예로 들면, 아래와 같은 함수를 thread에서 실행 할 때,
위의 코드로는 left인자에만 값을 넣어주게 됩니다.

```js
mergeSort(left, right); // error
```

이를 수정해보도록 하겠습니다.

```js
/**
 * 
 * @param {Function} f 
 * @param {Function[]} fs 
 * @returns 
 */
export const process = (f = () => {}, ...fs) => {
  const isOkWorker = Blob && URL && URL.createObjectURL;

  if(isOkWorker) {
    const meta = `onmessage = (all) => {
      ${[fs]}
      return postMessage((${f})(...all.data)) // thread에서 실행될 함수에 rest parameter로 값을 넘겨줌
    };`
    const blob = new Blob([meta], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);

    const onMessage = (res) => worker.onmessage = ({data}) => res(data)
    const onError = (rej) => worker.onerror = (err) => rej(err)

    return (...data) => new Promise((res, rej) => {
      onMessage(res);
      onError(rej);
      worker.postMessage(data)
    })
  } else {
    return data => f(data);
  }
}
```
위 처럼 수정하게 되면 인자를 여러개 받는 함수의 경우에도 실행이 가능하게 됩니다.

마지막으로 mergeSort를 각 thread에 task를 분배, 정렬하도록 작성해봤습니다.

```js
// merge-sort.js
/**
 * 
 * @param {number[]} array 
 * @returns 
 */
export function mergeSort(array) {
  if(array.length === 1) return array;

  const pivotIndex = Math.floor(array.length / 2);
  const left = array.slice(0, pivotIndex);
  const right = array.slice(pivotIndex);

  return merge(mergeSort(left), mergeSort(right));
}

/**
 * 
 * @param {number[]} left 
 * @param {number[]} right 
 */
export function merge(left, right){
  const result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  while(leftIndex < left.length && rightIndex < right.length){
    if(left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex))
}
```

```js
// process.js
/**
 * 
 * @param {Function} f 
 * @param {Function[]} fs 
 * @returns 
 */
export const process = (f = () => {}, ...fs) => {
  const isOkWorker = Blob && URL && URL.createObjectURL;

  if(isOkWorker) {
    const meta = `onmessage = (all) => {
      ${[fs]}
      return postMessage((${f})(...all.data))
    };`
    const blob = new Blob([meta], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);

    const onMessage = (res) => worker.onmessage = ({data}) => res(data)
    const onError = (rej) => worker.onerror = (err) => rej(err)

    return (...data) => new Promise((res, rej) => {
      onMessage(res);
      onError(rej);
      worker.postMessage(data)
    })
  } else {
    return data => f(data);
  }
}
```

```js
// main.js
async function main () {

  const arr = [4, 1, 3, 2];
  const arrLeft = arr.slice(0, 2);
  const arrRight = arr.slice(2);

  const thread1 = process(mergeSort, merge);
  const thread2 = process(mergeSort, merge);
  const [resultLeft, resultRight] = await Promise.all([thread1(arrLeft), thread2(arrRight)]);
  const thread3 = process(merge)
  const result = await thread3(resultLeft, resultRight)
  console.log("🚀 ~ file: main.js:15 ~ main ~ result:", result)
}

main();
```

테스트를 하지 않을 수가 없네요,

일반 mergeSort와 thread 2개를 사용한 mergeSort로 비교해보겠습니다.

thread를 사용하는 경우 main thread를 block하지 않는 다는 점도 주요하게 볼 대목입니다만
속도도 함께 봐주세요

```js
import { process } from "./thread.js";
import { mergeSort, merge } from "./mergeSort.js";

function createRandomArray(size) {
  const array = [];
  for (let i = 0; i < size; i++) {
    // Push a random integer into the array
    // For example, if you want numbers between 0 and 999
    array.push(Math.floor(Math.random() * 1000));
  }
  return array;
}



async function main () {
  const number = 10000000;
  const bigArray = createRandomArray(number);


  console.time()
  const pivot = Math.floor(number / 2);
  const arrLeft = bigArray.slice(0, pivot);
  const arrRight = bigArray.slice(pivot);
  const thread1 = process(mergeSort, merge);
  const thread2 = process(mergeSort, merge);
  const [resultLeft, resultRight] = await Promise.all([thread1(arrLeft), thread2(arrRight)]);
  merge(resultLeft, resultRight)
  console.timeEnd()

  console.time()
  mergeSort(bigArray)
  console.timeEnd()

}
main();
```
```bash
// 10000000 랜덤 숫자 배열의 길이
default: 2555.906982421875 ms // with worker thread
default: 3578.2060546875 ms // with main thread
```

mergeSort는 특히나 정렬하는 그 특유의 방식 덕분에 thread에 일감을 나눠주기 편한데요.
반을 나누어준 다음 가각의 thread를 통해 정렬, 결과값을 마지막에 merge만 해주면 되기 때문입니다.

thread를 browser의 idle 타임에 생성해두고 
pool에 저장하고 사용한다면 worker를 생성하는 비용과 시간을 대폭 줄일 수 있습니다.
자바스크립트를 싱글스레드로만 사용하기엔 너무 아깝다고 생각합니다.

다음은 pool을 사용하고,
shared memory를 사용하는 등의 글을 작성해보겠습니다.

이상으로 긴 글 봐주셔서 감사합니다.



