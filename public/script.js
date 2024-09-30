let deckId = '';
const newDeckButton = document.getElementById('newDeck');
const shuffleDeckButton = document.getElementById('shuffleDeck');
const drawCardsButton = document.getElementById('drawCards');
const cardCountInput = document.getElementById('cardCount');
const deckInfo = document.getElementById('deckInfo');
const cardDisplay = document.getElementById('cardDisplay');

// Criar um novo baralho
newDeckButton.addEventListener('click', () => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id;
            shuffleDeckButton.disabled = false;
            drawCardsButton.disabled = false;
            updateDeckInfo(data);
        });
});

// Embaralhar o baralho
shuffleDeckButton.addEventListener('click', () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
        .then(response => response.json())
        .then(data => {
            updateDeckInfo(data);
            cardDisplay.innerHTML = '';
        });
});

// Comprar cartas
drawCardsButton.addEventListener('click', () => {
    const count = cardCountInput.value;
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`)
        .then(response => response.json())
        .then(data => {
            displayCards(data.cards);
            updateDeckInfo(data);
        });
});

// Atualizar informações do baralho
function updateDeckInfo(data) {
    deckInfo.innerHTML = `Deck ID: ${data.deck_id} | Cartas restantes: ${data.remaining}`;
}

// Exibir cartas compradas
function displayCards(cards) {
    cardDisplay.innerHTML = '';
    cards.forEach(card => {
        const img = document.createElement('img');
        img.src = card.image;
        img.classList.add('card');
        cardDisplay.appendChild(img);
    });
}
