prediction_1 = ""

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5_version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/7nBPrW9Is/model.json', modelLoaded);
 
function modelLoaded() {
    console.log("modelLoaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" +prediction_1;
    var utterthis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterthis);
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_hand_gesture_name").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
        
        if(results[0].label == "Good")
        {
            document.getElementById("update_hand_gesture").innerHTML = "&#128077;";
        }

        if(results[0].label == "Perfect")
        {
            document.getElementById("update_hand_gesture").innerHTML = "&#128076;";
        }
        
        if(results[0].label == "Great Job")
        {
            document.getElementById("update_hand_gesture").innerHTML = "&#128079;";
        }
        if(results[0].label == "Bye")
        {
            document.getElementById("update_hand_gesture").innerHTML = "&#128075;";
        }
        
        if(results[0].label == "Look up")
        {
            document.getElementById("update_hand_gesture").innerHTML = "&#128548;";
        }
    }
}