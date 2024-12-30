// --------------------------------------------------------------------------------------------------------------------
// Node.js built-in modules
import readline from 'readline';

// --------------------------------------------------------------------------------------------------------------------
// Third party modules
import { expect } from 'chai';
import sinon from 'sinon';

// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { prompt } from '../../src/utils/cli';


// --------------------------------------------------------------------------------------------------------------------
describe('cli utils', () => {
    let sandbox: sinon.SinonSandbox;
    let createInterfaceStub: sinon.SinonStub;
    let questionStub: sinon.SinonStub;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        createInterfaceStub = sandbox.stub(readline, 'createInterface');
        questionStub = sinon.stub();
        createInterfaceStub.returns({
            question: questionStub,
            close: sinon.stub(),
        } as unknown as readline.Interface);
    });

    afterEach(() => {
        sandbox.restore();
    });

    // ----------------------------------------------------------------------------------------------------------------
    describe('prompt()', () => {
        it('should resolve the user input correctly', async () => {
            // Given
            const question = 'What is your name?';
            const answer = 'Wayne';
            questionStub.callsFake((_, cb) => cb(answer));

            // When
            const result = await prompt(question);

            // Then
            expect(result).to.equal(answer);
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should trim the user input', async () => {
            // Given
            const question = 'What is your name?';
            const answer = '  Wayne  ';
            questionStub.callsFake((_, cb) => cb(answer));

            // When
            const result = await prompt(question);

            // Then
            expect(result).to.equal(answer.trim());
        });

        // ------------------------------------------------------------------------------------------------------------
        it('should handle an empty input', async () => {
            // Given
            const question = 'What is your name?';
            const answer = '';
            questionStub.callsFake((_, cb) => cb(answer));

            // When
            const result = await prompt(question);

            // Then
            expect(result).to.equal(answer);
        });
    });
});
