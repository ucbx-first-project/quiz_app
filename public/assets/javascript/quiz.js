//this logic happens after user authentication 
//on its own page for now(not connected to sign in)
//later we can add a link between the pages that once user is signed in
//moves you to the second page with the quiz generators



//questions object to contain each subject object 
//with a sub object holding questions

var questions = {
	"geography" : [{
		question: "What airport uses the code FCO?", answers: {
	 		a: " Rome",
	 		b: " Frankfurt",
	 		c: " Fair Isle",
 		},
 		answer: "a",

	}],

	"biology" : [{
    question: "A group of similar species is a ______?", answers: {
      a: " Class",
      b: " Genus",
      c: " Kingdom",
      d: " Taxonomic"
    },
    answer: "b",

	}],

	"history" : [{
    question: "In 1803 President Jefferson purchased a large peice of land from the French. What was this event called?", answers: {
      a: " Pacific Discovery",
      b: " Jefferson's Deal",
      c: " Louisiana Purchase",
      d: " The French Affair"
    },
    answer: "c",

	}],
}

var currentSubject = "";


//set up a quiz function that can be called for any set of questions
//this is just generating the quiz page
function generateQuiz (subject){

    var quiz = document.getElementById("quiz");
    var results = document.getElementById("results");
    var submit = document.getElementById("submit");

 	function buildQuiz (){
		var output = [];
      	var answers = [];

    	for (var i = 0; i < subject.length; i++) {
      		console.log(i);
      		answers = [];
      		for (letter in subject[i].answers) {
                answers.push("<li><label>"
      			+ '<input type="radio" name=question' + i + 
                ' value="'+letter+'" class="question">'
					+ "  " + letter + " : "
					+ subject[i].answers[letter]+ "</label></li>")
      		};

      		answers.push("</ul>");

      		output.push(
			'<div class="q">' + subject[i].question + '</div>'
			+'<br>'
			+ '<div class="answers">' + answers.join(' ') + '</div>')


            //$("#quiz").append(output).join('');
			quiz.innerHTML = output.join('');
			console.log(output.join(''));


        };

    };

buildQuiz();
console.log("build quiz done");

};


//set up a results/summary function
//this will display at the end to show which anwers are right/wrong
//this *may* need to showcase the api call info as well

function showResults (subject){

    var answerDisplay = $("#quiz")
    var userAnswer = '';
    var numCorrect = 0;

    for(var i=0; i < subject.length; i++){

        userAnswer = (answerDisplay[i].querySelector('input[name=question'+i+']:checked')||{}).value;
        console.log("User answer: " + userAnswer);
        if(userAnswer === subject[i].answer){
            numCorrect++;
            
            answerDisplay[i].style.color = "green";
        }
        else{
            answerDisplay[i].style.color = "darkred";
        }
    }

    results.innerHTML = numCorrect + " out of " + subject.length;

};


//set on.(click) event listener to run the generate quiz function 
//assign the subject
$("#submit").on("click", function(){
  showResults(questions.geography);
  console.log("results updated")

});

$("#start-geo-quiz").on("click", function(){
  currentSubject = "geography";
  generateQuiz(questions.geography);
  console.log("started quiz");
});

$("#start-bio-quiz").on("click", function(){
  currentSubject = "biology";
  generateQuiz(questions.biology);
  console.log("started quiz");
});

$("#start-history-quiz").on("click", function(){
  currentSubject = "history";
  generateQuiz(questions.history);
  console.log("started quiz");
});

$("#reset").on("click", function(){
  currentSubject = "";
  $("#quiz").empty();
  console.log("reset quiz")
});

// Get the modal for quiz result display
var modal = document.getElementById('answer-summary');

// Get the button that opens the modal
var btn = document.getElementById("submit");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}