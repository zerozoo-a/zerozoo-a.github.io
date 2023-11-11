---
title: embedded worker 2 thread를 미리 "만들기만 하고 싶을 때"
date: 2023-11-11 11:53:24
coverURL: https://user-images.githubusercontent.com/80259925/282213133-0ecddf2e-f150-452a-8e2d-a97929e0fad1.png
---
<br />
<br />
<br />

# embedded worker를 idle하게 모아보자

- 주의사항
- 개선점
- 정리

## 주의사항
아래 코드는 `eval`을 사용하고 있습니다.

- `eval`의 사용을 원치 않는 경우 해당 **코드는 사용하면 안됩니다.**

### worker thread를 그냥 만들기만 하는 것에 대해

worker thread를 생성,
이를 변수에 store 했다가 나중에 일감을 던져주는 형태를 구현하기 위해
임시로 제작한 함수입니다.

개선방안을 생각하고 있습니다.

구현은 <a href="https://zerozoo-a.github.io/blog/JS/browser/embedded-worker-for-main-thread/">지난 글</a>에서 사용한
함수를 조금 변경 한 정도입니다.

코드는 아래와 같습니다.

```js
// thread.js
export const thread2 = () => {
  if (!isOkWorker) return;

  const meta = `onmessage = ({data}) => {
    const evaluatedFn = eval(data)(); // 2
    return postMessage({ evaluatedFn }) // send message to worker
  }`;

  const worker = makeWorker(meta);
  const onMessage = (res) => (worker.onmessage = ({ data }) => res(data));
  const onError = (rej) => (worker.onerror = (err) => rej(err));

  return (...data) =>
    new Promise((res, rej) => {
      const p = data.toString(); // 1
      onMessage(res);
      onError(rej);
      worker.postMessage(p);
    });
};
```

눈에 띄게 변경된 점은 eval의 사용과 변수 p에서 data를 serializable하게 변경했다는 점입니다.
그리고 사용처인 main.js를 바로 확인해보겠습니다.

```js
// main.js
import { thread2 } from "./thread.js";

async function main() {
  const b = thread2();
}

main();
```

thread를 생성만하고 별다른 액션이 없습니다.
thread는 생성되고 다음 함수가 들어올 때 까지 별다른 일을 하지 않습니다.

일을 주는 형태는 아래와 같습니다.
```js
import { thread2 } from "./thread.js";

async function main() {
  const b = thread2();
  const b2 = await b(() => 1);
  console.log("b2:", b2); // 1
}

main();
```

원래의 형태에선 thread를 생성 할 때, 일을 무조건 줘야만 했습니다.(함수)
이래선 thread를 cpu의 idle 타임에 틈틈히 만들어 두는 것은 어렵습니다.

실제로 thread는 함수를 받아 해당 함수를 실행시키고 값을 반환하는 형태이며,
함수를 다시 넘겨주는 것이 불가능하기 때문입니다.

물론 처음 실행엔 thread를 생성하는 오버헤드를 감수하고 worker를 저장해두었다가 다시 사용하는
방법도 있겠습니다만, 뭔가 마음에 들진 않았습니다.

## 개선점

### eval

개선 할 점은 물론 eval을 빼는 것입니다.

new Function도 eval과 비슷한 이슈를 가지고 있습니다.





## 정리

- 생각보다 원하는 스펙의 worker thread 생성 함수를 만드는게 어렵다고 느꼈습니다.
    - 브라우저에서 사용 할 경우 requestIdleTime 함수에 thread를 생성하는 함수를 넣어두는 것이 좋습니다.

- 위 함수는 일반적인 경우에서 사용하기 힘든 형태입니다.
이유는 점점 코드를 읽기 어려워지고 있고, eval의 위험성을 굳이 감수할 필요는 전혀 없기 때문입니다.

- 위 배너 이미지를 보게 되면 thread가 생성된 것을 볼 수 있습니다.
이름 붙은 Main thread와 아래의 이상한 이름을 가진 thread가 있는데 그것이 바로 위 함수로 생성된
thread입니다.

