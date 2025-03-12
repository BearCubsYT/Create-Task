// Score Variables
let playerScores = [];
let bestScoreText = document.getElementById('besttime');
let bestScore = Infinity;
let worstScoreText = document.getElementById('worsttime');
let worstScore = 0;
let averageScoreText = document.getElementById('avgtime');
let averageScore = 0;

// Clicker Variables
let clicker = document.getElementById('clicker');
let clickerState = 'WaitToStart';
let clicked = false;
let ready = false;
let able = false;

// Timing Variables
let startTime;
let endTime;
let currentTime;
let waitTime;

// Checks when clicker was clicked
clicker.addEventListener('click', async function() {
    if (clickerState === 'WaitToStart') {
        able = true;
        clickerState = "Not Ready";
        clicker.textContent = 'Press On Green';
        waiter();
    }
    // If it's not ready to be clicked, it will display 'Too Soon'
    else if (clickerState === 'Not Ready') {
        clicker.textContent = 'Too Soon!';
        able = false;
        await new Promise(resolve => setTimeout(resolve, 1000));
        resetGame();
    }
    // If it's ready to be clicked, get end time, and display final time
    else if (clickerState === "Ready") {
        clicked = true;
        endTime = new Date().getTime();
        currentTime = endTime - startTime;
        clicker.textContent = `${currentTime} ms`;
        playerScores.push(currentTime);
        clickerState = "Done";
    }
    else if (clickerState === "Done") {
        resetGame();
    }
});

waiter();

// Function to start waiting period
async function waiter() {
    if (able) {
        waitTime = Math.floor(Math.random() * (5000 - 2000) + 2000);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        
        // If able is still true, turn green
        if (able) {
            ready = true;
            clickerState = "Ready";
            clicker.style.backgroundColor = "rgba(0, 255, 0, 0.25)";
            startTime = new Date().getTime();
        }
    }
}

// Reset function to restart the game
function resetGame() {
    // Only Updates stats if a round is completed
    if (clickerState === "Done") {
        updateStats();
    }
    ready = false;
    clicked = false;
    able = false;
    clickerState = 'WaitToStart';
    clicker.textContent = "Click to Start";
    clicker.style.backgroundColor = ""; 
}

function updateStats() {
    let tempNum = 0;
    // Loops through each element of player scores array and adds them all
    playerScores.forEach(score => {
        tempNum += score;
    });
    // Calculates average score
    averageScore = Math.round(tempNum / playerScores.length)

    // If current time is faster than fastest, update fastest
    if (currentTime < bestScore) {
        bestScore = currentTime;
    };
    // If current time is slower than slowest, update slowest
    if (currentTime > worstScore){
        worstScore = currentTime;
    };

    // Updates text content for stat headings
    averageScoreText.textContent = `Average Time: ${averageScore}`;
    bestScoreText.textContent = `Best Time: ${bestScore}`;
    worstScoreText.textContent = `Worst Time: ${worstScore}`;
}