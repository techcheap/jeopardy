var firebaseConfig = {
    apiKey: "AIzaSyCF8uqpoUpZ0XHIXoKZ0FYDyGX2043fqVU",
    authDomain: "jeopardy-20f0c.firebaseapp.com",
    databaseURL: "https://jeopardy-20f0c-default-rtdb.firebaseio.com",
    projectId: "jeopardy-20f0c",
    storageBucket: "jeopardy-20f0c.appspot.com",
    messagingSenderId: "648329663372",
    appId: "1:648329663372:web:2063cee5dfd805cc9a3ca9",
    measurementId: "G-4W5RJRJQLD"
};
firebase.initializeApp(firebaseConfig)
var firebaseRef = firebase.database();
var myName = "hello";
var  buzzer = {
    gender: "girls",
    isBuzzed: true,
    name: myName
};
document.querySelector(".submit").addEventListener('click', function(){
    myName = document.getElementById('name').value;
    document.querySelector('.background').style.display="none";
    buzzer = {
        gender : "girls",
        isBuzzed: true,
        name: myName
    };
});
firebaseRef.ref().on("value", snapshot =>{
    var snap = snapshot.val();
    var buzzing = snap.buzz;
    var isBuzzed = buzzing.isBuzzed;
    var buzzingGender = buzzing.gender;
    var buzzingName = buzzing.name;
    console.log(buzzingGender);
    if (snap.onQuestion == true){
        if (isBuzzed!= true){
            document.querySelector('.winner').style.display="none";
            document.querySelector('.buzzer').addEventListener('click', function(){
                firebaseRef.ref("buzz").update(buzzer);
            });
        }
        else if(isBuzzed == true){
            var win = buzzingName + " buzzed!"
            document.querySelector('.text').innerHTML=win;
            document.querySelector('.winner').style.display="block";
        };
    }
    else if(snap.onQuestion != true){
    var question = "Waiting for a question...";
    document.querySelector('.text').innerHTML=question;
    document.querySelector('.winner').style.display="block";
    };
});

firebaseRef.ref("timerExpired").on("value", snapshot =>{
    snap = snapshot.val();
    if (snap == true){
        document.querySelector('#winner').style.display="block";
    }
    else if(snap== false){
        document.querySelector('#winner').style.display="none";
    }
});