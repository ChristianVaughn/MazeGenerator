var mazeBoard = []; // A variable to hold a matrix representation of the game board.
boardSize = 10;
boardWidth= 15;
const direction = {
    UP: Number(0),
    LEFT: Number(1),
    RIGHT: Number(2),
    DOWN: Number(3),
}
class MazeTile {

    constructor(x, y) {
        //*           Up, Left, Right, Down
        this.walls = [true, true, true, true];
        this.visited = false;
        this.x = x;
        this.y = y;
    }
    removeWalls(pos) {
        this.walls[pos] = !this.walls[pos];
    }
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
function inBounds(x, y) {
    if ((x < 0 || x >= boardWidth)) {
        return false;
    }
    if (y < 0 || y >= boardSize) {
        return false;
    }
    return true;
}

function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        //ctx.fillRect(25, 25, 100, 100);
        //ctx.clearRect(45, 45, 60, 60);
        //ctx.strokeRect(50, 50, 50, 50);
        // j = x, i = y
        var y = 10;
        var x = 10;
        var inc = 50;
        for (let i = 0; i < mazeBoard.length; i++) {
            x = 10;
            for (let j = 0; j < mazeBoard.length; j++) {
                ctx.beginPath();       // Start a new path
                ctx.moveTo(x, y);    // Move the pen to (30, 50)
                if (mazeBoard[j][i].walls[0]) { ctx.lineTo(x + inc, y); }//Draw Top Line
                else { ctx.moveTo(x + inc, y); }
                if (mazeBoard[j][i].walls[2]) { ctx.lineTo(x + inc, y + inc); }  // Draw Right Line
                else { ctx.moveTo(x + inc, y + inc); }
                if (mazeBoard[j][i].walls[3]) { ctx.lineTo(x, y + inc); }  // Draw Bottom Line
                else { ctx.moveTo(x, y + inc); }
                if (mazeBoard[j][i].walls[1]) { ctx.lineTo(x, y); }  // Draw Left Line
                else { ctx.moveTo(x, y); }

                ctx.stroke();          // Render the path
                //ctx.strokeRect(x, y, 50, 50);
                x += inc;

            }
            y += inc;
        }
    }
}

//A function that takes the empty mazeBoard matrix defined in global and initializes it with starting board value based on passed in size.
function initBoardArray() {
    for (let i = 0; i < boardWidth; i++) {
        mazeBoard[i] = [];
    }
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardWidth; j++) {
            var temp = new MazeTile(j, i);
            mazeBoard[j][i] = temp;  // ReferenceError
        }
    }
    console.log(mazeBoard);
    initMaze();
    draw();
}
function initMaze() {
    var c = [];
    var x = Math.floor(Math.random() * boardWidth);     // returns a random integer from 0 to 9
    var y = Math.floor(Math.random() * boardSize); // random y pos

    c.push(mazeBoard[x][y]);
    mazeBoard[x][y].visited = true;
    /*
    1. Choose last cell in list
    2. make passage to any unvisited neighbor
    3. add that neighbor to C
    4. if no unvisited neighbors remove cell from list 
    5. repeat until c is empty*/
    while (c.length != 0) {
        var dir;
        var cell = c[c.length - 1];
        x = cell.x;
        y = cell.y;
        var oldX = x;
        var oldY = y;
        let possiblePaths = [0, 1, 2, 3];
        shuffle(possiblePaths);
        var failed = true;
        possiblePaths.some(function(element) {
            switch (element) {
                case direction.UP:
                    if (inBounds(x, y - 1) && !mazeBoard[x][y - 1].visited) {
                        y--;
                        dir = direction.UP;
                        failed = false;
                        return true;
                    }
                    break;
                case direction.LEFT:
                    if (inBounds(x - 1, y) && !mazeBoard[x - 1][y].visited) {
                        x--;
                        dir = direction.LEFT;
                        failed = false;
                        return true;
                    }
                    break;
                case direction.RIGHT:
                    if (inBounds(x + 1, y) && !mazeBoard[x + 1][y].visited) {
                        x++;
                        dir = direction.RIGHT;
                        failed = false;
                        return true;
                    }
                    break;
                case direction.DOWN:
                    if (inBounds(x, y + 1) && !mazeBoard[x][y + 1].visited) {
                        y++;
                        dir = direction.DOWN;
                        failed = false;
                        return true;
                    }
                    break;
            }
            
        });
 
        if(failed) {
            c.pop();
            continue;
        }
        mazeBoard[oldX][oldY].removeWalls(dir);
        mazeBoard[x][y].removeWalls(3 - dir);
        mazeBoard[x][y].visited = true;
        c.push(mazeBoard[x][y]);


    }
    console.log(mazeBoard);
    return;
}
