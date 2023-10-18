import { useEffect, useRef, useState } from "react"
import ApexCharts from "apexcharts";
import { ChartApp } from "../chartLib";
import { chart } from "highcharts";

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

export function RcExampleApexCharts() {
    const chartElementRef = useRef(null);
    useEffect(() => {
        let chart: any;
        async function prepare() {
            let dataJson = await fetch("./data.json").then((response) =>
                response.json(),
            );
            let candleData = dataJson[0].map((x, index) => [
                index,
                x.open,
                x.high,
                x.low,
                x.close,
            ]);

            var options = {
                chart: {
                    type: "candlestick",
                    animations: {
                        enabled: false
                    }
                },
                series: [
                    {
                        name: "sales",
                        data: candleData,
                    },
                ],
                // xaxis: {
                //   categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
                // },
            };

            chart = new ApexCharts(chartElementRef.current, options);

            chart.render();
        }
        prepare();
        return () => {
            chart?.destroy();
            console.log("ApexCharts destroyed.")
        };
    }, []);
    return <div ref={chartElementRef}></div>;
}

export function RcExampleLightWeightCharts() {
    return <><p>s2s</p></>;
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