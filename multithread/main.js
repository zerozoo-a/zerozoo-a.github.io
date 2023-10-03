const {
	Worker,
	isMainThread,
	parentPort,
	workerData,
} = require("worker_threads");

function main() {
	if (isMainThread) {
		const threadCount = 8;
		const threads = new Set();
		threads.add(new Worker(__filename, { workerData: { number: 1 } })); // thread 1
		threads.add(new Worker(__filename, { workerData: { number: 2 } })); // thread 2

		for (let worker of threads) {
			worker.on("error", (err) => {
				throw err;
			});

			worker.on("exit", () => {
				threads.delete(worker);
			});

			worker.on("message", (message) => {
				console.log("message", message);
			});
		}
	} else {
		console.log("workerData", workerData);
	}
}

function add(a, b) {
	return a + b;
}

main();
