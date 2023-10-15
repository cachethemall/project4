import ApexCharts from "apexcharts";
import { ChartApp } from "./chartLib";
import m from "mithril";

export function exampleApexCharts() {

    return {
        oncreate: (vnode) => {
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

                let chart = new ApexCharts(vnode.dom, options);

                chart.render();
            }
            prepare();
        },
        view: (vnode) => {
            return m("div");
        }
    }
}

export function exampleLightWeightCharts() {
    let dataJson = null;


    return {
        oncreate: async (vnode) => {
            let dataJson1 = await fetch("./data.json").then((response) =>
                response.json(),
            );
            dataJson1 = dataJson1.map((d) =>
                d.map((dd) => {
                    dd.time += 25200;
                    return dd;
                })
            );
            dataJson = (dataJson1);
            m.redraw();
        },
        view: (vnode) => {

            return m(ChartApp, { chartData: dataJson, textData: "abc" });
        }
    };
}
