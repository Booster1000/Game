color = "";

function setup() {
    canvas = createCanvas(280, 280);
    canvas.position(800, 450);
     background("white");
    //call the function classifyCanvas when we leave our mouse 
    canvas.mouseReleased(classifyCanvas);
    //convert text to speech 
    synth = window.speechSynthesis;
}

function preload() {
    //DoodleNet has a  set of predefined sketches library which can be used to identify our sketches 
    classifier = ml5.imageClassifier('DoodleNet');
}

function clearCanvas() {
    background("white");
}

function draw() {
    // Set stroke weight (line weight) to 13
    color = document.getElementById("colo").value;
    strokeWeight(13);
    // Set stroke color (color of sketch) to black
    stroke(color);
    // If mouse is pressed, draw line between previous and current mouse positions
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function selectColor() {
    color = document.getElementById("colo").value;
}

function classifyCanvas() {
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML = 'Label: ' + results[0].label;

    document.getElementById('confidence').innerHTML = 'Confidence: ' + Math.round(results[0].confidence * 100) + '%';

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}