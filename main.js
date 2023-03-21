img = "";
status = "";
object = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function preload() {
    audio = loadSound("2023_best_ringtone.mp3");
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function draw() {
    image(video, 0, 0, 380, 380);

      if(status != "person") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotresults);
        for(i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("no_of_objects").innerHTML = "Person found "+ object.length;
            audio.stop();
            fill(r, g, b);
            percent = floor(object[i].confidence *100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
      }
      else {
        document.getElementById("status").innerHTML = "Status : Object Detected";
        document.getElementById("no_of_objects").innerHTML = "Person found "+ object.length;
        audio.play();
      }
}

function gotresults(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "status : Object detecting";
}