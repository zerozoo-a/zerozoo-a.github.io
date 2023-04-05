const File = require("fs/promises");

function getKoreanDateTime() {
	const now = new Date();
	const year = now.getFullYear().toString();
	const month =
		now.getMonth() < 9 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
	const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
	return `${year}-${month}-${date}`;
}

/**
 *
 * @param {string} title
 */
const main = async (title) => {
	console.log(`create file name: ${title}`);
	if (title.length < 1) throw new Error("파일 이름을 입력하지 않았습니다.");
	const FRONTMATTER = `---\ntitle: ${title}\ndate: ${getKoreanDateTime()}\n---`;

	await File.writeFile(`./content/blog/temp/${title}.md`, FRONTMATTER);
};

main(process.argv.splice(2)[0]);
