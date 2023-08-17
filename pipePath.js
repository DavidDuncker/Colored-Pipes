class cellContainer {
    cellRow = 0;
    cellColumn = 0;
    cell = null;
    previousCellDirection = null;
    nextCellDirection = null;
    chosenPipe = null;

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
        var newCell = this.gridArray[cellRow][cellColumn];
        var newCellCont = new cellContainer(cellRow, cellColumn, newCell);

        if (this.startCell == null) {
            this.declareStartCell(cellRow, cellColumn)
        }
        this.listOfCells.push(newCellCont)
        if (this.listOfCells.length >= 3) {
            this.calculatePipeDirectionsAndDrawPipes(this.listOfCells)
        }

    }

    declareEndCell(cellRow, cellColumn) {
        var cell = this.gridArray[cellRow][cellColumn];
        this.endCell = new cellContainer(cellRow, cellColumn, cell);
        createGradient(this.listOfCells);

    }

    calculatePipeDirectionsAndDrawPipes(listOfCells) {
        var lastCellIndex = listOfCells.length-1;
        var secondToLastCellIndex = listOfCells.length-2;
        var thirdToLastCellIndex = listOfCells.length-3
        var direction1 = this.compareTwoCells(listOfCells, secondToLastCellIndex, thirdToLastCellIndex)
        var direction2 = this.compareTwoCells(listOfCells, secondToLastCellIndex, lastCellIndex)
        var chosenPipe = listOfCells[secondToLastCellIndex].cell.pipeDisplay.drawPipe(direction1, direction2, "green");
        listOfCells[secondToLastCellIndex].chosenPipe = chosenPipe
    }

    compareTwoRows(listOfCells, mainIndex, comparisonIndex) {
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
        var lastColor = listOfCells[listOfCells.length-1].cell.pipeDisplay.color;
    }
    else {
        var lastColor = listOfCells[listOfCells.length-1].cell.bgcolor;
    }

    var firstRedShade = parseInt(firstColor.substring(1,3), 16);
    var lastRedShade = parseInt(lastColor.substring(1,3), 16);
    var averageChangeInShade = (lastRedShade - firstRedShade)/listOfCells.length
    var listOfRedShades = Array.from({length: listOfCells.length}, (_, i) => parseInt(firstRedShade + i*averageChangeInShade, 10).toString(16))
    for (let i=0;i<listOfRedShades.length; i++) {
        if (listOfRedShades[i].length == 1) {
            listOfRedShades[i] = '0' + listOfRedShades[i];
        }
    }

    var firstGreenShade = parseInt(firstColor.substring(3,5), 16);
    var lastGreenShade = parseInt(lastColor.substring(3,5), 16);
    var averageChangeInShade = (lastGreenShade - firstGreenShade)/listOfCells.length
    var listOfGreenShades = Array.from({length: listOfCells.length}, (_, i) => parseInt(firstGreenShade + i*averageChangeInShade, 10).toString(16))
    for (let i=0;i<listOfGreenShades.length; i++) {
        if (listOfGreenShades[i].length == 1) {
            listOfGreenShades[i] = '0' + listOfGreenShades[i];
        }
    }


    var firstBlueShade = parseInt(firstColor.substring(5,7), 16);
    var lastBlueShade = parseInt(lastColor.substring(5,7), 16);
    var averageChangeInShade = (lastBlueShade - firstBlueShade)/listOfCells.length
    var listOfBlueShades = Array.from({length: listOfCells.length}, (_, i) => parseInt(firstBlueShade + i*averageChangeInShade, 10).toString(16))
    for (let i=0;i<listOfBlueShades.length; i++) {
        if (listOfBlueShades[i].length == 1) {
            listOfBlueShades[i] = '0' + listOfBlueShades[i];
        }
    }


    var listOfNewColors = Array.from({length: listOfCells.length}, (_, i) => "#" + listOfRedShades[i] + listOfGreenShades[i] + listOfBlueShades[i])
    console.log("listOfNewColors", listOfNewColors)

    console.log(listOfCells)
    for (let i=1;i<listOfCells.length-1;i++) {
        console.log(listOfCells)
        var chosenPipe = listOfCells[i].chosenPipe
        console.log("listOfCells[i]", listOfCells[i]);
        console.log("chosenPipe", chosenPipe);
        console.log("listOfCells[i].cell[chosenPipe]", listOfCells[i].cell[chosenPipe]);
        console.log("listOfNewColors[i]", listOfNewColors[i]);

        listOfCells[i].cell.pipeDisplay[chosenPipe].color = listOfNewColors[i];
        listOfCells[i].cell.pipeDisplay.reDrawCell();
    }

}