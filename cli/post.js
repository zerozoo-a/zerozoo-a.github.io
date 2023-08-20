#!/usr/bin/env node
const { Command } = require("commander");
const program = new Command();

const BASE_PATH = "/content/blog";

program.name("create post").description("post를 생성합니다.").version("0.1.0");
program
	.command("post")
	.argument("<string>", "post name")
	.option(
		"-p, --path <string>",
		"/를 구분자로 content/blog/<path>를 입력해주세요"
	)
	.action((postName = "", path = BASE_PATH) => {
		console.log("🚀 ~ file: post.js:14 ~ .action ~ path:", path);
		console.log("🚀 ~ file: post.js:14 ~ .action ~ postName:", postName);
	});

program.parse();
