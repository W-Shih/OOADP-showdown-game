// --------------------------------------------------------------------------------------------------------------------
// Third party modules
import { expect } from 'chai';
import sinon from 'sinon';

// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { Card, Rank, Suit } from '../../src/showdownGame/card';


// --------------------------------------------------------------------------------------------------------------------
describe('Card', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('compareTo()', () => {
        it('should return a number > 0, indicating `card1` is greater than `card2`', () => {
            // Given
            const card1 = new Card(Rank.ACE, Suit.SPADES);
            const card2 = new Card(Rank.KING, Suit.HEARTS);

            // When
            const result = card1.compareTo(card2);

            // Then
            expect(result).to.be.greaterThan(0);
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should return a number > 0, indicating `card1` is greater than `card2`', () => {
            // Given
            const card1 = new Card(Rank.THREE, Suit.DIAMONDS);
            const card2 = new Card(Rank.THREE, Suit.CLUBS);

            // When
            const result = card1.compareTo(card2);

            // Then
            expect(result).to.be.greaterThan(0);
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should return a number < 0, indicating `card1` is less than `card2`', () => {
            // Given
            const card1 = new Card(Rank.FIVE, Suit.HEARTS);
            const card2 = new Card(Rank.JACK, Suit.SPADES);

            // When
            const result = card1.compareTo(card2);

            // Then
            expect(result).to.be.lessThan(0);
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should return a number < 0, indicating `card1` is less than `card2`', () => {
            // Given
            const card1 = new Card(Rank.TWO, Suit.CLUBS);
            const card2 = new Card(Rank.TWO, Suit.SPADES);

            // When
            const result = card1.compareTo(card2);

            // Then
            expect(result).to.be.lessThan(0);
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should return 0, indicating `card1` is equal to `card2`', () => {
            // Given
            const card1 = new Card(Rank.FOUR, Suit.DIAMONDS);
            const card2 = new Card(Rank.FOUR, Suit.DIAMONDS);

            // When
            const result = card1.compareTo(card2);

            // Then
            expect(result).to.equal(0);
        });
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('toString()', () => {
        it('should return `Rank ACE (14) with suit SPADES (3)`', () => {
            // Given
            const card = new Card(Rank.ACE, Suit.SPADES);

            // When
            const result = card.toString();

            // Then
            expect(result).to.equal('Rank ACE (14) with suit SPADES (3)');
        });
    });
});
