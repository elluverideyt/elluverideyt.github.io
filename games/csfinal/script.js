const canvas = document.getElementById('radar');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const aircrafts = [
    { id: 1, x: 100, y: 100, speed: 2, heading: 45 },
    { id: 2, x: 200, y: 200, speed: 3, heading: 90 }
];

function drawRadar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(300, 300, 300, 0, 2 * Math.PI);
    ctx.stroke();
}

function updateAircrafts() {
    aircrafts.forEach(aircraft => {
        aircraft.x += aircraft.speed * Math.cos(aircraft.heading * Math.PI / 180);
        aircraft.y += aircraft.speed * Math.sin(aircraft.heading * Math.PI / 180);
    });
}

function drawAircrafts() {
    aircrafts.forEach(aircraft => {
        ctx.beginPath();
        ctx.arc(aircraft.x, aircraft.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    });
}

function gameLoop() {
    drawRadar();
    updateAircrafts();
    drawAircrafts();
    requestAnimationFrame(gameLoop);
}

gameLoop();