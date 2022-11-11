console.log("안녕하세요? zerozoo-a의 블로그에 방문해주셔서 감사드립니다.");

console.log("오늘은..", new Date());
console.log(
  "%c오늘 당신에게 어울리는 행운의 컬러는..",
  `#${toColor(Math.random() * 100)}`
);

function toColor(num) {
  num >>>= 0;
  const b = num & 0xff,
    g = (num & 0xff00) >>> 8,
    r = (num & 0xff0000) >>> 16,
    a = ((num & 0xff000000) >>> 24) / 255;
  return "rgba(" + [r, g, b, a].join(",") + ")";
}
