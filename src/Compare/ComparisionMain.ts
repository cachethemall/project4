import { CompareChartLib } from "./CompareChartLib";
import { ComparisionUiFw } from "./ComparisionUiFw";
import m from "mithril";

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