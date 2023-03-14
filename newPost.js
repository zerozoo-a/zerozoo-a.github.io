// const fsp = require("node:fs/promises");
// const fs = require("node:fs");
// // const dateRfc3339 = require("@11ty/eleventy-plugin-rss/src/dateRfc3339");
// const ReadLine = require("node:readline/promises");

// const rl = ReadLine.createInterface({
// 	input: process.stdin,
// 	output: process.stdout,
// });

// const q = rl.question;
// const path = `./content/blog/`;

// const main = async () => {
// 	// fs.writeFile()
// 	const title = await q(`제목과 확장자를 입력해주세요: `);
// 	const isFileAlreadyExists = fs.existsSync(path + title);
// 	if (isFileAlreadyExists) {
// 		const shouldReplace = await q(`
//         덮어 씌우시겠습니까?
//         1 - yes
//         2 - no
//         `);
// 		if (!shouldReplace) process.exit(0);
// 	}
// 	await fsp.writeFile(
// 		path + title,
// 		`
//         ---
//         title: ${title}
//         date: ${new Date()}
//         ---
//         `
// 	);
// };

// main();
