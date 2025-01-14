// --------------------------------------------------------------------------------------------------------------------
// Third party modules
import { expect } from 'chai';
import sinon from 'sinon';

// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { isValidIntegerInRange } from '../../src/utils/str';


// --------------------------------------------------------------------------------------------------------------------
describe('str utils', () => {
    let sandbox: sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('isValidIntegerInRange()', () => {
        it('should pass when `value` is within the range', () => {
            // Given
            const min = 0;
            const max = 10;

            // When & Then
            expect(isValidIntegerInRange('0', min, max)).to.be.true;
            expect(isValidIntegerInRange('5', min, max)).to.be.true;
            expect(isValidIntegerInRange('10', min, max)).to.be.true;
            expect(isValidIntegerInRange('11', min, max)).to.be.false;
            expect(isValidIntegerInRange('0.5', min, max)).to.be.false;
            expect(isValidIntegerInRange('5.5', min, max)).to.be.false;
            expect(isValidIntegerInRange(' ', min, max)).to.be.false;
            expect(isValidIntegerInRange('a', min, max)).to.be.false;
            expect(isValidIntegerInRange('0a', min, max)).to.be.false;
        });
    });
});
