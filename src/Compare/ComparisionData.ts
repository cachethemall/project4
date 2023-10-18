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

export let libChartChoices: Array<Partial<IChoice>> = [
    {
        name: 'Lightweight Charts',
        goodDoc: 1,
        npmPath: 'lightweight-charts',
    },
    {
        name: 'Charts.js',
        goodDoc: 0,
        npmPath: 'chart.js',
        comment: 'No doc for candlestick chart'
    },
    {
        name: 'Apex Charts',
        npmPath: 'apexcharts',
        panning: 0,
        comment: 'slow'
    },
    {
        name: 'Google Chart',
        githubPath: '',
    },

    {
        name: 'HighCharts',
        githubPath: '',
    },
    {
        name: 'SciCharts',
        githubPath: '',
    },
    {
        name: 'techan.js',
        githubPath: '',
    },
    {
        name: 'AnyChart',
        githubPath: '',
    },
    {
        name: 'Echarts',
        githubPath: '',
    },
    {
        name: 'amchart',
        githubPath: '',
    },
    {
        name: 'react-financial-charts',
        githubPath: '',
    },
    {
        name: 'SyncFusion',
        githubPath: '',
        paid: 1,
    },
    {
        name: 'lightningchart',
        githubPath: '',
    },
    {
        name: 'LiveCharts2',
        githubPath: '',
    },
];

