//Função usada para embaralhar
async function embaralharCartas(deck_id) {
    const response = await fetch(`https://www.deckofcardsapi.com/api/deck/${deck_id}/shuffle/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    (data.deck_id);

    cartasUsadas = new Set([...cartasUsadas, ...cartasSelecionadas]);
}


//NOVO BARALHO 
async function deck_id() {
    async function embaralharBaralho() {
        const response = await fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?cards=${cartasSelecionadas.join(',')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json()
        return data.deck_id;
    }
    try {
        global_deck_id = await embaralharBaralho();
        await embaralharCartas(global_deck_id);
    } catch (error) {
        console.error('Erro:', error);
    }
}