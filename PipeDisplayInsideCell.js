class PipeDisplayInsideCell {
    pipe1 = { 
        entranceSide: null,
        exitSide: null,
        color: null
    };

    pipe2 = {
        entranceSide: null,
        exitSide: null,
        color: "green"
    };

    leftBorder = 0;
    rightBorder = 0;
    topBorder = 0;
    bottomBorder = 0;
    canvas = null;
    context = null;
    keyPointsForDrawingPipes = {};

    pipe1Entrance = 'left'; 
    pipe1Exit = 'right';
    pipe2Entrance = 'top';
    pipe2Exit = 'bottom';

    constructor(cell, pipe1Entrance, pipe1Exit, pipe2Entrance, pipe2Exit) {
        this.leftBorder = cell.leftBorder;
        this.rightBorder = cell.rightBorder;
        this.topBorder = cell.topBorder;
        this.bottomBorder = cell.bottomBorder;
        this.canvas = cell.canvas;
        this.context = cell.canvas.getContext("2d");

        var pipeDirections = [pipe1Entrance, pipe1Exit, pipe2Entrance, pipe2Exit]
        pipeDirections.forEach(elementFromTopLoop => {
            var remainingElements = pipeDirections.filter( (elementFromInnerLoop, index) => { return elementFromInnerLoop != elementFromTopLoop } )
            remainingElements.forEach(elementFromInnerLoop => {
                if (elementFromTopLoop == elementFromInnerLoop) {
                    console.log("Error! Two overlapping pipes!")
                }
            })
        });

        this.getKeyPointsForDrawingPipes();
    };

    getKeyPointsForDrawingPipes() {
        var pipeWidthAsPercentage = 0.3;
        var pipeBorderWidthAsPercentage = 0.1;
        var pipeLengthBeforeCurvingOverToPerpendicularSide = 0.3;

        var cellWidth = this.rightBorder - this.leftBorder;
        var cellHeight = this.bottomBorder - this.topBorder;

        //The points needed for drawing a pipe from the top of the cell
        {
            this.keyPointsForDrawingPipes['top'] = {};
            this.keyPointsForDrawingPipes['top']['center'] = {
                'x': (this.leftBorder + this.rightBorder)/2, 
                'y': this.topBorder
            };
            this.keyPointsForDrawingPipes['top']['counterclockwise'] = {};
            this.keyPointsForDrawingPipes['top']['counterclockwise']['outer'] = {};
            this.keyPointsForDrawingPipes['top']['counterclockwise']['inner'] = {};

            this.keyPointsForDrawingPipes['top']['counterclockwise']['outer']['pipe'] = {
                'x': this.keyPointsForDrawingPipes['top']['center']['x'] - cellWidth * pipeWidthAsPercentage / 2,
                'y': this.topBorder
            }
            this.keyPointsForDrawingPipes['top']['counterclockwise']['outer']['border'] = {
                'x': this.keyPointsForDrawingPipes['top']['counterclockwise']['outer']['pipe']['x'] - cellWidth * pipeBorderWidthAsPercentage,
                'y': this.topBorder
            }
            this.keyPointsForDrawingPipes['top']['clockwise'] = {};
            this.keyPointsForDrawingPipes['top']['clockwise']['outer'] = {};
            this.keyPointsForDrawingPipes['top']['clockwise']['inner'] = {};
            this.keyPointsForDrawingPipes['top']['clockwise']['outer']['pipe'] = {
                'x': this.keyPointsForDrawingPipes['top']['center']['x'] + cellWidth * pipeWidthAsPercentage / 2,
                'y': this.topBorder
            }
            this.keyPointsForDrawingPipes['top']['clockwise']['outer']['border'] = {
                'x': this.keyPointsForDrawingPipes['top']['clockwise']['outer']['pipe']['x'] + cellWidth * pipeBorderWidthAsPercentage,
                'y': this.topBorder
            }
            this.keyPointsForDrawingPipes['top']['counterclockwise']['inner']['pipe'] = {
                'x': this.keyPointsForDrawingPipes['top']['center']['x'] - cellWidth * pipeWidthAsPercentage / 2,
                'y': this.topBorder + cellHeight * pipeLengthBeforeCurvingOverToPerpendicularSide
            }
            this.keyPointsForDrawingPipes['top']['counterclockwise']['inner']['border'] = {
                'x': this.keyPointsForDrawingPipes['top']['counterclockwise']['outer']['border']['x'],
                'y': this.topBorder + cellHeight * pipeLengthBeforeCurvingOverToPerpendicularSide
            }
            this.keyPointsForDrawingPipes['top']['clockwise']['inner']['pipe'] = {
                'x': this.keyPointsForDrawingPipes['top']['center']['x'] + cellWidth * pipeWidthAsPercentage / 2,
                'y': this.topBorder + cellHeight * pipeLengthBeforeCurvingOverToPerpendicularSide
            }
            this.keyPointsForDrawingPipes['top']['clockwise']['inner']['border'] = {
                'x': this.keyPointsForDrawingPipes['top']['clockwise']['outer']['border']['x'],
                'y': this.topBorder + cellHeight * pipeLengthBeforeCurvingOverToPerpendicularSide
            }
        }
        
        //The points needed for drawing a pipe from the bottom of the cell
        {
            this.keyPointsForDrawingPipes['bottom'] = {};
            this.keyPointsForDrawingPipes['bottom']['center'] = {
                'x': (this.leftBorder + this.rightBorder)/2, 
                'y': this.bottomBorder
            };
            this.keyPointsForDrawingPipes['bottom']['clockwise'] = {};
            this.keyPointsForDrawingPipes['bottom']['clockwise']['outer'] = {};
            this.keyPointsForDrawingPipes['bottom']['clockwise']['inner'] = {};
            this.keyPointsForDrawingPipes['bottom']['clockwise']['outer']['pipe'] = {
                'x': this.keyPointsForDrawingPipes['bottom']['center']['x'] - cellWidth * pipeWidthAsPercentage / 2,
                'y': this.bottomBorder
            }
            this.keyPointsForDrawingPipes['bottom']['clockwise']['outer']['border'] = {
                'x': this.keyPointsForDrawingPipes['bottom']['clockwise']['outer']['pipe']['x'] - cellWidth * pipeBorderWidthAsPercentage,
                'y': this.bottomBorder
            }
            this.keyPointsForDrawingPipes['bottom']['counterclockwise'] = {};
            this.keyPointsForDrawingPipes['bottom']['counterclockwise'] = {};
            this.keyPointsForDrawingPipes['bottom']['counterclockwise']['outer'] = {};
            this.keyPointsForDrawingPipes['bottom']['counterclockwise']['inner'] = {};
            this.keyPointsForDrawingPipes['bottom']['counterclockwise']['outer']['pipe'] = {
                'x': this.keyPointsForDrawingPipes['bottom']['center']['x'] + cellWidth * pipeWidthAsPercentage / 2,
                'y': this.bottomBorder
            }
            this.keyPointsForDrawingPipes['bottom']['counterclockwise']['outer']['border'] = {
                'x': this.keyPointsForDrawingPipes['bottom']['counterclockwise']['outer']['pipe']['x'] + cellWidth * pipeBorderWidthAsPercentage,
                'y': this.bottomBorder
            }
            this.keyPointsForDrawingPipes['bottom']['clockwise']['inner']['pipe'] = {
                'x': this.keyPointsForDrawingPipes['bottom']['clockwise']['outer']['pipe']['x'],
                'y': this.bottomBorder - cellHeight * pipeLengthBeforeCurvingOverToPerpendicularSide
            }
            this.keyPointsForDrawingPipes['bottom']['clockwise']['inner']['border'] = {
                'x': this.keyPointsForDrawingPipes['bottom']['clockwise']['outer']['border']['x'],
                'y': this.bottomBorder - cellHeight * pipeLengthBeforeCurvingOverToPerpendicularSide
            }
            this.keyPointsForDrawingPipes['bottom']['counterclockwise']['inner']['pipe'] = {
                'x': this.keyPointsForDrawingPipes['bottom']['counterclockwise']['outer']['pipe']['x'],
                'y': this.bottomBorder - cellHeight * pipeLengthBeforeCurvingOverToPerpendicularSide
            }
            this.keyPointsForDrawingPipes['bottom']['counterclockwise']['inner']['border'] = {
                'x': this.keyPointsForDrawingPipes['bottom']['counterclockwise']['outer']['border']['x'],
                'y': this.bottomBorder - cellHeight * pipeLengthBeforeCurvingOverToPerpendicularSide
            }
        }
        
        //The points needed for drawing a pipe from the left of the cell
        {
            this.keyPointsForDrawingPipes['left'] = {};
            this.keyPointsForDrawingPipes['left']['center'] = {
                'x': this.leftBorder,
                'y': (this.topBorder + this.bottomBorder)/2, 
            };
            this.keyPointsForDrawingPipes['left']['clockwise'] = {};
            this.keyPointsForDrawingPipes['left']['clockwise']['outer'] = {};
            this.keyPointsForDrawingPipes['left']['clockwise']['inner'] = {};
            this.keyPointsForDrawingPipes['left']['clockwise']['outer']['pipe'] = {
                'x': this.leftBorder,
                'y': this.keyPointsForDrawingPipes['left']['center']['y'] - cellHeight * pipeWidthAsPercentage / 2,
            }
            this.keyPointsForDrawingPipes['left']['clockwise']['outer']['border'] = {
                'x': this.leftBorder,
                'y': this.keyPointsForDrawingPipes['left']['clockwise']['outer']['pipe']['y'] - cellHeight * pipeBorderWidthAsPercentage,
            }
            this.keyPointsForDrawingPipes['left']['counterclockwise'] = {};
            this.keyPointsForDrawingPipes['left']['counterclockwise']['outer'] = {};
            this.keyPointsForDrawingPipes['left']['counterclockwise']['inner'] = {};
            this.keyPointsForDrawingPipes['left']['counterclockwise']['outer']['pipe'] = {
                'x': this.leftBorder,
                'y': this.keyPointsForDrawingPipes['left']['center']['y'] + cellHeight * pipeWidthAsPercentage / 2,
            }
            this.keyPointsForDrawingPipes['left']['counterclockwise']['outer']['border'] = {
                'x': this.leftBorder,
                'y': this.keyPointsForDrawingPipes['left']['counterclockwise']['outer']['pipe']['y'] + cellHeight * pipeBorderWidthAsPercentage,
            }
            this.keyPointsForDrawingPipes['left']['clockwise']['inner']['pipe'] = {
                'x': this.leftBorder + cellWidth * pipeLengthBeforeCurvingOverToPerpendicularSide,
                'y': this.keyPointsForDrawingPipes['left']['clockwise']['outer']['pipe']['y'],
            }
            this.keyPointsForDrawingPipes['left']['clockwise']['inner']['border'] = {
                'x': this.leftBorder + cellWidth * pipeLengthBeforeCurvingOverToPerpendicularSide,
                'y': this.keyPointsForDrawingPipes['left']['clockwise']['outer']['border']['y'],
            }
            this.keyPointsForDrawingPipes['left']['counterclockwise']['inner']['pipe'] = {
                'x': this.leftBorder + cellWidth * pipeLengthBeforeCurvingOverToPerpendicularSide,
                'y': this.keyPointsForDrawingPipes['left']['counterclockwise']['outer']['pipe']['y'],
            }
            this.keyPointsForDrawingPipes['left']['counterclockwise']['inner']['border'] = {
                'x': this.leftBorder + cellWidth * pipeLengthBeforeCurvingOverToPerpendicularSide,
                'y': this.keyPointsForDrawingPipes['left']['counterclockwise']['outer']['border']['y'],
            }
        }
        
        //The points needed for drawing a pipe from the right of the cell
        {
            this.keyPointsForDrawingPipes['right'] = {};
            this.keyPointsForDrawingPipes['right']['center'] = {
                'x': this.rightBorder,
                'y': (this.topBorder + this.bottomBorder)/2, 
            };
            this.keyPointsForDrawingPipes['right']['counterclockwise'] = {};
            this.keyPointsForDrawingPipes['right']['counterclockwise']['outer'] = {};
            this.keyPointsForDrawingPipes['right']['counterclockwise']['inner'] = {};

            this.keyPointsForDrawingPipes['right']['counterclockwise']['outer']['pipe'] = {
                'x': this.rightBorder,
                'y': this.keyPointsForDrawingPipes['right']['center']['y'] - cellHeight * pipeWidthAsPercentage / 2,
            }
            this.keyPointsForDrawingPipes['right']['counterclockwise']['outer']['border'] = {
                'x': this.rightBorder,
                'y': this.keyPointsForDrawingPipes['right']['counterclockwise']['outer']['pipe']['y'] - cellHeight * pipeBorderWidthAsPercentage,
            }
            this.keyPointsForDrawingPipes['right']['clockwise'] = {};
            this.keyPointsForDrawingPipes['right']['clockwise']['outer'] = {};
            this.keyPointsForDrawingPipes['right']['clockwise']['inner'] = {};
            this.keyPointsForDrawingPipes['right']['clockwise']['outer']['pipe'] = {
                'x': this.rightBorder,
                'y': this.keyPointsForDrawingPipes['right']['center']['y'] + cellHeight * pipeWidthAsPercentage / 2,
            }
            this.keyPointsForDrawingPipes['right']['clockwise']['outer']['border'] = {
                'x': this.rightBorder,
                'y': this.keyPointsForDrawingPipes['right']['clockwise']['outer']['pipe']['y'] + cellHeight * pipeBorderWidthAsPercentage,
            }
            this.keyPointsForDrawingPipes['right']['counterclockwise']['inner']['pipe'] = {
                'x': this.rightBorder - cellWidth * pipeLengthBeforeCurvingOverToPerpendicularSide,
                'y': this.keyPointsForDrawingPipes['right']['center']['y'] - cellHeight * pipeWidthAsPercentage / 2,
            }
            this.keyPointsForDrawingPipes['right']['counterclockwise']['inner']['border'] = {
                'x': this.rightBorder - cellWidth * pipeLengthBeforeCurvingOverToPerpendicularSide,
                'y': this.keyPointsForDrawingPipes['right']['counterclockwise']['outer']['border']['y'],
            }
            this.keyPointsForDrawingPipes['right']['clockwise']['inner']['pipe'] = {
                'x': this.rightBorder - cellWidth * pipeLengthBeforeCurvingOverToPerpendicularSide,
                'y': this.keyPointsForDrawingPipes['right']['clockwise']['outer']['pipe']['y'],
            }
            this.keyPointsForDrawingPipes['right']['clockwise']['inner']['border'] = {
                'x': this.rightBorder - cellWidth * pipeLengthBeforeCurvingOverToPerpendicularSide,
                'y': this.keyPointsForDrawingPipes['right']['clockwise']['outer']['border']['y'],
            }
        }
        
    }

    drawPipeEdge(direction, color) {
        //draw the borders of the pipe
        this.context.fillStyle = "black";
        ["clockwise", "counterclockwise"].forEach( (rotationalDirection, index) => {
            var x=0;
            var y=0;
            this.context.beginPath();

            x = this.keyPointsForDrawingPipes[direction][rotationalDirection]["inner"]["pipe"]['x'];
            y = this.keyPointsForDrawingPipes[direction][rotationalDirection]["inner"]["pipe"]['y'];
            this.context.moveTo(x, y);

            x = this.keyPointsForDrawingPipes[direction][rotationalDirection]["outer"]["pipe"]['x'];
            y = this.keyPointsForDrawingPipes[direction][rotationalDirection]["outer"]["pipe"]['y'];
            this.context.lineTo(x, y);

            x = this.keyPointsForDrawingPipes[direction][rotationalDirection]["outer"]["border"]['x'];
            y = this.keyPointsForDrawingPipes[direction][rotationalDirection]["outer"]["border"]['y'];
            this.context.lineTo(x, y);

            x = this.keyPointsForDrawingPipes[direction][rotationalDirection]["inner"]["border"]['x'];
            y = this.keyPointsForDrawingPipes[direction][rotationalDirection]["inner"]["border"]['y'];
            this.context.lineTo(x, y);

            x = this.keyPointsForDrawingPipes[direction][rotationalDirection]["inner"]["pipe"]['x'];
            y = this.keyPointsForDrawingPipes[direction][rotationalDirection]["inner"]["pipe"]['y'];
            this.context.lineTo(x, y);

            this.context.fill();

        }
        )

        //draw the interior of the pipe
        this.context.fillStyle = color;
        var x=0;
        var y=0;
        this.context.beginPath();

        x = this.keyPointsForDrawingPipes[direction]["clockwise"]["inner"]["pipe"]['x'];
        y = this.keyPointsForDrawingPipes[direction]["clockwise"]["inner"]["pipe"]['y'];
        this.context.moveTo(x, y);

        x = this.keyPointsForDrawingPipes[direction]["clockwise"]["outer"]["pipe"]['x'];
        y = this.keyPointsForDrawingPipes[direction]["clockwise"]["outer"]["pipe"]['y'];
        this.context.lineTo(x, y);

        x = this.keyPointsForDrawingPipes[direction]["counterclockwise"]["outer"]["pipe"]['x'];
        y = this.keyPointsForDrawingPipes[direction]["counterclockwise"]["outer"]["pipe"]['y'];
        this.context.lineTo(x, y);

        x = this.keyPointsForDrawingPipes[direction]["counterclockwise"]["inner"]["pipe"]['x'];
        y = this.keyPointsForDrawingPipes[direction]["counterclockwise"]["inner"]["pipe"]['y'];
        this.context.lineTo(x, y);

        x = this.keyPointsForDrawingPipes[direction]["clockwise"]["inner"]["pipe"]['x'];
        y = this.keyPointsForDrawingPipes[direction]["clockwise"]["inner"]["pipe"]['y'];
        this.context.lineTo(x, y);

        this.context.fill();

    }

    drawPipeCenter(direction1, direction2, color) {
        //draw the borders of the pipe
        console.log("Drawing pipe center")
        this.context.fillStyle = "black";
        var rotationalDirections = ["clockwise", "counterclockwise"];
        rotationalDirections.forEach( (rotationalDirection, i) => {
            var x=0;
            var y=0;
            this.context.beginPath();
            console.log("Beginning path");

            x = this.keyPointsForDrawingPipes[direction1][rotationalDirections[i]]["inner"]["pipe"]['x'];
            y = this.keyPointsForDrawingPipes[direction1][rotationalDirections[i]]["inner"]["pipe"]['y'];
            console.log(x, y);
            this.context.moveTo(x, y);
        
            x = this.keyPointsForDrawingPipes[direction1][rotationalDirections[i]]["inner"]["border"]['x'];
            y = this.keyPointsForDrawingPipes[direction1][rotationalDirections[i]]["inner"]["border"]['y'];
            console.log(x, y);
            this.context.lineTo(x, y);
        
            x = this.keyPointsForDrawingPipes[direction2][rotationalDirections[(i+1)%2]]["inner"]["border"]['x'];
            y = this.keyPointsForDrawingPipes[direction2][rotationalDirections[(i+1)%2]]["inner"]["border"]['y'];
            console.log(x, y);
            this.context.lineTo(x, y);
        
            x = this.keyPointsForDrawingPipes[direction2][rotationalDirections[(i+1)%2]]["inner"]["pipe"]['x'];
            y = this.keyPointsForDrawingPipes[direction2][rotationalDirections[(i+1)%2]]["inner"]["pipe"]['y'];
            console.log(x, y);
            this.context.lineTo(x, y);

            x = this.keyPointsForDrawingPipes[direction1][rotationalDirections[i]]["inner"]["pipe"]['x'];
            y = this.keyPointsForDrawingPipes[direction1][rotationalDirections[i]]["inner"]["pipe"]['y'];
            console.log(x, y);
            this.context.lineTo(x, y);

                
            this.context.fill();
            console.log("Path filled");
        
        }
        )

        //Draw the pipe interior
        this.context.fillStyle = color;
        var x=0;
        var y=0;
        this.context.beginPath();
        console.log("Beginning path");

        x = this.keyPointsForDrawingPipes[direction1]["clockwise"]["inner"]["pipe"]['x'];
        y = this.keyPointsForDrawingPipes[direction1]["clockwise"]["inner"]["pipe"]['y'];
        console.log(x, y);
        this.context.moveTo(x, y);
        
        x = this.keyPointsForDrawingPipes[direction1]["counterclockwise"]["inner"]["pipe"]['x'];
        y = this.keyPointsForDrawingPipes[direction1]["counterclockwise"]["inner"]["pipe"]['y'];
        console.log(x, y);
        this.context.lineTo(x, y);
        
        x = this.keyPointsForDrawingPipes[direction2]["clockwise"]["inner"]["pipe"]['x'];
        y = this.keyPointsForDrawingPipes[direction2]["clockwise"]["inner"]["pipe"]['y'];
        console.log(x, y);
        this.context.lineTo(x, y);
        
        x = this.keyPointsForDrawingPipes[direction2]["counterclockwise"]["inner"]["pipe"]['x'];
        y = this.keyPointsForDrawingPipes[direction2]["counterclockwise"]["inner"]["pipe"]['y'];
        console.log(x, y);
        this.context.lineTo(x, y);

        x = this.keyPointsForDrawingPipes[direction1]["clockwise"]["inner"]["pipe"]['x'];
        y = this.keyPointsForDrawingPipes[direction1]["clockwise"]["inner"]["pipe"]['y'];
        console.log(x, y);
        this.context.lineTo(x, y);

                
        this.context.fill();
        console.log("Path filled");
        
        

    }

    drawSolidColor(color) {
        color = null;
    }

}

export default PipeDisplayInsideCell;