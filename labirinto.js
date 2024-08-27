const labirinto = [
    [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0], 
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

let start = { x: 0, y: 0 };
let end = { x: 14, y: 14 };

let playerPosition = { x: start.x, y: start.y };

function drawLabirinto() {
    const labirintoDiv = document.getElementById('labirinto');
    labirintoDiv.innerHTML = '';

    const fragment = document.createDocumentFragment();

    for (let y = 0; y < labirinto.length; y++) {
        for (let x = 0; x < labirinto[y].length; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell default';

            if (x === start.x && y === start.y) {
                cell.classList.add('start');
                cell.textContent = 'C';
            } else if (x === end.x && y === end.y) {
                cell.classList.add('end');
                cell.textContent = 'F';
            } else {
                cell.textContent = labirinto[y][x];
            }

            fragment.appendChild(cell);
        }
    }

    labirintoDiv.appendChild(fragment);
}

function updateCell(x, y, isPlayer = false) {
    const labirintoDiv = document.getElementById('labirinto');
    const index = y * labirinto[0].length + x;
    const cell = labirintoDiv.children[index];

    if (!cell) return;

    cell.className = 'cell default';
    cell.textContent = labirinto[y][x];

    if (isPlayer) {
        cell.classList.add('player');
    } else if (x === start.x && y === start.y) {
        cell.classList.add('start');
        cell.textContent = 'C';
    } else if (x === end.x && y === end.y) {
        cell.classList.add('end');
        cell.textContent = 'F';
    }
}

function movePlayer(dx, dy) {
    const newX = playerPosition.x + dx;
    const newY = playerPosition.y + dy;

    if (newX >= 0 && newX < labirinto[0].length && newY >= 0 && newY < labirinto.length && labirinto[newY][newX] === 1) {
        // Update the previous position to remove player class
        updateCell(playerPosition.x, playerPosition.y);

        // Update the new position to add player class
        playerPosition.x = newX;
        playerPosition.y = newY;
        updateCell(playerPosition.x, playerPosition.y, true);

        if (playerPosition.x === end.x && playerPosition.y === end.y) {
            alert('Parabéns! Você chegou ao fim do labirinto!');
        }
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            movePlayer(0, -1);
            break;
        case 'ArrowDown':
            movePlayer(0, 1);
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0);
            break;
        case 'ArrowRight':
            movePlayer(1, 0);
            break;
    }
});

drawLabirinto();
