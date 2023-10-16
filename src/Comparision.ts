import m from "mithril";
import _ from 'lodash';

interface IGithubStat {
    github: string,
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
    npm: string,
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
        github: 'facebook/react',
        npm: '',

    },
    {
        name: 'Preact',
        vdom: 1,
        buildless: 0.5,
        eco: 0,
        hyperscript: 0.5,
        fnComp: 1,
        github: 'preactjs/preact',
        npm: '',
    },
    {
        name: 'Solid',
        vdom: 0,
        buildless: 0.5,
        eco: 0,
        hyperscript: 1,
        fnComp: 1,
        github: 'solidjs/solid',
        npm: '',
    },
    {
        name: 'Mithril',
        vdom: 1,
        buildless: 1,
        eco: 0,
        hyperscript: 1,
        fnComp: 1,
        github: 'MithrilJS/mithril.js',
        npm: '',
    },
    {
        name: 'Inferno',
        vdom: 1,
        buildless: 1,
        eco: 0,
        hyperscript: 1,
        fnComp: 1,
        github: 'infernojs/inferno',
        npm: '',
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

async function updateComparisonList(choices: Array<IChoice>): Promise<Array<IGithubStat>> {
    return await Promise.all(choices.map(async (x) => {
        let json = await getGitHubStarForkWatch(x.github);
        let readme = await fetch(`https://raw.githubusercontent.com/${x.github}/${json.default_branch}/README.md`).then(resp => resp.text());
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
        x.npm = npmPackage;
        x.npmLastMonthDownloadCount = json2.downloads;
        return x as IGithubStat;
    }
    ));
}


export function Comparision() {


    return {
        oninit: async (vnode) => {
            jsUiFws = await updateComparisonList(jsUiFws as Array<IChoice>);
            m.redraw();
        },
        view: (vnode) => {
            let columns = Object.entries(jsUiFws[0]).map(x => {
                const [key] = x;
                return key;

            })
            return [
                m('h1', "JavaScript UI Frameworks"),
                m('table.table',
                    m('thead',
                        m('tr',
                            columns.map(x => m('th', x))
                            // m('th', 'Framework'),
                            // m('th', 'npm'),
                            // m('th', 'npm Last Month Download Count'),
                            // m('th', 'Vdom'),
                            // m('td', 'Buildless'),
                            // m('td', 'Ecosystem'),
                            // m('td', 'Hyperscript'),
                            // m('td', 'Functional Component'),
                            // m('td', 'ghStars'),
                            // m('td', 'ghWatchers'),
                            // m('td', 'ghForks'),
                            // m('td', 'ghIssues'),
                            // m('td', 'ghNetwork'),
                            // m('td', 'ghSubscribers'),
                            // m('td', 'ghLastPushed'),
                        )
                    ),
                    m('tbody',
                        jsUiFws.map(x => m('tr',
                            columns.map(key => {
                                return m('td.text', x[key]);
                            })
                        ))
                    )
                ),
                m('h1', "Chart Libraries"),
                m('h1', "Css Frameworks"),
                m('h1', "IDEs"),
            ];
        }
    };
}