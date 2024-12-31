// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { NUM_CARDS_PER_PLAYER, NUM_PLAYERS, NUM_ROUNDS_FOR_EXCHANGE } from './constants';
import { Card } from './card';
import { Deck } from './deck';
import { prompt as defaultPrompt } from '../utils';
import { Player } from './player';


// --------------------------------------------------------------------------------------------------------------------
class Game {
    private _deck: Deck;
    private _players!: Player[];
    private _playerExchangeInfos: (ExchangeInfo | null)[] = [null, null, null, null];
    private _prompt: (typeof defaultPrompt);
    public constructor(
        players: Player[],
        deck: Deck,
        prompt: (typeof defaultPrompt) = defaultPrompt
    ) {
        this._setPlayers(players);
        this._deck = deck;
        this._prompt = prompt;
    }

    // ----------------------------------------------------------------------------------------------------------------
    public async start(): Promise<void> {
        console.log('========== Game starts ==========');

        console.log('---------- Game init ----------');
        await this._init();

        console.log('---------- Game plays ----------');
        await this._play();

        console.log('---------- Game winner ----------');
        this._showGameWinner();

        console.log('========== Game ends ==========');
    }

    // ----------------------------------------------------------------------------------------------------------------
    private async _init(): Promise<void> {
        await this._initPlayers();
        this._deck.shuffle();
        this._drawCards();
    }

    // ----------------------------------------------------------------------------------------------------------------
    private _drawCards(): void {
        console.log('Drawing cards...');

        for (let i = 0; i < NUM_CARDS_PER_PLAYER; i++) {
            for (let playerIdx = 0; playerIdx < NUM_PLAYERS; playerIdx++) {
                const card = this._deck.drawCard();
                this._players[playerIdx].addCard(card);
            }
        }

        console.log('Cards drawn.');
    }

    // ----------------------------------------------------------------------------------------------------------------
    private async _play(): Promise<void> {
        for (let roundIdx = 0; roundIdx < NUM_CARDS_PER_PLAYER; roundIdx++) {
            console.log(`********** Round ${roundIdx + 1} **********`);

            const cards = await this._oneRound();
            this._showCards(cards);
            const maxCardIdx = this._getMaxCardIdx(cards);
            this._updateStatus(maxCardIdx);

            console.log(`Round ${roundIdx + 1} winner: P${maxCardIdx + 1} - ${this._players[maxCardIdx].getName()}`);
        }
    }

    // ----------------------------------------------------------------------------------------------------------------
    private _showGameWinner(): void {
        let maxPoints = -1;
        let winnerIdx = -1;
        for (let playerIdx = 0; playerIdx < NUM_PLAYERS; playerIdx++) {
            const points = this._players[playerIdx].getPoints();
            if (points > maxPoints) {
                maxPoints = points;
                winnerIdx = playerIdx;
            }
        }
        const message = `The game winner is P${winnerIdx + 1} - ${this._players[winnerIdx].getName()} `
            + `with ${maxPoints} points.`;
        console.log(message);
    }

    // ----------------------------------------------------------------------------------------------------------------
    private _showCards(cards: (Card | null)[]): void {
        for (let playerIdx = 0; playerIdx < NUM_PLAYERS; playerIdx++) {
            const card = cards[playerIdx];
            const cardStr = card ? card.toString() : 'has no card';
            console.log(`P${playerIdx + 1}: ${cardStr}`);
        }
    }

    // ----------------------------------------------------------------------------------------------------------------
    private _getMaxCardIdx(cards: (Card | null)[]): number {
        let maxCardIdx = 0;
        let maxCard = cards[0];
        for (let i = 1; i < cards.length; i++) {
            const card = cards[i];
            if (!card) {
                continue;
            }
            if (!maxCard) {
                maxCard = card;
                maxCardIdx = i;
                continue;
            }
            if (card.compareTo(maxCard) > 0) {
                maxCard = cards[i];
                maxCardIdx = i;
            }
        }
        return maxCardIdx;
    }

    // ----------------------------------------------------------------------------------------------------------------
    private _updateStatus(maxCardIdx: number): void {
        // Update round winner's point
        const roundWinner = this._players[maxCardIdx];
        roundWinner.gainOnePoint();

        // Update exchange info
        for (let playerIdx = 0; playerIdx < NUM_PLAYERS; playerIdx++) {
            const exchangeInfo = this._playerExchangeInfos[playerIdx];
            if (!exchangeInfo) {
                continue;
            }
            exchangeInfo.increaseCounterByOne();
        }

        // Exchange hands back if necessary
        // NOTE: 使用倒序回溯, e.g.
        //   Round1: P1 -> P2, P2 -> P3, P3 -> P4
        //   Status: P1: H2, P2: H3, P3: H4, P4: H1
        //   After 3 rounds, exchange back in reverse order: sP3 -> P4, P2 -> P3, P1 -> P2
        //   Status: P1: H1, P2: H2, P3: H3, P4: H4
        // NOTE:
        //   由於假設允許在同一回合中多人交換手牌, 且允許與正在持有別人手牌的玩家交換手牌,
        //   因此, 交換回來的手牌的邏輯是與當初交換手牌的玩家再次交換手牌, 換回的手牌有可能不是玩家原本的手牌
        for (let playerIdx = NUM_PLAYERS - 1; playerIdx >= 0; playerIdx--) {
            const exchangeInfo = this._playerExchangeInfos[playerIdx];
            if (!exchangeInfo) {
                continue;
            }
            if (exchangeInfo.getCounter() === NUM_ROUNDS_FOR_EXCHANGE) {
                const curtPlayer = this._players[playerIdx];
                const toPlayerIdx = exchangeInfo.getToPlayerIdx();
                const message = `+++++ ${NUM_ROUNDS_FOR_EXCHANGE} rounds passed, `
                    + `P${playerIdx + 1} exchanges hands back with P${toPlayerIdx + 1}. +++++`;
                console.log(message);
                curtPlayer.exchangeHands(this._players[toPlayerIdx]);

            }
        }
    }

    // ----------------------------------------------------------------------------------------------------------------
    private async _oneRound(): Promise<(Card | null)[]> {
        const cards: (Card | null)[] = Array.from({ length: 4 }, () => null);
        for (let playerIdx = 0; playerIdx < NUM_PLAYERS; playerIdx++) {
            const card = await this._oneTurn(playerIdx);
            cards[playerIdx] = card;
        }
        return cards;
    }

    // ----------------------------------------------------------------------------------------------------------------
    private async _oneTurn(playerIdx: number): Promise<Card | null> {
        const player = this._players[playerIdx];
        // [假設]: 允許在同一回合中多人交換手牌
        if (player.canExchangeHands()) {
            await this._handleExchange(playerIdx);
        }
        const card = await player.show();
        return card;
    }

    // ----------------------------------------------------------------------------------------------------------------
    private async _handleExchange(playerIdx: number): Promise<void> {
        const player = this._players[playerIdx];
        const exchange = await player.askExchangeHands();
        if (!exchange) {
            return;
        }

        // [假設]: 允許與正在持有別人手牌的玩家交換手牌
        const playerIdxToExchange = await player.askExchangePlayerIdx(playerIdx);
        console.log(`+++++ P${playerIdx + 1} wants to exchange hands with P${playerIdxToExchange + 1}. +++++`);

        const exchangeInfo = new ExchangeInfo(playerIdxToExchange);
        this._playerExchangeInfos[playerIdx] = exchangeInfo;
        player.exchangeHands(this._players[playerIdxToExchange]);
    }

    // ----------------------------------------------------------------------------------------------------------------
    private async _initPlayers(): Promise<void> {
        for (let playerIdx = 0; playerIdx < NUM_PLAYERS; playerIdx++) {
            const name = await this._prompt(`Please input the name for P${playerIdx + 1}: `);
            this._players[playerIdx].setName(name);
        }

        for (let playrIdex = 0; playrIdex < NUM_PLAYERS; playrIdex++) {
            console.log(`P${playrIdex + 1}: ${this._players[playrIdex].getName()}`);
        }
    }

    // ----------------------------------------------------------------------------------------------------------------
    private _setPlayers(players: Player[]): void {
        if (players.length !== NUM_PLAYERS) {
            throw new Error(`The number of players must be ${NUM_PLAYERS}`);
        }
        this._players = players;
    }
}


// --------------------------------------------------------------------------------------------------------------------
class ExchangeInfo {
    private _toPlayerIdx!: number;
    private _counter!: number;
    constructor(toPlayerIdx: number) {
        this._setToPlayerIdx(toPlayerIdx);
        this._setCounter(0);
    }

    // ----------------------------------------------------------------------------------------------------------------
    public getToPlayerIdx(): number {
        return this._toPlayerIdx;
    }

    // ----------------------------------------------------------------------------------------------------------------
    public getCounter(): number {
        return this._counter;
    }

    // ----------------------------------------------------------------------------------------------------------------
    public increaseCounterByOne(): void {
        this._setCounter(this._counter + 1);
    }

    // ----------------------------------------------------------------------------------------------------------------
    private _setCounter(counter: number): void {
        if (counter < 0) {
            throw new Error('Counter must be a positive number');
        }
        this._counter = counter;
    }

    // ----------------------------------------------------------------------------------------------------------------
    private _setToPlayerIdx(toPlayerIdx: number): void {
        if (toPlayerIdx < 0 || toPlayerIdx >= NUM_PLAYERS) {
            throw new Error(`Player index must be between [0, ${NUM_PLAYERS})`);
        }
        this._toPlayerIdx = toPlayerIdx;
    }
}

export { Game };
