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
mainthread를 block 하는 cpu intensive한 함수를 thread에 위임하고 해당 함수의 결과값을 비동기로 받습니다.
timeout 함수와는 다르게 병렬로 실행되어진다는 점입니다.

이와 비슷한 로직을 dart에서는 Isolate로 이름 짓고 사용하고 있습니다.

위 코드는 hikaMaeng님의 블로그와 MDN을 참조했습니다.
