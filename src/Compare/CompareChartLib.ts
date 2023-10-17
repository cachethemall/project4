import { IChoice } from "./CompareTableCommon";
import { MkCompareTable } from "./CompareTableCommon";

let choices: Array<Partial<IChoice>> = [
    {
        name: 'Lightweight Charts',
        goodDoc: 1,
        githubPath: 'tradingview/lightweight-charts',
    },
    {
        name: 'Apex Charts',
        githubPath: '',
        panning: 0,
        comment: 'slow'
    },
    {
        name: 'Google Chart',
        githubPath: '',
    },
    {
        name: 'Charts.js',
        goodDoc: 0,
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

export const CompareChartLib = MkCompareTable(choices, "JS Chart Libraries");
