import { useState } from "react"
import { RcUtilMkCompareTable } from "./RcUtilCompareTableCommon";
import { jsUiFws, libChartChoices, webIDEChoices } from "../Compare/ComparisionData";






export function RcMainMenu() {
    const [ChartElement2, chartElement2Set] = useState(["Js Chart Libs", libChartChoices]);
    const menuItems = {
        "Js Chart Libs": libChartChoices,
        "Web IDEs": webIDEChoices,
        "Js Ui Fws": jsUiFws
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
                    {Object.entries(menuItems).map(x => <li className="nav-item" key={x[0]}>
                        <a className="nav-link" onClick={() => {
                            console.log(x[0]);
                            chartElement2Set([x[0], x[1]]);
                        }}>{x[0]}</a>
                    </li>)}
                </ul>
            </div>
        </nav>
        <RcUtilMkCompareTable title={ChartElement2[0]} recordsInit={ChartElement2[1]} />
    </>
}