// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { Card } from '../../src/showdownGame/card';
import { Player } from '../../src/showdownGame';


// --------------------------------------------------------------------------------------------------------------------
class MockPlayer extends Player {
    public askExchangeHands(): boolean {
        return false;
    }

    // ----------------------------------------------------------------------------------------------------------------
    public askExchangePlayerIdx(selfIdx: number): number {  // eslint-disable-line @typescript-eslint/no-unused-vars
        return -1;
    }

    // ----------------------------------------------------------------------------------------------------------------
    public show(): Card | null {
        if (this._cards.length === 0) {
            return null;
        }
        const card = this._cards.shift()!;
        return card;
    }
}

// --------------------------------------------------------------------------------------------------------------------
function addCardsToPlayer(player: Player, cards: Card[]) {
    for (const card of cards) {
        // Note:
        //   player's cards has its own reference, which is different from the input cards.
        //   Here, it is adding each card's reference to the player's cards rather than input cards' reference.
        //   So, the input cards will not be modified afterward.
        player.addCard(card);
    }
}

export { addCardsToPlayer, MockPlayer };
