// --------------------------------------------------------------------------------------------------------------------
// Node.js built-in modules
import { execSync } from 'child_process';

// --------------------------------------------------------------------------------------------------------------------
// Project modules
import { getPackageJsonFields } from '../utils';


// --------------------------------------------------------------------------------------------------------------------
try {
    // 取得 package.json 中的 name 和 version
    const { name, version } = getPackageJsonFields(['name', 'version']);

    // 交互式運行 Docker container
    execSync(
        `docker container run --name ${name} --rm -it ${name}:${version}`,
        { stdio: 'inherit' }
    );
}
catch (error) {
    console.error('Error during docker container run:', (error as Error).message);
    process.exit(1);
}
