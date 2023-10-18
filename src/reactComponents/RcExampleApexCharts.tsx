import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";


export function RcExampleApexCharts() {
    const chartElementRef = useRef(null);
    useEffect(() => {
        let chart: any;
        async function prepare() {
            let dataJson = await fetch("./data.json").then((response) => response.json()
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
            console.log("ApexCharts destroyed.");
        };
    }, []);
    return <div ref={chartElementRef}></div>;
}
