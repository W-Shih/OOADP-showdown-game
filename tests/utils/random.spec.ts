// --------------------------------------------------------------------------------------------------------------------
// Third party modules
import { expect } from 'chai';
import sinon from 'sinon';

// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { randomBoolean, randomInt } from '../../src/utils/random';


// --------------------------------------------------------------------------------------------------------------------
describe('random utils', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        sandbox.stub(Math, 'random');
    });

    afterEach(() => {
        sandbox.restore();
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('randomBoolean()', () => {
        it('should return true', () => {
            // Given
            const randomStub = Math.random as sinon.SinonStub;
            randomStub.returns(0.7);

            // When
            const result = randomBoolean();

            // Then
            expect(result).to.be.true;
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should return false', () => {
            // Given
            const randomStub = Math.random as sinon.SinonStub;
            randomStub.returns(0.3);

            // When
            const result = randomBoolean();

            // Then
            expect(result).to.be.false;
        });
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('randomInt()', () => {
        it('should return `0`', () => {
            // Given
            const randomStub = Math.random as sinon.SinonStub;
            randomStub.returns(0);

            // When
            const result = randomInt(0, 10);

            // Then
            expect(result).to.equal(0);
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should return `5`', () => {
            // Given
            const randomStub = Math.random as sinon.SinonStub;
            randomStub.returns(0.5);

            // When
            const result = randomInt(0, 10);

            // Then
            expect(result).to.equal(5);
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should return `9`', () => {
            // Given
            const randomStub = Math.random as sinon.SinonStub;
            randomStub.returns(0.9999999999999999);

            // When
            const result = randomInt(0, 10);

            // Then
            expect(result).to.equal(9);
        });
    });
});
