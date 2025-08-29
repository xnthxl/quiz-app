document.addEventListener("DOMContentLoaded", () => {

    const startButton = document.getElementById("start-btn");

    if (startButton) {
        let questions = [];
        let currentQuestionIndex = 0;
        let score = 0;

        const questionElement = document.getElementById("question");
        const answerButtons = document.getElementById("answer-buttons");
        const nextButton = document.getElementById("next-btn");
        const scoreElement = document.getElementById("score");

        const difficultySelect = document.getElementById("difficulty");
        const difficultyLabel = document.getElementById("difficulty-label");
        const questionContainer = document.getElementById("question-container");
        const controlsContainer = document.getElementById("controls");
        const startContainer = document.getElementById("start-container");

        async function startQuiz() {
            const difficulty = difficultySelect.value;
            const selectedQuiz = localStorage.getItem("selectedQuiz");

            try {
                const response = await fetch(`../questions/${selectedQuiz}.json`);
                const data = await response.json();

                questions = data[difficulty];
                currentQuestionIndex = 0;
                score = 0;
                scoreElement.textContent = "Score: " + score;

                // Affichage/masquage des éléments
                questionContainer.style.display = "block";
                controlsContainer.style.display = "flex";
                scoreElement.style.display = "block";

                difficultySelect.style.display = "none";
                difficultyLabel.style.display = "none";
                startButton.style.display = "none";
                startContainer.style.display = "none";

                showQuestion();
            } catch (error) {
                console.error("Erreur lors du chargement des questions:", error);
            }
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function showQuestion() {
            resetState();
            let currentQuestion = questions[currentQuestionIndex];
            questionElement.textContent = currentQuestion.question;

            const shuffledAnswers = shuffleArray([...currentQuestion.answers]);

            const container = document.createElement("div");
            container.classList.add("answer-container");

            shuffledAnswers.forEach(answer => {
                const button = document.createElement("button");
                button.textContent = answer.text;
                button.classList.add("btn");
                button.addEventListener("click", () => selectAnswer(button, answer));
                container.appendChild(button);
            });
            answerButtons.appendChild(container);
        }

        function resetState() {
            nextButton.style.display = "none";
            while (answerButtons.firstChild) {
                answerButtons.removeChild(answerButtons.firstChild);
            }
        }

        function selectAnswer(button, answer) {
            if (answer.correct) {
                button.classList.add("correct");
                score++;
                scoreElement.textContent = "Score: " + score;
            } else {
                button.classList.add("wrong");
            }

            const allButton = answerButtons.querySelectorAll(".btn");
            allButton.forEach(btn => {
                btn.disabled = true;
                const ans = questions[currentQuestionIndex].answers.find(a => a.text === btn.textContent);
                if (ans && ans.correct) {
                    btn.classList.add("correct");
                }
            });
            nextButton.style.display = "block";
        }

        nextButton.addEventListener("click", () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showScore();
            }
        });

        function showScore() {
            resetState();
            questionElement.textContent = `Quiz terminé! Votre score est ${score}/${questions.length}.`;

            const returnBtn = document.createElement("button");
            returnBtn.textContent = "Retour à la sélection des quiz";
            returnBtn.classList.add("btn-neon"); 
            returnBtn.addEventListener("click", () => {
                window.location.href = "../html/quiz.html"; 
            });

            controlsContainer.appendChild(returnBtn);
        }

        startButton.addEventListener("click", startQuiz);
    }

});
