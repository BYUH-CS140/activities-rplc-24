document.addEventListener('DOMContentLoaded', () => {
    // --- AI-Generated Game Content ---
    // This data structure simulates AI-generated content for the game.
    // It contains a list of dishes, their correct ingredients, and some decoys.
    const gameData = [
        {
            dish: 'Adobo',
            correctIngredient: 'Soy Sauce',
            decoys: ['Ketchup', 'Coconut Milk', 'Mustard']
        },
        {
            dish: 'Sinigang',
            correctIngredient: 'Tamarind',
            decoys: ['Lemon', 'Vinegar', 'Orange Juice']
        },
        {
            dish: 'Lumpia',
            correctIngredient: 'Ground Pork',
            decoys: ['Tuna Flakes', 'Hotdog', 'Cheese']
        },
        {
            dish: 'Lechon',
            correctIngredient: 'Lemongrass',
            decoys: ['Basil', 'Mint', 'Rosemary']
        },
        {
            dish: 'Pancit',
            correctIngredient: 'Rice Noodles',
            decoys: ['Spaghetti', 'Bread', 'Potatoes']
        }
    ];

    // --- Game Elements ---
    const dishNameEl = document.getElementById('dish-name');
    const optionsContainer = document.getElementById('ingredient-options');
    const feedbackMessageEl = document.getElementById('feedback-message');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    
    let currentQuestionIndex = 0;
    let score = 0;

    // --- Functions ---

    /**
     * Shuffles an array randomly.
     * @param {Array} array - The array to shuffle.
     * @returns {Array} The shuffled array.
     */
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    /**
     * Loads the current question and displays it.
     */
    function loadQuestion() {
        if (currentQuestionIndex >= gameData.length) {
            // End of the game
            showFinalScore();
            return;
        }

        // Reset for the new question
        feedbackMessageEl.textContent = '';
        nextQuestionBtn.style.display = 'none';
        optionsContainer.innerHTML = '';

        const currentQuestion = gameData[currentQuestionIndex];
        dishNameEl.textContent = `Which ingredient is in ${currentQuestion.dish}?`;

        const options = [currentQuestion.correctIngredient, ...currentQuestion.decoys];
        const shuffledOptions = shuffleArray(options);

        shuffledOptions.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('ingredient-btn');
            button.addEventListener('click', () => handleAnswer(option, currentQuestion.correctIngredient, button));
            optionsContainer.appendChild(button);
        });
    }

    /**
     * Handles the user's answer selection.
     * @param {string} selectedOption - The option the user clicked.
     * @param {string} correctOption - The correct answer.
     * @param {HTMLElement} buttonEl - The button element that was clicked.
     */
    function handleAnswer(selectedOption, correctOption, buttonEl) {
        // Disable all buttons after an answer is chosen
        document.querySelectorAll('.ingredient-btn').forEach(btn => btn.disabled = true);

        if (selectedOption === correctOption) {
            feedbackMessageEl.textContent = 'Correct! Great job!';
            feedbackMessageEl.style.color = '#28a745';
            buttonEl.classList.add('correct');
            score++;
        } else {
            feedbackMessageEl.textContent = `Not quite! The right answer is ${correctOption}.`;
            feedbackMessageEl.style.color = '#dc3545';
            buttonEl.classList.add('incorrect');
        }

        nextQuestionBtn.style.display = 'block';
    }
    
    /**
     * Displays the final score at the end of the game.
     */
    function showFinalScore() {
        dishNameEl.textContent = 'Game Over!';
        optionsContainer.innerHTML = `<p>You scored ${score} out of ${gameData.length}!</p>`;
        feedbackMessageEl.textContent = 'Play again soon!';
        nextQuestionBtn.textContent = 'Play Again';
        nextQuestionBtn.style.display = 'block';
        currentQuestionIndex = -1; // So next click resets
        score = 0;
    }

    // --- Event Listeners ---
    nextQuestionBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
    });

    // --- Start Game ---
    loadQuestion();
});
