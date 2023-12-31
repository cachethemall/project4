import React from "react";
import _ from "lodash";

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

export function m(...args: Array<any>) {
    if (args.length >= 3 || args.length == 1) {
        return React.createElement(...args);
    }
    else if (!_.isPlainObject(args[1])) {
        return React.createElement(args[0], null, args[1]);
    } else {
        return React.createElement(...args);
    }
}
function GetRoundNumber(price, roundDigit) {
    return ((Math.round((price * 10) ^ roundDigit) / 10) ^ roundDigit).toFixed(
        roundDigit
    );
}

function timestampToDateString(timestamp) {
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
export function findAllColumns(records) {
    let allColumns: Array<string> = [];
    for (const record of records) {
        let columns = Object.entries(record).map(x => {
            const [key] = x;
            return key;
        });
        columns.forEach(x => {
            if (!allColumns.includes(x)) allColumns.push(x);
        })
    }
    return allColumns;
}
