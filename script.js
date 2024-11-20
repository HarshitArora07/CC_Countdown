document.addEventListener('DOMContentLoaded', function() {
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');

    let countdownInterval;
    let totalSeconds;
    let isRunning = false;

    // Update the timer display in MM:SS format
    function updateDisplay() {
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
    }

    // Format time to always show two digits
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    // Start the countdown
    function startCountdown() {
        if (isRunning) return; // If already running, do nothing
        isRunning = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;

        totalSeconds = parseInt(minutesInput.value) * 60 + parseInt(secondsInput.value);
        updateDisplay();

        countdownInterval = setInterval(function() {
            if (totalSeconds <= 0) {
                clearInterval(countdownInterval);
                isRunning = false;
                startBtn.disabled = false;
                pauseBtn.disabled = true;
                timerDisplay.textContent = "00:00";
            } else {
                totalSeconds--;
                updateDisplay();
            }
        }, 1000);
    }

    // Pause the countdown
    function pauseCountdown() {
        clearInterval(countdownInterval);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }

    // Reset the countdown
    function resetCountdown() {
        clearInterval(countdownInterval);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        minutesInput.value = "";
        secondsInput.value = "";
        timerDisplay.textContent = "00:00";
    }

    // Add event listeners to buttons
    startBtn.addEventListener('click', startCountdown);
    pauseBtn.addEventListener('click', pauseCountdown);
    resetBtn.addEventListener('click', resetCountdown);
});
