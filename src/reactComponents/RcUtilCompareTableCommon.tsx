import React, { useEffect, useState } from "react";
import { displaySymbol, findAllColumns, m, parseCamelCaseToWords } from "../utils";
import { IChoice } from "../Compare/Interfaces";
import { updateComparisonList } from "../Compare/GatherData";
import _ from "lodash";

function generateTable(records, switcher, type) {
    if (type === 'type1') {
        return generateTableType1(records, switcher);
    } else if (type == 'type2') {
        return generateTableType2(records, switcher);
    } else {
        return m('span', 'Unknown table type!');
    }
}

export function RcUtilMkCompareTable(props) {

    const [tableType, tableTypeSet] = useState('');
    const [records, recordsSet] = useState(props.recordsInit);
    function switchTableType(type?: string) {
        if (!type) tableTypeSet(type!);
        else if (tableType === 'type1') tableTypeSet('type2');
        else tableTypeSet('type1');
    }
    useEffect(() => {
        (async () => {
            var numberOfProps: number = Math.max(...records.map(x => Object.entries(x).length));
            if (numberOfProps > records.length) {
                tableTypeSet('type1');
            } else tableTypeSet('type2');
            
            let recordsFilled = await updateComparisonList(records as Array<IChoice>);
            recordsSet(recordsFilled);

           

        })();
    }, [props.recordsInit]);

    return [
        m('h1', { key: `h1-${props.title}` }, props.title),
        // generateTableType1(records, switchTableType),
        m('div', { key: `table-${props.title}` },
            generateTable(records, switchTableType, tableType)),
    ];

}



function mkTableCells(x, key) {

    let value = x[key];
    if (key === 'githubPath') return m('td', { className: 'text', key: `${x.name}-${key}` }, m('a', { href: `https://github.com/${value}` }, value));
    if (key === 'npmPath') return m('td', { className: 'text', key: `${x.name}-${key}` }, m('a', { href: `https://www.npmjs.com/package/${value}` }, value));
    if (['pushed_at', 'npmLastModifiedDateStr'].includes(key)) return m('td', { className: 'text', key: `${x.name}-${key}` }, value ? new Date(value).toLocaleString() : '');;
    if (['vdom', 'buildless', 'eco', 'hyperscript', 'fnComp'].includes(key)) {
        return m('td', { className: 'text-center', key: `${x.name}-${key}` }, displaySymbol(value));
    }
    if (_.isNumber(value))
        return m('td', { className: 'text-end', key: `${x.name}-${key}` }, value.toLocaleString());
    return m('td', { className: 'text', key: `${x.name}-${key}` }, value);
}

export function generateTableType2(records, switcher) {
    let columns = findAllColumns(records);

    return m('table', { className: 'table' },
        m('thead', null,
            m('tr', null,
                m('th', { onClick: switcher }, '🔀'),
                ...columns.filter(x => x !== 'name').map(x => m('th', { scope: 'col', key: x }, parseCamelCaseToWords(x)))
            )
        ),
        m('tbody', null,
            records.map(x => m('tr', { key: x.name },
                m('th', { scope: 'row' }, x.name),
                columns.filter(key => key !== 'name').map(key => {
                    return mkTableCells(x, key);
                })

            ))
        )
    );
}
export function generateTableType1(records, switcher) {
    let columns = findAllColumns(records);

    return m('table', { className: 'table table-striped-columns' },
        m('thead', null,
            m('tr', null,
                m('th', { onClick: switcher, scope: 'col' }, '🔀'),
                ...records.map(x => x.name!).map(x => m('th', { scope: 'col' }, x))
            )
        ),
        m('tbody',
            columns.filter(x => x !== 'name').map(key => m('tr', { key },
                m('th', { scope: 'row' }, parseCamelCaseToWords(key)),
                ...records.map(x => {
                    return mkTableCells(x, key);
                })

            ))
        )
    );
}
