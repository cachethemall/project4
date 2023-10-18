import { useEffect, useRef, useState } from "react";
import { m } from "../utils";
import { createChart } from "lightweight-charts";

export function RcExampleLightWeightCharts() {
    const [dataJson, dataJsonSet] = useState(null);
    useEffect(() => {
        (async () => {
            let dataJson1 = await fetch("./data.json").then((response) => response.json()
            );
            dataJson1 = dataJson1.map((d) => d.map((dd) => {
                dd.time += 25200;
                return dd;
            })
            );
            dataJsonSet(dataJson1);
        })();
    }, []);


    return <RcChartApp chartData={dataJson} textData={"abc"} />;
}

export function RcTopLeftInfo(props) {
    return m(
        "div",
        { class: "position-absolute top-0 start-0 z-1" },
        m("dl", { class: "row" }, [
            m("dt", { class: "col" }, props?.currentBar?.symbol),
            m("dd", { class: "col" }, ""),
            // m("dt", { class: "col" }, "T"),
            // m(
            //   "dd",
            //   { class: "col" },
            //   bar?.time != null ? timestampToDateString(bar?.time) : null
            // ),
            m("dt", { class: "col" }, "O"),
            m("dd", { class: "col" }, props?.currentBar?.open),
            m("dt", { class: "col" }, "H"),
            m("dd", { class: "col" }, props?.currentBar?.high),
            m("dt", { class: "col" }, "L"),
            m("dd", { class: "col" }, props?.currentBar?.low),
            m("dt", { class: "col" }, "C"),
            m("dd", { class: "col" }, props?.currentBar?.close),
            m("dt", { class: "col" }, "V"),
            m("dd", { class: "col" }, props?.currentBar?.volume),
        ]),
    );
}


export function RcChartApp(props) {
    const [currentBar, currentBarSet] = useState(null);
    const [mouseEventParamData, mouseEventParamDataSet] = useState(null);
    const { chartData } = props;
    let candleStickData: Array<any> = [];
    let volumeSeries: any = null;
    let mainSeries: any = null;
    const chartElementRef = useRef(null);

    useEffect(() => {
        const chartOptions = {
            layout: {
                textColor: "#d1d4dc",
                //backgroundColor: '#131722',
                background: { type: "solid", color: "#131722" },
            },
            grid: {
                vertLines: {
                    color: "rgba(42, 46, 57, 0)",
                },
                horzLines: {
                    color: "rgba(42, 46, 57, 0.6)",
                },
            },
            //rightPriceScale: {
            //    borderVisible: false,
            //},
        };

        // @ts-ignore
        let chart = createChart(chartElementRef.current!, chartOptions);

        volumeSeries = chart.addHistogramSeries({
            priceFormat: {
                type: "volume",
            },
            priceScaleId: "", // set as an overlay by setting a blank priceScaleId
        });
        volumeSeries.priceScale().applyOptions({
            // set the positioning of the volume series
            scaleMargins: {
                top: 0.7, // highest point of the series will be 70% away from the top
                bottom: 0.0,
            },
        });



        // Generate sample data to use within a candlestick series

        // Create the Main Series (Candlesticks)
        mainSeries = chart.addCandlestickSeries();
        // Set the data for the Main Series

        mainSeries.priceScale().applyOptions({
            scaleMargins: {
                top: 0.1, // highest point of the series will be 10% away from the top
                bottom: 0.4, // lowest point will be 40% away from the bottom
            },
        });



        chart.resize(800, 600);

        const timeScale = chart.timeScale();
        timeScale.applyOptions({
            timeVisible: true,
            secondsVisible: false,
        });

        // Adding a window resize event handler to resize the chart when
        // the window size changes.
        // Note: for more advanced examples (when the chart doesn't fill the entire window)
        // you may need to use ResizeObserver -> https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
        //window.addEventListener("resize", () => {
        //    chart.resize(window.innerWidth, window.innerHeight);
        //});



        const getLastBar = (series) => {
            // @ts-ignore
            const lastIndex = series.dataByIndex(Math.Infinity, -1);
            return series.dataByIndex(lastIndex);
        };

        chart.subscribeCrosshairMove(function (mouseEventParam) {
            const validCrosshairPoint = !(
                mouseEventParam === undefined ||
                mouseEventParam.time === undefined ||
                // @ts-ignore
                mouseEventParam.point.x < 0 ||
                // @ts-ignore
                mouseEventParam.point.y < 0
            );

            const bar = validCrosshairPoint
                ? candleStickData.find((d) => d.time === mouseEventParam.time)
                // @ts-ignore
                : candleStickData.at(-1);

            currentBarSet(bar);
            // @ts-ignore
            mouseEventParamDataSet(mouseEventParam);
        });

        if (chartData !== null) {
            console.log(chartData[0][0]);
            candleStickData = chartData[0];
            currentBarSet(candleStickData[candleStickData.length - 1]);
            volumeSeries?.setData(
                candleStickData.map((d) => ({
                    time: d.time,
                    value: d.volume,
                    color: d.close >= d.open ? "#26a69a" : "#ef5350",
                })),
            );
            mainSeries?.setData(candleStickData);
        }


        return () => {
            // window.removeEventListener('resize', handleResize);
            chart.remove();
        };
    }, [chartData]);
    return m("div", { class: "container-fluid" }, [
        m(
            "div",
            { class: "row" },
            m("div", { class: "col" }, [
                m('div', {class: "position-relative"}, 
                [m("div", {
                    ref: chartElementRef,
                    id: "chartContainer",
                    // class: "z-0",
                }),
                m(RcTopLeftInfo, {
                    currentBar: currentBar,
                    mouseEventParamData: mouseEventParamData,
                }),])
                
            ]),
        ),
        m("div", { class: "row" }, [m("div", { class: "col" })]),
    ]);
}
