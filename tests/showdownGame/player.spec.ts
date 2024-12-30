// --------------------------------------------------------------------------------------------------------------------
// Third party modules
import { expect } from 'chai';
import sinon from 'sinon';

// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { addCardsToPlayer, MockPlayer } from '../helpers/player';
import { Card, Rank, Suit } from '../../src/showdownGame/card';
import { createCards } from '../helpers/cards';
import { NUM_CARDS_PER_PLAYER } from '../../src/showdownGame/constants';


// --------------------------------------------------------------------------------------------------------------------
describe('Player via MockPlayer', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('exchangeHands()', () => {
        it('should exchange hands - 1', () => {
            // Given
            const player1 = new MockPlayer();
            const player2 = new MockPlayer();
            player1.setName('P1');
            player2.setName('P2');
            const cards1 = [new Card(Rank.ACE, Suit.SPADES), new Card(Rank.KING, Suit.HEARTS)];
            const cards2 = [new Card(Rank.QUEEN, Suit.DIAMONDS), new Card(Rank.JACK, Suit.CLUBS)];
            addCardsToPlayer(player1, cards1);
            addCardsToPlayer(player2, cards2);

            // When
            player1.exchangeHands(player2);

            // Then
            expect(player1.show()).to.deep.equal(cards2[0]);
            expect(player1.show()).to.deep.equal(cards2[1]);
            expect(player2.show()).to.deep.equal(cards1[0]);
            expect(player2.show()).to.deep.equal(cards1[1]);
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should exchange hands - 2', () => {
            // Given
            const player1 = new MockPlayer();
            const player2 = new MockPlayer();
            player1.setName('P1');
            player2.setName('P2');
            const cards1 = [new Card(Rank.ACE, Suit.SPADES), new Card(Rank.KING, Suit.HEARTS)];
            const cards2 = [] as Card[];
            addCardsToPlayer(player1, cards1);
            addCardsToPlayer(player2, cards2);

            // When
            player1.exchangeHands(player2);

            // Then
            expect(player1.show()).to.deep.equal(null);
            expect(player2.show()).to.deep.equal(cards1[0]);
            expect(player2.show()).to.deep.equal(cards1[1]);
        });
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('addCard()', () => {
        it(`should throw an error if add more than ${NUM_CARDS_PER_PLAYER} cards`, () => {
            // Given
            const player = new MockPlayer();
            const cards = createCards();
            addCardsToPlayer(player, cards.slice(0, NUM_CARDS_PER_PLAYER));

            // When & Then
            try {
                player.addCard(new Card(Rank.ACE, Suit.SPADES));
                expect.fail('Expected error was not thrown');
            }
            catch (error) {
                expect(error).to.be.an.instanceOf(Error);
                expect((error as Error).message).to.equal(`Cannot add more than ${NUM_CARDS_PER_PLAYER} cards`);
            }
        });
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('gainOnePoint()', () => {
        it('should gain one more point - 1', () => {
            // Given
            const player = new MockPlayer();

            // When
            player.gainOnePoint();

            // Then
            expect(player.getPoints()).to.equal(1);

        });

        // ------------------------------------------------------------------------------------------------------------
        it('should gain one more point - 2', () => {
            // Given
            const player = new MockPlayer();

            // When
            player.gainOnePoint();
            player.gainOnePoint();
            player.gainOnePoint();

            // Then
            expect(player.getPoints()).to.equal(3);
        });
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('getName()', () => {
        it('should return `dummy`', () => {
            // Given
            const player = new MockPlayer();
            player.setName('dummy');

            // When
            const name = player.getName();

            // Then
            expect(name).to.equal('dummy');
        });
    });
});
