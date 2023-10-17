import { ComparisionUiFw } from "./ComparisionUiFw";
import m from "mithril";

export function ComparisionMain() {


    return {

        view: (vnode) => {
            return [
                m(ComparisionUiFw),
                m('h1', "Chart Libraries"),
                m('h1', "Css Frameworks"),
                m('h1', "IDEs"),
            ];
        }
    };
}