const fs = require("fs");
const path = require("path");
const blogPath = "content/blog";
const want2Delete = "content";
/**
 *
 * @param {string} dirPath
 */
function getAllDirectories(directoryPath = null) {
	if (!directoryPath) return;
	return new Promise((resolve, reject) => {
		fs.readdir(directoryPath, { withFileTypes: true }, (err, entries) => {
			if (err) return reject(err);

			const directories = entries
				.filter((entry) => entry.isDirectory())
				.map((entry) => path.join(directoryPath, entry.name))
				.map((path) => path.slice(want2Delete.length));

			resolve(directories);
		});
	});
}
getAllDirectories(blogPath).then((res) => console.log(res));
