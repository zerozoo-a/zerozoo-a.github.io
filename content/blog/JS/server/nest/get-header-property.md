---
title: header property를 받아보자
date: 2023-09-23 22:47:04
coverURL: https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2886&q=80
---
<sup>
	각주:[1](배너_이미지_출처)
</sup>
<br />
<br />
<br />

# nest.js에서 header의 property를 바로 받아보자

nest.js의 컨트롤러로 넘어오는 header에서 값을 꺼내기 위해선 아래와 같이
해봅시다.

```ts
import {
  Response,
  Get,
  Headers,
} from '@nestjs/common';

  @Get('/kakaoLoginInfo')
  async kakaoLoginInfo(@Headers('authorized') authorized, @Response() res) {
    console.log('request header로 부터 꺼낸 값인 >>>',authorized);

    res.send({
      a: 'a',
    });
  }
```


---

<a name="배너 이미지 출처" href="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2886&q=80">image 출처</a>
