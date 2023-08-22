#!/usr/bin/env node
const categories = new Set([
	"CS",
	"errors",
	"JAVA",
	"JS",
	"life",
	"MATHEMATICS",
	"wiki",
]);
// TODO: 선택된 categories를 기반으로 post에 1대1 대응이 되는 image folder를
// public/img/blog/<selected-category>/<post-name>으로 생성합니다.

(async () => {
	const { program } = require("commander");
	const inquirer = await import("inquirer");

	program
		.version("1.0.0")
		.description("Interactive CLI with multiple-choice form");

	program
		.command("start")
		.description("add some post")
		.action(async () => {
			const questions = [
				{
					type: "list", // Multiple-choice form
					name: "choice",
					message: "어떤 category에 글을 추가하시겠습니까?:",
					choices: [...categories],
				},
				{
					type: "editor",
					name: "post_name",
					message: "타이틀을 작성해주세요. 최소 3 글자 이상이여야 합니다.",
					validate(text) {
						if (text.split("\n").length < 3) {
							return "Must be at least 3 lines.";
						}

						return true;
					},
				},
			];

			const answers = await inquirer.default.prompt(questions);
			console.log(`blog ${answers.choice}`);
		});
	program.parse(process.argv);
})();
