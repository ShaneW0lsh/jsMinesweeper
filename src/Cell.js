class Cell {
    constructor(x, y, size, isBomb) {
        this.x = x, this.y = y;
        this.size = size;
        this.isBomb = isBomb;
        this.hidden = true;
        this.hovered = false;
        this.flagged = false;
        this.bombCnt = null;
    }

    contains() { 
        let X = this.x, Y = this.y, SZ = this.size;

        function checkX() { return ((X <= mouseX) && (X + SZ >= mouseX)); }
        function checkY() { return ((Y <= mouseY) && (Y + SZ >= mouseY)); }

        if (checkX() && checkY())
            return true;

        return false;
    }

    reveal() { 
        this.hidden = false; 
        if (this.bombCnt == 0 && !this.isBomb) { 
            for (let i = -1; i < 2; ++i) {
                for (let j = -1; j < 2; ++j) { 
                    let gridPosX = this.x / this.size, 
                        gridPosY = this.y / this.size;
                    if (withinGrid(gridPosX+i, gridPosY+j)) {
                        let neighbour = grid[gridPosX+i][gridPosY+j];
                        if (neighbour.hidden && !neighbour.flagged)
                            neighbour.reveal();
                    }
                }
            }
        }
    }

    flag() { this.flagged = true; }

    setHovered(val) { this.hovered = val; }

    countBombs() { 
        let gridPosX = this.x/this.size;
        let gridPosY = this.y/this.size;

        if (!this.isBomb) {
            let bombCnt = 0;
            for (let i = -1; i < 2; ++i) { 
                for (let j = -1; j < 2; ++j) { 
                    if (withinGrid(gridPosX+i, gridPosY+j)) {
                        if (grid[gridPosX+i][gridPosY+j].isBomb)
                            bombCnt++;
                    }
                }
            }
            return bombCnt;
        }
    }

    show() {
        let X = this.x, Y = this.y, SZ = this.size;

        if (this.hidden) { 
            push();
            fill(189, 189, 189);
            rect(X, Y, SZ, SZ);
            pop();
            if (this.hovered) { 
                push();
                fill(120, 120, 120);
                rect(X, Y, SZ, SZ);
                pop();
            }
            if (this.flagged) {
                push();
                image(flagImg, X+SZ/2, Y+SZ/2, SZ*0.6, SZ*0.6);
                pop();
            }
        } else if (!this.hidden) {
            push();
            fill(255, 255, 255);
            rect(X, Y, SZ, SZ);
            pop();
        }

        if (!this.hidden && this.isBomb) { 
            push();
            fill(150, 150, 150);
            image(bombImg, X+SZ/2, Y+SZ/2, SZ*0.6, SZ*0.6);
            pop();
        } else if (!this.hidden && this.bombCnt != 0) {
            push();
            fill(0, 0, 0);
            text(this.bombCnt, X+SZ/2, Y+SZ/2);
            pop();
        }
    }
}
