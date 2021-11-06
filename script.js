function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}

function setup(){
    canvas = createCanvas(500, 500);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifiyCanvas);
    synth = window.speechSynthesis;
}

function clearCanvas(){
    background("white");
}

function draw(){
    canvas.center();
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifiyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById('label_out').innerHTML = "label: " + results[0].label;

    document.getElementById('confidence').innerHTML = "Confidence: " + results[0].confidence * 10 + " %";

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}