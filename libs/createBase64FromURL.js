const https = require("https");
const sharp = require("sharp");
const File = require("fs/promises");
const Fs = require("fs");
const { resolve } = require("path");
const PATH = "imageURL2base64Db.json";

/**
 *
 * @param {string} url
 * @returns
 */
const getFromBase64DB = async (url) => {
	const isFileExists = Fs.existsSync(PATH);
	if (!isFileExists) return new Error("CACHED DATA IS NOT EXISTS");

	const cachedData = JSON.parse(
		await File.readFile(PATH, { encoding: "utf-8" })
	);
	return cachedData[url] ?? "";
};

/**
 * @param {string} url
 */
const createBase64FromURL = async (url) => {
	const isFileExists = Fs.existsSync(PATH);
	if (!isFileExists) {
		await File.writeFile(PATH, JSON.stringify({ _: "" })).catch((e) =>
			console.error(e)
		);
	}
	const cachedData = JSON.parse(
		await File.readFile(PATH, { encoding: "utf-8" })
	);

	if (cachedData[url]) {
		// use cached data
		return cachedData[url];
	}

	const d = await convertToBase64(url);
	console.log(
		"🚀 ~ file: createBase64FromURL.js:43 ~ createBase64FromURL ~ d:",
		d
	);
	/**
	 *
	 * @param {string} base64
	 * @returns
	 */
	const addHTMLSpec2Base64 = (base64) => `data:image/png;base64,${base64}`;

	// update json object
	cachedData[url] = [
		addHTMLSpec2Base64((bigBase64 = "")),
		addHTMLSpec2Base64((smallBase64 = "")),
	];
	const updatedJSON = JSON.stringify(cachedData, null, 2);
	await File.writeFile(PATH, updatedJSON, "utf8", (err) => {
		console.error(err);
	});

	return "";
};

/**
 *
 * @param {string} url
 * @returns
 */
const convertToBase64 = (url) =>
	new Promise((resolve, reject) => {
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

						Promise.all([
							resizeBase64(644, 362.25, buffer),
							resizeBase64(128, 128, buffer),
						]).then((images) => {
							const mappedImages = images.map((image) =>
								image.toString("base64")
							);
							resolve(mappedImages);
						});
					})
					.on("error", (err) => {
						console.error(err);
						reject(err);
					});
			}
		);
	});

/**
 *
 * @param {number} w
 * @param {number} h
 */
const resizeBase64 = (w, h, buffer) =>
	new Promise((res) => res(sharp(buffer).resize(w, h).toBuffer()))
		.then((res) => {
			const base64 = res.toString("base64");
			resolve(base64);
		})
		.catch((e) => console.error(`resizeBase64: ${e.message}`));

module.exports = {
	createBase64FromURL,
	getFromBase64DB,
};
