const File = require("fs/promises");
const Path = require("path");
const { stat } = require("fs").promises;
const MAX_SIZE = 3610677;
const DB_NAME = "imageURL2base64Db";

/**
 *
 * @param {number} index
 */
async function getLatestDBVersion() {
	try {
		const DB_PATH = Path.join(__dirname, "../db");
		const files = await File.readdir(DB_PATH);
		const dbVersions = files
			.filter((fileName) => fileName.includes(DB_NAME))
			.map((fileName) => fileName.at(-6))
			.map((stringNumber) => Number(stringNumber))
			.sort();
		const latestDBVersion = dbVersions.at(-1);

		return latestDBVersion ?? 0;
	} catch (e) {
		console.error(e);
		return 0;
	}
}

/**
 *
 * @param {string} PATH
 * @returns
 */
async function isOverMaxSize(PATH) {
	const fileStatus = await stat(PATH);
	if (fileStatus.size >= MAX_SIZE) return true;
	return false;
}

/**
 *
 * @param {string} PATH
 */
function addOneVersion(PATH) {
	const indexOf_ = PATH.lastIndexOf("_");
	const placeOfOldVersion = indexOf_ + 1;
	const newVersion = PATH.at(indexOf_ + 1);

	const updatedPATH = (PATH[placeOfOldVersion] = newVersion);
	console.log(
		"🚀 ~ file: checkDBVersion.js:47 ~ addOneVersion ~ updatedPATH:",
		updatedPATH
	);
	return updatedPATH;
}

getLatestDBVersion();
module.exports = {
	isOverMaxSize,
	getLatestDBVersion,
	addOneVersion,
	DB_NAME,
};
