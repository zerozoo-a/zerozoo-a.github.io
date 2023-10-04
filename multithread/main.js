const { Worker, isMainThread } = require("worker_threads");

if (isMainThread) {
	// This code runs in the main thread
	const worker = new Worker("./worker.js", {
		workerData: { filePath: "data.json" },
	});

	worker.on("message", (message) => {
		if (message.error) {
			console.error(`Error parsing JSON: ${message.error}`);
		} else {
			const parsedData = message.result;
			console.log(parsedData);
		}
	});

	worker.on("error", (error) => {
		console.error(`Worker error: ${error}`);
	});

	worker.on("exit", (code) => {
		if (code !== 0) {
			console.error(`Worker stopped with exit code ${code}`);
		}
	});
} else {
	// This code runs in the worker thread (worker.js)
}
