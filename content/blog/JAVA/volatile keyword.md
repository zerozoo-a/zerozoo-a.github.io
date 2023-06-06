---
title: volatile keyword와 가시성 feat.cpu-cache
date: 2023-06-06 17:59:23
coverURL: https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80
---
{% image "circuit.avif", "https://unsplash.com/ko/%EC%82%AC%EC%A7%84/EUsVwEOsblE"%}

# volatile keyword


cpu와 memory간의 속도차는 상당합니다. 이 간극을 줄이기 위해
cpu는 cache 영역을 가집니다.

cpu는 main memory의 값을 계속 조회하는 대신
동일한 변수에 대한 조회 요청에는 cpu cache를 조회합니다.

{% image "cpu-cache.png", "cpu-cache" %}

이미지로는 위와 같은 이미지가 그려지게 됩니다.

CPU는 어셈블리어로 변환된 코드를 읽고 그대로 실행하게 되는데요


1️⃣ LOAD(ldr)를 통해 cpu cache의 값을 읽어옵니다.

2️⃣ 특정 명령어를 실행합니다.

3️⃣ STORE(str)를 통해 메모리에 값을 저장하게 됩니다.

이때 메모리에 접근하는 thread가 하나라면 그대로 메모리가 업데이트 되는데요

만약 thread가 둘이라면 이 상황에 변수가 발생합니다.
바로 아래 이미지와 같은 상황입니다.

{% image "cpu-cache2.png", "cpu-cache2" %}

다른 thread에서 공유 자원인 foo에 접근하는 것입니다.
foo에 접근한 다음 cpu-cache에 값을 저장하고
cpu2는 foo의 값을 주시합니다.

예를 들어 아래와 같은 코드는 foo의 값의 변경을 알아차릴 수 있습니다.

```java
while(!foo) {
    /** 대기 */
}
```
위와 같이 무한루프를 돌면서 foo의 값을 확인하는 방법이 가장 간단하겠네요

그런데 cpu2는 cpu-cache에 저장한 값인 false 값을 계속 주시하게 됩니다.

cpu1이 값을 변경하면 cpu2가 가지고 있던 foo의 값이 변경될 것을 기대할 수 있겠지만
기대와는 다르게 동작합니다.

cpu2는 무한루프에 빠지게 됩니다.

> ## cpu2가 바라보고 있는 것은 cpu-cache에 저장된 값이고
> **_main memory에 있는 값의 변경을 알 수 없습니다._**

설명이 길었습니다만 위의 상황을 방지해주는 키워드가

공용 메모리에 사용하는 volatile 키워드입니다.

해당 키워드는 공용 메모리로 사용될 값이 cpu-cache에 저장되는 것을 방지해줍니다.

계속 main memory에서 값을 조회해오도록 코드가 변경되어집니다.



예시 코드는 아래와 같습니다.

아래의 코드는 

공용 자원의 값을 기준으로 while문을 도는 thread를 시작시킵니다.
공용 자원의 값을 변경하면 위의 thread의 while문 조건이 변경됩니다.
thread는 공용자원의 변경을 확인하고 루프를 빠져나옵니다.

여기서 공용자원에 사용된 volatile 키워드가 있고 없고에 따라 

thread는 무한 루프를 빠져나올 수 있고 없고가 결정됩니다.

감사합니다.

```java
// 예시 코드
public class Ex001_Missile {
	public volatile static boolean hasMissileLaunched = false;

	private static class MissileInterceptor extends Thread {
		@Override
		public void run() {
			while(!hasMissileLaunched) {
				/** 대기중... */
			}
			System.out.println("요격 미사일 발사");
		}

	}

	private static void launchMissile() { hasMissileLaunched = true; }

	public static void main(String[] args) throws InterruptedException {
		final MissileInterceptor missileInterceptor = new MissileInterceptor();
		missileInterceptor.start();
		Thread.sleep(5000);
		launchMissile();
		missileInterceptor.join();
	}
}
```