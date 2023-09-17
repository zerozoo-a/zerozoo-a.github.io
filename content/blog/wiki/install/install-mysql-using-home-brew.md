---
title: install mysql using home brew
date: 2023-09-13 21:28:31
coverURL: https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80
---
<br />
<br />
<br />

# 설치

home brew를 설치해줍니다.

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

mysql 버전을 아래 표를 참고해서 골라주세요 

| 출시   | GA (General availability) | 최신 마이너 버전 | 최신 릴리스    | 수명 종료    |
|-------|--------------------------|----------------|--------------|------------|
| 5.1   | 2008년 11월 14일 (14년 전)  | 5.1.73         | 2013-12-03   | Dec 2013   |
| 5.5   | 2010년 12월 3일 (12년 전)   | 5.5.62         | 2018-10-22   | Dec 2018   |
| 5.6   | 2013년 2월 5일 (10년 전)    | 5.6.51         | 2021-01-20   | Feb 2021   |
| 5.7   | 2015년 10월 21일 (7년 전)   | 5.7.41         | 2023-01-17   | Oct 2023   |
| 8.0   | 2018년 4월 19일 (5년 전)    | 8.0.32         | 2023-01-17   | Apr 2026   |



```bash
brew install mysql // install latest version
brew install mysql@5.7 // install version 5.7
```

설치하면 아래와 같은 설명이 줄줄이 뜨는데 무시하고 닫으면 안됩니다
잘 읽고 여러분이 사용하시는 rc파일에 해당 내용을 복붙해주세요

```bash
If you need to have mysql@5.7 first in your PATH, run:
  echo 'export PATH="/opt/homebrew/opt/mysql@5.7/bin:$PATH"' >> ~/.zshrc

For compilers to find mysql@5.7 you may need to set:
  export LDFLAGS="-L/opt/homebrew/opt/mysql@5.7/lib"
  export CPPFLAGS="-I/opt/homebrew/opt/mysql@5.7/include"

For pkg-config to find mysql@5.7 you may need to set:
  export PKG_CONFIG_PATH="/opt/homebrew/opt/mysql@5.7/lib/pkgconfig"

To start mysql@5.7 now and restart at login:
  brew services start mysql@5.7
Or, if you don't want/need a background service you can just run:
  /opt/homebrew/opt/mysql@5.7/bin/mysqld_safe --datadir\=/opt/homebrew/var/mysql
==> Summary
🍺  /opt/homebrew/Cellar/mysql@5.7/5.7.43: 321 files, 233.9MB
==> Running `brew cleanup mysql@5.7`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
```

아래 명령어를 통해 mysql을 실행해주세요

```bash
  brew services start mysql@5.7
```

mySql Workbench나 dbeaver🦫 를 이용해 db를 사용해보세요
happy hacking!




