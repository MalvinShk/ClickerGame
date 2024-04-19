document.addEventListener('DOMContentLoaded', function() {
    let number;
    let pointsPerClick;
    let goblins;
    let clickUpgradeCost;
    let goblinCost;
    let upgrades;
    let goblinlevel;
    let clicklevel;

    const numberElement = document.getElementById('number');
    const upgradeContainer = document.createElement('div');
    upgradeContainer.classList.add('upgrades');

    function loadProgress() {
        const cookieValue = document.cookie
            .split('; ')
            .find(row => row.startsWith('gameState='))
            ?.split('=')[1];

        if (cookieValue) {
            const gameState = JSON.parse(cookieValue);

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

    loadProgress();

    upgrades.forEach(upgrade => {
        const upgradeElement = document.createElement('div');
        upgradeElement.classList.add('upgrade');
        upgradeElement.textContent = `${upgrade.name} - Cost: ${Math.floor(upgrade.cost)} - Level: ${upgrade.level}`;

        upgradeElement.addEventListener('click', function() {
            if (number >= upgrade.cost) {
                number -= upgrade.cost;

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
                numberElement.textContent = Math.floor(number);
            } else {
                alert('Not enough points to purchase this upgrade!');
            }
        });

        upgradeContainer.appendChild(upgradeElement);
    });

    document.body.appendChild(upgradeContainer);

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

        const gameStateJSON = JSON.stringify(gameState);

        document.cookie = `gameState=${gameStateJSON};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/`;
    }

    setInterval(saveProgress, 1000);

    function generateGoblinIncome() {
        const goblinIncome = goblins * 1;
        number += goblinIncome;
        numberElement.textContent = Math.floor(number);
    }

    setInterval(generateGoblinIncome, 100);

    document.addEventListener('click', function(event) {
        event.preventDefault();
        if (event.target.tagName !== 'BUTTON') {
            number += pointsPerClick;
            numberElement.textContent = Math.floor(number);
        }
    }, false);
});
