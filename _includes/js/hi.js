const url =
	"http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst"; /*URL*/
const queryParams = new URLSearchParams({
	serviceKey: "",
	pageNo: "1",
	numOfRows: "1000",
	dataType: "XML",
	base_date: "20230410",
	base_time: "0600",
	nx: "55",
	ny: "127",
});

const xhr = new XMLHttpRequest();
xhr.open("GET", `${url}?${queryParams.toString()}`);
xhr.onreadystatechange = function () {
	if (this.readyState === XMLHttpRequest.DONE) {
		if (this.status === 200) {
			// 요청이 성공한 경우
			// this.responseText로 응답 데이터에 접근할 수 있습니다.
			// console.log("200! 성공이네요", this.responseText);
			// console.log(JSON.stringify(this.getAllResponseHeaders()));
			console.log("response", this.responseText);
		} else {
			// 요청이 실패한 경우
			// this.status로 HTTP 상태 코드에 접근할 수 있습니다.
			console.log("실패", this);
		}
	}
};

// xhr.send();
