
import { MkCompareTable } from "./CompareTableCommon";
import { IChoice } from "./Interfaces";

let choices: Array<Partial<IChoice>> = [
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

export const CompareChartLib = MkCompareTable(choices, "JS Chart Libraries");
