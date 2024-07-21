---
title: 움직이는 볼
date: 2024-07-21 12:52:21
coverURL: 
---
<br />
<br />
<br />

<script src="
https://cdn.jsdelivr.net/npm/p5@1.9.4/lib/p5.min.js
"></script>


# 움직이는 볼

p5를 이용해 움직이는 볼을 그려보겠습니다.
결과물은 아래와 같습니다.

<div id="can"></div>

<script>
    class Vec3 {
        constructor(x, y, r){
            this.x = x; 
            this.y = y;
            this.r = r;
        }
    }
    class Vec2 {
        constructor(x, y){
            this.x = x; 
            this.y = y;
        }
    }
    class Ball {
        constructor(p, v){
            this.p = p;
            this.v = v;
        }
    }


    let ball;

    function setup(){
        const can = createCanvas(250, 250);
        can.parent('can');
        ball = new Ball(new Vec3(10, 10, 20), new Vec2(90, 60));
    }

    function draw(){
        ball.p.x = ball.p.x + ball.v.x / 60;
        ball.p.y = ball.p.y + ball.v.y / 60;

        if(ball.p.x < 10 || ball.p.x > 240) {
            ball.v.x = -ball.v.x;
        } 
        if(ball.p.y < 10 || ball.p.y > 240) {
            ball.v.y = -ball.v.y;
        } 

        background(250);
        circle(ball.p.x, ball.p.y, ball.p.r);
    }
</script>


## 코드

> p5는 전역에 정의된 setup, draw 함수를 실행해 canvas를 만들고
그 위에 정의된 내용을 60 frame 단위로 draw 함수를 그려냅니다.


```js
    class Vec3 {
        constructor(x, y, r){
            this.x = x; 
            this.y = y;
            this.r = r;
        }
    }
    class Vec2 {
        constructor(x, y){
            this.x = x; 
            this.y = y;
        }
    }
    class Ball {
        constructor(p, v){
            this.p = p;
            this.v = v;
        }
    }


    let ball;

    function setup(){
        const can = createCanvas(250, 250);
        can.parent('can');
        ball = new Ball(new Vec3(10, 10, 20), new Vec2(90, 60));
    }

    function draw(){
        ball.p.x = ball.p.x + ball.v.x / 60;
        ball.p.y = ball.p.y + ball.v.y / 60;

        if(ball.p.x < 10 || ball.p.x > 240) {
            ball.v.x = -ball.v.x;
        } 
        if(ball.p.y < 10 || ball.p.y > 240) {
            ball.v.y = -ball.v.y;
        } 

        background(250);
        circle(ball.p.x, ball.p.y, ball.p.r);
    }
```


위 코드를 하나씩 뜯어보겠습니다.

###  볼을 그리기 위한 위치 벡터

```js
    class Vec3 {
        constructor(x, y, r){
            this.x = x; 
            this.y = y;
            this.r = r;
        }
    }
```

볼을 좌표평면 위에 그리기 위해서는 세가지 값이 필요합니다.

그것은 바로 `(x, y, r)`입니다. 
x, y는 좌표값이며, r은 반지름입니다.

이 값들을 p5에서 정의해놓은 circle 함수에 인자로 주어주면
canvas에 볼이 그려지게 됩니다.

### 볼을 움직이기 위한 속도 벡터

```js
    class Vec2 {
        constructor(x, y){
            this.x = x; 
            this.y = y;
        }
    }
```

볼을 그리기만하고 움직이지 못하면 안되겠습니다.

볼을 움직이기 위해서는 벡터가 필요합니다.
위에서 언급한대로 1 프레임마다 draw 함수가 재실행되므로

`ball.p.x`와 `ball.p.y`를 `ball.v.x`, `ball.v.y`만큼 이동시켜주면 되는 것입니다.

```js
    function draw(){
        ball.p.x += ball.v.x / 60; // vector 만큼의 거리를 60만큼 나눠서
        ball.p.y += ball.v.y / 60;

        // if(ball.p.x < 10 || ball.p.x > 240) {
        //     ball.v.x = -ball.v.x;
        // } 
        // if(ball.p.y < 10 || ball.p.y > 240) {
        //     ball.v.y = -ball.v.y;
        // } 


        background(250);
        circle(ball.p.x, ball.p.y, ball.p.r);
    }
```

### 볼이 벽에 부딪힌 경우 계산될 반사 벡터

볼이 벽에 부딪힌 경우,

아래의 그래프로 설명할 수 있습니다.

- u: 벽
- v: 공의 이동 벡터
- rv: 공의 이동 벡터에 대해 - 곱셈
- rvv: v + rvv 

와 같이 설명됩니다.

<img src="/img/blog/p5/bounceball/bounce-ball.png" alt="vectors">

코드로는 아래와 같이 -를 곱해주면 됩니다.

- 240은 캔버스의 크기 - 볼의 반지름
- 10은 볼의 반지름입니다.

```js

    function draw(){
        ball.p.x += ball.v.x / 60; // vector 만큼의 거리를 60만큼 나눠서
        ball.p.y += ball.v.y / 60;

        if(ball.p.x < 10 || ball.p.x > 240) {
            ball.v.x = -ball.v.x;
        } 
        if(ball.p.y < 10 || ball.p.y > 240) {
            ball.v.y = -ball.v.y;
        } 

        background(250);
        circle(ball.p.x, ball.p.y, ball.p.r);
    }
```
