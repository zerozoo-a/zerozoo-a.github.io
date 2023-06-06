---
title: volatile keyword와 가시성 feat.cpu-cache
date: 2023-06-06 17:59:23
coverURL: https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80
---
{% image "circuit.avif", "https://unsplash.com/ko/%EC%82%AC%EC%A7%84/EUsVwEOsblE"%}


## cpu cache에 대해

cpu와 memory간의 속도차는 상당합니다. 

이 간극을 줄이기 위해 cpu는 cache 영역을 가집니다.

cpu는 main memory의 값을 계속 조회하는 대신
동일한 변수에 대한 조회 요청에는 cpu cache를 조회합니다.

{% image "cpu-cache.png", "cpu-cache" %}

이미지로는 위와 같은 이미지가 그려지게 됩니다.
cpu는 어셈블리어로 변환된 코드를 읽고 그대로 실행하게 되는데요

아래와 같은 순서를 따릅니다.


1️⃣ LOAD(ldr)를 통해 cpu cache의 값을 읽어옵니다.

2️⃣ 특정 명령어를 실행합니다.

3️⃣ STORE(str)를 통해 메모리에 값을 저장하게 됩니다.


이때 메모리에 접근하는 thread가 하나라면 그대로 메모리가 업데이트 됩니다.

## 멀티 thread의 memory 접근

multi thread라면 공유 자원에 접근할 때 문제가 발생합니다.
바로 아래 이미지와 같은 상황입니다.

{% image "cpu-cache2.png", "cpu-cache2" %}

cpuA가 LOAD 한 값은 foo 변수의 false입니다.

cpuB가 LOAD 한 값은 foo 변수의 false입니다.

cpuA은 cpu cache에 값을 저장하고 변수를 true로 변경합니다.

cpuB는 cpu cache에 값을 저장하고 해당 변수를 조건으로 반복문을 실행합니다.

cpuB는 cpuA에 의해 변경된 값을 조회하지 않고 cpu cache에 저장된 값을 조회하므로
값의 공유가 이루어지지 않습니다.

즉 main memory를 바라보고 있지 않은 상태입니다.

따라서 가시성이 없다고 할 수 있습니다.


설명이 길었습니다만 위의 상황을 방지해주는 키워드가

공용 메모리에 사용하는 volatile 키워드입니다.

해당 키워드는 공용 메모리로 사용될 값이 cpu cache에 저장되는 것을 방지해줍니다.

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