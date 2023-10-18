import { IChoice } from "./Interfaces";


export let jsUiFws: Array<Partial<IChoice>> = [
    {
        name: 'React',
        vdom: 1,
        buildless: 0.5,
        eco: 1,
        hyperscript: 0.5,
        fnComp: 1,
        githubPath: 'facebook/react',
    },
    {
        name: 'Preact',
        vdom: 1,
        buildless: 0.5,
        eco: 0,
        hyperscript: 0.5,
        fnComp: 1,
        githubPath: 'preactjs/preact',
    },
    {
        name: 'Solid',
        vdom: 0,
        buildless: 0.5,
        eco: 0,
        hyperscript: 1,
        fnComp: 1,
        githubPath: 'solidjs/solid',
    },
    {
        name: 'Mithril',
        vdom: 1,
        buildless: 1,
        eco: 0,
        hyperscript: 1,
        fnComp: 1,
        githubPath: 'MithrilJS/mithril.js',
    },
    {
        name: 'Inferno',
        vdom: 1,
        buildless: 1,
        eco: 0,
        hyperscript: 1,
        fnComp: 1,
        githubPath: 'infernojs/inferno',
    },
];
