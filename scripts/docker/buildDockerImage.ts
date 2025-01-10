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

    // 執行 Docker build
    execSync(`docker image build -t ${name}:${version} .`, { stdio: 'inherit' });
}
catch (error) {
    console.error('Error during docker image build:', (error as Error).message);
    process.exit(1);
}
