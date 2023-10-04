const { parentPort, workerData } = require("worker_threads");
const fs = require("fs");

const filePath = workerData.filePath;

fs.readFile(filePath, "utf8", (err, data) => {
	if (err) {
		parentPort.postMessage({ error: err.message });
	} else {
		try {
			const parsedData = JSON.parse(data);
			parentPort.postMessage({ result: parsedData });
		} catch (parseError) {
			parentPort.postMessage({ error: parseError.message });
		}
	}
});
