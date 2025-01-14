enum Rank {
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
    SIX = 6,
    SEVEN = 7,
    EIGHT = 8,
    NINE = 9,
    TEN = 10,
    JACK = 11,
    QUEEN = 12,
    KING = 13,
    ACE = 14,
}

// --------------------------------------------------------------------------------------------------------------------
enum Suit {
    CLUBS = 0,
    DIAMONDS = 1,
    HEARTS = 2,
    SPADES = 3,
}

// --------------------------------------------------------------------------------------------------------------------
class Card {
    private _rank: Rank;
    private _suit: Suit;

    public constructor(rank: Rank, suit: Suit) {
        this._rank = rank;
        this._suit = suit;
    }

    // ----------------------------------------------------------------------------------------------------------------
    public toString(): string {
        const rankStr = Rank[this._rank];
        const suitStr = Suit[this._suit];
        return `Rank ${rankStr} (${this._rank}) with suit ${suitStr} (${this._suit})`;
    }

    // ----------------------------------------------------------------------------------------------------------------
    public compareTo(other: Card): number {
        if (this._rank !== other._rank) {
            return this._rank - other._rank;
        }
        return this._suit - other._suit;
    }
}

export { Card, Rank, Suit };
