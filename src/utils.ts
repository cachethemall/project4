import React from "react";

export function parseCamelCaseToWords(text: string): string {
    return text.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/_/g, ' ');
}

export function getFirstMatchGroup(readme: string, regexes: Array<RegExp>): string {
    let npmPackage = '';
    for (const regex of regexes) {
        let m = regex.exec(readme);

        if (m !== null) {

            npmPackage = m[1];
            break;
        }
    }
    return npmPackage;
}

export function displaySymbol(value: number): string {
    if (value === 1) return '✔';
    if (value === 0.5) return '✓';
    if (value === 0) return '✖';
    return '';
}

export const m = React.createElement;
function GetRoundNumber(price, roundDigit) {
    return ((Math.round((price * 10) ^ roundDigit) / 10) ^ roundDigit).toFixed(
        roundDigit
    );
}function timestampToDateString(timestamp) {
    const date = new Date(timestamp * 1000);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

