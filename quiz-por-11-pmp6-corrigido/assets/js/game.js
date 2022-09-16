const question = document.getElementById("question");
const questionsound = document.getElementById("questionsound");
const category = document.getElementById("category");
const image = document.getElementById("image");

const choices = Array.from(document.getElementsByClassName("choice-text"));
const sounds = Array.from(document.querySelectorAll("p.sound-text"));

const qimages = Array.from(document.getElementsByClassName("qimage-text"));

const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("./../assets/json/questions.json")
  .then((res) => {
    return res.json();
  })
  .then((loadedQuestions) => {
    questions = loadedQuestions.results.map((loadedQuestion) => {
      const formattedQuestion = {
        question: loadedQuestion.question,
        category: loadedQuestion.category,
        image: loadedQuestion.image,
        questionsound: loadedQuestion.sound_question
      };

      const answerChoices = [...loadedQuestion.incorrect_answers];
      const answerChoicesSounds = [...loadedQuestion.incorrect_answers_sound];
      const answerChoicesQimages = [...loadedQuestion.incorrect_answers_image];
      const answerChoicesFeedBack = [...loadedQuestion.incorrect_feedback];

      formattedQuestion.answer = Math.floor(Math.random() * 2) + 1;

      answerChoices.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer,
      );

      answerChoicesSounds.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer_sound,
      );

      answerChoicesQimages.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_answer_image,
      );

      answerChoicesFeedBack.splice(
        formattedQuestion.answer - 1,
        0,
        loadedQuestion.correct_feedback,
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      answerChoicesSounds.forEach((sound, index) => {
        formattedQuestion["sound" + (index + 1)] = sound;
      });

      answerChoicesQimages.forEach((qimage, index) => {
        formattedQuestion["qimage" + (index + 1)] = qimage;
      });

      answerChoicesFeedBack.forEach((feedback, index) => {
        formattedQuestion["feedback" + (index + 1)] = feedback;
      });

      return formattedQuestion;

    });

    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;
let maxQuestions;
localStorage.setItem("maxQuestions", MAX_QUESTIONS);

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score); /*go to the end page*/
    return window.location.assign("../pages/end.html");
  }

  questionCounter++;
  // comentando progresso da quant de questões a pedido de Gisele 25/08/2022
  // progressText.innerHTML = `QUESTÃO ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`; //update the progress bar

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;
  category.innerText = currentQuestion.category;

  // questionsound.innerHTML = "<audio id='audioquestion' controls><source src='../assets/audio/questions/" + currentQuestion.questionsound + "' type='audio/mpeg'>O seu navegador não suporta o elemento audio. Tente utilizar outro navegador.</audio>";

  questionsound.innerHTML = `<audio id='audioquestion'><source src='../assets/audio/questions/${currentQuestion.questionsound}' type='audio/mpeg'>O seu navegador não suporta o elemento audio. Tente utilizar outro navegador.</audio><a class='btnplayaudio' >PLAY</a>`;

  image.innerHTML = "<img src='../assets/image/questions/" + currentQuestion.image + "' />";

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    //choice.innerText = currentQuestion["choice" + number];
  });

  sounds.forEach((sound) => {
    const number2 = sound.dataset["number2"];
    sound.innerHTML = "<audio preload='auto' id='answeraudio" + sound.dataset["number2"] + "'" + " ><source src='../assets/audio/questions/" + currentQuestion["sound" + number2] + "' type='audio/mpeg'>O seu navegador não suporta o elemento audio. Tente utilizar outro navegador.</audio>";
    sound.innerHTML += "<a class='btnplayaudio'>PLAY</a>";
    
  });

  qimages.forEach((qimage) => {
    const number3 = qimage.dataset["number3"];
    qimage.innerHTML = "<img src='../assets/image/questions/" + currentQuestion["qimage" + number3] + "'" + "id='qimageid" + qimage.dataset["number3"] + "'" + " class='block_images' />";
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;

    const selectedChoice = e.target;
    const selectAnswer = selectedChoice.dataset["number"];
    const feedback = currentQuestion["feedback" + selectAnswer];
    let correta = selectAnswer == currentQuestion.answer ?? false;

      Swal.fire({
        icon: correta ? 'success' : 'error',
        html: feedback
      });

    const classToApply =
      selectAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerHTML = score;
};