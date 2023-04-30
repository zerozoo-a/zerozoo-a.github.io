function draw() {
	background(255);

	// 그리드 그리기
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let x = i * cellSize;
			let y = j * cellSize;
			if (grid[i][j] == 1) {
				fill(0);
				stroke(255);
				rect(x, y, cellSize, cellSize);
			}
		}
	}

	// 그리드 업데이트
	let nextGrid = new Array(cols);
	for (let i = 0; i < cols; i++) {
		nextGrid[i] = new Array(rows);
		for (let j = 0; j < rows; j++) {
			let state = grid[i][j];
			let neighbors = countNeighbors(grid, i, j);
			if (state == 0 && neighbors == 3) {
				nextGrid[i][j] = 1;
			} else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
				nextGrid[i][j] = 0;
			} else {
				nextGrid[i][j] = state;
			}
		}
	}
	grid = nextGrid;
}

function countNeighbors(grid, x, y) {
	let sum = 0;
	for (let i = -1; i <= 1; i++) {
		for (let j = -1; j <= 1; j++) {
			let col = (x + i + cols) % cols;
			let row = (y + j + rows) % rows;
			sum += grid[col][row];
		}
	}
	sum -= grid[x][y];
	return sum;
}

function mousePressed() {
	let x = floor(mouseX / cellSize);
	let y = floor(mouseY / cellSize);
	if (grid[x][y] == 0) {
		grid[x][y] = 1;
	} else {
		grid[x][y] = 0;
	}
}

exports.draw = { draw, mousePressed };
