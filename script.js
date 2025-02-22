// Track submitted flags
let submittedFlags = 0;
const totalFlags = 5; // Number of challenges

function toggleChallenge(id) {
    let challengeBox = document.getElementById(id);
    if (challengeBox.style.display === "none" || challengeBox.style.display === "") {
        challengeBox.style.display = "flex";
    }
}

function checkFlag(department) {
    let inputField = document.querySelector(`#${department} .flag-input`);
    let userFlag = inputField.value.trim();
    let resultMessage = document.querySelector(`#${department} .result-message`);
    let departmentBox = document.querySelector(`[onclick="toggleChallenge('${department}')"]`); 

    if (!resultMessage) {
        resultMessage = document.createElement("p");
        resultMessage.classList.add("result-message");
        document.getElementById(department).appendChild(resultMessage);
    }

    if (userFlag.length > 15 && userFlag.includes("picoCTF{") && userFlag.endsWith("}")) {
        if (!inputField.disabled) {
            submittedFlags++; 
        }

        resultMessage.innerHTML = "✅ Flag Submitted!";
        resultMessage.style.color = "#00ff00";
        inputField.disabled = true; 

        // Update department box to green
        departmentBox.classList.add("correct");

        // Update progress
        updateProgress();
    } else {
        resultMessage.innerHTML = "❌ Invalid Flag!";
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
        progressText.innerText = `Progress: ${submittedFlags}/${totalFlags} Flags Submitted`;
    }
}
