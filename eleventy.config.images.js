const path = require("path");
const eleventyImage = require("@11ty/eleventy-img");
const https = require("https");
const sharp = require("sharp");
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

	eleventyConfig.addAsyncShortcode(
		"convert",
		/**
		 * @param {string} url
		 */
		async (url) => {
			const PATH = "imageURL2base64Db.json";
			const isFileExists = Fs.existsSync(PATH);
			if (!isFileExists) {
				await File.writeFile(PATH, JSON.stringify({ empty: "" })).catch((e) =>
					console.error(e)
				);
			}
			const cachedData = JSON.parse(
				await File.readFile(PATH, { encoding: "utf-8" })
			);

			if (cachedData[url]) {
				// use cached data
				console.log("use cached data");
				return cachedData[url];
			}

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
									res(sharp(buffer).resize(78, 78).toBuffer()); // image resize
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
			const base64 = `data:image/png;base64,${await convertedBase64}`;
			// update json object
			cachedData[url] = base64;
			const updatedJSON = JSON.stringify(cachedData, null, 2);
			await File.writeFile(PATH, updatedJSON, "utf8", (err) => {
				console.error(err);
			});

			return base64;
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
			
			let data = metadata.webp[metadata.webp.length - 1];
			return `<div class="img-container"><img src="${data.url}" width="100%" height="auto" alt="${alt}" loading="lazy" decoding="async"></div>`;
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
			return `<div class="img-container"><img src="${data.url}" alt="${alt}" decoding="async"></div>`;
		}
	);
};
