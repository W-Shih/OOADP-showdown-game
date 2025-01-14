// --------------------------------------------------------------------------------------------------------------------
// Node.js built-in modules
import readline from 'readline';

// --------------------------------------------------------------------------------------------------------------------
function prompt(query: string): Promise<string> {
    const readlineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise<string>((resolve) => {
        readlineInterface.question(query, (answer) => {
            resolve(answer.trim());
            readlineInterface.close();
        });
    });
}

export { prompt };

// --------------------------------------------------------------------------------------------------------------------
// interface CliUtils {
//     prompt(query: string): Promise<string>;
// }

// --------------------------------------------------------------------------------------------------------------------
// class CliUtilsDefaultImpl implements CliUtils {
//     private _readline = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//     });

//     // ----------------------------------------------------------------------------------------------------------------
//     public prompt(query: string): Promise<string> {
//         return new Promise<string>((resolve) => {
//             this._readline.question(query, (answer) => {
//                 resolve(answer.trim());
//                 this._readline.close();
//             });
//         });
//     }
// }

// export { CliUtils, CliUtilsDefaultImpl }
