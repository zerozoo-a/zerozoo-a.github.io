const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");
const https = require("https");
const sharp = require("sharp");

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

	eleventyConfig.addAsyncShortcode(
		"convert",
		/**
		 * @param {string} url
		 */
		async (url) => {
			const convertedBase64 = new Promise((resolve, reject) => {
				https.get(
					url,
					{
						headers: {
							"User-Agent": "Mozilla/5.0",
						},
					},
					(res) => {
						const chunks = [];

						res.on("data", (chunk) => {
							chunks.push(chunk);
						});

						res
							.on("end", () => {
								const buffer = Buffer.concat(chunks);
								new Promise((res) => {
									res(sharp(buffer).resize(92, 92).toBuffer()); // image resize to 92, 92
								}).then((res) => {
									const base64 = res.toString("base64");
									resolve(base64);
								});
							})
							.on("error", (err) => {
								console.error(err);
								reject(err);
							});
					}
				);
			});

			return `data:image/png;base64,${await convertedBase64}`;
		}
	);

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
			// return eleventyImage.generateHTML(metadata, imageAttributes);
			let data = metadata.webp[metadata.webp.length - 1];
			return `<img src="${data.url}" width="100%" height="auto" alt="${alt}" loading="lazy" decoding="async">`;
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
			return `<img src="${data.url}" width="100%" height="auto" alt="${alt}" loading="lazy" decoding="async">`;
		}
	);
};
