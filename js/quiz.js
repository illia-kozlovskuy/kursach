document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  if (!quizContainer) return;

  const questions = [
    {
      question:
        "Скільки гравців однієї команди може знаходитися на майданчику?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 1,
    },
    {
      question:
        "Скільки разів команда може вдарити по м'ячу до переведення його на інший бік?",
      options: ["1", "2", "3", "4"],
      correctAnswer: 2,
    },
    {
      question: "Чи може один гравець вдарити по м'ячу двічі поспіль?",
      options: ["Так", "Ні", "Тільки при блокуванні", "Тільки капітан"],
      correctAnswer: 1,
    },
    {
      question: "Що відбувається, якщо м'яч торкається лінії майданчика?",
      options: ["Аут", "Перегравання", "Зараховується очко (в полі)", "Фол"],
      correctAnswer: 2,
    },
    {
      question: "Звідки виконується подача?",
      options: [
        "З центру майданчика",
        "З-під сітки",
        "З-за задньої лінії",
        "З будь-якого місця",
      ],
      correctAnswer: 2,
    },
  ];

  let currentQuestion = 0;
  let score = 0;

  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const nextButton = document.getElementById("next-btn");
  const resultElement = document.getElementById("result");
  const progressElement = document.getElementById("progress");

  function loadQuestion() {
    const q = questions[currentQuestion];
    questionElement.textContent = `${currentQuestion + 1}. ${q.question}`;
    optionsElement.innerHTML = "";

    q.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("option-btn");
      button.addEventListener("click", () => selectOption(index, button));
      optionsElement.appendChild(button);
    });

    progressElement.textContent = `Питання ${currentQuestion + 1} з ${questions.length}`;
    nextButton.style.display = "none";
  }

  function selectOption(selectedIndex, button) {
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach((btn) => {
      btn.disabled = true;
    });

    const correct = questions[currentQuestion].correctAnswer;

    if (selectedIndex === correct) {
      button.classList.add("correct");
      score++;
    } else {
      button.classList.add("wrong");
      buttons[correct].classList.add("correct");
    }

    if (currentQuestion < questions.length - 1) {
      nextButton.textContent = "Наступне питання";
    } else {
      nextButton.textContent = "Показати результат";
    }
    nextButton.style.display = "block";
  }

  nextButton.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      showResult();
    }
  });

  function showResult() {
    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    nextButton.style.display = "none";
    progressElement.style.display = "none";

    let message = "";
    if (score === questions.length) {
      message = "Ідеально! Ви справжній профі! ";
    } else if (score >= questions.length / 2) {
      message = "Непогано! Але є куди рости. ";
    } else {
      message = "Варто ще раз перечитати правила. ";
    }

    resultElement.innerHTML = `
            <h2>Ваш результат: ${score} з ${questions.length}</h2>
            <p>${message}</p>
            <button id="restart-btn" class="restart-btn">Спробувати ще раз</button>
        `;
    resultElement.style.display = "block";

    const bestScore = localStorage.getItem("spikepoint_best_score") || 0;
    if (score > bestScore) {
      localStorage.setItem("spikepoint_best_score", score);
    }

    document.getElementById("restart-btn").addEventListener("click", () => {
      currentQuestion = 0;
      score = 0;
      questionElement.style.display = "block";
      optionsElement.style.display = "flex";
      progressElement.style.display = "block";
      resultElement.style.display = "none";
      loadQuestion();
    });
  }

  loadQuestion();
});
