// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { Card } from './card';
import { NUM_CARDS_PER_PLAYER } from './constants';


// --------------------------------------------------------------------------------------------------------------------
abstract class Player {
    // ----------------------------------------------------------------------------------------------------------------
    // Abstract
    public abstract askExchangeHands(): boolean | Promise<boolean>;
    public abstract askExchangePlayerIdx(selfIdx: number): number | Promise<number>;
    public abstract show(): (Card | null) | Promise<Card | null>;

    // ----------------------------------------------------------------------------------------------------------------
    // Static

    // ----------------------------------------------------------------------------------------------------------------
    // Instance
    protected _canExchangeHands: boolean;
    protected _cards: Card[];
    private _name: string | null;
    private _points: number;

    public constructor() {
        this._name = null;
        this._points = 0;
        this._cards = [];
        this._canExchangeHands = true;
    }

    // ----------------------------------------------------------------------------------------------------------------
    public setName(name: string): void {
        this._name = name;
    }

    // ----------------------------------------------------------------------------------------------------------------
    public getName(): string | null{
        return this._name;
    }

    // ----------------------------------------------------------------------------------------------------------------
    public getPoints(): number {
        return this._points;
    }

    // ----------------------------------------------------------------------------------------------------------------
    public gainOnePoint(): void {
        this._setPoints(this._points + 1);
    }

    // ----------------------------------------------------------------------------------------------------------------
    public addCard(card: Card): void {
        if (this._cards.length >= NUM_CARDS_PER_PLAYER) {
            throw new Error(`Cannot add more than ${NUM_CARDS_PER_PLAYER} cards`);
        }
        this._cards.push(card);
    }

    // ----------------------------------------------------------------------------------------------------------------
    public exchangeHands(other: Player): void {
        const tmp = this._cards;
        this._cards = other._cards;
        other._cards = tmp;
    }

    // ----------------------------------------------------------------------------------------------------------------
    public canExchangeHands(): boolean {
        return this._canExchangeHands;
    }

    // ----------------------------------------------------------------------------------------------------------------
    private _setPoints(points: number): void {
        if (points < 0) {
            throw new Error('Points must be a non-negative number');
        }
        this._points = points;
    }
}

export { Player };
