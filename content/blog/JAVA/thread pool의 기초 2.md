---
title: thread pool의 기초 2
date: 2023-06-08 22:59:02
coverURL: https://images.unsplash.com/photo-1565495612491-a830ecb85626?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80
---

{% image "basic_of_thread_pool2.avif", "pool"%}

## Executors에 대해

Executors란 무엇일까요?

> Factory and utility methods for Executor, ExecutorService, ScheduledExecutorService, ThreadFactory, and Callable classes defined in this package. 

바로 이전 글에서 살펴본 Executor의 Factory와 utility methods라고 합니다.

Executor는 execute method의 interface였습니다.
execute method의 반환값은 void입니다.

Executors는 Executor를 확장한 ExecutorService 타입의 pool을 반환합니다.

```java
 ExecutorService pool = Executors.newFixedThreadPool(2);
```

위의 Executors의 method는 Executor interface를 확장한 ExecutorService pool을 반환하고

이를 이용해 스레드 pool을 사용 할 수 있습니다.

## thread pool들의 종류를 가볍게 알아보자

```java
	ExecutorService pool = Executors.newFixedThreadPool(2);		
    
    ExecutorService pool2 = Executors.newSingleThreadExecutor();

```

위의 `newFixedThreadPool(2);`라는 method는
`ExecutorService pool`을 반환하고 pool을 사용 할 수 있게 됩니다.

평소처럼 jdk 설명을 읽어봅시다.

> Creates a thread pool that reuses a fixed number of threads operating off a shared unbounded queue.

> pool을 생성하고 integer를 인자로 받아 unbounded queue를 생성합니다.

## thread pool의 queue에 대해

여기서 queue가 나왔습니다.

thread pool은 두가지 queue를 제공합니다.

크기의 제한이 있는 bounded queue와 unbounded queue입니다.

예상 할 수 있듯이 bounded는 queue에 최대치를 걸어 그 이상을 넘는 요청은 thread를 대기시킵니다.

unbounded는 제한이 없지만 memory를 넘쳐버릴 수 있다는 점에 주의해야 합니다.


## 예제 

예제에서는 pool의 사용법과
ExecutorService class를 가지는 pool 객체를 생성하여
pool을 실행해봅니다.

위의 설명을 통해 알 수 있듯이 자신이 사용하는 pool이
어떤 로직을 통해 실행되는 것인지 알아두어야 합니다.

```java
package org.example.Chapter25;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Ex10_ThreadPool3 {
	public static void main(String[] args) {
		Runnable task1 = () -> {
			String name = Thread.currentThread().getName();
			try {
				Thread.sleep(5000);
			} catch (Exception e) {}
			System.out.println(name + ": 5초 후 실행");
		};

		ExecutorService pool = Executors.newFixedThreadPool(2);
		ExecutorService pool2 = Executors.newSingleThreadExecutor();

		pool.submit(task1);
		pool2.submit(task1);

		pool.shutdown();
		pool2.shutdown();
	}
}

```

## 정리

thread pool은 ExecutorService 클래스를 가집니다.
ExecutorService는 Executor를 확장하여 execute 메서드가 있습니다.

pool은 제한이 있는 큐와 없는 큐가 있습니다.
당연히 제한이 없는 큐는 사용에 주의해야겠습니다.