class Pipe {
    exists = false;
    side1 = null;
    side2 = null;
    color = "green"
}

class SideBorder {
    location = 0;
    associatedPipe = null;
}

class PipeDisplayInsideCell {
    pipe1 = new Pipe;
    pipe2 = new Pipe;

    leftBorder = new SideBorder;
    rightBorder = new SideBorder;
    topBorder = new SideBorder;
    bottomBorder = new SideBorder;
    borders = { "left": this.leftBorder, 
        "right": this.rightBorder, 
        "top": this.topBorder, 
        "bottom": this.bottomBorder }

    canvas = null;
    context = null;
    keyPointsForDrawingPipes = {};
    parentCell = null;

    constructor(cell, pipe1Entrance, pipe1Exit, pipe2Entrance, pipe2Exit) {

        this.leftBorder.location = cell.leftBorder;
        this.rightBorder.location = cell.rightBorder;
        this.topBorder.location = cell.topBorder;
        this.bottomBorder.location = cell.bottomBorder;
        this.canvas = cell.canvas;
        this.context = cell.canvas.getContext("2d");
        this.parentCell = cell;

        this.getKeyPointsForDrawingPipes();
    };

    getKeyPointsForDrawingPipes() {
        var pipeWidthAsPercentage = 0.3;
        var pipeBorderWidthAsPercentage = 0.1;
        var pipeLengthBeforeCurvingOverToPerpendicularSide = 0.3;

        var cellWidth = this.rightBorder.location - this.leftBorder.location;
        var cellHeight = this.bottomBorder.location - this.topBorder.location;

        //The points needed for drawing a pipe from the top of the cell
        {
            this.keyPointsForDrawingPipes['top'] = {};
            this.keyPointsForDrawingPipes['top']['center'] = {
                'x': (this.leftBorder.location + this.rightBorder.location)/2, 
                'y': this.topBorder.location
            };
            this.keyPointsForDrawingPipes['top']['counterclockwise'] = {};
            this.keyPointsForDrawingPipes['top']['counterclockwise']['outer'] = {};
            this.keyPointsForDrawingPipes['top']['counterclockwise']['inner'] = {};

            this.keyPointsForDrawingPipes['top']['counterclockwise']['outer']['pipe'] = {
                'x': this.keyPointsForDrawingPipes['top']['center']['x'] - cellWidth * pipeWidthAsPercentage / 2,
                'y': this.topBorder.location
            }
            this.keyPointsForDrawingPipes['top']['counterclockwise']['outer']['border'] = {
                'x': this.keyPointsForDrawingPipes['top']['counterclockwise']['outer']['pipe']['x'] - cellWidth * pipeBorderWidthAsPercentage,
                'y': this.topBorder.location
            }
            this.keyPointsForDrawingPipes['top']['clockwise'] = {};
            this.keyPointsForDrawingPipes['top']['clockwise']['outer'] = {};
            this.keyPointsForDrawingPipes['top']['clockwise']['inner'] = {};
            this.keyPointsForDrawingPipes['top']['clockwise']['outer']['pipe'] = {
                'x': this.keyPointsForDrawingPipes['top']['center']['x'] + cellWidth * pipeWidthAsPercentage / 2,
                'y': this.topBorder.location
            }
            this.keyPointsForDrawingPipes['top']['clockwise']['outer']['border'] = {
                'x': this.keyPointsForDrawingPipes['top']['clockwise']['outer']['pipe']['x'] + cellWidth * pipeBorderWidthAsPercentage,
                'y': this.topBorder.location
            }
            this.keyPointsForDrawingPipes['top']['counterclockwise']['inner']['pipe'] = {
                'x': this.keyPointsForDrawingPipes['top']['center']['x'] - cellWidth * pipeWidthAsPercentage / 2,
                'y': this.topBorder.location + cellHeight * pipeLengthBeforeCurvingOverToPerpendicularSide
            }
            this.keyPointsForDrawingPipes['top']['counterclockwise']['inner']['border'] = {
                'x': this.keyPointsForDrawingPipes['top']['counterclockwise']['outer']['border']['x'],
                'y': this.topBorder.location + cellHeight * pipeLengthBeforeCurvingOverToPerpendicularSide
            }
            this.keyPointsForDrawingPipes['top']['clockwise']['inner']['pipe'] = {
                'x': this.keyPointsForDrawingPipes['top']['center']['x'] + cellWidth * pipeWidthAsPercentage / 2,
                'y': this.topBorder.location + cellHeight * pipeLengthBeforeCurvingOverToPerpendicularSide
            }
            this.keyPointsForDrawingPipes['top']['clockwise']['inner']['border'] = {
                'x': this.keyPointsForDrawingPipes['top']['clockwise']['outer']['border']['x'],
                'y': this.topBorder.location + cellHeight * pipeLengthBeforeCurvingOverToPerpendicularSide
            }
        }
        
        //The points needed for drawing a pipe from the bottom of the cell
        {
            this.keyPointsForDrawingPipes['bottom'] = {};
            this.keyPointsForDrawingPipes['bottom']['center'] = {
                'x': (this.leftBorder.location + this.rightBorder.location)/2, 
                'y': this.bottomBorder.location
            };
            this.keyPointsForDrawingPipes['bottom']['clockwise'] = {};
            this.keyPointsForDrawingPipes['bottom']['clockwise']['outer'] = {};
            this.keyPointsForDrawingPipes['bottom']['clockwise']['inner'] = {};
            this.keyPointsForDrawingPipes['bottom']['clockwise']['outer']['pipe'] = {
                'x': this.keyPointsForDrawingPipes['bottom']['center']['x'] - cellWidth * pipeWidthAsPercentage / 2,
                'y': this.bottomBorder.location
            }
            this.keyPointsForDrawingPipes['bottom']['clockwise']['outer']['border'] = {
                'x': this.keyPointsForDrawingPipes['bottom']['clockwise']['outer']['pipe']['x'] - cellWidth * pipeBorderWidthAsPercentage,
                'y': this.bottomBorder.location
            }
            this.keyPointsForDrawingPipes['bottom']['counterclockwise'] = {};
            this.keyPointsForDrawingPipes['bottom']['counterclockwise'] = {};
            this.keyPointsForDrawingPipes['bottom']['counterclockwise']['outer'] = {};
            this.keyPointsForDrawingPipes['bottom']['counterclockwise']['inner'] = {};
            this.keyPointsForDrawingPipes['bottom']['counterclockwise']['outer']['pipe'] = {
                'x': this.keyPointsForDrawingPipes['bottom']['center']['x'] + cellWidth * pipeWidthAsPercentage / 2,
                'y': this.bottomBorder.location
            }
            this.keyPointsForDrawingPipes['bottom']['counterclockwise']['outer']['border'] = {
                'x': this.keyPointsForDrawingPipes['bottom']['counterclockwise']['outer']['pipe']['x'] + cellWidth * pipeBorderWidthAsPercentage,
                'y': this.bottomBorder.location
            }
            this.keyPointsForDrawingPipes['bottom']['clockwise']['inner']['pipe'] = {
                'x': this.keyPointsForDrawingPipes['bottom']['clockwise']['outer']['pipe']['x'],
                'y': this.bottomBorder.location - cellHeight * pipeLengthBeforeCurvingOverToPerpendicularSide
            }
            this.keyPointsForDrawingPipes['bottom']['clockwise']['inner']['border'] = {
                'x': this.keyPointsForDrawingPipes['bottom']['clockwise']['outer']['border']['x'],
                'y': this.bottomBorder.location - cellHeight * pipeLengthBeforeCurvingOverToPerpendicularSide
            }
            this.keyPointsForDrawingPipes['bottom']['counterclockwise']['inner']['pipe'] = {
                'x': this.keyPointsForDrawingPipes['bottom']['counterclockwise']['outer']['pipe']['x'],
                'y': this.bottomBorder.location - cellHeight * pipeLengthBeforeCurvingOverToPerpendicularSide
            }
            this.keyPointsForDrawingPipes['bottom']['counterclockwise']['inner']['border'] = {
                'x': this.keyPointsForDrawingPipes['bottom']['counterclockwise']['outer']['border']['x'],
                'y': this.bottomBorder.location - cellHeight * pipeLengthBeforeCurvingOverToPerpendicularSide
            }
        }
        
        //The points needed for drawing a pipe from the left of the cell
        {
            this.keyPointsForDrawingPipes['left'] = {};
            this.keyPointsForDrawingPipes['left']['center'] = {
                'x': this.leftBorder.location,
                'y': (this.topBorder.location + this.bottomBorder.location)/2, 
            };
            this.keyPointsForDrawingPipes['left']['clockwise'] = {};
            this.keyPointsForDrawingPipes['left']['clockwise']['outer'] = {};
            this.keyPointsForDrawingPipes['left']['clockwise']['inner'] = {};
            this.keyPointsForDrawingPipes['left']['clockwise']['outer']['pipe'] = {
                'x': this.leftBorder.location,
                'y': this.keyPointsForDrawingPipes['left']['center']['y'] - cellHeight * pipeWidthAsPercentage / 2,
            }
            this.keyPointsForDrawingPipes['left']['clockwise']['outer']['border'] = {
                'x': this.leftBorder.location,
                'y': this.keyPointsForDrawingPipes['left']['clockwise']['outer']['pipe']['y'] - cellHeight * pipeBorderWidthAsPercentage,
            }
            this.keyPointsForDrawingPipes['left']['counterclockwise'] = {};
            this.keyPointsForDrawingPipes['left']['counterclockwise']['outer'] = {};
            this.keyPointsForDrawingPipes['left']['counterclockwise']['inner'] = {};
            this.keyPointsForDrawingPipes['left']['counterclockwise']['outer']['pipe'] = {
                'x': this.leftBorder.location,
                'y': this.keyPointsForDrawingPipes['left']['center']['y'] + cellHeight * pipeWidthAsPercentage / 2,
            }
            this.keyPointsForDrawingPipes['left']['counterclockwise']['outer']['border'] = {
                'x': this.leftBorder.location,
                'y': this.keyPointsForDrawingPipes['left']['counterclockwise']['outer']['pipe']['y'] + cellHeight * pipeBorderWidthAsPercentage,
            }
            this.keyPointsForDrawingPipes['left']['clockwise']['inner']['pipe'] = {
                'x': this.leftBorder.location + cellWidth * pipeLengthBeforeCurvingOverToPerpendicularSide,
                'y': this.keyPointsForDrawingPipes['left']['clockwise']['outer']['pipe']['y'],
            }
            this.keyPointsForDrawingPipes['left']['clockwise']['inner']['border'] = {
                'x': this.leftBorder.location + cellWidth * pipeLengthBeforeCurvingOverToPerpendicularSide,
                'y': this.keyPointsForDrawingPipes['left']['clockwise']['outer']['border']['y'],
            }
            this.keyPointsForDrawingPipes['left']['counterclockwise']['inner']['pipe'] = {
                'x': this.leftBorder.location + cellWidth * pipeLengthBeforeCurvingOverToPerpendicularSide,
                'y': this.keyPointsForDrawingPipes['left']['counterclockwise']['outer']['pipe']['y'],
            }
            this.keyPointsForDrawingPipes['left']['counterclockwise']['inner']['border'] = {
                'x': this.leftBorder.location + cellWidth * pipeLengthBeforeCurvingOverToPerpendicularSide,
                'y': this.keyPointsForDrawingPipes['left']['counterclockwise']['outer']['border']['y'],
            }
        }
        
        //The points needed for drawing a pipe from the right of the cell
        {
            this.keyPointsForDrawingPipes['right'] = {};
            this.keyPointsForDrawingPipes['right']['center'] = {
                'x': this.rightBorder.location,
                'y': (this.topBorder.location + this.bottomBorder.location)/2, 
            };
            this.keyPointsForDrawingPipes['right']['counterclockwise'] = {};
            this.keyPointsForDrawingPipes['right']['counterclockwise']['outer'] = {};
            this.keyPointsForDrawingPipes['right']['counterclockwise']['inner'] = {};

            this.keyPointsForDrawingPipes['right']['counterclockwise']['outer']['pipe'] = {
                'x': this.rightBorder.location,
                'y': this.keyPointsForDrawingPipes['right']['center']['y'] - cellHeight * pipeWidthAsPercentage / 2,
            }
            this.keyPointsForDrawingPipes['right']['counterclockwise']['outer']['border'] = {
                'x': this.rightBorder.location,
                'y': this.keyPointsForDrawingPipes['right']['counterclockwise']['outer']['pipe']['y'] - cellHeight * pipeBorderWidthAsPercentage,
            }
            this.keyPointsForDrawingPipes['right']['clockwise'] = {};
            this.keyPointsForDrawingPipes['right']['clockwise']['outer'] = {};
            this.keyPointsForDrawingPipes['right']['clockwise']['inner'] = {};
            this.keyPointsForDrawingPipes['right']['clockwise']['outer']['pipe'] = {
                'x': this.rightBorder.location,
                'y': this.keyPointsForDrawingPipes['right']['center']['y'] + cellHeight * pipeWidthAsPercentage / 2,
            }
            this.keyPointsForDrawingPipes['right']['clockwise']['outer']['border'] = {
                'x': this.rightBorder.location,
                'y': this.keyPointsForDrawingPipes['right']['clockwise']['outer']['pipe']['y'] + cellHeight * pipeBorderWidthAsPercentage,
            }
            this.keyPointsForDrawingPipes['right']['counterclockwise']['inner']['pipe'] = {
                'x': this.rightBorder.location - cellWidth * pipeLengthBeforeCurvingOverToPerpendicularSide,
                'y': this.keyPointsForDrawingPipes['right']['center']['y'] - cellHeight * pipeWidthAsPercentage / 2,
            }
            this.keyPointsForDrawingPipes['right']['counterclockwise']['inner']['border'] = {
                'x': this.rightBorder.location - cellWidth * pipeLengthBeforeCurvingOverToPerpendicularSide,
                'y': this.keyPointsForDrawingPipes['right']['counterclockwise']['outer']['border']['y'],
            }
            this.keyPointsForDrawingPipes['right']['clockwise']['inner']['pipe'] = {
                'x': this.rightBorder.location - cellWidth * pipeLengthBeforeCurvingOverToPerpendicularSide,
                'y': this.keyPointsForDrawingPipes['right']['clockwise']['outer']['pipe']['y'],
            }
            this.keyPointsForDrawingPipes['right']['clockwise']['inner']['border'] = {
                'x': this.rightBorder.location - cellWidth * pipeLengthBeforeCurvingOverToPerpendicularSide,
                'y': this.keyPointsForDrawingPipes['right']['clockwise']['outer']['border']['y'],
            }
        }
        
    }

    drawPipe(side1, side2, color) {
        //Determine if the sides of the cell are already occupied
        console.log(side1, this.borders[side1])
        if (this.borders[side1].associatedPipe != null | this.borders[side2].associatedPipe != null) {
            console.log("Pipe already exist in border")
        }

        //Determine if we should label this pipe "Pipe 1" or "Pipe 2", and update the Pipe Display class
        if (this.pipe1.exists == false) {
            this.pipe1.exists = true;
            this.pipe1.side1 = side1;
            this.pipe1.side2 = side2;
        }

        else if (this.pipe2.exists == true 
                && this.pipe2.exists == false) {
            this.pipe2.exists = true;
            this.pipe2.side1 = side1;
            this.pipe2.side2 = side2;
        }

        else {
            console.log("Too many pipes!")
        }

        this.drawPipeEdge(side1, color);
        this.drawPipeEdge(side2, color);
        this.drawPipeCenter(side1, side2, color)

    }

    reDrawCell() {
        this.drawSolidColor(this.parentCell.bgcolor)
        if (this.pipe1.exists == true) {
            this.drawPipe(
                this.pipe1.side1,
                this.pipe1.side2,
                this.pipe1.color
            )
    
        }
        if (this.pipe2.exists == true) {
            this.drawPipe(
                this.pipe2.side1,
                this.pipe2.side2,
                this.pipe2.color
            )
    
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
        this.context.fillStyle = "black";
        var rotationalDirections = ["clockwise", "counterclockwise"];
        rotationalDirections.forEach( (rotationalDirection, i) => {
            var x=0;
            var y=0;
            this.context.beginPath();

            x = this.keyPointsForDrawingPipes[direction1][rotationalDirections[i]]["inner"]["pipe"]['x'];
            y = this.keyPointsForDrawingPipes[direction1][rotationalDirections[i]]["inner"]["pipe"]['y'];
            this.context.moveTo(x, y);
        
            x = this.keyPointsForDrawingPipes[direction1][rotationalDirections[i]]["inner"]["border"]['x'];
            y = this.keyPointsForDrawingPipes[direction1][rotationalDirections[i]]["inner"]["border"]['y'];
            this.context.lineTo(x, y);
        
            x = this.keyPointsForDrawingPipes[direction2][rotationalDirections[(i+1)%2]]["inner"]["border"]['x'];
            y = this.keyPointsForDrawingPipes[direction2][rotationalDirections[(i+1)%2]]["inner"]["border"]['y'];
            this.context.lineTo(x, y);
        
            x = this.keyPointsForDrawingPipes[direction2][rotationalDirections[(i+1)%2]]["inner"]["pipe"]['x'];
            y = this.keyPointsForDrawingPipes[direction2][rotationalDirections[(i+1)%2]]["inner"]["pipe"]['y'];
            this.context.lineTo(x, y);

            x = this.keyPointsForDrawingPipes[direction1][rotationalDirections[i]]["inner"]["pipe"]['x'];
            y = this.keyPointsForDrawingPipes[direction1][rotationalDirections[i]]["inner"]["pipe"]['y'];
            this.context.lineTo(x, y);

                
            this.context.fill();
        
        }
        )

        //Draw the pipe interior
        this.context.fillStyle = color;
        var x=0;
        var y=0;
        this.context.beginPath();

        x = this.keyPointsForDrawingPipes[direction1]["clockwise"]["inner"]["pipe"]['x'];
        y = this.keyPointsForDrawingPipes[direction1]["clockwise"]["inner"]["pipe"]['y'];
        this.context.moveTo(x, y);
        
        x = this.keyPointsForDrawingPipes[direction1]["counterclockwise"]["inner"]["pipe"]['x'];
        y = this.keyPointsForDrawingPipes[direction1]["counterclockwise"]["inner"]["pipe"]['y'];
        this.context.lineTo(x, y);
        
        x = this.keyPointsForDrawingPipes[direction2]["clockwise"]["inner"]["pipe"]['x'];
        y = this.keyPointsForDrawingPipes[direction2]["clockwise"]["inner"]["pipe"]['y'];
        this.context.lineTo(x, y);
        
        x = this.keyPointsForDrawingPipes[direction2]["counterclockwise"]["inner"]["pipe"]['x'];
        y = this.keyPointsForDrawingPipes[direction2]["counterclockwise"]["inner"]["pipe"]['y'];
        this.context.lineTo(x, y);

        x = this.keyPointsForDrawingPipes[direction1]["clockwise"]["inner"]["pipe"]['x'];
        y = this.keyPointsForDrawingPipes[direction1]["clockwise"]["inner"]["pipe"]['y'];
        this.context.lineTo(x, y);

                
        this.context.fill();        
        

    }

    drawSolidColor(color) {
        this.context.fillStyle = color;
        this.context.fillRect(this.leftBorder.location-1, this.topBorder.location, 
            this.rightBorder.location - this.leftBorder.location + 1, 
            this.bottomBorder.location - this.topBorder.location + 1)
    }

    drawBorder(color, thickness=3) {
        this.context.fillStyle = color;

        //Draw thin rectangle on left side
        this.context.fillRect(
            this.leftBorder.location,
            this.topBorder.location,
            thickness,
            this.bottomBorder.location - this.topBorder.location)

        //Draw thin rectangle on top side
        this.context.fillRect(
            this.leftBorder.location + thickness,
            this.topBorder.location,
            this.rightBorder.location - this.leftBorder.location - 2*thickness,
            thickness)
        
        //Draw thin rectangle on right side
        this.context.fillRect(
            this.rightBorder.location - thickness,
            this.topBorder.location,
            thickness,
            this.bottomBorder.location - this.topBorder.location)
        
        //Draw thin rectangle on bottom side
        this.context.fillRect(
            this.leftBorder.location + thickness,
            this.bottomBorder.location - thickness,
            this.rightBorder.location - this.leftBorder.location - 2*thickness,
            thickness)
            console.log(this.bottomBorder.location - this.topBorder.location   )

    }

}

export default PipeDisplayInsideCell;