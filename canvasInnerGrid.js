import Cell from "./Cell.js"

class canvasInnerGrid {
    numberOfRows = 1;
    numberOfColumns = 1;
    canvas = null;
    gridArray = [];
    selectedCell = null;
    hoveredCell = [0, 0];
    hoveredCellChanged = () => {};
    bgcolor = "#f1f1f1";
    pipeDraggingMode = false;
    canvasInputMethod = 'color';
    pipePath = null;


    

    getCells() {
        var rowSize = this.canvas.height/this.numberOfRows;
        var columnSize = this.canvas.width/this.numberOfColumns;
        var numberOfRows = this.numberOfRows;
        var numberOfColumns = this.numberOfColumns;
        var gridArray = []
        for (let i=0; i<numberOfRows; i++) {
            gridArray.push([]);
            for(let j=0; j<numberOfColumns; j++) {
                var cell = new Cell(this.canvas, i, j, rowSize, columnSize, this.bgcolor, i, j);
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

        //Find which row of cells the mouse is in
        var rowOfCell = -1;
        for (let row=0; row<gridArray.length; row++) {
            var topBorder = gridArray[row][0]['topBorder'];
            var bottomBorder = gridArray[row][0]['bottomBorder'];
            if ((inputY >= topBorder) && (inputY <= bottomBorder)) {
                rowOfCell = row;
            }
        }

        //Find which column of cells the mouse is in
        var columnOfCell = -1;
        for (let column=0; column<gridArray[0].length; column++) {
            var leftBorder = gridArray[0][column]['leftBorder'];
            var rightBorder = gridArray[0][column]['rightBorder'];
            if ((inputX >= leftBorder) && (inputX <= rightBorder)) {
                columnOfCell = column;
            }
        }
    
        //Do something with every single cell
        // for (let row=0; row<gridArray.length; row++) {
        //     for (let column=0; column<gridArray[0].length; column++) {

        //     }
        // }

        //Do something if the mouse hovers over the margin
        if (rowOfCell == -1 | columnOfCell == -1) {
            [rowOfCell, columnOfCell] = this.hoveredCell
        }

        //Do something if a new cell is being hovered over
        if (rowOfCell != this.hoveredCell[0] | columnOfCell != this.hoveredCell[1]) {
            this.unhoveredCellHandler(this.hoveredCell[0], this.hoveredCell[1]);
            this.hoveredCell = [rowOfCell, columnOfCell];
            this.hoveredCellHandler(rowOfCell, columnOfCell);
        }


        //Do something if a new cell is being hovered over
        if (rowOfCell != this.hoveredCell[0] | columnOfCell != this.hoveredCell[1]) {
            this.unhoveredCellHandler(this.hoveredCell[0], this.hoveredCell[1]);
            this.hoveredCell = [rowOfCell, columnOfCell];
            this.hoveredCellHandler(rowOfCell, columnOfCell);
        }

        
    }

    hoveredCellHandler(rowOfNewHoveredCell, columnOfNewHoveredCell) {
        this.gridArray[rowOfNewHoveredCell][columnOfNewHoveredCell].pipeDisplay.drawBorder("black", 3)
        if (this.canvasInputMethod == 'pipe' && this.pipeDraggingMode == true) {
            this.pipePath.addCell(rowOfNewHoveredCell, columnOfNewHoveredCell)
        }
        else if (this.canvasInputMethod == 'pipe' && this.pipeDraggingMode == false && this.pipePath != null) {
            this.pipePath.declareEndCell(rowOfNewHoveredCell, columnOfNewHoveredCell)
        }

    }
    
    unhoveredCellHandler(rowOfUnhoveredCell, columnOfUnhoveredCell) {
        this.gridArray[rowOfUnhoveredCell][columnOfUnhoveredCell].pipeDisplay.reDrawCell();
    }

};

export default canvasInnerGrid