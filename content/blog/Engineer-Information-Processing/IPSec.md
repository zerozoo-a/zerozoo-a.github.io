---
title: IPSec에 대해
date: 2023-11-15 22:04:08
coverURL: https://user-images.githubusercontent.com/80259925/283131471-b2f3d3c5-1065-426c-a66e-9e2dd214b009.png
---
<br />
<br />
<br />

## IPSec

IPSec는 흔히 OSI 7 Layer의 3 계층인 IP계층에서 무결성과 인증을 보장하는 통신 프로토콜 세트입니다.
IPSec은 암호와와 인증을 추가해 프로토콜을 더욱 안전하게 만듭니다.

IPSec는 IP 패킷의 보안성을 제공하기 위해 2가지 헤더를 정의합니다.
- AH 헤더: 무결성, 인증
- ESP 헤더: 무결성, 인증, 암호화(기밀성)

### AH(Authentication Header) 헤더

{% image "./images/AH-header.jpeg" %}
(이미지 출처: ktword.co.kr)


AH 헤더는 데이터의 무결성과 출처의 인증을 제공합니다.
통신간 패킷이 변경되지 않고 예상된 송신자로부터 왔음을 보장합니다.


- 데이터가 패킷 단위로 쪼개져 이동하는데 이 패킷이 다른 악의적인 의도로 들어온 패킷인지(무결성, 인증) 아닌지를
확인해야 하므로 AH헤더가 필요함


### ESP(Encapsulating Security Payload) 헤더

{% image "./images/ESP-header.jpeg" %}
(이미지 출처: ktword.co.kr)

ESP는 무결성, 인증, 그리고 기밀성을 제공합니다.

인터넷 통신이 일어날 때, 통신이 싣고 가는 데이터를 암호화하는 기술로 악의적인 의도를 가진자가
이동하는 데이터를 열어 해독 하지 못하게 암호화합니다. 

위 이미지처럼 
ESP 헤더가 payload 앞에,
ESP Trailer가 payload 뒤에 위치합니다.

이는 암호화되고 인증되는 데이터를 감싸는 역할을 하게됩니다.

#### ESP header
- SPI (Security Parameter Index) (32 비트)
    - 임의 32 비트 값으로, 보안연관의 식별용
- Sequence Number (32 비트)
    - 재전송공격 방지
    - 1부터 1씩 증가하다가 232까지 가능
    - 232 이후, SA가 재설정되어야 함 

#### ESP Trailer
- payload 데이터 
    - ESP에 의해 암호화 되는 실제로 전송되어야 할 데이터
- 패딩(padding) 
    - 암호화 알고리즘의 요구에 맞게 늘었다 줄었다하는 데이터 블록
- pad length
    - 패딩의 길이
- next header
    - payload 필드에 포함된 데이터 종류를 식별해 줄 필드입니다.

정리하면

IPSec는 Ip 3 계층에서 데이터의 무결성과 인증을 보장하는 프로토콜입니다.



