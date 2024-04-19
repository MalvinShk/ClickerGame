// Function to save game progress to local cookies
function saveProgress() {
    // Create an object to store game state
    const gameState = {
        number: number,
        pointsPerClick: pointsPerClick,
        goblins: goblins,
        // Add more properties as needed
    };

    // Convert the gameState object to a JSON string
    const gameStateJSON = JSON.stringify(gameState);
    console.log(gameStateJSON);
    // Save the gameStateJSON string to a local cookie named "gameState"
    document.cookie = `gameState=${gameStateJSON};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/`;
}
     
// Function to load game progress from local cookies
function loadProgress() {
    // Get the value of the "gameState" cookie
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('gameState='))
        ?.split('=')[1];
console.log("cookieValue: " + cookieValue);
    if (cookieValue) {
        // Parse the JSON string to get the gameState object
        const gameState = JSON.parse(cookieValue);

        // Restore game state from the loaded data
        number = gameState.number;
        pointsPerClick = gameState.pointsPerClick;
        goblins = gameState.goblins;
        // Restore more properties as needed
    }
}

// Function to clear game progress from local cookies
function clearProgress() {
    // Set the expiration date of the "gameState" cookie to the past
    document.cookie = `gameState=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;

    // Reload the page to apply the changes
    window.location.reload();
}
saveProgress();
// Call the loadProgress function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', loadProgress);

// Call the saveProgress function periodically (every 5 seconds)
setInterval(saveProgress, 5000);
console.log("Halllololololo");