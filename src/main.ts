// @ts-ignore-next-line
import p5 from 'p5';
import {make2DArray} from "./utils.ts";


const sketch = (p: p5) => {
    const w = 10
    let cols: number, rows: number;
    let grid: number[][];
    let isDragging = false;
    let dragStartTime: number;
    let dragEndTime: number;


    p.setup = () => {
        p.createCanvas(700, 700);
        cols = p.floor(p.width / w);
        rows = p.floor(p.height / w);
        console.log(rows, cols);
        grid = make2DArray(rows, cols);
        grid[0][2] = 1;
        console.log(grid);
    };
    p.mousePressed = () => {
        isDragging = true;
        dragStartTime = p.millis();
    }
    p.mouseReleased = () => {
        isDragging = false;
        dragEndTime = p.millis();
        console.log(dragEndTime - dragStartTime);
    }
    p.mouseDragged = () => {
        const row = p.floor(p.mouseY / w);
        const col = p.floor(p.mouseX / w);
        if (row > 0 && col > 0 && row < rows && col < cols)
            grid[row][col] = 1;
    }

    p.draw = () => {
        p.background(0);
        if (isDragging) {
            let dragDuration = (dragEndTime - dragStartTime); // Convert to seconds

            grid.map((row, i) => row.map((cell, j) => {
                p.stroke(255);
                p.fill(cell * 255);
                p.square(j * w, i * w, w);
            }))
        }
        const next = make2DArray(rows, cols);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (grid[i][j] === 1) {

                    if (i === rows - 1) {
                        next[i][j] = 1
                    } else {
                        const dir = p.random(1) < 0.5 ? -1 : 1;

                        if (i + 1 < rows && grid[i + 1][j] === 0) {
                            next[i + 1][j] = 1;
                        } else if (i + 2 < rows && grid[i + 2][j + dir] === 0) {
                            next[i + 2][j + dir] = 1;
                        } else if (i + 2 < rows && grid[i + 2][j - dir] === 0) {
                            next[i + 2][j - dir] = 1
                        } else {
                            next[i][j] = 1;
                        }
                    }
                }
            }
        }
        grid = next;
    };
};

new p5(sketch);