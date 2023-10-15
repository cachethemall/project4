import m from "mithril";
import { exampleApexCharts, exampleLightWeightCharts } from "./exampleCode";

export function EmptyDiv(): any {
    let count = 0;
    return {view: () => m("div", [
        m('button', {onclick: function() {count++}}, count + " clicks"),
        m("p", "Count: " + count),
    ])};
}

export function mainMenu() {
    let chartElement2 = EmptyDiv;
    let chartLibs = {
        ApexCharts: exampleApexCharts,
        "Lightweight Charts": exampleLightWeightCharts,
        Empty: EmptyDiv,
    };
    return {
        view: () => {
            return [
                m(
                    "nav",
                    { class: "navbar navbar-expand-sm bg-body-tertiary" },
                    m("div", { class: "container-fluid" }, [
                        m("a", { class: "navbar-brand", href: "#" }, "Chart"),
                        m(
                            "div",
                            { class: "collapse navbar-collapse", id: "navbarNav" },
                            m(
                                "ul",
                                { class: "navbar-nav" },
                                Object.entries(chartLibs).map((x) => {
                                    return m(
                                        "li",
                                        { class: "nav-item" },
                                        m(
                                            "a",
                                            {
                                                class: "nav-link",
                                                onclick: () => {
                                                    console.log('Set set');
                                                    chartElement2 = x[1];
                                                },
                                            },
                                            x[0],
                                        ),
                                    );
                                }),
                            ),
                        ),
                    ]),
                ),
                m(chartElement2),
            ];
        }
    };
}
