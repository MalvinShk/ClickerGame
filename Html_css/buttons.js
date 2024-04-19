// This script manages a simple clicker game.
// It initializes game state, loads progress from cookies,
// handles upgrades, saves progress, and generates income.

// Initialize variables
let number; // Current number of points
let pointsPerClick; // Points gained per click
let goblins; // Number of hired goblins
let clickUpgradeCost; // Cost of upgrading click points
let goblinCost; // Cost of hiring goblins
let upgrades; // List of available upgrades
let goblinlevel; // Current goblin level
let clicklevel; // Current click level

// HTML elements
const numberElement = document.getElementById('number'); // Display for current points
const upgradeContainer = document.createElement('div'); // Container for upgrades
upgradeContainer.classList.add('upgrades'); // Add class for styling

// Function to load progress from cookies
function loadProgress() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('gameState='))
        ?.split('=')[1]; // Find cookie with game state

    if (cookieValue) {
        const gameState = JSON.parse(cookieValue); // Parse game state from cookie

        // Load values from game state
        number = gameState.number;
        pointsPerClick = gameState.pointsPerClick;
        goblins = gameState.goblins;
        clickUpgradeCost = gameState.clickUpgradeCost;
        goblinCost = gameState.goblinCost;
        clicklevel = gameState.clicklevel;
        goblinlevel = gameState.goblinlevel;

        // Initialize upgrades after loading values from cookies
        upgrades = [
            { name: 'Add 1 point per click', cost: clickUpgradeCost, type: 'click', level: clicklevel },
            { name: 'Hire Goblins', cost: goblinCost, type: 'goblin', level: goblinlevel }
        ];
    } else {
        // Set default values if no saved game state found
        number = 0;
        pointsPerClick = 1;
        goblins = 0;
        clickUpgradeCost = 10;
        goblinCost = 1000;
        clicklevel = 0;
        goblinlevel = 0;

        // Initialize upgrades with default values
        upgrades = [
            { name: 'Add 1 point per click', cost: clickUpgradeCost, type: 'click', level: clicklevel },
            { name: 'Hire Goblins', cost: goblinCost, type: 'goblin', level: goblinlevel }
        ];
    }
}

loadProgress(); // Load progress when page loads

// Iterate through upgrades and create HTML elements for each
upgrades.forEach(upgrade => {
    const upgradeElement = document.createElement('div');
    upgradeElement.classList.add('upgrade'); // Add class for styling
    upgradeElement.textContent = `${upgrade.name} - Cost: ${Math.floor(upgrade.cost)} - Level: ${upgrade.level}`;

    // Add event listener to handle upgrade purchase
    upgradeElement.addEventListener('click', function() {
        if (number >= upgrade.cost) { // Check if enough points to purchase
            number -= upgrade.cost; // Deduct points
            // Upgrade logic based on upgrade type
            if (upgrade.type === 'click') {
                pointsPerClick++;
                clickUpgradeCost *= 1.5;
                upgrade.cost = clickUpgradeCost;
                clicklevel++; // Increase click level
            } else if (upgrade.type === 'goblin') {
                goblins++;
                goblinCost *= 1.5;
                upgrade.cost = goblinCost;
                goblinlevel++; // Increase goblin level
            }
            upgrade.level++; // Increase upgrade level
            upgradeElement.textContent = `${upgrade.name} - Cost: ${Math.floor(upgrade.cost)} - Level: ${upgrade.level}`;
            numberElement.textContent = Math.floor(number); // Update points display
        } else {
            alert('Not enough points to purchase this upgrade!'); // Alert if not enough points
        }
    });

    upgradeContainer.appendChild(upgradeElement); // Append upgrade element to container
});

document.body.appendChild(upgradeContainer); // Append upgrade container to body

// Function to save progress to cookies
function saveProgress() {
    const gameState = {
        number: number,
        pointsPerClick: pointsPerClick,
        goblins: goblins,
        clickUpgradeCost: clickUpgradeCost,
        goblinCost: goblinCost,
        clicklevel: clicklevel, // Save click level
        goblinlevel: goblinlevel // Save goblin level
    };

    const gameStateJSON = JSON.stringify(gameState); // Convert game state to JSON

    // Set cookie with game state, valid until the end of time
    document.cookie = `gameState=${gameStateJSON};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/`;
}

setInterval(saveProgress, 1000); // Save progress every second

// Function to generate income from goblins
function generateGoblinIncome() {
    const goblinIncome = goblins * 1; // Income per goblin
    number += goblinIncome; // Add income to total points
    numberElement.textContent = Math.floor(number); // Update points display
}

setInterval(generateGoblinIncome, 100); // Generate income every 100 milliseconds

// Event listener to handle clicking anywhere on the document
document.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default behavior
    if (event.target.tagName !== 'BUTTON') { // Check if clicked element is not a button
        number += pointsPerClick; // Add points per click
        numberElement.textContent = Math.floor(number); // Update points display
    }
}, false);
