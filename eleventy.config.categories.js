const fs = require("fs");
const { readdir } = require("fs").promises;
const path = require("path");

function deepMerge(obj1, obj2) {
	const result = { ...obj1 }; // Create a copy of obj1

	Object.keys(obj2).forEach((key) => {
		if (obj2[key] && typeof obj2[key] === "object") {
			if (result[key] && typeof result[key] === "object") {
				result[key] = deepMerge(result[key], obj2[key]); // Recursively merge nested objects
			} else {
				result[key] = obj2[key]; // Assign if the property does not exist in obj1 or is not an object
			}
		} else {
			result[key] = obj2[key]; // Assign non-object properties
		}
	});

	return result;
}

/**
 *
 * @param {string} keys
 * @param { {name: string, path: string} } item
 * @returns
 */
function arrToObj(keys, item) {
	let o = {};
	for (let i = keys.length - 1; i >= 0; i--) {
		if (i === keys.length - 1) {
			o[item.name] = [
				item.path.replace("content", ""), // substring(7)은 path값에 있는 필요없는 데이터를 지움
				item.name.replace(".md", "").replace(".html", ""),
			];
		}
		o = { [keys[i]]: o };
	}
	return o;
}

/**
 *
 * @param {string} path
 * @returns {Promise<{[k:string]:any}>}
 */
async function recursiveAllFiles(path) {
	try {
		const items = await readdir(path, { withFileTypes: true });
		let res = {};

		for (const item of items) {
			const paths = item.path.split("/").slice(2);

			if (item.isDirectory()) {
				res = deepMerge(res, await recursiveAllFiles(`${path}/${item.name}`));
			} else {
				if (!item.name.endsWith(".md") && !item.name.endsWith(".html")) {
					continue;
				}

				res = deepMerge(res, arrToObj(paths, item));
			}
		}
		return res;
	} catch (err) {
		return {};
	}
}

async function eleventyComputedGetCategories() {
	/** dir과 dir내부의 파일들을 key value로 묶는 재귀 함수 dir = key */
	const [posts, examples] = await Promise.all([
		recursiveAllFiles("content/blog"),
		recursiveAllFiles("content/examples"),
	]);
	return { ...posts, examples };
}

module.exports.eleventyComputedGetCategories = eleventyComputedGetCategories;
/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = (eleventyConfig) => {
	eleventyConfig.addAsyncShortcode(
		"getAllDirectories",
		async function (directoryPath = null) {
			if (!directoryPath) return "invalid input path";
			return new Promise((resolve, reject) => {
				fs.readdir(directoryPath, { withFileTypes: true }, (err, entries) => {
					if (err) return reject(err);

					const directories = entries
						.filter((entry) => entry.isDirectory())
						.map((entry) => path.join(directoryPath, entry.name))
						.sort((a, b) => a - b);

					// .map((path) => path.slice(want2Delete.length));

					resolve(directories);
				});
			});
		}
	);

	eleventyConfig.addGlobalData(
		"eleventyComputedGetCategories",
		eleventyComputedGetCategories
	);
};
