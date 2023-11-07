import { JSONPreset } from "lowdb/node";
// const JSONPreset = require("lowdb/node");

async function main() {
	const defaultData = {
		images: { urls: { test: { base64A: "base64 A", base64B: "base64 B" } } },
	};

	const db = await JSONPreset("db.json", defaultData);

	db.data.images.urls.test = { base64A: "base64 C", base64B: "base64 B" };
	await db.write();
}

main();
