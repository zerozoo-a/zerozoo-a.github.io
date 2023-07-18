const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");
// const https = require("https");
// const sharp = require("sharp");
const { createBase64FromURL } = require("./libs/createBase64FromURL");
const File = require("fs/promises");
const Fs = require("fs");

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
module.exports = (eleventyConfig) => {
	/**
	 *
	 * @param {string} inputPath
	 * @param {string} relativeFilePath
	 * @returns
	 */
	function relativeToInputPath(inputPath, relativeFilePath) {
		let split = inputPath.split("/");
		split.pop();

		const res = path.resolve(split.join(path.sep), relativeFilePath);
		return res;
	}

	eleventyConfig.addAsyncShortcode("convert", createBase64FromURL);

	// Eleventy Image shortcode
	// https://www.11ty.dev/docs/plugins/image/
	eleventyConfig.addAsyncShortcode(
		"image",
		async function imageShortcode(src, alt = "image alt") {
			// Full list of formats here: https://www.11ty.dev/docs/plugins/image/#output-formats
			// Warning: Avif can be resource-intensive so take care!
			let formats = ["avif", "webp", "auto"];
			let file = relativeToInputPath(this.page.inputPath, src);
			let metadata = await eleventyImage(file, {
				widths: [300, 600],
				formats,
				outputDir: path.join(eleventyConfig.dir.output, "img"), // Advanced usage note: `eleventyConfig.dir` works here because we’re using addPlugin.
			});

			let data = metadata.webp[metadata.webp.length - 1];
			return `<div class="img-container"><img class="border-radius10" src="${data.url}" width="100%" height="auto" alt="${alt}" loading="lazy" decoding="async"></div>`;
		}
	);

	eleventyConfig.addAsyncShortcode(
		"cover",
		/**
		 * @param {string} file
		 * @param {string} alt
		 * @returns
		 */
		async function imageShortcode(src, alt) {
			let formats = ["avif", "webp", "auto"];
			let file = "/covers/" + src;
			let metadata = await eleventyImage(file, {
				widths: [300, 600],
				formats,
				outputDir: "_site/covers",
			});
			let data = metadata.webp[metadata.webp.length - 1];
			return `<div class="img-container"><img class="border-radius10" src="${data.url}" alt="${alt}" decoding="async"></div>`;
		}
	);
};
