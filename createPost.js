const File = require("fs/promises");
const fs = require("fs");

/**
 *
 * @returns {string}
 */
function getKoreanDateTime() {
	const now = new Date();
	const year = now.getFullYear().toString();
	const month =
		now.getMonth() < 9 ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
	const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();

	const hours = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
	const minutes =
		now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
	const seconds =
		now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();

	return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
}

/**
 * @param {string} title
 * @returns {string}
 */
const TITLE = (title) => `title: ${title}`;

/**
 * @returns {string}
 */
const COVER_URL = () => `coverURL: `;
/**
 *
 * @param {string[]} title
 */
const main = async (title) => {
	console.log(`create file name: ${title}`);
	if (title.length < 1) throw new Error("파일 이름을 입력하지 않았습니다.");
	const FRONTMATTER = `---\n${TITLE(
		title
	)}\ndate: ${getKoreanDateTime()}\n${COVER_URL()}\n---`;

	const isDirExists = fs.existsSync(`./content/blog/temp`);

	if (isDirExists) {
		await File.writeFile(`./content/blog/temp/${title}.md`, FRONTMATTER);
	} else {
		await File.mkdir(`./content/blog/temp`);
		await File.writeFile(`./content/blog/temp/${title}.md`, FRONTMATTER);
	}
};

main(process.argv.splice(2).join(" "));
