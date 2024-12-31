// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { Card } from './card';
import { randomInt as defaultRandomInt } from '../utils';
import { NUM_CARDS } from './constants';


// --------------------------------------------------------------------------------------------------------------------
class Deck {
    private _cards!: Card[];
    private _randomInt: (typeof defaultRandomInt);

    public constructor(
        cards: Card[],
        randomInt: (typeof defaultRandomInt) = defaultRandomInt
    ) {
        this._setCards(cards);
        this._randomInt = randomInt;
    }

    // ----------------------------------------------------------------------------------------------------------------
    public shuffle(): void {
        console.log('Shuffling deck...');
        for (let i = this._cards.length - 1; i > 0; i--) {
            const j = this._randomInt(0, i + 1);  // j's range is [0, i + 1)
            const temp = this._cards[i];
            this._cards[i] = this._cards[j];
            this._cards[j] = temp;
        }
        console.log('Deck shuffled.');
    }

    // ----------------------------------------------------------------------------------------------------------------
    public drawCard(): Card {
        if (this._cards.length === 0) {
            throw new Error('No more cards in the deck');
        }

        // Draw the top card
        const card = this._cards.shift()!;
        return card;
    }

    // ----------------------------------------------------------------------------------------------------------------
    private _setCards(cards: Card[]): void {
        if (cards.length !== 52) {
            throw new Error(`Invalid number of cards, must be ${NUM_CARDS}`);
        }
        if (new Set(cards).size !== 52) {
            throw new Error('Duplicate cards are not allowed');
        }
        this._cards = cards;
    }
}

export { Deck };
