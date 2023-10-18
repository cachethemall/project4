
import { jsUiFws, libChartChoices } from "../Compare/ComparisionData";
import m from "mithril";
import { MkCompareTable } from "./CompareTableCommon";

export function ComparisionMain() {


    return {

        view: (vnode) => {
            return [
                m(ComparisionUiFw),
                m(CompareChartLib),
                m('h1', "Css Frameworks"),
                m('h1', "IDEs"),
            ];
        }
    };
}
export const ComparisionUiFw = MkCompareTable(jsUiFws, "JavaScript UI Frameworks");

export const CompareChartLib = MkCompareTable(libChartChoices, "JS Chart Libraries");

