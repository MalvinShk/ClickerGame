let clickspersec = [];
let startTime = Date.now();

function incrementClicks() {
    clickspersec.push(Date.now());
}

function updateCPS() {
    const currentTime = Date.now();
    const clicksWithin5Sec = clickspersec.filter(clickTime => currentTime - clickTime <= 5000); // Filter clicks within the last 5 seconds
    const cps = clicksWithin5Sec.length / 5; // CPS calculation based on clicks in the last 5 seconds
    document.getElementById('cpsDisplay').textContent = `CPS: ${cps.toFixed(2)}`; // Display CPS with 2 decimal places

    // Check if CPS is higher than 5
    if (cps > 5 && cps <= 10) {
        // Construct background image URL
        const backgroundImageURL = `url('5+cps.gif')`;
        // Set background image of the body
        document.body.style.backgroundImage = backgroundImageURL;
        document.body.style.backgroundSize = "cover";

    } else if (cps > 10 && cps <= 25) {
        // Construct background image URL
        const backgroundImageURL = `url('10+cps.gif')`;
        // Set background image of the body
        document.body.style.backgroundImage = backgroundImageURL;
        document.body.style.backgroundSize = "cover";

    } else if (cps > 25) {
        // Construct background image URL
        const backgroundImageURL = `url('25+cps.jpg')`;
        // Set background image of the body
        document.body.style.backgroundImage = backgroundImageURL;
        document.body.style.backgroundSize = "cover";
        
    } else {
        // Reset background image to default
        document.body.style.backgroundImage = "";
    }
    
}


document.addEventListener('click', incrementClicks);
setInterval(updateCPS, 1); // Update CPS every millisecond