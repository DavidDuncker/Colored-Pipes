class cellContainer {
    cellRow = 0;
    cellColumn = 0;
    cell = null;
    previousCellDirection = null;
    nextCellDirection = null;

    constructor(cellRow, cellColumn, cell) {
        this.cellRow = cellRow;
        this.cellColumn = cellColumn;
        this.cell = cell;
    }

}

export default class pipePath {
    grid = null;
    gridArray = null;

    startCell = null;
    listOfCells = [];
    endCell = null;

    constructor(grid) {
        this.grid = grid;
        this.gridArray = grid.gridArray;
    }

    declareStartCell(cellRow, cellColumn) {
        var cell = this.gridArray[cellRow][cellColumn];
        this.startCell = new cellContainer(cellRow, cellColumn, cell);
    }

    addCell(cellRow, cellColumn) {
        // console.log("cellRow", cellRow)
        // console.log("cellColumn", cellColumn)
        // console.log("this.gridArray", this.gridArray)
        var newCell = this.gridArray[cellRow][cellColumn];
        var newCellCont = new cellContainer(cellRow, cellColumn, newCell);

        if (this.startCell == null) {
            this.declareStartCell(cellRow, cellColumn)
        }
        this.listOfCells.push(newCellCont)
        console.log("List Of Cells:", this.listOfCells)
        if (this.listOfCells.length >= 3) {
            this.calculatePipeDirectionsAndDrawPipes(this.listOfCells)
        }

    }

    declareEndCell(cellRow, cellColumn) {
        var cell = this.gridArray[cellRow][cellColumn];
        this.endCell = new cellContainer(cellRow, cellColumn, cell);

    }

    calculatePipeDirectionsAndDrawPipes(listOfCells) {
        var lastCellIndex = listOfCells.length-1;
        console.log("lastCellIndex", lastCellIndex);
        var secondToLastCellIndex = listOfCells.length-2;
        console.log("secondToLastCellIndex", secondToLastCellIndex);
        var thirdToLastCellIndex = listOfCells.length-3
        console.log("thirdToLastCellIndex", thirdToLastCellIndex);
        var direction1 = this.compareTwoCells(listOfCells, secondToLastCellIndex, thirdToLastCellIndex)
        var direction2 = this.compareTwoCells(listOfCells, secondToLastCellIndex, lastCellIndex)
        listOfCells[secondToLastCellIndex].cell.pipeDisplay.drawPipe(direction1, direction2, "green")
    }

    compareTwoRows(listOfCells, mainIndex, comparisonIndex) {
        // console.log("Main Index:", mainIndex)
        // console.log("Cell:", listOfCells[mainIndex].cell)
        var mainCellRowIndex = listOfCells[mainIndex].cell.row;
        var comparisonCellRowIndex = listOfCells[comparisonIndex].cell.row;

        var comparisonResult = false;
        var differenceInRows = mainCellRowIndex - comparisonCellRowIndex;
        if (differenceInRows == 1) {
            comparisonResult = "top";
        }
        else if (differenceInRows == -1) {
            comparisonResult = "bottom";
        }
        return comparisonResult

    }

    compareTwoColumns(listOfCells, mainIndex, comparisonIndex) {
        var mainCellColumnIndex = listOfCells[mainIndex].cell.column;
        var comparisonCellColumnIndex = listOfCells[comparisonIndex].cell.column;

        var comparisonResult = false;
        var differenceInColumns = mainCellColumnIndex - comparisonCellColumnIndex;
        if (differenceInColumns == 1) {
            comparisonResult = "left";
        }
        else if (differenceInColumns == -1) {
            comparisonResult = "right";
        }
        return comparisonResult
    }

    compareTwoCells(listOfCells, mainIndex, comparisonIndex) {
        console.log("List Of Cells:", listOfCells)
        var rowResult = this.compareTwoRows(listOfCells, mainIndex, comparisonIndex)
        var columnResult = this.compareTwoColumns(listOfCells, mainIndex, comparisonIndex)
        if (rowResult != false) {
            return rowResult
        }

        if (columnResult != false) {
            return columnResult
        }

        return false

    }


}

function createGradient(listOfCells) {
    if (listOfCells[0].cell.pipeDisplay.color) {
        var firstColor = listOfCells[0].cell.pipeDisplay.color;
    }
    else {
        var firstColor = listOfCells[0].cell.bgcolor;
    }

    if (listOfCells[listOfCells.length-1].cell.pipeDisplay.color) {
        var firstColor = listOfCells[listOfCells.length-1].cell.pipeDisplay.color;
    }
    else {
        var firstColor = listOfCells[listOfCells.length-1].cell.bgcolor;
    }

    firstRedShade = firstColor.substring(1,3);

}