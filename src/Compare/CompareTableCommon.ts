import m from "mithril";


import _ from "lodash";

import { displaySymbol } from "../utils";
import { parseCamelCaseToWords } from "../utils";
import { IChoice } from "./Interfaces";
import { updateComparisonList } from "./GatherData";


export function MkCompareTable(records, title: string) {
    return () => {
        let tableType = '';
        function switchTableType(type?: string) {
            if (!type) tableType = type!;
            else if (tableType === 'type1') tableType = 'type2';
            else tableType = 'type1';
        }

        return {
            oninit: async (vnode) => {
                records = await updateComparisonList(records as Array<IChoice>);
                m.redraw();
            },
            view: (vnode) => {

                return [
                    m('h1', title),
                    generateTable(records, switchTableType, tableType),
                ];
            }
        };
    };
} export function generateTable(records: Array<any>, switcher, type?: string) {
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

function findAllColumns(records) {
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

