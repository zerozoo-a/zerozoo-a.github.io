const File = require("fs/promises");
const fs = require("fs");

/**
 * @param {string} title
 */
const createPost = async (_title) => {
	const title = _title.join("-");
	console.log("🚀 ~ file: createPost.js:9 ~ main ~ _title:", _title);

	console.log(`attempt create file name: ${title}`);

	if (title.length < 1) throw new Error("파일 이름을 입력하지 않았습니다.");

	const FRONTMATTER = `---\n${TITLE(
		title.replaceAll("-", " ")
	)}\ndate: ${getKoreanDateTime()}\n${COVER_URL()}\n---\n<sup>\n
	각주:[1](배너_이미지_출처)\n</sup>\n<br />\n<br />\n<br />`;

	const TEMP_DIR = `./content/blog/temp/`;
	const FULL_PATH = TEMP_DIR + title + ".md";

	const isDirExists = fs.existsSync(TEMP_DIR);
	const isFileExists = fs.existsSync(FULL_PATH);

	if (isFileExists) {
		throw Error("이미 같은 이름의 파일이 " + TEMP_DIR + "에 존재합니다.");
	}

	if (isDirExists) {
		await File.writeFile(FULL_PATH, FRONTMATTER);
	} else {
		await File.mkdir(TEMP_DIR);
		await File.writeFile(FULL_PATH, FRONTMATTER);
	}
};

createPost(process.argv.splice(2));

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
function TITLE(title) {
	`title: ${title}`;
}

/**
 * @returns {string}
 */
function COVER_URL() {
	`coverURL: `;
}

module.exports = {
	createPost,
};
