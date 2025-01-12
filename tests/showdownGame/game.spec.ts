// --------------------------------------------------------------------------------------------------------------------
// Third party modules
import { expect } from 'chai';
import sinon from 'sinon';

// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { Deck, Game, Player } from '../../src/showdownGame';
import { createCards } from '../helpers/cards';
import { MockDeck } from '../helpers/deck';
import { MockPlayer } from '../helpers/player';
import { NUM_PLAYERS } from '../../src/showdownGame/constants';


// --------------------------------------------------------------------------------------------------------------------
describe('Game', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('start()', () => {
        it('should print `The game winner is P4 - P4 with 13 points.` - 1', async () => {
            // Given
            //   no exchange hands
            const deck = new MockDeck(createCards());
            const players = [
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
            ];

            const promptStub = sinon.stub();
            for (let playerIdx = 0; playerIdx < NUM_PLAYERS; playerIdx++) {
                promptStub.withArgs(`Please input the name for P${playerIdx + 1}: `).resolves(`P${playerIdx + 1}`);
            }

            const consoleSpy = sandbox.spy(console, 'log');

            const game = new Game(players, deck, promptStub);

            // When
            await game.start();

            // Then
            expect(consoleSpy.calledWith('The game winner is P4 - P4 with 13 points.')).to.be.true;
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should print `The game winner is P4 - P4 with 13 points.` - 2', async () => {
            // Given
            //   P1 exchanges hands with P2 at round 1
            const deck = new MockDeck(createCards());
            const players = [
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
            ];
            // P1 exchanges hands with P2 at round 1
            const p1 = players[0] as Player;
            sandbox.stub(p1, 'askExchangeHands').callsFake(function (this: Player) {
                this._canExchangeHands = false;
                return true;
            });
            sandbox.stub(p1, 'askExchangePlayerIdx').returns(1);  // P2

            const promptStub = sinon.stub();
            for (let playerIdx = 0; playerIdx < NUM_PLAYERS; playerIdx++) {
                promptStub.withArgs(`Please input the name for P${playerIdx + 1}: `).resolves(`P${playerIdx + 1}`);
            }

            const consoleSpy = sandbox.spy(console, 'log');

            const game = new Game(players, deck, promptStub);

            // When
            await game.start();

            // Then
            expect(consoleSpy.calledWith('The game winner is P4 - P4 with 13 points.')).to.be.true;
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should print `The game winner is P4 - P4 with 10 points.`', async () => {
            // Given
            //   P1 exchanges hands with P4 at round 1
            const deck = new MockDeck(createCards());
            const players = [
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
            ];
            // P1 exchanges hands with P4 at round 1
            const p1 = players[0] as Player;
            sandbox.stub(p1, 'askExchangeHands').callsFake(function (this: Player) {
                this._canExchangeHands = false;
                return true;
            });
            sandbox.stub(p1, 'askExchangePlayerIdx').returns(3);  // P4

            const promptStub = sinon.stub();
            for (let playerIdx = 0; playerIdx < NUM_PLAYERS; playerIdx++) {
                promptStub.withArgs(`Please input the name for P${playerIdx + 1}: `).resolves(`P${playerIdx + 1}`);
            }

            const consoleSpy = sandbox.spy(console, 'log');

            const game = new Game(players, deck, promptStub);

            // When
            await game.start();

            // Then
            expect(consoleSpy.calledWith('The game winner is P4 - P4 with 10 points.')).to.be.true;
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should print `The game winner is P4 - P4 with 12 points.` - 1', async () => {
            // Given
            //   P4 exchanges hands with P1 at round 11
            const deck = new MockDeck(createCards());
            const players = [
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
            ];
            // P4 exchanges hands with P1 at round 11
            const p4 = players[3] as Player;
            let callCount = 0;
            sandbox.stub(p4, 'askExchangeHands').callsFake(function (this: Player) {
                callCount++;
                if (callCount < 11) {
                    return false;
                }
                this._canExchangeHands = false;  // P4 decides to exchange hands at round 11
                return true;
            });
            sandbox.stub(p4, 'askExchangePlayerIdx').returns(0);  // P1

            const promptStub = sinon.stub();
            for (let playerIdx = 0; playerIdx < NUM_PLAYERS; playerIdx++) {
                promptStub.withArgs(`Please input the name for P${playerIdx + 1}: `).resolves(`P${playerIdx + 1}`);
            }

            const consoleSpy = sandbox.spy(console, 'log');

            const game = new Game(players, deck, promptStub);

            // When
            await game.start();

            // Then
            expect(consoleSpy.calledWith('The game winner is P4 - P4 with 12 points.')).to.be.true;
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should print `The game winner is P4 - P4 with 12 points.` - 2', async () => {
            // Given
            //   P1 exchanges hands with P4 at round 1
            //   P4 exchanges hands with P1 at round 1
            const deck = new MockDeck(createCards());
            const players = [
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
            ];
            // P1 exchanges hands with P4 at round 1
            const p1 = players[0] as Player;
            sandbox.stub(p1, 'askExchangeHands').callsFake(function (this: Player) {
                this._canExchangeHands = false;
                return true;
            });
            sandbox.stub(p1, 'askExchangePlayerIdx').returns(3);  // P4

            // P4 exchanges hands with P1 at round 1
            const p4 = players[3] as Player;
            sandbox.stub(p4, 'askExchangeHands').callsFake(function (this: Player) {
                this._canExchangeHands = false;
                return true;
            });
            sandbox.stub(p4, 'askExchangePlayerIdx').returns(0);  // P1

            const promptStub = sinon.stub();
            for (let playerIdx = 0; playerIdx < NUM_PLAYERS; playerIdx++) {
                promptStub.withArgs(`Please input the name for P${playerIdx + 1}: `).resolves(`P${playerIdx + 1}`);
            }

            const consoleSpy = sandbox.spy(console, 'log');

            const game = new Game(players, deck, promptStub);

            // When
            await game.start();

            // Then
            expect(consoleSpy.calledWith('The game winner is P4 - P4 with 12 points.')).to.be.true;
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should print `The game winner is P4 - P4 with 11 points.` - 1', async () => {
            // Given
            //   P3 exchanges hands with P1 at round 11
            const deck = new MockDeck(createCards());
            const players = [
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
            ];
            // P3 exchanges hands with P1 at round 11
            const p3 = players[2] as Player;
            let callCount = 0;
            sandbox.stub(p3, 'askExchangeHands').callsFake(function (this: Player) {
                callCount++;
                if (callCount < 11) {
                    return false;
                }
                this._canExchangeHands = false;  // P3 decides to exchange hands at round 11
                return true;
            });
            sandbox.stub(p3, 'askExchangePlayerIdx').returns(0);  // P1

            const promptStub = sinon.stub();
            for (let playerIdx = 0; playerIdx < NUM_PLAYERS; playerIdx++) {
                promptStub.withArgs(`Please input the name for P${playerIdx + 1}: `).resolves(`P${playerIdx + 1}`);
            }

            const consoleSpy = sandbox.spy(console, 'log');

            const game = new Game(players, deck, promptStub);

            // When
            await game.start();

            // Then
            expect(consoleSpy.calledWith('The game winner is P4 - P4 with 11 points.')).to.be.true;
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should print `The game winner is P4 - P4 with 11 points.` - 2', async () => {
            // Given
            //   P3 exchanges hands with P1 at round 11
            //   P1 exchanges hands with P3 at round 12
            const deck = new MockDeck(createCards());
            const players = [
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
            ];
            // P3 exchanges hands with P1 at round 11
            const p3 = players[2] as Player;
            let callCountForP3 = 0;
            sandbox.stub(p3, 'askExchangeHands').callsFake(function (this: Player) {
                callCountForP3++;
                if (callCountForP3 < 11) {
                    return false;
                }
                this._canExchangeHands = false;  // P3 decides to exchange hands at round 11
                return true;
            });
            sandbox.stub(p3, 'askExchangePlayerIdx').returns(0);  // P1

            // P1 exchanges hands with P3 at round 12
            const p1 = players[0] as Player;
            let callCountForP1 = 0;
            sandbox.stub(p1, 'askExchangeHands').callsFake(function (this: Player) {
                callCountForP1++;
                if (callCountForP1 < 12) {
                    return false;
                }
                this._canExchangeHands = false;  // P1 decides to exchange hands at round 12
                return true;
            });
            sandbox.stub(p1, 'askExchangePlayerIdx').returns(2);  // P3

            const promptStub = sinon.stub();
            for (let playerIdx = 0; playerIdx < NUM_PLAYERS; playerIdx++) {
                promptStub.withArgs(`Please input the name for P${playerIdx + 1}: `).resolves(`P${playerIdx + 1}`);
            }

            const consoleSpy = sandbox.spy(console, 'log');

            const game = new Game(players, deck, promptStub);

            // When
            await game.start();

            // Then
            expect(consoleSpy.calledWith('The game winner is P4 - P4 with 11 points.')).to.be.true;
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should print `The game winner is P4 - P4 with 4 points.`', async () => {
            // Given
            //   P1 exchanges hands with P4 at round 1
            //   P2 exchanges hands with P4 at round 4
            //   P3 exchanges hands with P4 at round 7
            const deck = new MockDeck(createCards());
            const players = [
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
            ];
            // P1 exchanges hands with P4 at round 1
            const p1 = players[0] as Player;
            sandbox.stub(p1, 'askExchangeHands').callsFake(function (this: Player) {
                this._canExchangeHands = false;  // P1 decides to exchange hands at round 1
                return true;
            });
            sandbox.stub(p1, 'askExchangePlayerIdx').returns(3);  // P4

            // P2 exchanges hands with P4 at round 4
            const p2 = players[1] as Player;
            let callCountForP2 = 0;
            sandbox.stub(p2, 'askExchangeHands').callsFake(function (this: Player) {
                callCountForP2++;
                if (callCountForP2 < 4) {
                    return false;
                }
                this._canExchangeHands = false;  // P2 decides to exchange hands at round 4
                return true;
            });
            sandbox.stub(p2, 'askExchangePlayerIdx').returns(3);  // P4

            // P3 exchanges hands with P4 at round 7
            const p3 = players[2] as Player;
            let callCountForP3 = 0;
            sandbox.stub(p3, 'askExchangeHands').callsFake(function (this: Player) {
                callCountForP3++;
                if (callCountForP3 < 7) {
                    return false;
                }
                this._canExchangeHands = false;  // P3 decides to exchange hands at round 7
                return true;
            });
            sandbox.stub(p3, 'askExchangePlayerIdx').returns(3);  // P4

            const promptStub = sinon.stub();
            for (let playerIdx = 0; playerIdx < NUM_PLAYERS; playerIdx++) {
                promptStub.withArgs(`Please input the name for P${playerIdx + 1}: `).resolves(`P${playerIdx + 1}`);
            }

            const consoleSpy = sandbox.spy(console, 'log');

            const game = new Game(players, deck, promptStub);

            // When
            await game.start();

            // Then
            expect(consoleSpy.calledWith('The game winner is P4 - P4 with 4 points.')).to.be.true;
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should print `The game winner is P2 - P2 with 7 points.`', async () => {
            // Given
            //   P1 exchanges hands with P4 at round 1
            //   P2 exchanges hands with P1 at round 2
            //   P3 exchanges hands with P2 at round 3
            const deck = new MockDeck(createCards());
            const players = [
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
            ];
            // P1 exchanges hands with P4 at round 1
            const p1 = players[0] as Player;
            sandbox.stub(p1, 'askExchangeHands').callsFake(function (this: Player) {
                this._canExchangeHands = false;  // P1 decides to exchange hands at round 1
                return true;
            });
            sandbox.stub(p1, 'askExchangePlayerIdx').returns(3);  // P4

            // P2 exchanges hands with P1 at round 2
            const p2 = players[1] as Player;
            let callCountForP2 = 0;
            sandbox.stub(p2, 'askExchangeHands').callsFake(function (this: Player) {
                callCountForP2++;
                if (callCountForP2 < 2) {
                    return false;
                }
                this._canExchangeHands = false;  // P2 decides to exchange hands at round 2
                return true;
            });
            sandbox.stub(p2, 'askExchangePlayerIdx').returns(0);  // P1

            // P3 exchanges hands with P2 at round 3
            const p3 = players[2] as Player;
            let callCountForP3 = 0;
            sandbox.stub(p3, 'askExchangeHands').callsFake(function (this: Player) {
                callCountForP3++;
                if (callCountForP3 < 3) {
                    return false;
                }
                this._canExchangeHands = false;  // P3 decides to exchange hands at round 3
                return true;
            });
            sandbox.stub(p3, 'askExchangePlayerIdx').returns(1);  // P2

            const promptStub = sinon.stub();
            for (let playerIdx = 0; playerIdx < NUM_PLAYERS; playerIdx++) {
                promptStub.withArgs(`Please input the name for P${playerIdx + 1}: `).resolves(`P${playerIdx + 1}`);
            }

            const consoleSpy = sandbox.spy(console, 'log');

            const game = new Game(players, deck, promptStub);

            // When
            await game.start();

            // Then
            expect(consoleSpy.calledWith('The game winner is P2 - P2 with 7 points.')).to.be.true;
        });

        // ------------------------------------------------------------------------------------------------------------
        it(`should throw an error if player index is not between [0, ${NUM_PLAYERS})`, async () => {
            // Given
            //   P1 exchanges hands with P2 at round 1
            const deck = new MockDeck(createCards());
            const players = [
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
            ];
            const p1 = players[0] as Player;
            sandbox.stub(p1, 'askExchangeHands').callsFake(function (this: Player) {
                this._canExchangeHands = false;
                return true;
            });
            sandbox.stub(p1, 'askExchangePlayerIdx').returns(NUM_PLAYERS);  // player index is out of range

            const promptStub = sinon.stub();
            for (let playerIdx = 0; playerIdx < NUM_PLAYERS; playerIdx++) {
                promptStub.withArgs(`Please input the name for P${playerIdx + 1}: `).resolves(`P${playerIdx + 1}`);
            }

            const game = new Game(players, deck, promptStub);

            // When & Then
            try {
                await game.start();
                expect.fail('Expected error was not thrown');
            }
            catch (error) {
                expect(error).to.be.an.instanceOf(Error);
                expect((error as Error).message).to.equal(`Player index must be between [0, ${NUM_PLAYERS})`);
            }
        });
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('constructor()', () => {
        it('should create a Game instance', () => {
            // Given
            const players = [
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
            ];
            const deck = new Deck(createCards());

            // When
            const game = new Game(players, deck);

            // Then
            expect(game).to.be.an.instanceOf(Game);
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should throw an error if invalid number of players - 1', () => {
            // Given
            const players = [
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
            ];
            const deck = new Deck(createCards());

            // When & Then
            try {
                new Game(players, deck);
                expect.fail('Expected error was not thrown');
            }
            catch (error) {
                expect(error).to.be.an.instanceOf(Error);
                expect((error as Error).message).to.equal(`The number of players must be ${NUM_PLAYERS}`);
            }
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should throw an error if invalid number of players - 2', () => {
            // Given
            const players = [
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
                new MockPlayer(),
            ];
            const deck = new Deck(createCards());

            // When & Then
            try {
                new Game(players, deck);
                expect.fail('Expected error was not thrown');
            }
            catch (error) {
                expect(error).to.be.an.instanceOf(Error);
                expect((error as Error).message).to.equal(`The number of players must be ${NUM_PLAYERS}`);
            }
        });
    });
});
