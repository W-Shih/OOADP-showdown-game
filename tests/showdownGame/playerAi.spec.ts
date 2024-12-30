// --------------------------------------------------------------------------------------------------------------------
// Third party modules
import { expect } from 'chai';
import sinon from 'sinon';

// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { Card, Rank, Suit } from '../../src/showdownGame/card';
import { addCardsToPlayer } from '../helpers/player';
import { AiPlayer } from '../../src/showdownGame';
import { NUM_PLAYERS } from '../../src/showdownGame/constants';


// --------------------------------------------------------------------------------------------------------------------
describe('AiPlayer', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('show()', () => {
        it('should always return the topmost card', () => {
            // Given
            const player = new AiPlayer();
            const cards = [
                new Card(Rank.ACE, Suit.SPADES),
                new Card(Rank.KING, Suit.HEARTS),
                new Card(Rank.QUEEN, Suit.DIAMONDS),
            ];
            addCardsToPlayer(player, cards);
            const randomIntStub = sinon.stub().returns(0);
            player.setRandomInt(randomIntStub);

            // When
            const card1 = player.show();
            const card2 = player.show();
            const card3 = player.show();
            const card4 = player.show();

            // Then
            expect(card1).to.deep.equal(cards[0]);
            expect(card2).to.deep.equal(cards[1]);
            expect(card3).to.deep.equal(cards[2]);
            expect(card4).to.be.null;
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should always return the last card', () => {
            // Given
            const player = new AiPlayer();
            const cards = [
                new Card(Rank.ACE, Suit.SPADES),
                new Card(Rank.KING, Suit.HEARTS),
                new Card(Rank.QUEEN, Suit.DIAMONDS),
            ];
            addCardsToPlayer(player, cards);
            const randomIntStub = sinon.stub();
            randomIntStub.onCall(0).returns(cards.length - 1);
            randomIntStub.onCall(1).returns(cards.length - 2);
            randomIntStub.onCall(2).returns(cards.length - 3);
            player.setRandomInt(randomIntStub);

            // When
            const card1 = player.show();
            const card2 = player.show();
            const card3 = player.show();
            const card4 = player.show();

            // Then
            expect(card1).to.deep.equal(cards[2]);
            expect(card2).to.deep.equal(cards[1]);
            expect(card3).to.deep.equal(cards[0]);
            expect(card4).to.be.null;
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should return null if no cards', () => {
            // Given
            const player = new AiPlayer();

            // When
            const card = player.show();

            // Then
            expect(card).to.be.null;
        });
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('askExchangeHands()', () => {
        it('should return true', () => {
            // Given
            const player = new AiPlayer();
            const randomBooleanStub = sinon.stub().returns(true);
            player.setRandomBoolean(randomBooleanStub);

            // When
            const result = player.askExchangeHands();

            // Then
            expect(result).to.be.true;
            expect(player.canExchangeHands()).to.be.false;
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should return false', () => {
            // Given
            const player = new AiPlayer();
            const randomBooleanStub = sinon.stub().returns(false);
            player.setRandomBoolean(randomBooleanStub);

            // When
            const result = player.askExchangeHands();

            // Then
            expect(result).to.be.false;
            expect(player.canExchangeHands()).to.be.true;
        });
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('askExchangePlayerIdx()', () => {
        it('should return 1', () => {
            // Given
            const player = new AiPlayer();
            const selfIdx = 0;
            const randomIntStub = sinon.stub().returns(1);
            player.setRandomInt(randomIntStub);

            // When
            const result = player.askExchangePlayerIdx(selfIdx);

            // Then
            expect(result).to.equal(1);
        });

        // ------------------------------------------------------------------------------------------------------------
        it(`should return ${NUM_PLAYERS - 1}`, () => {
            // Given
            const player = new AiPlayer();
            const selfIdx = 0;
            const randomIntStub = sinon.stub();
            randomIntStub.onCall(0).returns(0);
            randomIntStub.onCall(1).returns(0);
            randomIntStub.onCall(2).returns(0);
            randomIntStub.onCall(3).returns(NUM_PLAYERS - 1);
            player.setRandomInt(randomIntStub);

            // When
            const result = player.askExchangePlayerIdx(selfIdx);

            // Then
            expect(result).to.equal(3);
        });
    });
});
