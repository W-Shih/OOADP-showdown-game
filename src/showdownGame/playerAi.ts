// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { randomBoolean as defaultRandomBoolean, randomInt as defaultRandomInt } from '../utils';
import { Card } from './card';
import { NUM_PLAYERS } from './constants';
import { Player } from './player';


// --------------------------------------------------------------------------------------------------------------------
class AiPlayer extends Player {
    private _randomBoolean: (typeof defaultRandomBoolean);
    private _randomInt: (typeof defaultRandomInt);
    public constructor(
        randomBoolean: (typeof defaultRandomBoolean) = defaultRandomBoolean,
        randomInt: (typeof defaultRandomInt) = defaultRandomInt
    ) {
        super();
        this._randomBoolean = randomBoolean;
        this._randomInt = randomInt;
    }

    // ----------------------------------------------------------------------------------------------------------------
    public askExchangeHands(): boolean {
        const exchange = this._randomBoolean();
        if (exchange) {
            this._canExchangeHands = false;
        }
        return exchange;
    }

    // ----------------------------------------------------------------------------------------------------------------
    public askExchangePlayerIdx(selfIdx: number): number {
        let toPlayerIdx = selfIdx;
        while (toPlayerIdx === selfIdx) {
            toPlayerIdx = this._randomInt(0, NUM_PLAYERS);
        }
        return toPlayerIdx;
    }

    // ----------------------------------------------------------------------------------------------------------------
    public show(): Card | null {
        const numCards = this._cards.length;
        if (numCards === 0) {
            return null;
        }
        const idx = this._randomInt(0, numCards);
        return this._cards.splice(idx, 1)[0];
    }
}

export { AiPlayer };
