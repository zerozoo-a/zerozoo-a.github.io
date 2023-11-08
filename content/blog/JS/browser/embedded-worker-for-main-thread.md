---
title: embedded worker의 기초
date: 2023-11-08 12:38:10
coverURL: 
---

<br>
<br>
<br>

## embedded worker란
자세한 내용은 MDN의 using web workers라는 페이지에 소개되어 있습니다.
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers]

javascript의 worker는 다른 언어들과는 다르게 (심지어 거의 같은 싱글스레드 + event loop 조합인 dart에서도 지원하는..)
thread를 생성하고 사용하는 것이 조금은 까다롭습니다.

thread를 생성하기 위해서는 javascript 파일을 새로 생성하고 생성된 파일의 경로를 인자로 넘겨주면 되는데요,
언뜻보면 코드가 분리되어 좋은게 아니냐라고 생각 할 수 있지만 문제는 해당 방법 이외의 다른 대안인 바로 함수를 넘기거나 값을 넘기는 등의
api가 없다는 것입니다.

사실 정확히는 파일의 경로는 아닙니다. URL 주소를 넘기는 것인데요 이를 활용해 embedded worker를 구현해보겠습니다.

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

worker를 생성하고 worker가 일을 하고 값을 반환하는 것은 비동기로 처리됩니다.
저희는 브라우저에서 정해준 api를 통해 동기를 비동기로 변경 할 수 있는데요, 대표적으로 timeout 함수들이 그렇습니다.

단, timeout 함수에 넘겨준 콜백함수는 일정 조건을 만족하고 나서 다시 main thread를 점유하며 task를 처리합니다.
그저 일의 순서를 뒤로 미룬것과 같은 방식입니다. 결국 main thread를 점유당하는 것은 그대로입니다.

그렇다면 방법은 thread를 사용하는 것입니다.

브라우저 환경의 대부분은 worker를 지원하고 있지만 그렇지 못한 경우를 대비하는 것도 잊으면 안됩니다.

원하는 스펙을 하나씩 나열하겠습니다.

- worker를 사용 할 수 없다면 입력받은 함수를 main thread에서 그대로 실행시켰으면 좋겠습니다.
- inline으로 함수를 입력하고 값을 반환받고 싶습니다.

이정도입니다.

worker의 생성은 오버헤드가 존재하므로 브라우저에서는 비동기로 생성됩니다.
worker 자체가 비동기이므로 저희가 넘겨주는 함수도 비동기로 스펙인 Promise를 따라야합니다.

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

mainthread를 block 하는 cpu intensive한 함수를 thread에 위임하고 해당 함수의 결과값을 비동기로 받습니다.
timeout 함수와는 다르게 병렬로 실행되어진다는 점입니다.

이와 비슷한 로직을 dart에서는 Isolate로 이름 짓고 사용하고 있습니다.

함수는 subroutine을 호출 할 수 있습니다.
위에서 구현한대로는 subroutine을 호출 하는 경우 rejected 되고 마는데요,
이유는 생성된 worker thread에서 subroutine의 존재를 알 수 없기 때문입니다.

message로 넘겨준 것은 단일 함수이므로 scope가 서로 다른 worker는 넘겨받은 함수만을 이해할 뿐,
다른 객체에 대한 것은 알 수 없습니다.

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
log는 생성 및 분리된 스코프인 thread 내부에서 실행되므로 main에서는 해당 출력을 확인 할 수 없습니다.

위 코드에서 한가지 문제점을 더 발견 할 수 있습니다.
인자가 1개 이상인 함수의 경우 변수 meta는 worker thread에서 실행 할 함수의 첫 인자에만
데이터를 넣어준다는 것입니다.

merge sort를 예로 들면, 아래와 같은 함수를 thread에서 실행 할 때,
위의 코드로는 left인자에만 값을 넣어주게 됩니다.
```js
mergeSort(left, right);
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

이번 thread를 embedded로 실행하는 함수를 공부하며 느낀점은 아래와 같습니다.

- rest parameter를 사용해 얼마든지 원하는 만큼 subroutine을 추가해줄 수 있다는 점입니다.
단, 이런 모양이 불편하다면 class 형태로 잘 패키징해서 하나만 넘기는 것도 좋을 것입니다.

- 이런 코드는 기존의 자바스크립트에선 하기 어려웠던(금기시 되었던 eval?) 메타프로그래밍을 가능케합니다.
이런 특성을 아주 적극적으로 활용하는 clojure에서는 데이터를 하나의 sequence로 보거나
코드 자체를 하나의 데이터로 보는 등의 확장을 통해 보다 자유로운 코드가 가능합니다. (물론 위험부담은 본인 책임이지만)
(자바스크립트에서도 이런 부분이 좀 더 열렸으면 좋겠습니다만 브라우저를 안정적으로 돌리기 위해서는 당연히 닫혀있겠죠🥲)

- 욕심을 부린다면 메모리 allocate가 큰 변수의 경우 shared memory를 사용해 계산하면 좋겠습니다만
언제가 될런지...


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

mergeSort는 특히나 정렬하는 그 특유의 방식 덕분에 thread에 일감을 나눠주기 편한데요.
반을 나누어준 다음 가각의 thread를 통해 정렬, 결과값을 마지막에 merge만 해주면 되기 때문입니다.

이상으로 긴 글 봐주셔서 감사합니다.



