import PipeDisplayInsideCell from "./PipeDisplayInsideCell.js";

class Cell {
    leftBorder = 0;
    rightBorder = 0;
    topBorder = 0;
    bottomBorder = 0;
    pipeDisplay = null;
    canvas = null;
    
    constructor(canvas, rowNumber, columnNumber, rowSize, columnSize) {
        this.canvas = canvas
        this.topBorder = rowNumber * rowSize;
        this.bottomBorder = (rowNumber + 1) * rowSize;
        this.leftBorder = columnNumber * columnSize,
        this.rightBorder = (columnNumber + 1) * columnSize
        this.pipeDisplay = new PipeDisplayInsideCell(this, null, null, null, null)
    }

    drawPipe(direction1, direction2, color) {
        this.pipeDisplay.drawPipeEdge(direction1, color);
        this.pipeDisplay.drawPipeEdge(direction2, color);
        this.pipeDisplay.drawPipeCenter(direction1, direction2, color)

    }

}

export default Cell;