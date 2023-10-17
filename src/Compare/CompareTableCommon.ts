import m from "mithril";


import _ from "lodash";

import { displaySymbol, getFirstMatchGroup } from "../utils";
import { parseCamelCaseToWords } from "../utils";


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
}export function generateTable(records: Array<any>, switcher, type?: string) {
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
export function generateTableType2(records, switcher) {
    let columns = Object.entries(records[0]).map(x => {
        const [key] = x;
        return key;

    });

    return m('table.table',
        m('thead',
            m('tr',
                m('th', { onclick: switcher }, '🔀'),
                ...columns.filter(x => x !== 'name').map(x => m('th', x))
            )
        ),
        m('tbody',
            records.map(x => m('tr',
                columns.map(key => {
                    let value = x[key];
                    if (key === 'pushed_at') return m('td.text', new Date(value).toLocaleString());;
                    if (['vdom', 'buildless', 'eco', 'hyperscript', 'fnComp'].includes(key)) {
                        return m('td.text-center', displaySymbol(value));
                    }
                    if (_.isNumber(value))
                        return m('td.text-end', value);
                    return m('td.text', value);
                })

            ))
        )
    );
}
export function generateTableType1(records, switcher) {
    let columns = Object.entries(records[0]).map(x => {
        const [key] = x;
        return key;

    });

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
                    let value = x[key];
                    if (key === 'pushed_at') return m('td.text', new Date(value).toLocaleString());;
                    if (['vdom', 'buildless', 'eco', 'hyperscript', 'fnComp'].includes(key)) {
                        return m('td.text-center', displaySymbol(value));
                    }
                    if (_.isNumber(value))
                        return m('td.text-end', value.toLocaleString());
                    return m('td.text', value);
                }
                )
            )
            )

        )
    );
}
export async function updateComparisonList(choices: Array<IChoice>): Promise<Array<IGithubStat>> {
    return await Promise.all(choices.map(async (x) => {
        let json = await getGitHubStarForkWatch(x.githubPath);
        let readme = await fetch(`https://raw.githubusercontent.com/${x.githubPath}/${json.default_branch}/README.md`).then(resp => resp.text());
        const regexes = [/\(https:\/\/www\.npmjs\.com\/package\/(.+?)\)/m, /\(http:\/\/npm\.im\/(.+?)\)/m];
        let npmPackage = getFirstMatchGroup(readme, regexes);

        let json2 = await fetch(`https://api.npmjs.org/downloads/point/last-month/${npmPackage}`).then(resp => resp.json());

        x.stargazers_count = json.stargazers_count;
        x.watchers_count = json.watchers_count;
        x.forks_count = json.forks_count;
        x.open_issues_count = json.open_issues_count;
        x.network_count = json.network_count;
        x.subscribers_count = json.subscribers_count;
        x.pushed_at = json.pushed_at;
        x.npmPath = npmPackage;
        x.npmLastMonthDownloadCount = json2.downloads;
        return x as IGithubStat;
    }
    ));
}
export async function getGitHubStarForkWatch(repo: string): Promise<any> {
    let json = await fetch(`https://api.github.com/repos/${repo}`).then(resp => resp.json());
    return json;
}
export interface IGithubStat {
    githubPath: string;
    stargazers_count: number;
    watchers_count: number;
    forks_count: number;
    open_issues_count: number;
    network_count: number;
    subscribers_count: number;
    pushed_at: string;
}
export interface IChoice extends IGithubStat {
    name: string;
    npmPath: string;
    npmLastMonthDownloadCount: number;
    [key: string]: any;
}

