#!/usr/bin/env node
const categories = new Set(["about", "blog", "feed"]);

(async () => {
	const { program } = require("commander");
	const inquirer = await import("inquirer");
	// const { createPost } = require("../createPost");

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
						console.log("🚀 ~ file: post.js:29 ~ validate ~ text:", text);
						if (text.split("\n").length < 3) {
							return "Must be at least 3 lines.";
						}

						return true;
					},
				},
			];

			const answers = await inquirer.default.prompt(questions);
			console.log(`당신의 선택은: ${answers.choice}`);
		});
	program.parse(process.argv);
})();
