// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { prompt as dafaultPrompt, isValidIntegerInRange } from '../utils';
import { Card } from './card';
import { NUM_PLAYERS } from './constants';
import { Player } from './player';


// --------------------------------------------------------------------------------------------------------------------
class HumanPlayer extends Player {
    private _prompt: (typeof dafaultPrompt) = dafaultPrompt;

    // ----------------------------------------------------------------------------------------------------------------
    public setPrompt(prompt: (typeof dafaultPrompt)): void {
        this._prompt = prompt;
    }

    // ----------------------------------------------------------------------------------------------------------------
    public async askExchangeHands(): Promise<boolean> {
        while (true) {
            const ans = await this._prompt('Do you want to exchange hands? [y/n]: ');
            if (ans === 'y') {
                this._canExchangeHands = false;
                return true;
            }
            if (ans === 'n') {
                return false;
            }
            console.log('Please enter y or n.');
        }
    }

    // ----------------------------------------------------------------------------------------------------------------
    public async askExchangePlayerIdx(selfIdx: number): Promise<number> {
        const message = 'Which player do you want to exchange hands with? '
            + `(0: P1, 1: P2, 2: P3, 3: P4, but not yourself ${selfIdx}: P${selfIdx + 1}) `
            + `[0-${NUM_PLAYERS - 1}]: `;
        while (true) {
            const ans = await this._prompt(message);
            if (!isValidIntegerInRange(ans, 0, NUM_PLAYERS - 1)) {
                console.log(`Please enter a number between 0 and ${NUM_PLAYERS - 1}.`);
                continue;
            }

            const idx = parseInt(ans, 10);
            if (idx === selfIdx) {
                console.log('You cannot exchange hands with yourself.');
                continue;
            }
            return idx;
        }
    }

    // ----------------------------------------------------------------------------------------------------------------
    public async show(): Promise<Card | null> {
        const numCards = this._cards.length;
        if (numCards === 0) {
            return null;
        }

        console.log('Your cards:');
        for (let i = 0; i < numCards; i++) {
            console.log(`${i}: ${this._cards[i]}`);
        }

        while (true) {
            const ans = await this._prompt(`Please enter which card you want to show [0-${numCards - 1}]: `);
            if (!isValidIntegerInRange(ans, 0, numCards - 1)) {
                console.log(`Please enter a number between 0 and ${numCards - 1}.`);
                continue;
            }

            const idx = parseInt(ans, 10);
            const card = this._cards.splice(idx, 1)[0];
            return card;
        }
    }
}

export { HumanPlayer };
