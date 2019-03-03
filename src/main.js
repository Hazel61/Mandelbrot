// Create Canvas
let myCanvas = document.createElement("canvas");
myCanvas.width=1000;
myCanvas.height=1000;
document.body.appendChild(myCanvas);
let ctx = myCanvas.getContext("2d");

// Start drawing
function checkIfBelongsToMandelbrotSet(x,y) {
    let realComponentOfResult = x;
    let imaginaryComponentOfResult = y;
    let maxIterations = 100;
    for(let i = 0; i < maxIterations; i++) {
        let tempRealComponent = realComponentOfResult * realComponentOfResult
            - imaginaryComponentOfResult * imaginaryComponentOfResult
            + x;
        let tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
            + y;
        realComponentOfResult = tempRealComponent;
        imaginaryComponentOfResult = tempImaginaryComponent;

        // Return a number as a percentage
        if(realComponentOfResult * imaginaryComponentOfResult > 5)
            return (i/maxIterations * 100);
    }
    return 0;   // Return zero if in set
}

function draw() {
    let magnificationFactor = 200;
    let panX = 2;
    let panY = 1.5;
    for (let x = 0; x < myCanvas.width; x++) {
        for (let y = 0; y < myCanvas.height; y++) {
            let belongsToSet =
                checkIfBelongsToMandelbrotSet(x / magnificationFactor - panX,
                    y / magnificationFactor - panY);
            if (belongsToSet === 0) {
                ctx.fillStyle = '#000';
                ctx.fillRect(x, y, 1, 1); // Draw a black pixel
            } else {
                ctx.fillStyle = 'hsl(240, 100%, ' + belongsToSet + '%)';
                ctx.fillRect(x, y, 1, 1); // Draw a colorful pixel
            }
        }
    }
}
