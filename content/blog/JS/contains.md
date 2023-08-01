---
title: contains 함수
date: 2023-08-02 00:53:18
coverURL: https://images.unsplash.com/photo-1586510433654-bcd64f4d3518?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80
---

<a href="https://images.unsplash.com/photo-1586510433654-bcd64f4d3518?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80">
이미지 출처
</a>

<br />
<br />
<br />

## `contains` 함수란?
`Node.contains()` 메소드는 주어진 인자가 node 의 자손인지, 아닌지에 대한 Boolean 값을 리턴합니다. - 출처 mdn


즉, Node간의 부모 자식간의 관계를 확인하는 함수입니다.

부모 자식의 관계는 개발에서 매우 중요한 개념인데요
브라우저에서도 마찬가지입니다.

특정 이벤트를 버블링 혹은 캡쳐링해서 흘려보낼 때,
특정 자식이거나 특정 노드인 경우 contains 함수를 활용할 수 있습니다.

예를 들어 drawer 메뉴가 있다고 합시다.
drawer 메뉴는 보통 왼쪽에서 나와 화면의 모든 높이를 차지합니다.

메뉴가 꽉 차있지 않다면 메뉴에 공백이 생기게 됩니다.

공백을 클릭했을 때 메뉴를 닫아주고 싶은 경우 contains 함수를 활용할 수 있습니다.

아래는 예시입니다.

```js
		const openDrawerBtn = document.getElementById('openDrawerBtn');
		const drawerMenu = document.getElementById('drawerMenu');

		openDrawerBtn.addEventListener('click', () => {
			drawerMenu.style.left = '0';
		});

		document.addEventListener('click', (event) => {
			if(drawerMenu.contains(event.target) && event.target === drawerMenu) {
   		        drawerMenu.style.left = '-280px';
				return
			}

			if (
			event.target !== drawerMenu 
			&& event.target !== openDrawerBtn
			&& !drawerMenu.contains(event.target)
			) {
   		         drawerMenu.style.left = '-280px';
			}
		});
        
```

메뉴에 빈칸을 눌러 메뉴의 취소 이벤트를 발생 시키고 싶은 경우
contains로 클릭된 Node가 drawer의 자식인지 확인하고
drawer메뉴 자신인지 확인하면 됩니다.

혹은 자식 Node가 아닌지 확인하는 것으로 충분합니다.

## 요약
contains를 활용하면 x버튼을 굳이 만들지 않아도
거대하고 편리한 x 버튼을 만들 수 있습니다.

감사합니다.