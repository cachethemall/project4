import { RcExampleApexCharts } from "../reactComponents/RcExampleApexCharts";
import { RcExampleLightWeightCharts } from "../reactComponents/RcExampleLightWeightCharts";
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
        comment: '',
        goodDoc: 1,
        zoom: 1,
        panning: 1,
        npmPath: 'lightweight-charts',
        demoComponent: RcExampleLightWeightCharts,
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
    // Bad
    {
        name: 'LiveCharts2',
        githubPath: '',
        comment: 'Blazor WASM',
    },
    {
        name: 'Charts.js',
        goodDoc: 0,
        npmPath: 'chart.js',
        comment: 'No doc for candlestick chart',
    },
    {
        name: 'Apex Charts',
        npmPath: 'apexcharts',
        goodDoc: 1,
        zoom: 0.5,
        panning: 0,
        comment: 'slow',
        demoComponent: RcExampleApexCharts,
    },
    {
        name: 'Google Chart',
        githubPath: '',
        comment: "Candlestick chart can't pan & zoom freely. No npm/es module.",
    },

];

export let webIDEChoices: Array<Partial<IChoice>> = [
    {
        name: 'https://stackblitz.com/',
        replaceMultipleFiles: 1,
        privateRepo: 1,
        refactor: 1,
    },
    {
        name: 'https://codesandbox.io/',
        replaceMultipleFiles: 0,
        privateRepo: 0,
    },
    {
        name: 'https://replit.com/',
        replaceMultipleFiles: 1,
        refactor: 0.5,
    },
    {
        name: 'https://glitch.com/',
        replaceMultipleFiles: 0,

    }
].map((x: any) => {
    const domain = new URL(x.name).hostname;
    x.url = x.name;
    x.name = domain;
    return x;
});