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

document.querySelector(".submit").addEventListener("click", function(){
    var password = document.getElementById('password').value;
    if (password == "omar&&jeopardy2021deputy**"){
      document.querySelector('.bg_password').style.display="none";
      document.querySelector(".corps").style.display="block";
    }
    else{
      document.querySelector(".corps").style.display="none";
      document.querySelector('.bg_password').style.display="block";
      alert("Incorrect password!");
    };
});
const deBuzz = {
    gender:"none",
    isBuzzed: false
};
var scoreBoys = 0;
var scoreGirls = 0;
var addScore=0;
var winner_gender = null;
var question ="none";
var timing;
var question_point = 0;
//Trigger and close a question
let timer = document.querySelector('.timer')
document.querySelectorAll('.button').forEach(item => item.addEventListener("click", function() {
    document.querySelector('.bg-question').style.display = "block";
    document.getElementById("winner").innerHTML="";
    timer.play();
    clearTimeout(timing);
    timing = setTimeout(endTime,11000);
    firebaseRef.ref("onQuestion").set(true);
    firebaseRef.ref("buzz").update(deBuzz);
    document.querySelector(".host-buttons").style.display="none";
}));
function endTime(){
  firebaseRef.ref("timerExpired").set(true);
}
function rebuzz(){
    document.getElementById("winner").innerHTML="";
    clearTimeout(timing);
    timing = setTimeout(endTime,11000);
    timer.play();
    timer.currentTime=0;
    firebaseRef.ref("onQuestion").set(true);
    firebaseRef.ref("buzz").update(deBuzz);
    document.querySelector(".host-buttons").style.display="none";
};
document.querySelector('.close').addEventListener("click", function(){
    document.querySelector('.bg-question').style.display = "none";
    clearTimeout(timing);
    timer.pause();
    timer.currentTime=0;
    firebaseRef.ref("buzz/isBuzzed").set(false);
    firebaseRef.ref("onQuestion").set(false);
    firebaseRef.ref("timerExpired").set(false);
    document.getElementById(question).className="clicked";
    question_point = question_point + 1;
    if (question_point == 15){
        if (scoreBoys > scoreGirls){
            document.querySelector('.question_input').style.color="#42b4e6";
            document.getElementById('celeb_msg').innerHTML = "BOYS WIN!";
            document.getElementById('points').innerHTML = scoreBoys + "pts";
        }
        else if (scoreGirls>scoreBoys){
            document.querySelector('.question_input').style.color="pink";
            document.getElementById('celeb_msg').innerHTML = "GIRLS WIN!";
            document.getElementById('points').innerHTML = scoreGirls + "pts";
        }
        else if (scoreBoys==scoreGirls){
          document.querySelector('.question_input').style.color="#fec103";
            document.getElementById('celeb_msg').innerHTML = "IT\'S A TIE!";
            document.getElementById('points').innerHTML = scoreBoys + "pts";
        }
      document.querySelector(".bg_celeb").style.display="block";
    }
    else{
      document.querySelector(".bg_celeb").style.display="none";
    }
});

document.querySelector('.close_celeb').addEventListener("click", function(){
    document.querySelector('.bg_celeb').style.display="none";
});

firebaseRef.ref("buzz").on("value", snapshot =>{
    var snap = snapshot.val();
    var isBuzzed = snap.isBuzzed;
    if (isBuzzed == true){
      if (snap.gender == "boys"){
        document.getElementById("winner").style.color="#42b4e6";
      }
      else if (snap.gender == "girls"){
        document.getElementById("winner").style.color="pink";
      }
      clearTimeout(timing);
      timing = setTimeout(rebuzz,11000);
      document.getElementById("winner").innerHTML=snap.name + " buzzed!";
      timer.play();
      timer.currentTime=0;
      document.querySelector(".host-buttons").style.display="block";
    }
});

function reply_click(clicked_id)
{
  question = clicked_id;
  addScore = parseInt(clicked_id, 10);
  firebaseRef.ref("questions").on("value", snapshot =>{
    snap = snapshot.val();
    var myQuestion = "none";
    switch (question.toString()){
      case '100-1':
        myQuestion = snap.first1.toString();
        break;
      case '100-2':
        myQuestion = snap.second1.toString();
        break;
      case '100-3':
        myQuestion = snap.third1.toString();
        break;
      case '200-1':
        myQuestion = snap.first2.toString();
        break;
      case '200-2':
        myQuestion = snap.second2.toString();
        break;
      case '200-3':
        myQuestion = snap.third2.toString();
        break;
      case '300-1':
        myQuestion = snap.first3.toString();
        break;
      case '300-2':
        myQuestion = snap.second3.toString();
        break;
      case '300-3':
        myQuestion = snap.third3.toString();
        break;
      case '400-1':
        myQuestion = snap.first4.toString();
        break;
      case '400-2':
        myQuestion = snap.second4.toString();
        break;
      case '400-3':
        myQuestion = snap.third4.toString();
        break;
      case '500-1':
        myQuestion = snap.first5.toString();
        break;
      case '500-2':
        myQuestion = snap.second5.toString();
        break;
      case '500-3':
        myQuestion = snap.third5.toString();
        break;
    };
    document.getElementById("question").innerHTML=myQuestion;
  });
};


firebaseRef.ref("buzz/gender").on("value", snapshot =>{
    var winner = snapshot.val();
    if (winner.toString() == "boys"){
      winner_gender=true;
    }
    else if (winner.toString() == "girls"){
      winner_gender=false;
    }
});

document.getElementById("correct").addEventListener("click", function(){
  counting = false;
  if (winner_gender == true){
    scoreBoys = scoreBoys + addScore;
  }else if (winner_gender == false){
    scoreGirls = scoreGirls + addScore;
  }
  timer.pause();
  document.querySelector(".host-buttons").style.display="none";
  var scoreboys = "Boys: " + scoreBoys + "pts";
  var scoregirls = "Girls: " + scoreGirls + "pts";
  document.getElementById("boys").innerHTML = scoreboys;
  document.getElementById("girls").innerHTML = scoregirls;
});