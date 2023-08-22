const fs = require("fs");
const { readdir } = require("fs").promises;
const path = require("path");

/**
 *
 * @param {string} path
 * @returns {Promise<[string, string][]>}
 */
async function recursiveAllFiles(path) {
	const want2Delete = "content/blog/";
	let files = [];
	const items = await readdir(path, { withFileTypes: true });
	/**
	 *
	 * @param {string} path
	 */
	const isImagesDir = (path) => path.includes("/images");
	/**
	 *
	 * @param {string} name
	 * @returns
	 */
	const isDS_Store = (name) => name.includes(".DS_Store");

	/**
	 *
	 * @param {string} name
	 */
	const isImageFile = (name) => {
		const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp|tiff)$/i;
		return imageRegex.test(name);
	};

	for (const item of items) {
		if (item.isDirectory()) {
			files = [...files, ...(await recursiveAllFiles(`${path}/${item.name}`))];
		} else {
			const variablePath = path.slice(want2Delete.length);
			if (!variablePath.length) continue;
			if (
				isImagesDir(variablePath) ||
				isDS_Store(item.name) ||
				isImageFile(item.name)
			)
				continue;

			const indexOfSlash = variablePath.indexOf("/");
			const indexOfSlashOrZero = indexOfSlash > 0 ? indexOfSlash : 0;
			const nameOfFirstCategory =
				indexOfSlashOrZero > 0
					? variablePath.slice(0, indexOfSlashOrZero)
					: variablePath;

			files.push([
				nameOfFirstCategory,
				variablePath,
				item.name.replace(".md", ""),
			]);
		}
	}

	return files;
}

async function eleventyComputedGetCategories() {
	const path = "content/blog";
	const paths = await recursiveAllFiles(path);
	const categories = paths.reduce((acc, cur) => {
		if (!acc[cur[0]]) {
			acc[cur[0]] = [[cur[1], cur[2]]];
		} else {
			acc[cur[0]] = [...acc[cur[0]], [cur[1], cur[2]]];
		}
		return acc;
	}, {});
	return categories;
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
						.map((entry) => path.join(directoryPath, entry.name));
					// .map((path) => path.slice(want2Delete.length));

					resolve(directories);
				});
			});
		}
	);

	// eleventyConfig.addAsyncShortcode("getCategories", getCategories);
	eleventyConfig.addGlobalData(
		"eleventyComputedGetCategories",
		eleventyComputedGetCategories
	);
};
