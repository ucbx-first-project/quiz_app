//this logic happens after user authentication 
//on its own page for now(not connected to sign in)
//later we can add a link between the pages that once user is signed in
//moves you to the second page with the quiz generators


//edit quiz to single question which allows for update of wiki on each
//add next question button to pull a new random question
//check api info for trivia question generator
//add giphy


//questions object to contain each subject object 
//with a sub object holding questions

var questions = {
	"geography" : [{
		question: "Which of the following countries is NOT a member of the European Union (EU)?", answers: {
	 		a: " Denmark",
	 		b: " Norway",
	 		c: " Sweden",
      d: " Finland"
 		},
 		answer: "b",
    wiki: "European_Union"
  }, {

    question: "What is the longest mountain range in the world?", answers: {
      a: " Himalayas",
      b: " Alps",
      c: " Andes",
      d: " Rocky Mountains"
    },
    answer: "c",
    wiki: "List_of_mountain_ranges"
  }, {

    question: "Which of the following is the longest river in the world?", answers: {
      a: " Amazon",
      b: " Nile",
      c: " Yangtze",
      d: " Congo"
    },
    answer: "a",
    wiki: "List_of_rivers_by_length"

	},{

    question: "Which continent is largest in terms of land mass?", answers: {
      a: " Asia",
      b: " Europe",
      c: " Africs",
      d: " North America"
    },
    answer: "a",
    wiki: "Continent"

  }],

	"biology" : [{
    question: "A group of similar species is a ______?", answers: {
      a: " Class",
      b: " Genus",
      c: " Kingdom",
      d: " Taxonomic"
    },
    answer: "b",
    wiki: "genus"

	}],

	"history" : [{
    question: "In 1803 President Jefferson purchased a large peice of land from the French. What was this event called?", answers: {
      a: " Pacific Discovery",
      b: " Jefferson's Deal",
      c: " Louisiana Purchase",
      d: " The French Affair"
    },
    answer: "c",
    wiki: "Louisiana_Purchase"

	}],
}


//global variable list

var currentSubject = "";
var numCorrect = 0;
var currentQuestion = [];
var questionIndex = 0;
var lastAnswerCorrect = false;
$("#reset").hide();
$("#submit").hide();
$(".account-detail").hide();




//this function shuffles the questions to show a different order each time
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//set up a quiz function that can be called for any set of questions
//this is just generating the first quiz question
function generateQuiz (subject){

 // subject = shuffle(subject);

  var quiz = document.getElementById("quiz");
  var results = document.getElementById("results");
  var submit = document.getElementById("submit");
  currentQuestion = subject;

  buildQuiz();

};


//this function is building the html element for the quiz question
//this function will update when the user clicks next question
function buildQuiz(){
  
	var output = [];
  var answers = [];
  var i = questionIndex;

  	//for (var i = 0; i < currentQuestion.length; i++) {
    	console.log(i);
      console.log(currentQuestion[i]);
    //		answers = [];
    		for (letter in currentQuestion[i].answers) {
              answers.push("<li><label>"
    			+ '<input type="radio" name=question' + i + 
              ' value="'+letter+'" class="question">'
				+ "  " + letter + " : "
				+ currentQuestion[i].answers[letter]+ "</label></li>")
    		};

    		answers.push("</ul>");

    		output.push(
		"<div class='q'>" + currentQuestion[i].question + "</div>"
		+"<br>"
		+ "<div class='answers'>" + answers.join(' ') + "</div><br>")


		quiz.innerHTML = output.join('');
		console.log(output.join(''));


      //};
};

//set up a results/summary function
//this will display at the end to show which anwers are right/wrong
//this *may* need to showcase the api call info as well

function showResults (){
  var answerDisplay = $(".answers")
  var userAnswer = '';
  var i = questionIndex

      userAnswer = (answerDisplay[0].querySelector('input[name=question'+i+']:checked')||{}).value;
      console.log("User answer: " + userAnswer);
      if(userAnswer === currentQuestion[i].answer){
          numCorrect++;
          
          answerDisplay[0].style.color = "green";
          lastAnswerCorrect = true;
      }
      else{
          answerDisplay[0].style.color = "darkred";
          lastAnswerCorrect = false;
      }

  results.innerHTML = numCorrect + " out of " + currentQuestion.length;

};


//this function updates the modal for each question submitted
function updateModal(){
  $("#gif-content").empty();
  $("#wiki-content").empty();
  console.log(numCorrect);
  console.log(currentSubject);

   if (lastAnswerCorrect){
     console.log("you rock, post gif");

     var winningGif = "";

     $.ajax({
      url: "http://api.giphy.com/v1/gifs/search?q=winning&api_key=9b203687108545728e67856c167e9113&rating=pg-13",
      method: "GET",


      success: function(response){

        console.log(response);
        var imageURL = response.data[Math.floor(Math.random()*response.data.length)].images.fixed_width.url;
        var image = $("<img>");
        $(image).attr("src", imageURL);
        $("#gif-content").append(image);
       

      },

      error: function(){
        console.log("error")
      }
        
    });
  }
  else {
    console.log("results updated with wiki api")
    var studyContent = encodeURIComponent(currentSubject[questionIndex].wiki);
  //API link to wikipedia
  //ideally later show/hide the submit and reset buttons

    $.ajax( {
     // url: "http://en.wikipedia.org/w/api.php?action=parse&format=jsonp&prop=revisions&rvprop=content&titles=Nile&section=0&callback=?",
      url: "http://en.wikipedia.org/w/api.php?action=query&format=jsonp&prop=extracts&exintro&explaintext&titles=" + studyContent + "&section=0",
      
      jsonp: "callback", 
      dataType: 'jsonp', 
      data: { 
          action: "query", 
          list: "search", 
          srsearch: "javascript", 
          format: "json" 
      },
      xhrFields: { withCredentials: true },

      success: function(data, textStatus, jqXHR) {
        console.log("success")
        console.log(data);

        for (var pageNumber in data.query.pages){
          console.log(data.query.pages[pageNumber].extract);
          $("#wiki-content").html(data.query.pages[pageNumber].extract);
        }; 

      },
      error: function (){
        console.log("error")
      }
    });
  }
}


//set on.(click) event listener to run the generate quiz function 
//assign the subject
$("#submit").on("click", function(){
  if (questionIndex+1 < currentQuestion.length) {
    showResults();
    updateModal();
    questionIndex ++;
    buildQuiz();

  }

  else {
    showResults();
    updateModal();

  }

  // Get the modal for quiz result display
  var modal = document.getElementById('answer-summary');
  modal.style.display = "block";

});

$("#start-geo-quiz").on("click", function(){
  currentSubject = questions.geography;
  generateQuiz(questions.geography);
  console.log("started quiz");
  $("#submit").show();
  $("#reset").show();
});

$("#start-bio-quiz").on("click", function(){
  currentSubject = questions.biology;
  generateQuiz(questions.biology);
  console.log("started quiz");
  $("#submit").show();
  $("#reset").show();
});

$("#start-history-quiz").on("click", function(){
  currentSubject = questions.history;
  generateQuiz(questions.history);
  console.log("started quiz");
  $("#submit").show();
  $("#reset").show();
});

$("#reset").on("click", function(){
  currentSubject = "";
  $("#quiz").empty();
  console.log("reset quiz")
  $("#submit").hide();
  currentQuestion = [];
});

// Get the modal for quiz result display
var modal = document.getElementById('answer-summary');

// Get the button that opens the modal
var btn = document.getElementById("submit");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

//  When the user clicks on the button, open the modal 
// btn.onclick = function() {
//     modal.style.display = "block";
// }

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

$("#account-button").on("click", function(){

    $(".account-detail").slideToggle();

});