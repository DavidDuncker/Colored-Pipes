import Cell from "./Cell.js"

class canvasInnerGrid {
    numberOfRows = 1;
    numberOfColumns = 1;
    canvas = null;
    gridArray = [];
    selectedCell = null;
    hoveredCell = null;

    getCells() {
        var rowSize = this.canvas.height/this.numberOfRows;
        var columnSize = this.canvas.width/this.numberOfColumns;
        var numberOfRows = this.numberOfRows;
        var numberOfColumns = this.numberOfColumns;
        var gridArray = []
        for (let i=0; i<numberOfRows; i++) {
            gridArray.push([]);
            for(let j=0; j<numberOfColumns; j++) {
                var cell = new Cell(this.canvas, i, j, rowSize, columnSize);
                gridArray[i].push(cell);
            }
        }

        return gridArray
    }

    constructor(number_of_rows, number_of_columns, canvas) {
        this.numberOfRows = number_of_rows;
        this.numberOfColumns = number_of_columns;
        this.canvas = canvas;
        this.gridArray = this.getCells();
    }


    createBorders(borderwidth=5, fillstyle="black") {
        this.canvas.fillStyle = fillstyle;
        var canvas = this.canvas
        var context = this.canvas.getContext("2d")
        var gridArray = this.gridArray

        for (let row=0;row<gridArray.length;row++) {
            context.fillRect(0, gridArray[row][0]['topBorder'] - borderwidth, canvas.width, borderwidth);
            // context.fillRect(0, gridArray[row][0]['bottomBorder'] - borderwidth/2, canvas.width, borderwidth);

        }
        for (let column=0;column<gridArray[0].length;column++) {
            context.fillRect(gridArray[0][column]['leftBorder'], 0, borderwidth, canvas.height);
            // context.fillRect(gridArray[0][column]['rightBorder'] - borderwidth/2, 0, borderwidth, canvas.height);

        }

    }

    getCellFromPoint(inputX, inputY) {
        var gridArray = this.gridArray;

        var rowOfSelectedCell = 0;
        for (let row=0; row<gridArray.length; row++) {
            var topBorder = gridArray[row][0]['topBorder'];
            var bottomBorder = gridArray[row][0]['bottomBorder'];
            if ((inputY >= topBorder) && (inputY <= bottomBorder)) {
                rowOfSelectedCell = row;
            }
        }

        var columnOfSelectedCell = 0;
        for (let column=0; column<gridArray[0].length; column++) {
            var leftBorder = gridArray[0][column]['leftBorder'];
            var rightBorder = gridArray[0][column]['rightBorder'];
            if ((inputX >= leftBorder) && (inputX <= rightBorder)) {
                columnOfSelectedCell = column;
            }
        }

        var context = this.canvas.getContext("2d")
        context.fillRect(gridArray[rowOfSelectedCell][columnOfSelectedCell]['leftBorder'], 
            gridArray[rowOfSelectedCell][columnOfSelectedCell]['topBorder'], 
            gridArray[rowOfSelectedCell][columnOfSelectedCell]['rightBorder'] 
            - gridArray[rowOfSelectedCell][columnOfSelectedCell]['leftBorder'], 
            gridArray[rowOfSelectedCell][columnOfSelectedCell]['bottomBorder'] 
            - gridArray[rowOfSelectedCell][columnOfSelectedCell]['topBorder']);

    }

};

export default canvasInnerGrid