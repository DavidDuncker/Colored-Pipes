import PipeDisplayInsideCell from "./PipeDisplayInsideCell.js";

class Cell {
    leftBorder = 0;
    rightBorder = 0;
    topBorder = 0;
    bottomBorder = 0;
    pipeDisplay = null;
    canvas = null;
    isSelected = false;
    bgcolor = "#f1f1f1";
    row = null;
    column = null;
    
    constructor(canvas, rowNumber, columnNumber, rowSize, columnSize, bgcolor, row, column) {
        this.canvas = canvas;
        this.topBorder = rowNumber * rowSize;
        this.bottomBorder = (rowNumber + 1) * rowSize;
        this.leftBorder = columnNumber * columnSize;
        this.rightBorder = (columnNumber + 1) * columnSize;
        this.pipeDisplay = new PipeDisplayInsideCell(this, null, null, null, null);
        this.bgcolor = "#f1f1f1";
        this.row = row;
        this.column = column;
    }

    drawPipe(direction1, direction2, color) {
        this.pipeDisplay.drawPipe(direction1, direction2, color);
    }

    makeSelected() {
        this.isSelected = true;
        this.pipeDisplay.drawSolidColor("black")
    }

    makeUnselected() {
        this.isSelected = false;
        this.pipeDisplay.drawSolidColor("white")
    }


}

export default Cell;