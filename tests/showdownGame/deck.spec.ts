// --------------------------------------------------------------------------------------------------------------------
// Third party modules
import { expect } from 'chai';
import sinon from 'sinon';

// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { Card, Rank, Suit } from '../../src/showdownGame/card';
import { createCards } from '../helpers/cards';
import { Deck } from '../../src/showdownGame';
import { NUM_CARDS } from '../../src/showdownGame/constants';


// --------------------------------------------------------------------------------------------------------------------
describe('Deck', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('shuffle()', () => {
        it('should shuffle cards in an expected order', () => {
            // Given
            const cards = createCards();
            const originalCards = JSON.parse(JSON.stringify(cards));
            const deck = new Deck(cards);
            const randomIntStub = sinon.stub().returns(0);
            deck.setRandomInt(randomIntStub);

            // When
            deck.shuffle();

            // Then
            expect(cards).to.have.lengthOf(NUM_CARDS);
            expect(cards).to.not.deep.equal(originalCards);
            expect(cards[NUM_CARDS - 1]).to.deep.equal(originalCards[0]);
            expect(cards.slice(0, NUM_CARDS - 1)).to.deep.equal(originalCards.slice(1, NUM_CARDS));
            expect(cards).to.have.same.deep.members(originalCards);
        });
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('drawCard()', () => {
        it('should return the topmost card from the deck', () => {
            // Given
            const cards = createCards();
            const originalCards = JSON.parse(JSON.stringify(cards));
            const deck = new Deck(cards);

            // When
            const card = deck.drawCard();

            // Then
            const expectedCard = originalCards[0];
            expect(card).to.deep.equal(expectedCard);
            expect(cards).to.have.lengthOf(NUM_CARDS - 1);
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should throw an error when no card to draw', () => {
            // Given
            const cards = createCards();
            const deck = new Deck(cards);
            for (let i = 0; i < NUM_CARDS; i++) {
                deck.drawCard();
            }

            // When & Then
            try {
                deck.drawCard();
                expect.fail('Expected error was not thrown');
            }
            catch (error) {
                expect(error).to.be.an.instanceOf(Error);
                expect((error as Error).message).to.equal('No more cards in the deck');
            }
        });
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('constructor()', () => {
        it('should throw an error if invalid number of cards - 1', () => {
            // Given
            const cards = createCards();
            cards.pop();

            // When & Then
            try {
                new Deck(cards);
                expect.fail('Expected error was not thrown');
            }
            catch (error) {
                expect(error).to.be.an.instanceOf(Error);
                expect((error as Error).message).to.equal(`Invalid number of cards, must be ${NUM_CARDS}`);
            }
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should throw an error if invalid number of cards - 2', () => {
            // Given
            const cards = createCards();
            cards.push(new Card(Rank.ACE, Suit.SPADES));

            // When & Then
            try {
                new Deck(cards);
                expect.fail('Expected error was not thrown');
            }
            catch (error) {
                expect(error).to.be.an.instanceOf(Error);
                expect((error as Error).message).to.equal(`Invalid number of cards, must be ${NUM_CARDS}`);
            }
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should throw an error if duplicate cards', () => {
            // Given
            const cards = createCards();
            cards[1] = cards[0];

            // When & Then
            try {
                new Deck(cards);
                expect.fail('Expected error was not thrown');
            }
            catch (error) {
                expect(error).to.be.an.instanceOf(Error);
                expect((error as Error).message).to.equal('Duplicate cards are not allowed');
            }
        });
    });
});
