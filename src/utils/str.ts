function isInteger(str: string): boolean {
    return /^\d+$/.test(str);
}

function isValidIntegerInRange(str: string, min: number, max: number): boolean {
    if (!isInteger(str)) {
        return false;
    }
    const num = parseInt(str, 10);
    return num >= min && num <= max;
}

export { isValidIntegerInRange };
