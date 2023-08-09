let currentPlayerIndex = -1;

document.addEventListener('DOMContentLoaded', function() {
    const addPlayersBtn = document.getElementById('addPlayersBtn');
    addPlayersBtn.addEventListener('click', addPlayerInputs);

    const generateBtn = document.getElementById('generateBtn');
    generateBtn.addEventListener('click', generateTeams);

    const playersInput = document.getElementById('players');
    playersInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            addPlayerInputs();
        }
    });

    const playersContainer = document.getElementById('playerInputs');
    playersContainer.addEventListener('keydown', handlePlayerNavigation);
});

function addPlayerInputs() {
    const playersCount = parseInt(document.getElementById('players').value, 10);
    const playerInputsDiv = document.getElementById('playerInputs');
    playerInputsDiv.innerHTML = '';

    for (let i = 0; i < playersCount; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Gracz ${i + 1}`;
        input.id = `player${i + 1}`;
        input.classList.add('player-input');
        playerInputsDiv.appendChild(input);
    }

    currentPlayerIndex = -1;
}

function randomTeamGenerator(players, teamCount) {
    while (true) {
        players.sort(() => Math.random() - 0.5);
        const teamSize = Math.floor(players.length / teamCount);
        const teams = [];

        for (let i = 0; i < players.length; i += teamSize) {
            teams.push(players.slice(i, i + teamSize));
        }

        const hasVifonAndKarton = teams.some(team => team.includes('vifon') && team.includes('karton'));

        if (!hasVifonAndKarton) {
            return teams;
        }
    }
}

function generateTeams() {
    const playersCount = parseInt(document.getElementById('players').value, 10);
    const playersList = Array.from({ length: playersCount }, (_, i) => document.getElementById(`player${i + 1}`).value);

    const teamCount = 2;
    const teams = randomTeamGenerator(playersList, teamCount);

    const resultElement = document.getElementById('result');
    resultElement.innerHTML = teams.map((team, i) => `Drużyna ${i + 1}: ${team.join(', ')}`).join('<br>');
}

function handlePlayerNavigation(event) {
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        navigateToPlayer(currentPlayerIndex - 1);
    } else if (event.key === 'ArrowDown' || event.key === 'Enter') {
        event.preventDefault();
        navigateToPlayer(currentPlayerIndex + 1);
    }
}

function navigateToPlayer(index) {
    const playerInputs = document.getElementsByClassName('player-input');
    if (index >= 0 && index < playerInputs.length) {
        playerInputs[index].focus();
        currentPlayerIndex = index;
    }
}
