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
    console.error('Error during docker image remove:', (error as Error).message);
    // Don't throw error here for next command to run
    // process.exit(1);
}
