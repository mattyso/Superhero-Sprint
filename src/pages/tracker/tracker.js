let saves = localStorage.getItem('saves') ? parseInt(localStorage.getItem('saves')) : 0;
let savesPerInterval = 1;
let intervalTime = localStorage.getItem('intervalTime') ? parseInt(localStorage.getItem('intervalTime')) : 10000; // 10 seconds in milliseconds
let trainCost = 10; // Fixed cost for training
let sidekickCost = 100;
let increaseSavesCost = 20; // Permanent cost for increasing saves per interval
let sidekickActive = localStorage.getItem('sidekickActive') === 'true'; // Check if sidekick is already purchased
let sidekickInterval;
let interval;

// Get steps from localStorage and display it
let steps = localStorage.getItem('steps') ? parseInt(localStorage.getItem('steps')) : 0;
document.getElementById('stepCount').innerText = steps;

// Display initial values
document.getElementById('saveCount').innerText = saves;
document.getElementById('saveInterval').innerText = intervalTime / 1000;
document.getElementById('trainButton').innerText = `Train (Cost: ${trainCost} Steps)`;

// Array of superpowers
const superpowers = [
    "Super Strength",
    "Invisibility",
    "Flight",
    "Telekinesis",
    "Speed Force",
    "Fire Manipulation",
    "Ice Manipulation",
    "Time Travel",
    "Teleportation",
    "Mind Reading"
];

// Function to update the save count
function updateSaves() {
    saves += savesPerInterval;
    document.getElementById('saveCount').innerText = saves;
    localStorage.setItem('saves', saves); // Save saves to localStorage
}

// Function to start the Sidekick saves
function startSidekick() {
    clearInterval(sidekickInterval);
    sidekickInterval = setInterval(() => {
        saves += 1;
        document.getElementById('saveCount').innerText = saves;
        localStorage.setItem('saves', saves);
    }, 1000); // Adds 1 save every second
}

// Set interval to update saves every 10 seconds (or adjusted time)
function startSaving() {
    clearInterval(interval); // Clear any existing intervals
    interval = setInterval(updateSaves, intervalTime); // Create a new interval with the updated time
}

// Start the initial save interval
startSaving();

// Check if sidekick was previously purchased and activate it
if (sidekickActive) {
    startSidekick();
}

// Handle the "Train" button click
document.getElementById('trainButton').addEventListener('click', () => {
    steps = localStorage.getItem('steps') ? parseInt(localStorage.getItem('steps')) : 0; // Update steps from localStorage
    if (steps >= trainCost) {
        steps -= trainCost; // Deduct the cost in steps
        localStorage.setItem('steps', steps); // Update steps in localStorage
        document.getElementById('stepCount').innerText = steps; // Update the displayed steps

        // Reduce the interval time by 1 second (1000 milliseconds)
        intervalTime = Math.max(1000, intervalTime - 1000); // Ensure interval doesn't go below 1 second
        localStorage.setItem('intervalTime', intervalTime); // Save interval time to localStorage
        document.getElementById('saveInterval').innerText = intervalTime / 1000; // Update interval display

        // Restart saving with the new interval
        startSaving();
    }
});

// Handle the "Sidekick" button click
document.getElementById('sidekickButton').addEventListener('click', () => {
    steps = localStorage.getItem('steps') ? parseInt(localStorage.getItem('steps')) : 0; // Update steps from localStorage
    if (steps >= sidekickCost && !sidekickActive) {
        steps -= sidekickCost; // Deduct the cost in steps
        localStorage.setItem('steps', steps); // Update steps in localStorage
        document.getElementById('stepCount').innerText = steps; // Update the displayed steps

        sidekickActive = true;
        localStorage.setItem('sidekickActive', 'true'); // Save sidekick activation to localStorage

        // Start the sidekick save counter
        startSidekick();

        // Optionally, disable the sidekick button once purchased
        document.getElementById('sidekickButton').disabled = true;
        document.getElementById('sidekickButton').innerText = "Sidekick Acquired";
    }
});

// Handle the "Increase Saves per Interval" button click
document.getElementById('increaseSavesButton').addEventListener('click', () => {
    steps = localStorage.getItem('steps') ? parseInt(localStorage.getItem('steps')) : 0; // Update steps from localStorage
    if (steps >= increaseSavesCost) {
        steps -= increaseSavesCost; // Deduct the cost in steps
        localStorage.setItem('steps', steps); // Update steps in localStorage
        document.getElementById('stepCount').innerText = steps; // Update the displayed steps

        savesPerInterval += 1; // Increase the saves per interval by 1
        localStorage.setItem('savesPerInterval', savesPerInterval); // Optionally, save the value to localStorage
    }
});

// Handle the "Unlock Superpower" button click
document.getElementById('unlockSuperpowerButton').addEventListener('click', () => {
    saves = localStorage.getItem('saves') ? parseInt(localStorage.getItem('saves')) : 0; // Update saves from localStorage
    if (saves >= 100) { // Cost for unlocking superpower
        saves -= 100; // Deduct the cost in saves
        localStorage.setItem('saves', saves); // Update saves in localStorage
        document.getElementById('saveCount').innerText = saves; // Update the displayed saves
        
        // Get a random superpower from the array
        const randomIndex = Math.floor(Math.random() * superpowers.length);
        const unlockedSuperpower = superpowers[randomIndex];

        // Display the unlocked superpower
        document.getElementById('superpowerInfo').innerText = `Unlocked Superpower: ${unlockedSuperpower}`;
    } else {
        alert("Not enough saves to unlock a superpower!");
    }
});

document.getElementById('setNameButton').addEventListener('click', () => {
    const heroName = document.getElementById('nameInput').value;
    if (heroName.trim()) {
        document.getElementById('heroName').innerText = heroName; // Update the displayed hero name
    } else {
        alert("Please enter a valid hero name."); // Alert if the name is empty
    }
});