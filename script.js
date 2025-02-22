// Correct flags (Replace these with actual flags from picoCTF)
const correctFlags = {
    dep1: "picoCTF{flag1}",
    dep2: "picoCTF{flag2}",
    dep3: "picoCTF{flag3}",
    dep4: "picoCTF{flag4}",
    dep5: "picoCTF{flag5}"
};

// Track submitted flags
let submittedFlags = 0;
const totalFlags = Object.keys(correctFlags).length;

// Function to toggle challenge visibility
function toggleChallenge(id) {
    let challengeBox = document.getElementById(id);
    if (challengeBox.style.display === "none" || challengeBox.style.display === "") {
        challengeBox.style.display = "flex";
    }
}

// Function to check the flag
function checkFlag(department) {
    let inputField = document.querySelector(`#${department} .flag-input`);
    let userFlag = inputField.value.trim();
    let resultMessage = document.querySelector(`#${department} .result-message`);
    let departmentBox = document.querySelector(`[onclick="toggleChallenge('${department}')"]`); // Get department box

    if (!resultMessage) {
        resultMessage = document.createElement("p");
        resultMessage.classList.add("result-message");
        document.getElementById(department).appendChild(resultMessage);
    }

    if (userFlag === correctFlags[department]) {
        if (!inputField.disabled) {
            submittedFlags++;  // Increase progress only if it's a new correct submission
        }

        resultMessage.innerHTML = "✅ Correct Flag!";
        resultMessage.style.color = "#00ff00";
        inputField.disabled = true; // Prevent multiple submissions

        // Update department box to green
        departmentBox.classList.add("correct");

        // Update progress
        updateProgress();
    } else {
        resultMessage.innerHTML = "❌ Incorrect! Try Again.";
        resultMessage.style.color = "#ff0000";
    }
}

// Function to update the progress bar
function updateProgress() {
    let progressBar = document.getElementById("progress-bar");
    let progressText = document.getElementById("progress-text");
    
    let progressPercentage = (submittedFlags / totalFlags) * 100;
    progressBar.style.width = progressPercentage + "%";

    if (submittedFlags === totalFlags) {
        progressText.innerText = "🎉 All Departments Secured!";
    } else {
        progressText.innerText = `Progress: ${submittedFlags}/${totalFlags} Flags Found`;
    }
}
