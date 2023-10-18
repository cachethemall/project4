import { useState } from "react"
import { RcExampleApexCharts } from "./RcExampleApexCharts";
import { RcExampleLightWeightCharts } from "./RcExampleLightWeightCharts";

export function RcComparisionUiFw() {
    return <></>;
}

export function RcCompareChartLib() {
    return <></>;
}

export function RcComparisionMain() {
    return <>
        <RcComparisionUiFw />
        <RcCompareChartLib />
        <h1>Css Frameworks</h1>
        <h1>Web IDEs</h1>
    </>;
}

export function RcMainMenu() {
    const [ChartElement2, chartElement2Set] = useState(() => RcComparisionMain);
    const chartLibs = {
        ApexCharts: RcExampleApexCharts,
        "Lightweight Charts": RcExampleLightWeightCharts,
        Comparision: RcComparisionMain
    };
    return <>
        <nav className="navbar navbar-expand-sm bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Chart</a>
                <button className="button navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {Object.entries(chartLibs).map(x => <li className="nav-item" key={x[0]}>
                        <a className="nav-link" onClick={() => {
                            console.log("aaa");
                            chartElement2Set(() => x[1]);
                        }}>{x[0]}</a>
                    </li>)}
                </ul>
            </div>
        </nav>
        <ChartElement2 />
    </>
}