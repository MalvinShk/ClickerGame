// This script tracks clicks per second (CPS) and updates the display accordingly.
// It also changes the background image based on the CPS level.

// Array to store timestamps of clicks
let clickspersec = [];
// Start time for CPS calculation
let startTime = Date.now();

// Function to add current timestamp to clicks array
function incrementClicks() {
    clickspersec.push(Date.now());
}

// Function to update CPS display and background image
function updateCPS() {
    const currentTime = Date.now();
    // Filter clicks within the last 5 seconds
    const clicksWithin5Sec = clickspersec.filter(clickTime => currentTime - clickTime <= 5000);
    // CPS calculation based on clicks in the last 5 seconds
    const cps = clicksWithin5Sec.length / 5;
    // Display CPS with 2 decimal places
    document.getElementById('cpsDisplay').textContent = `CPS: ${cps.toFixed(2)}`;

    // Check CPS level and change background image accordingly
    if (cps > 5 && cps <= 10) {
        document.body.style.backgroundImage = `url('5+cps.gif')`; // Set background image
        document.body.style.backgroundSize = "cover"; // Set background size

    } else if (cps > 10 && cps <= 25) {
        document.body.style.backgroundImage = `url('10+cps.gif')`; // Set background image
        document.body.style.backgroundSize = "cover"; // Set background size

    } else if (cps > 25) {
        document.body.style.backgroundImage = `url('25+cps.jpg')`; // Set background image
        document.body.style.backgroundSize = "cover"; // Set background size
        
    } else {
        // Reset background image to default if CPS is below 5
        document.body.style.backgroundImage = "";
    }
}

// Event listener to increment clicks array on click
document.addEventListener('click', incrementClicks);
// Update CPS every millisecond
setInterval(updateCPS, 1);
