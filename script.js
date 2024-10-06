// Voting functionality
const voteForm = document.getElementById('voteForm');
const nameInput = document.getElementById('nameInput');
const resultDiv = document.getElementById('result');
const voteCountList = document.getElementById('voteCount');

const sports = ['basketball', 'olympicHandball', 'soccer', 'hockey'];
let votes = {};

// Function to reset votes
function resetVotes() {
    votes = {};
    localStorage.setItem('votes', JSON.stringify(votes));
}

// Function to check if it's Wednesday and reset votes
function checkReset() {
    const now = new Date();
    if (now.getDay() === 3) { // 3 means Wednesday
        resetVotes();
    }
}

// Load votes from local storage
function loadVotes() {
    const storedVotes = JSON.parse(localStorage.getItem('votes'));
    if (storedVotes) {
        votes = storedVotes;
    }
}

// Display current votes after user votes
function displayVotes() {
    voteCountList.innerHTML = '';
    for (const sport of sports) {
        const li = document.createElement('li');
        li.textContent = \`\${sport.charAt(0).toUpperCase() + sport.slice(1)}: \${votes[sport] ? votes[sport].count : 0} (Voters: \${votes[sport] ? votes[sport].names.join(", ") : "None"})\`;
        voteCountList.appendChild(li);
    }
    resultDiv.classList.remove('hidden');
}

// Vote submission handler
voteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedSport = voteForm.sport.value;
    const userName = nameInput.value.trim();

    if (userName === "") {
        alert("Please enter your name.");
        return;
    }

    if (!votes[selectedSport]) {
        votes[selectedSport] = { count: 0, names: [] };
    }

    // Check if the user has already voted
    const userHasVoted = Object.values(votes).some(vote => vote.names.includes(userName));
    
    if (userHasVoted) {
        alert("You have already voted.");
    } else {
        votes[selectedSport].count++;
        votes[selectedSport].names.push(userName);
        localStorage.setItem('votes', JSON.stringify(votes));
        displayVotes();
        voteForm.reset();
        nameInput.value = ""; // Clear the name input
    }
});

// Initialize the voting app
function init() {
    checkReset();
    loadVotes();
}

// Run the initialization
init();
