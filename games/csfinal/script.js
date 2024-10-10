const canvas = document.getElementById('radar');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const aircrafts = [
    { id: 1, x: 100, y: 100, speed: 2, heading: 45 },
    { id: 2, x: 200, y: 200, speed: 3, heading: 90 }
];

const airport = { x: 300, y: 300, radius: 50 }; // Define the airport area
let score = 0;

/**
 * Draws the radar on the canvas.
 */
function drawRadar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(300, 300, 300, 0, 2 * Math.PI);
    ctx.stroke();
    drawAirport();
    drawScore();
}

/**
 * Draws the airport on the canvas.
 */
function drawAirport() {
    ctx.beginPath();
    ctx.arc(airport.x, airport.y, airport.radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'green';
    ctx.fill();
}

/**
 * Draws the score on the canvas.
 */
function drawScore() {
    ctx.font = '24px serif';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

/**
 * Calculates the distance between two points.
 * @param {number} x1 - The x-coordinate of the first point.
 * @param {number} y1 - The y-coordinate of the first point.
 * @param {number} x2 - The x-coordinate of the second point.
 * @param {number} y2 - The y-coordinate of the second point.
 * @returns {number} The distance between the two points.
 */
function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

/**
 * Checks for collisions between aircrafts.
 */
function checkCollisions() {
    for (let i = 0; i < aircrafts.length; i++) {
        for (let j = i + 1; j < aircrafts.length; j++) {
            const dist = distance(aircrafts[i].x, aircrafts[i].y, aircrafts[j].x, aircrafts[j].y);
            if (dist < 10) { // Assuming each aircraft has a radius of 5
                console.log(`Collision detected between aircraft ${aircrafts[i].id} and ${aircrafts[j].id}`);
                displayGameOver();
                setTimeout(resetGame, 2000); // Wait 2 seconds before resetting the game
                return;
            }
        }
    }
}

/**
 * Checks if any aircraft has landed at the airport.
 */
function checkLandings() {
    for (let i = aircrafts.length - 1; i >= 0; i--) {
        const aircraft = aircrafts[i];
        const dist = distance(aircraft.x, aircraft.y, airport.x, airport.y);
        if (dist < airport.radius) {
            console.log(`Aircraft ${aircraft.id} landed`);
            score++;
            aircrafts.splice(i, 1); // Remove the landed aircraft
        }
    }
}

/**
 * Displays the game over screen.
 */
function displayGameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '48px serif';
    ctx.fillStyle = 'red';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
    ctx.font = '24px serif';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 50);
}

/**
 * Resets the game state.
 */
function resetGame() {
    aircrafts.length = 0; // Clear the aircraft array
    score = 0; // Reset the score
    spawnAircraft(); // Start spawning aircraft again
}

/**
 * Updates the positions of the aircrafts.
 */
function updateAircrafts() {
    aircrafts.forEach(aircraft => {
        aircraft.x += aircraft.speed * Math.cos(aircraft.heading * Math.PI / 180);
        aircraft.y += aircraft.speed * Math.sin(aircraft.heading * Math.PI / 180);
    });
    checkCollisions();
    checkLandings();
}

/**
 * Draws the aircrafts on the canvas.
 */
function drawAircrafts() {
    aircrafts.forEach(aircraft => {
        ctx.beginPath();
        ctx.arc(aircraft.x, aircraft.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    });
}

/**
 * Spawns a new aircraft at a random position.
 */
function spawnAircraft() {
    const id = aircrafts.length + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speed = Math.random() * 5 + 1; // Speed between 1 and 6
    const heading = Math.random() * 360; // Heading between 0 and 360 degrees
    aircrafts.push({ id, x, y, speed, heading });
    // Schedule the next aircraft spawn
    const delay = Math.random() * (60000 - 15000) + 15000; // Random delay between 15-60 seconds
    setTimeout(spawnAircraft, delay);
}

// Start the first aircraft spawn
spawnAircraft();

/**
 * Main loop to update and draw the radar and aircrafts.
 */
const frameRate = 0.5; // Define the frame rate (30 frames per second)
function mainLoop() {
    drawRadar();
    updateAircrafts();
    drawAircrafts();
    setTimeout(mainLoop, 1000 / frameRate); // Control the frame rate
}

// Start the main loop
mainLoop();