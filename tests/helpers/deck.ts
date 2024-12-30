// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { Card } from '../../src/showdownGame/card';
import { Deck } from '../../src/showdownGame';


// --------------------------------------------------------------------------------------------------------------------
class MockDeck extends Deck {
    public constructor(cards: Card[]) {
        super(cards);
    }

    // ----------------------------------------------------------------------------------------------------------------
    public shuffle(): void {
        // Do nothing
    }
}

export { MockDeck };
