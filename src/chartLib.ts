import { createChart } from "lightweight-charts";
import m from "mithril";

let chartDataGlobal: Array<any> = null!;

function prepareChartDataGlobal(priceDataManyJsonStr) {
    chartDataGlobal = JSON.parse(priceDataManyJsonStr);
    chartDataGlobal = chartDataGlobal!.map((d) =>
        d.map((dd) => {
            dd.time += 25200;
            return dd;
        })
    );
}

function GetRoundNumber(price, roundDigit) {
    return ((Math.round((price * 10) ^ roundDigit) / 10) ^ roundDigit).toFixed(
        roundDigit,
    );
}

function timestampToDateString(timestamp) {
    const date = new Date(timestamp * 1000);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(date.getUTCDate()).padStart(2, "0");
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function TopLeftInfo(initialVnode) {

    return {
        view: (vnode) => {
            m(
                "div",
                { class: "z-1 position-absolute p-1" },
                m("dl", { class: "row" }, [
                    m("dt", { class: "col" }, () => props?.currentBar?.symbol),
                    m("dd", { class: "col" }, ""),
                    // m("dt", { class: "col" }, "T"),
                    // m(
                    //   "dd",
                    //   { class: "col" },
                    //   bar?.time != null ? timestampToDateString(bar?.time) : null
                    // ),
                    m("dt", { class: "col" }, "O"),
                    m("dd", { class: "col" }, () => props?.currentBar?.open),
                    m("dt", { class: "col" }, "H"),
                    m("dd", { class: "col" }, () => props?.currentBar?.high),
                    m("dt", { class: "col" }, "L"),
                    m("dd", { class: "col" }, () => props?.currentBar?.low),
                    m("dt", { class: "col" }, "C"),
                    m("dd", { class: "col" }, () => props?.currentBar?.close),
                    m("dt", { class: "col" }, "V"),
                    m("dd", { class: "col" }, () => props?.currentBar?.volume),
                ]),
            );
        }
    };
}

export function ChartApp(initialVnode) {
    //  const appContainerRef = useRef(null);
    let chartContainerRef;
    let currentBar: any = null;
    let mouseEventParamData: any = null;

  
    return {
        oninit: (vnode) => {
            console.log(vnode.state.chartData[0][0]);
            const candleStickData = vnode.state.chartData[0];
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
    
            const chart = createChart(chartContainerRef, chartOptions);
    
            const volumeSeries = chart.addHistogramSeries({
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
    
            volumeSeries.setData(
                candleStickData.map((d) => ({
                    time: d.time,
                    value: d.volume,
                    color: d.close >= d.open ? "#26a69a" : "#ef5350",
                })),
            );
    
            // Generate sample data to use within a candlestick series
    
            // Create the Main Series (Candlesticks)
            const mainSeries = chart.addCandlestickSeries();
            // Set the data for the Main Series
            mainSeries.setData(candleStickData);
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
    
            currentBar = (candleStickData[candleStickData.length - 1]);
    
            const getLastBar = (series) => {
                const lastIndex = series.dataByIndex(Math.Infinity, -1);
                return series.dataByIndex(lastIndex);
            };
    
            chart.subscribeCrosshairMove(function (mouseEventParam) {
                const validCrosshairPoint = !(
                    mouseEventParam === undefined ||
                    mouseEventParam.time === undefined ||
                    mouseEventParam.point.x < 0 ||
                    mouseEventParam.point.y < 0
                );
                const bar = validCrosshairPoint
                    ? candleStickData.find((d) => d.time === mouseEventParam.time)
                    : candleStickData.at(-1);
    
                currentBar = (bar);
                mouseEventParamData = (mouseEventParam);
                return () => {
                    chart.remove();
                };
            });
        },
        view: (vnode) => {
            return m("div", { class: "container-fluid" }, [
                m(
                    "div",
                    { class: "row" },
                    m("div", { class: "col" }, [
                        m(TopLeftInfo, {
                            currentBar: currentBar,
                            mouseEventParamData: mouseEventParamData,
                        }),
                        m("div", {
                            id: "chartContainer",
                            class: "z-0 position-absolute",
                            ref: (el) => chartContainerRef = el,
                        }),
                    ]),
                ),
                m("div", { class: "row" }, [m("div", { class: "col" })]),
            ]);
        }
    }
}

export function showChart(dataJsonStr) {
    prepareChartDataGlobal(dataJsonStr);
    m.render(
        m(ChartApp, { dataJsonStr: dataJsonStr }),
        document.getElementById("appContainer"),
    );
}
