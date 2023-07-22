---
title: lsof-kill
date: 2023-07-23 00:32:24
coverURL: https://plus.unsplash.com/premium_photo-1677535563007-d10ba8cb423d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2233&q=80
---
<br />

<a href="https://plus.unsplash.com/premium_photo-1677535563007-d10ba8cb423d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2233&q=80">이미지 출처</a>

> cli 프로그램을 알아보고 사용할 수 있다.
## lsof

lsof = list of file process를 점유하고 있는 list를 보여줍니다.
    (기본적으로 많은 내용을 담고 있으므로 찾고 싶은 특정 process를 찾아내려면 필터링이 필요합니다.)

- --help 명령어를 통해 option과 사용법을 알 수 있습니다.

- -i 옵션을 통해 특정 port번호를 사용하고 있는 PID(process id)를 확인할 수 있습니다.

```bash
 lsof -i :8080
 COMMAND     PID USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
Google    47241  zerozoo   26u  IPv6 0x000000000000000d      0t0  TCP localhost:53197->localhost:http-alt (CLOSE_WAIT)
...
```


<br />
<br />

## kill
특정 프로세스를 죽입니다.
kill -l 명령어를 통해 프로세스를 죽이는 방식을 확인 할 수 있습니다.

```bash
// OSX 13.3.1
HUP INT QUIT ILL TRAP ABRT EMT FPE KILL BUS SEGV SYS PIPE ALRM TERM URG STOP TSTP CONT CHLD TTIN TTOU IO XCPU XFSZ VTALRM PROF WINCH INFO USR1 USR2
```
보통 9, 15를 많이 사용합니다. 9는 kill -l의 kill을 나타내며 15는 term (terminate)를 나타냅니다. 

9는 강제 종료, 15는 저장 후 종료입니다.


## 정리

- lsof를 통해 PID를 알아냅니다.

- kill을 통해 프로세스를 죽입니다.