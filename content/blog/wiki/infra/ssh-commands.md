---
title: ssh 사용법
date: 2024-02-24 10:58:05
coverURL: 
---
<br />
<br />
<br />

# 기본적인 사용법
> ssh -i "your-ssh-key-file.key" name@ip"

ssh의 개인키 파일은 잘 보관해두어야 합니다.

<a href="https://velog.io/@dldhk97/%EC%98%A4%EB%9D%BC%ED%81%B4-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C%EC%97%90-%EB%8F%84%EC%BB%A4-MYSQL-%EC%84%A4%EC%B9%98%ED%95%B4%EB%B3%B4%EA%B8%B0">링크</a>에서 OCI 설정을 잘 설명해주고 있습니다.

## 개인키 대신 password로 접근 가능하게 변경

> ssh -i "your-ssh-key-file.key" name@ip"

을 통해 원격에 접속합니다.
ubuntu를 기준으로합니다.

`/etc/ssh`에서 `sshd_config` 파일을 수정합니다.

```sh
# /etc/ssh

sudo vim sshd_config
```


`PasswordAuthentication` 설정을 `no`에서 `yes`로 변경합니다.
```sh
# /etc/ssh/sshd_config file

# PasswordAuthentication no
PasswordAuthentication yes
```
