song = "";
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
    song = loadSound("2023_best_ringtone.mp3");
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function draw() {
    image(video, 0, 0, 380, 380);

      if(status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotresults);
        for(i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("no_of_objects").innerHTML = "Person found "+ object.length;
            fill(r, g, b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            if(object[i].label == "person") {
                document.getElementById("no_of_objects").innerHTML = "Baby Found";
                console.log("stop");
                song.stop();
            }
            else {
                document.getElementById("no_of_objects").innerHTML = "Baby Not Found";
                console.log("play");
                song.play();
            }
        }
        if(object.length == 0) {
            document.getElementById("no_of_objects").innerHTML = "Baby Not Found";
            console.log("play");
            song.play();
        }
      }
}

function gotresults(error, results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}