import m from "mithril";
import _ from 'lodash';

interface IGithubStat {
    githubPath: string,
    stargazers_count: number,
    watchers_count: number,
    forks_count: number,
    open_issues_count: number,
    network_count: number,
    subscribers_count: number,
    pushed_at: string,
}

interface IChoice extends IGithubStat {
    name: string,
    npmPath: string,
    npmLastMonthDownloadCount: number,
    [key: string]: any;
}

let jsUiFws: Array<Partial<IChoice>> = [
    {
        name: 'React',
        vdom: 1,
        buildless: 0.5,
        eco: 1,
        hyperscript: 0.5,
        fnComp: 1,
        githubPath: 'facebook/react',
        npmPath: '',

    },
    {
        name: 'Preact',
        vdom: 1,
        buildless: 0.5,
        eco: 0,
        hyperscript: 0.5,
        fnComp: 1,
        githubPath: 'preactjs/preact',
        npmPath: '',
    },
    {
        name: 'Solid',
        vdom: 0,
        buildless: 0.5,
        eco: 0,
        hyperscript: 1,
        fnComp: 1,
        githubPath: 'solidjs/solid',
        npmPath: '',
    },
    {
        name: 'Mithril',
        vdom: 1,
        buildless: 1,
        eco: 0,
        hyperscript: 1,
        fnComp: 1,
        githubPath: 'MithrilJS/mithril.js',
        npmPath: '',
    },
    {
        name: 'Inferno',
        vdom: 1,
        buildless: 1,
        eco: 0,
        hyperscript: 1,
        fnComp: 1,
        githubPath: 'infernojs/inferno',
        npmPath: '',
    },
];

function displaySymbol(value: number): string {
    if (value === 1) return '✔';
    if (value === 0.5) return '✓';
    if (value === 0) return '✖';
    return '';
}

async function getGitHubStarForkWatch(repo: string): Promise<any> {
    let json = await fetch(`https://api.github.com/repos/${repo}`).then(resp => resp.json());
    return json;
}

function getFirstMatchGroup(readme: string, regexes: Array<RegExp>): string {
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

function parseCamelCaseToWords(text: string): string {
    return text.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/_/g, ' ');
}

async function updateComparisonList(choices: Array<IChoice>): Promise<Array<IGithubStat>> {
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

function generateTableType1(records) {
    let columns = Object.entries(records[0]).map(x => {
        const [key] = x;
        return key;

    })
    return m('table.table.table-striped-columns',
        m('thead',
            m('tr',
                ['#'].concat(records.map(x => x.name!)).map(x => m('th[scope=col]', x))
            )
        ),
        m('tbody',
            columns.filter(x => x !== 'name').map(key =>

                m('tr', m('th[scope=row]', parseCamelCaseToWords(key)),
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
            ),

        )
    );
}

function generateTableType2(records) {
    let columns = Object.entries(records[0]).map(x => {
        const [key] = x;
        return key;

    })

    return m('table.table',
        m('thead',
            m('tr',
                columns.map(x => m('th', x))
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

function generateTable(records: Array<any>, type: string | undefined) {
    if (!type) {
        var numberOfProps: number = Math.max(...records.map(x => Object.entries(x).length));
        if (numberOfProps > records.length) return generateTableType1(records);
        return generateTableType2(records);
    } else if (type === 'type1') {
        return generateTableType1(records);
    } else if (type == 'type2') {
        return generateTableType2(records);
    } else {
        return m('span', 'Unknown table type!');
    }

}

export function ComparisionUiFw() {
    return {
        oninit: async (vnode) => {
            jsUiFws = await updateComparisonList(jsUiFws as Array<IChoice>);
            m.redraw();
        },
        view: (vnode) => {
            
            return [
                m('h1', "JavaScript UI Frameworks"),
                generateTableType2(jsUiFws),
            ];
        }
    };
}


