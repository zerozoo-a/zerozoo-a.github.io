---
title: 네트워크 7계층 OSI의 L1 스위치 
date: 2024-01-10 22:21:32
coverURL: https://images.unsplash.com/photo-1526073733167-1b6d55175336?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
<br />
<br />
<br />

# L1 스위치(물리)

- L1 스위치는 7 계층 중 첫 번째 레이어입니다.

- L1 스위치는 물리적 레이어 (Physical Layer)입니다.

이렇게 생겼습니다. >>>

{% image "./images/L1-switch.png", "L1 switch" %}

# 특징

- 물리적 레이어이므로 7계층을 통과한 데이터를 전기적 신호나 광신호로 전송합니다. 물리적인 매체인 광섬유 케이블을 통해 이루어집니다.

- 신호를 장거리로 보내야 할 경우, 데이터의 재생과 증폭 기능을 담당합니다.
  - 재생에 대해: 재생은 영어로 repeat입니다. 중계기(repeater)라고도 합니다.
  {% image "./images/1920px-Repeater-schema.svg.png", "https://ko.wikipedia.org/wiki/%EC%A4%91%EA%B3%84%EA%B8%B0#/media/%ED%8C%8C%EC%9D%BC:Repeater-schema.svg"%} 
  - repeater는 전파가 닿기 힘든 곳이나 전파의 세기를 강하게 증폭시켜 거리가 멀어도 안정적으로 데이터를 전송합니다.
- L1 스위치는 네트워크를 통해 전송되는 신호름 감지합니다.
- 약해진 신호를 원래의 형태로 복원하는 역할을 합니다.
- 약해진 신호를 증폭시켜 다음 목적지까지 보냅니다.
- L1 스위치는 프레이밍이나 주소를 지정하지 않습니다.
  - 이는 L2 스위치에서 이루어집니다.
- 물리적 스위치이므로 데이터의 내용을 처리 및 가공하거나 에러에 대한 수정 기능은 없습니다.

## hub와의 비교

### hub

허브는 물리적 레이어에서 작동한다는 동일성이 있으나,
신호를 네트워크 내의 모든 장치에 브로드캐스트합니다.

즉 허브에 꽂은 랜선, 랜선과 연결된 기기들은 허브에게 데이터를
분배받는 것 뿐입니다.

### L1 switch

스위치는 위에서 언급한 특성과 함께,

원하는 목적지까지 데이터의 무결성을 유지하며 패킷을 전송하는 기기입니다.


## 정리

### 이것을 함
- L1 스위치는 목적지까지 **데이터의 무결성을 지키기 위해
  증폭과 재생**을 하며, 물리적 케이블에 데이터를 보내주는 기기입니다.


### 이것을 하지 않음
-  L1 스위치는 데이터 패킷의 내용을 처리하지 않습니다.
-  MAC주소와 같은 주소의 해석등을 하지 않습니다.
  





