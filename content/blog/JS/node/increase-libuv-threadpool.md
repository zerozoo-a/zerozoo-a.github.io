---
title: increase libuv threadpool 
date: 2023-10-03 19:43:49
coverURL: https://images.unsplash.com/photo-1614447428943-52ec0bdbc7aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80
---
<sup>
</sup>
<br />
<br />
<br />

## UV_THREADPOOL_SIZE

UV_THREADPOOL_SIZE는 node.js에서 사용하는 핵심 라이브러리인
libuv의 **thread pool** 설정을 변경하는 명령어입니다.

## 이벤트기반에 필수인 libuv
node.js는 싱글스레드로 이벤트 루프를 돌리는 이벤트 기반 논블로킹 I/O모델을 사용하는 자바스크립트 런타임이다.

싱글스레드로 이벤트 루프를 돌리고 그 외의 비동기 처리는 os의 process 혹은
libuv에서 제공하는 thread pool을 이용해 병렬처리를 진행한다.

단순한 node.js 사용에는 위 내용을 굳이 알 필요가 없다. 시간을 많이 소모하는
연산등을 만들어진 라이브러리에서 꺼내어 쓴다면 이미 비동기 처리를 하고 있을 확률이 높고 높은만큼 내부적으로 멀티 쓰레드 환경에서 해당 처리를 연산하고 있을 확률이 더더욱 높기 때문이다.


<a href="https://docs.libuv.org/en/v1.x/design.html">libuv</a>는 멀티플렛폼을(linux 계열, window, mac등) 지원하는 비동기처리 라이브러리로 node.js에서 비동기 처리의 핵심적인 역할을 담당하고 있다.


## 입맛이 싹 도는 worker pool(a.k.a thread pool) 하지만 사용처는 제한이 있습니다.
항상 main thread를 금이야 옥이야 사용하고 있는 자바스크립트 개발자들은
thread에 굶주려있습니다.

node.js에서 기본 제공해주는 thread pool에 내 callstack 하나 얹어보고 싶은 이 마음은
누구나 비슷하리라 봅니다.

하지만 사용 할 수 있는 범위는 아래의 API로 극히 제한됩니다.

```
1. I/O-intensive
DNS: dns.lookup(), dns.lookupService().
File System: fs.FSWatcher()와 libuv의 스레드 풀을 명백하게 동기적으로 사용하는 경우를 제외한 모든 파일 시스템 API.

2. CPU-intensive
Crypto: crypto.pbkdf2(), crypto.scrypt(), crypto.randomBytes(), crypto.randomFill(), crypto.generateKeyPair().
Zlib: libuv의 스레드 풀을 명백하게 동기적으로 사용하는 경우를 제외한 모든 zlib API.
```
<a href="https://nodejs.org/ko/docs/guides/dont-block-the-event-loop">출처</a>

## network i/o에 좀 사용하고 싶은 경우

network i/o인 http.get 등의 method에 libuv의 thread를 늘려 긍정적인
효과를 줄 수 있지 않을까 생각했습니다.

그러나 libuv는 dns관련 api에서 thread pool을 활용하고,
network i/o 작업은 os process에 그 task가 넘어가게 됩니다.


## JSON으로 parse, stringify하는데 사용하고 싶은 경우

`JSON.parse` , `JSON.stringify`는 비용이 상당합니다.
이벤트루프를 길게 차단하고 있는 작업들은 모두 오프로드(worker thread를 생성 작업을 일임)를 하거나 파티셔닝등이 필요합니다.
streamAPI를 사용한다면 적은 버퍼만으로도 작업을 끝낼 수 있겠지만 cpu를 점유하는 시간은
크게 다르지 않을것입니다.

오프로드는 오버헤드가 발생하고, 통신비용으로 메모리를 복제하는 비용이 발생합니다.
node.js에도 공유메모리가 있어 한 메모리에 여러 thread가 붙어 작업하는 것이 가능합니다만,
atomic과 직접 설계하기 난해할 수 있습니다.






