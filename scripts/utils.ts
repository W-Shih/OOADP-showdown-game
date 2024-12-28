// --------------------------------------------------------------------------------------------------------------------
// Node.js built-in modules
import * as fs from 'fs';
import * as path from 'path';


// --------------------------------------------------------------------------------------------------------------------
type PackageJsonFields = 'name' | 'version' | 'description' | 'scripts' | 'dependencies';


// --------------------------------------------------------------------------------------------------------------------
function getPackageJsonFields(fields: PackageJsonFields[]): Partial<Record<PackageJsonFields, any>> {  // eslint-disable-line @typescript-eslint/no-explicit-any
    const projectRoot = process.cwd();
    const packageJsonPath = path.join(projectRoot, 'package.json');

    if (!fs.existsSync(packageJsonPath)) {
        console.error('package.json not found at:', packageJsonPath);
        process.exit(1);
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const result: Partial<Record<PackageJsonFields, any>> = {};  // eslint-disable-line @typescript-eslint/no-explicit-any

    for (const field of fields) {
        if (field in packageJson) {
            result[field] = packageJson[field];
            continue;
        }
        console.warn(`Field - '${field}' not found in package.json`);
    }

    return result;
}

export { getPackageJsonFields };
