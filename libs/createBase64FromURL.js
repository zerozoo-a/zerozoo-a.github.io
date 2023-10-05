const https = require("https");
const sharp = require("sharp");
const File = require("fs/promises");
const Fs = require("fs");
const Path = require("path");
const PATH = Path.join(__dirname, "../db/imageURL2base64Db_0.json");
const readLine = require("readline");
const fastJsonStringify = require("fast-json-stringify");

/**
 * main function
 *
 * @param {string} url
 * @param {number} index
 */
const createBase64FromURL = async (url, index = 1, rotate = 0) => {
	if (typeof index === "string") index = Number(index);
	if (url.length === 0 || !(0 <= index && index < 3)) return "";

	const isFileExists = Fs.existsSync(PATH);
	if (!isFileExists) {
		await File.writeFile(PATH, JSON.stringify({})).catch((e) =>
			console.error(e)
		);
	}
	const { cachedData, cachedBase64 } = await getFromBase64DB(url);
	if (cachedBase64) return cachedBase64[index];
	if (!cachedData) cachedData = {};
	const images = await convertToBase64(url, rotate);

	/**
	 *
	 * @param {string} base64
	 * @returns
	 */
	const addHTMLSpec2Base64 = (base64 = "") => `data:image/png;base64,${base64}`;

	// update json object
	cachedData[url] = [
		addHTMLSpec2Base64(images[0] ?? ""), // big image
		addHTMLSpec2Base64(images[1] ?? ""), // small image
	];

	const schema = {
		type: "object",
		patternProperties: {
			"https://*": { type: "array" },
		},
	};

	try {
		const updatedJSON = fastJsonStringify(schema)(cachedData);

		await File.writeFile(PATH, updatedJSON, "utf8", (err) => {
			console.error(err);
		});

		const result = cachedData[url][index];
		return result;
	} catch (err) {
		console.error(err);
	}
};

/**
 *
 * @param {string} url
 * @returns
 */
const convertToBase64 = (url, rotate = 0) =>
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
							resizeBase64(744, 462, buffer, rotate),
							resizeBase64(128, 128, buffer, rotate),
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
const resizeBase64 = (w, h, buffer, rotate = 0) =>
	new Promise((res) =>
		res(sharp(buffer).resize(w, h).rotate(rotate).toBuffer())
	).then((res) => {
		return res.toString("base64");
	});

/**
 *
 * @param {string} url
 */
async function getFromBase64DB(url) {
	const isFileExists = Fs.existsSync(PATH);
	if (!isFileExists) return new Error("CACHED DATA IS NOT EXISTS");

	const jsonFile = await File.readFile(PATH, { encoding: "utf-8" });
	const cachedData = JSON.parse(jsonFile);
	return {
		cachedData,
		cachedBase64: cachedData[url] ?? undefined,
	};
}

module.exports = {
	createBase64FromURL,
	getFromBase64DB,
};
