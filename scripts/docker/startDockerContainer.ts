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

    // 交互式運行 Docker container
    execSync(
        `docker container run --name ${name} --rm -it ${name}:${version}`,
        { stdio: 'inherit' }
    );
}
catch (error) {
    if (error instanceof Error) {  // https://nodejs.org/docs/latest-v20.x/api/child_process.html#child_processexecsynccommand-options
        console.error('Error during docker container run:', error.message);
        process.exit(1);
    }
    throw error;
}
