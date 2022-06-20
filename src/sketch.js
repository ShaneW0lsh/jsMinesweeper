/* 
 * 2. Add stopwatch
 * 3. Add a brief discription
 * 4. Add controls description
*/

var w = 1200, h = 900;
var cellSize = 80;

var bombImg, flagImg;
function preload() { 
    bombImg = loadImage("https://esraa-alaarag.github.io/Minesweeper/images/bomb.png"); 
    flagImg = loadImage("https://cdn0.iconfinder.com/data/icons/basic-ui-elements-flat/512/flat_basic_home_flag_-512.png");
}

function setup() {
    createCanvas(w, h);
    strokeWeight(cellSize / 30);
    imageMode(CENTER);
    createGrid();

    textSize(cellSize/2);
    textAlign(CENTER, CENTER);
}

function draw() {
    background(220);
    updateCellID();
    updateCells();
    renderCells();
}

function updateCellID() { 
    window.cellX = int(mouseX / cellSize), 
    window.cellY = int(mouseY / cellSize);
}

function createGrid() {
    window.cols = int(width / cellSize);
    window.rows = int(height / cellSize);
    window.grid = create2DArray(cols, rows);

    for (let i = 0; i < cols; ++i) { 
        for (let j = 0; j < rows; ++j) {
            probability = random(1) <= 0.15;
            newCell = new Cell(i * cellSize, j * cellSize, cellSize, probability);
            grid[i][j] = newCell;
        }
    }

    for (let i = 0; i < cols; ++i) { 
        for (let j = 0; j < rows; ++j) { 
            let currentCell = grid[i][j];
            currentCell.bombCnt = currentCell.countBombs();
        }
    }
}

class Pair { 
    constructor(x, y) {
        this.x = x, 
        this.y = y;
    }
}

let prev = new Pair(0, 0);
function updateCells() { 
    if (withinGrid(cellX, cellY)) {
        grid[prev.x][prev.y].setHovered(false);
        grid[cellX][cellY].setHovered(true);
        prev = new Pair(cellX, cellY);
    }
}

function renderCells() { 
    for (let i = 0; i < cols; ++i) { 
        for (let j = 0; j < rows; ++j) { 
            grid[i][j].show();
        }
    }
}

function keyPressed() { 
    if (keyCode === 32) //spacebar
        grid[cellX][cellY].flag();
}

function mousePressed() { 
    if (mouseButton === LEFT) {
        if (withinGrid(cellX, cellY)) {
            let clicked = grid[cellX][cellY];
            if (clicked.isBomb)
                revealAll();

            clicked.reveal();
        }
    }
}

function revealAll() { 
    for (let i = 0; i < cols; ++i) { 
        for (let j = 0; j < rows; ++j) { 
            let current = grid[i][j];
            if (!current.flagged)
                grid[i][j].reveal();
        }
    }
}
