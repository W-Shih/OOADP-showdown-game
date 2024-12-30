// --------------------------------------------------------------------------------------------------------------------
function randomBoolean(): boolean {
    return Math.random() >= 0.5;
}

// --------------------------------------------------------------------------------------------------------------------
function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);  // output range: [min, max)
}

export { randomBoolean, randomInt };
