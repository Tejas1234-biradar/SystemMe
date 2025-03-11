let timerInterval;
let seconds = 0;



// Function to start the exercise timer
function startTimer() {
    clearInterval(timerInterval); // Clear any existing interval
    seconds = 0;
    updateClockDisplay();
    
    timerInterval = setInterval(() => {
        seconds++;
        updateClockDisplay();
    }, 1000);
}

// Function to stop the exercise timer and log activity
function stopTimer() {
    clearInterval(timerInterval);

    // Fetch input values from form
    let date = $("#date").val();
    let exercise = $("#exercise").val();
    let mood = $("#mood").val();

    // Validate input fields
    if (!date || !exercise) {
        alert("Please fill in all required fields before stopping the timer.");
        return;
    }

    let duration = formatTime(seconds);

    // Append new row to the activity log with a delete button
    $("#activityTable tbody").append(`
        <tr>
            <td>${date}</td>
            <td>${exercise}</td>
            <td>${duration}</td>
            <td>${mood}</td>
            <td><button class="delete-btn">Delete</button></td>
        </tr>
    `);

    // Reset the form fields after logging
    $("#fitnessForm")[0].reset();
    $("#clock").text("00:00:00");
    seconds = 0;
}

// Function to update the clock display
function updateClockDisplay() {
    $("#clock").text(formatTime(seconds));
}

// Function to format seconds into HH:MM:SS
function formatTime(totalSeconds) {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let secs = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Event listener to delete individual activities
$(document).on("click", ".delete-btn", function () {
    $(this).closest("tr").remove();
});

// Clear all activities in the log
$("#clearActivities").click(function () {
    $("#activityTable tbody").empty();
});


document.getElementById("toggle").addEventListener('click',()=>{
    const dark = document.getElementById("toggle");
    document.body.classList.toggle("dark");
  })