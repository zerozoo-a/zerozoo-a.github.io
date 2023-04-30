function setup() {
	createCanvas(cols * cellSize, rows * cellSize);
	grid = new Array(cols);
	for (let i = 0; i < cols; i++) {
		grid[i] = new Array(rows);
		for (let j = 0; j < rows; j++) {
			grid[i][j] = 0;
		}
	}
}

exports.setup = setup;
