// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { Card, Rank, Suit } from '../../src/showdownGame/card';


// --------------------------------------------------------------------------------------------------------------------
function createCards(): Card[] {
    const cards = [];
    for (let rank = Rank.TWO; rank <= Rank.ACE; rank++) {
        for (let suit = Suit.CLUBS; suit <= Suit.SPADES; suit++) {
            const card = new Card(rank, suit);
            cards.push(card);
        }
    }
    return cards;
}

export { createCards };
