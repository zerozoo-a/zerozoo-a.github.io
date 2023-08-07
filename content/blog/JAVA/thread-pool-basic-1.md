---
title: thread pool의 기초 1
date: 2023-06-08 00:15:48
coverURL: https://images.unsplash.com/photo-1556314231-2f7d9c122691?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80
---

<a href="https://unsplash.com/ko/%EC%82%AC%EC%A7%84/ewSBvLSp3Tc"> 출처: unsplash</a>


## thread pool

교과서적인 내용입니다만 java에서 process 내부에 존재하는 스레드는 생성비용이 비쌉니다. (플랫폼 스레드를 사용해서 그렇기도 하며, 최신 버전에는 경량 스레드인 가상 스레드가 나왔습니다.)

thread pool에서 pool이란 위의 그림처럼 스레드들을 생성하고 죽이는게 아니라 생성한 다음 유지
및 재사용을 하기 위한 방법입니다.

비슷하게 connection pool이나 js에선 promise pool 등 여러 의미로 사용됩니다만

개발자에게 전달하고자 하는 내용은 같습니다. 기존 대비 효율을 높여주겠다는 내용이죠

## pool의 생성 방법

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public static void main(String[] args) {
    ExecutorService pool = Executors.newSingleThreadExecutor();
}
```

위의 방법으로 pool을 생성합니다. 

## ExecutorService에 대해

ExecutorService는 대체 뭘까요?

이럴 때는 그냥 JDK에서 구현해놓은 구현체를 보면 됩니다.
물론 제가 뭣도 아닌지라 설명을 아주 약간만 볼 것입니다.

> An ExecutorService can be shut down, which will cause it to reject new tasks. Two different methods are provided for shutting down an ExecutorService. 

> ExecutorService를 종료하면 새 작업이 거부될 수 있습니다. ExecutorService를 종료하기 위해 두 가지 방법이 제공됩니다.

또한 ExecutorService는 Executor interface를 부모로 갖는 class입니다.
위 설명만으로는 전부 이해하기가 난해합니다 추가적으로 정보를 찾아봐야겠습니다. 🤔

> ... Method submit extends base method Executor.execute(Runnable) by creating and returning a Future that can be used to cancel execution and/or wait for completion.

> 메소드 제출은 실행 취소 및/또는 완료 대기에 사용할 수 있는 Future를 생성 및 리턴하여 기본 메소드 Executor.execute(Runnable)를 확장합니다.


이제 알겠습니다. ExecutorService는 스레드를 실행, 정지하는 역할이 주된 역할인가봅니다.
아무래도 thread pool이니까 당연하겠네요

## Executor에 대해
그럼 Executor는 뭘까요? 아래의 설명을 보시죠

> An Executor that provides methods to manage termination and methods that can produce a Future for tracking progress of one or more asynchronous tasks.

> 종료를 관리하는 메서드와 하나 이상의 비동기 작업의 진행 상황을 추적하기 위해 Future를 생성할 수 있는 메서드를 제공하는 Executor입니다.
라고 합니다.


## Future에 대해

모르는게 꼬리를 무네요 Future는 뭘까요?

> A Future represents the result of an asynchronous computation.

> Future는 비동기 계산의 결과를 나타냅니다.

미래의 값이므로 Future라는 이름을 붙인 것 같습니다.
이제 thread pool에 대한 대략적인 class들의 설명을 모두 훑어보았습니다.

## 정리

정리해보자면 ExecutorService는

스레드의 실행을 담당하는 Executor를 확장하여 스레드를 실행 할 수 있고
자체적으로 shutdown 메서드를 구현하여 스레드를 종료 할 수 있는 클래스입니다.
비동기의 결과값으로 가져오는 데이터를 Future라고 합니다.

그럼 실제 예제를 보며 확인하겠습니다.


## 예제

```java
package org.example.Chapter25;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Ex08_ThreadPool1 {
	public static int money = 0;

	public static void main(String[] args) {
		Runnable task1 = () -> {
			for (int i = 0; i < 10000; i++) {
				money++;
			}
			String name = Thread.currentThread().getName();
			System.out.println(name + ": " + money);
		};


		Runnable task2 = () -> {
			for (int i = 0; i < 10000; i++) {
				money--;
			}
			String name = Thread.currentThread().getName();
			System.out.println(name + ": " + money);
		};

		ExecutorService pool = Executors.newSingleThreadExecutor(); // 1
		pool.submit(task1); // 2
		pool.submit(task2); // 3

		System.out.println("End " + Thread.currentThread().getName());

		pool.shutdown(); // 4
	}
}
```
(위 예제는 이재환의 자바 프로그래밍이라는 책의 예제중 일부입니다.)

위 코드에서 방금 학습한 pool 객체를 확인할 수 있습니다.
ExecutorService를 타입으로 가지고 있습니다.

따라서 스레드의 등록 및 실행 종료를 담당합니다.

submit으로 Runnable 메서드를 실행합니다.
shoutdown으로 종료합니다.

Executors는 다음 시간에 알아봅시다.





