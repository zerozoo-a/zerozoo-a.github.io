const mermaidEls = document.getElementsByClassName("mermaid");

// 감지 옵션 (감지할 변경)
const config = { attributes: true, childList: true };

// 변경 감지 시 실행할 콜백 함수
const callback = (mutationList, observer) => {
	for (const mutation of mutationList) {
		if (mutation.type === "childList") {
			for (let i = 0; i < mermaidEls.length; i++) {
				mermaidEls[i].classList.add("active-mermaid");
				observer.disconnect();
			}
		}
	}
};

for (let i = 0; i < mermaidEls.length; i++) {
	mermaidEls[i].classList.add("opacity-0");
	const observer = new MutationObserver(callback);
	observer.observe(mermaidEls[i], config);
}
