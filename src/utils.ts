
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

