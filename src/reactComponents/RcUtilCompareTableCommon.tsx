import { useEffect, useState } from "react";
import { displaySymbol, findAllColumns, m, parseCamelCaseToWords } from "../utils";
import { IChoice } from "../Compare/Interfaces";
import { updateComparisonList } from "../Compare/GatherData";
import _ from "lodash";

function generateTable(records, switcher, type) {
    if (!type) {
        var numberOfProps: number = Math.max(...records.map(x => Object.entries(x).length));
        if (numberOfProps > records.length) {
            switcher('type1');
            return generateTableType1(records, switcher);
        }
        switcher('type2');
        return generateTableType2(records, switcher);
    } else if (type === 'type1') {
        return generateTableType1(records, switcher);
    } else if (type == 'type2') {
        return generateTableType2(records, switcher);
    } else {
        return m('span', 'Unknown table type!');
    }
}

export function RcUtilMkCompareTable(records, recordsSet, title: string) {
    return () => {
        const [tableType, tableTypeSet] = useState('');
        function switchTableType(type?: string) {
            if (!type) tableTypeSet(type!);
            else if (tableType === 'type1') tableTypeSet('type2');
            else tableTypeSet('type1');
        }
        useEffect(() => {
            (async () => {
                recordsSet(await updateComparisonList(records as Array<IChoice>));
            })();
        })

        return [
            m('h1', title),
            generateTable(records, switchTableType, tableType),
        ];
    };
}



function mkTableCells(x, key) {
    let value = x[key];
    if (key === 'githubPath') return m('td.text', m('a', { href: `https://github.com/${value}` }, value));
    if (key === 'npmPath') return m('td.text', m('a', { href: `https://www.npmjs.com/package/${value}` }, value));
    if (['pushed_at', 'npmLastModifiedDateStr'].includes(key)) return m('td.text', value ? new Date(value).toLocaleString() : '');;
    if (['vdom', 'buildless', 'eco', 'hyperscript', 'fnComp'].includes(key)) {
        return m('td.text-center', displaySymbol(value));
    }
    if (_.isNumber(value))
        return m('td.text-end', value.toLocaleString());
    return m('td.text', value);
}

export function generateTableType2(records, switcher) {
    let columns = findAllColumns(records);

    return m('table.table',
        m('thead',
            m('tr',
                m('th', { onclick: switcher }, '🔀'),
                ...columns.filter(x => x !== 'name').map(x => m('th[scope=col]', parseCamelCaseToWords(x)))
            )
        ),
        m('tbody',
            records.map(x => m('tr',
                m('th[scope=row]', x.name),
                columns.filter(key => key !== 'name').map(key => {
                    return mkTableCells(x, key);
                })

            ))
        )
    );
}
export function generateTableType1(records, switcher) {
    let columns = findAllColumns(records);

    return m('table.table.table-striped-columns',
        m('thead',
            m('tr',
                m('th[scope=col]', { onclick: switcher }, '🔀'),
                ...records.map(x => x.name!).map(x => m('th[scope=col]', x))
            )
        ),
        m('tbody',
            columns.filter(x => x !== 'name').map(key => m('tr', m('th[scope=row]', parseCamelCaseToWords(key)),
                records.map(x => {
                    return mkTableCells(x, key);
                }
                )
            )
            )

        )
    );
}
