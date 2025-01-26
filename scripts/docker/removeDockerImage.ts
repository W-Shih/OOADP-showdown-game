// --------------------------------------------------------------------------------------------------------------------
// Node.js built-in modules
import { execSync } from 'child_process';

// --------------------------------------------------------------------------------------------------------------------
// Project modules
import packageJson from '../../package.json';


// --------------------------------------------------------------------------------------------------------------------
try {
    // 取得 package.json 中的 name 和 version
    const { name, version } = packageJson;

    // 執行 Docker build
    execSync(`docker image rm -f ${name}:${version}`, { stdio: 'inherit' });
}
catch (error) {
    if (error instanceof Error) {  // https://nodejs.org/docs/latest-v20.x/api/child_process.html#child_processexecsynccommand-options
        console.error('Error during docker image remove:', error.message);
        // Don't exit here for next command to run
        // process.exit(1);
    }
    else {
        console.error('Unknown error during docker image remove:', error);
    }
    // Don't throw error here for next command to run
    // throw error;
}
