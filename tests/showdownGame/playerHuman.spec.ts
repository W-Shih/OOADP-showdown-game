// --------------------------------------------------------------------------------------------------------------------
// Third party modules
import { expect } from 'chai';
import sinon from 'sinon';

// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { Card, Rank, Suit } from '../../src/showdownGame/card';
import { addCardsToPlayer } from '../helpers/player';
import { HumanPlayer } from '../../src/showdownGame';
import { NUM_PLAYERS } from '../../src/showdownGame/constants';


// --------------------------------------------------------------------------------------------------------------------
describe('HumanPlayer', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('show()', () => {
        it('should always return the topmost card', async () => {
            // Given
            const promptStub = sinon.stub().resolves('0');
            const player = new HumanPlayer(promptStub);
            const cards = [
                new Card(Rank.ACE, Suit.SPADES),
                new Card(Rank.KING, Suit.HEARTS),
                new Card(Rank.QUEEN, Suit.DIAMONDS),
            ];
            addCardsToPlayer(player, cards);

            // When
            const card1 = await player.show();
            const card2 = await player.show();
            const card3 = await player.show();
            const card4 = await player.show();

            // Then
            expect(card1).to.deep.equal(cards[0]);
            expect(card2).to.deep.equal(cards[1]);
            expect(card3).to.deep.equal(cards[2]);
            expect(card4).to.be.null;
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should always return the last card', async () => {
            // Given
            const promptStub = sinon.stub();
            const player = new HumanPlayer(promptStub);
            const cards = [
                new Card(Rank.ACE, Suit.SPADES),
                new Card(Rank.KING, Suit.HEARTS),
                new Card(Rank.QUEEN, Suit.DIAMONDS),
            ];
            addCardsToPlayer(player, cards);

            promptStub.onCall(0).resolves(`${cards.length - 1}`);
            promptStub.onCall(1).resolves(`${cards.length - 2}`);
            promptStub.onCall(2).resolves(`${cards.length - 3}`);

            // When
            const card1 = await player.show();
            const card2 = await player.show();
            const card3 = await player.show();
            const card4 = await player.show();

            // Then
            expect(card1).to.deep.equal(cards[2]);
            expect(card2).to.deep.equal(cards[1]);
            expect(card3).to.deep.equal(cards[0]);
            expect(card4).to.be.null;
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should return the card', async () => {
            // Given
            const promptStub = sinon.stub();
            const player = new HumanPlayer(promptStub);
            const cards = [
                new Card(Rank.ACE, Suit.SPADES),
            ];
            addCardsToPlayer(player, cards);

            promptStub.onCall(0).resolves('-1');
            promptStub.onCall(1).resolves(`${cards.length}`);
            promptStub.onCall(2).resolves('abc');
            promptStub.onCall(2).resolves(' ');
            promptStub.onCall(3).resolves('0.5');
            promptStub.onCall(4).resolves('0');

            // When
            const card = await player.show();

            // Then
            expect(card).to.deep.equal(cards[0]);
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should return null if no cards', async () => {
            // Given
            const player = new HumanPlayer();

            // When
            const card = await player.show();

            // Then
            expect(card).to.be.null;
        });
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('askExchangeHands()', () => {
        it('should return true', async () => {
            // Given
            const promptStub = sinon.stub();
            promptStub.onCall(0).resolves('0');
            promptStub.onCall(1).resolves('1');
            promptStub.onCall(2).resolves('y');
            const player = new HumanPlayer(promptStub);

            // When
            const result = await player.askExchangeHands();

            // Then
            expect(result).to.be.true;
            expect(player.canExchangeHands()).to.be.false;
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should return false', async () => {
            // Given
            const promptStub = sinon.stub();
            promptStub.onCall(0).resolves('0');
            promptStub.onCall(1).resolves('1');
            promptStub.onCall(2).resolves('n');
            const player = new HumanPlayer(promptStub);

            // When
            const result = await player.askExchangeHands();

            // Then
            expect(result).to.be.false;
            expect(player.canExchangeHands()).to.be.true;
        });
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('askExchangePlayerIdx()', () => {
        it('should return 1', async () => {
            // Given
            const promptStub = sinon.stub();
            promptStub.onCall(0).resolves('0');
            promptStub.onCall(1).resolves(`${NUM_PLAYERS}`);
            promptStub.onCall(2).resolves('n');
            promptStub.onCall(2).resolves('1.5');
            promptStub.onCall(3).resolves('1');
            const player = new HumanPlayer(promptStub);

            const selfIdx = 0;

            // When
            const result = await player.askExchangePlayerIdx(selfIdx);

            // Then
            expect(result).to.equal(1);
        });

        // ------------------------------------------------------------------------------------------------------------
        it(`should return ${NUM_PLAYERS - 1}`, async () => {
            // Given
            const promptStub = sinon.stub();
            promptStub.onCall(0).resolves('0');
            promptStub.onCall(1).resolves(`${NUM_PLAYERS}`);
            promptStub.onCall(2).resolves('n');
            promptStub.onCall(2).resolves('1.5');
            promptStub.onCall(3).resolves(`${NUM_PLAYERS - 1}`);
            const player = new HumanPlayer(promptStub);

            const selfIdx = 0;

            // When
            const result = await player.askExchangePlayerIdx(selfIdx);

            // Then
            expect(result).to.equal(3);
        });
    });
});
