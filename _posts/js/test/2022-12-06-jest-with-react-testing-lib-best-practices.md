---
layout: post
title: jest with react testing lib를 함께 잘 사용해보세
date: 2022-12-06 00:00 +0900
categories: ["test"]
---

# 나만의 best practices

<img 
alt="react testing library logo.jpg"
width="200"
src="https://blog.kakaocdn.net/dn/m3uyo/btrqLXSFaTj/2apK099o8uI4HJ8OdLNOe1/img.jpg">



## index 
- [나만의 best practices](#나만의-best-practices)
  - [index](#index)
  - [예시](#예시)
  - [recap](#recap)

---
 
## 예시
--- 
<br>
<br>

- 테스트하는 component
    - 순수 component `<Hi />`
    - data를 react life cycle에 따라 fetch하고 state를 변경해 dom을 업데이트하는 component `<TestingComp />`


[사전에 읽어두어야 할 query 방식](https://testing-library.com/docs/dom-testing-library/cheatsheet/#queries)

당연하게도 `getBy, findBy, queryBy`는 test를 할 때 매우 중요합니다. 각 함수의 동작과 용도를 잘 구분해서 사용하는게 중요합니다.

저는 좀 저속하지만 이런 식으로 분류해서 사용합니다.

| getBy  | queryBy  | findBy  |   
|---|---|---|
| 없으면 에러임  | 없어도 에러 아님  | 있을지 없을지 몰라 찾아야 함(비동기)  |

```js

import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { useEffect, useState } from 'react';
const Hi = () => (
  <div>
    <div>
      <h1 role="heading">this is h1</h1>
    </div>
  </div>
);

const TestingComp = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const abort = new AbortController();
    const opts = { signal: abort.signal };

    fetch('https://pokeapi.co/api/v2/pokemon/ditto', opts)
      .then(res => res.json())
      .then(res => setData(res.abilities))
      .catch(err => console.error(err));

    return () => abort.abort();
  }, []);

  return (
    <div>
      <h1>pokemon!</h1>
      <h2>this is h2!</h2>

      {data ? <h3>rendered!!</h3> : <div>never mind!</div>}
    </div>
  );
};

const renderHi = () => {
  render(<Hi />);
  const getH1 = () => screen.getByRole('heading');
  return {
    getH1,
  };
};

const renderTestingComp = () => {
  render(<TestingComp />);
  const getH1 = () => screen.getByText('pokemon!');
  const getH2 = () => screen.getByText('this is h2!');
  const queryNeverMind = () => screen.queryByText('never mind!');
  const findReRenderedText = () => screen.findByText('rendered!!');

  return { getH1, getH2, queryNeverMind, findReRenderedText };
};

describe('testing for best practices', () => {
  it('<Hi />', () => {
    /**
     * 일반 component를 test 하는 방법입니다.
     */
    const { getH1 } = renderHi();

    expect(getH1()).toBeInTheDocument();
  });

  it('<TestingComp />', async () => {
    /**
     * data fetching이 일어나는 component에 대한 test 방법입니다.
     */
    const { getH1, getH2, queryNeverMind, findReRenderedText } =
      renderTestingComp();
    expect(getH1()).toBeInTheDocument();
    expect(getH2()).toBeInTheDocument();
    expect(queryNeverMind()).toBeInTheDocument();

    await waitForElementToBeRemoved(() => queryNeverMind());
    expect(await findReRenderedText()).toBeInTheDocument();
  });
});

export {};

```

## recap 
--- 
<br>
<br>

간단한 테스트이지만 이를 기반으로 테스트를 하나씩 쌓아올라 갈 수 있습니다.

해당 포스트는 user의 action 부분이 빠져있으므로 곧 업데이트 하도록 하겠습니다.

    - [UPDATES]
        - user의 action에 대한 test   