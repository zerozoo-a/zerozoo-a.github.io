---
title: OSI 7 Layer
date: 2023-10-26 20:59:07
coverURL: 
---
<br />
<br />
<br />

OSI (Open Systems Interconnection) 모델은 컴퓨터 네트워크와 통신 시스템에서 통신 과정을 이해하고 설명하기 위한 표준 모델입니다.


| 계층 번호 | 계층 이름           | 기능 및 설명                                                                                                                                                             | 예제 프로토콜 및 응용 프로그램     | 이미지 |
|------------|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------|------------|
| 7          | 응용 (Application) | 사용자와 컴퓨터 응용 프로그램 간의 통신을 지원합니다. 이메일, 웹 브라우징, 파일 전송 등의 응용 프로그램을 포함합니다. | HTTP, HTTPS, FTP, SSH       | <img width="160" alt="image" src="https://github.com/zerozoo-a/zerozoo-a.github.io/assets/80259925/497e73fa-5291-4104-906b-5f144ebe85fd"> |
| 6          | 표현 (Presentation) | 데이터를 응용 프로그램과 하위 계층 간에 변환, 압축 및 암호화합니다. 다른 시스템과의 데이터 형식 및 암호화를 처리합니다.                 | MIME, SMTP, IMAP, SSL               | <img width="160" alt="image" src="https://github.com/zerozoo-a/zerozoo-a.github.io/assets/80259925/2069d394-7a47-4f0a-84f8-261afe307ab4"> |
| 5          | 세션 (Session)      | 세션 관리 및 다중 통신 파트너 간의 대화를 설정, 유지 및 종료합니다. 통신 파트너 간의 동기화 및 오류 복구를 담당합니다.           | NetBIOS, RPC, WinSock, SMB           |  <img width="160" alt="image" src="https://github.com/zerozoo-a/zerozoo-a.github.io/assets/80259925/1b131b1e-7b86-43a7-a2d9-2ba8f3b602d3"> |
| 4          | <a href="https://www.cloudflare.com/ko-kr/learning/ddos/glossary/user-datagram-protocol-udp/" target="_blank" >전송 (Transport)</a>    | 데이터 전송의 흐름 및 오류 제어를 관리합니다. 데이터를 분할하고 재조립하여 종단 간 통신을 보장하며 신뢰성 있는 전송을 담당합니다.     | TCP, UDP | null |
| 3          | <a href="https://www.cloudflare.com/ko-kr/learning/network-layer/what-is-igmp/" target="_blank">네트워크 (Network)</a>  | 패킷 라우팅 및 전송을 관리합니다. 논리 주소 지정, **라우팅** 및 서비스 품질 관리를 수행하여 네트워크 간 통신을 처리합니다.          | ARP, IGMP, ICMP | null |
| 2          | 데이터 링크 (Data Link) | 두 시스템 사이에서 오류 없이 데이터를 전송하기 위해 상위 계층에서 받은 비트 열의 데이터로 하위 계층으로 전송하는 계층 | Ethernet, PPP, HDLC, Wi-Fi         | nil |
| 1          | 물리 (Physical)      |             계층을 타고 내려온 데이터를 전기적 신호로 변환시켜 통신하는 계층        | | <img width="160" alt="image" src="https://github.com/zerozoo-a/zerozoo-a.github.io/assets/80259925/a1a5687d-7b27-4ccd-b3e2-af656cf8f836">
 |

