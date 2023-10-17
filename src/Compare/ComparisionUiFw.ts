import { IChoice } from "./CompareTableCommon";
import { MkCompareTable } from "./CompareTableCommon";

let jsUiFws: Array<Partial<IChoice>> = [
    {
        name: 'React',
        vdom: 1,
        buildless: 0.5,
        eco: 1,
        hyperscript: 0.5,
        fnComp: 1,
        githubPath: 'facebook/react',
    },
    {
        name: 'Preact',
        vdom: 1,
        buildless: 0.5,
        eco: 0,
        hyperscript: 0.5,
        fnComp: 1,
        githubPath: 'preactjs/preact',
    },
    {
        name: 'Solid',
        vdom: 0,
        buildless: 0.5,
        eco: 0,
        hyperscript: 1,
        fnComp: 1,
        githubPath: 'solidjs/solid',
    },
    {
        name: 'Mithril',
        vdom: 1,
        buildless: 1,
        eco: 0,
        hyperscript: 1,
        fnComp: 1,
        githubPath: 'MithrilJS/mithril.js',
    },
    {
        name: 'Inferno',
        vdom: 1,
        buildless: 1,
        eco: 0,
        hyperscript: 1,
        fnComp: 1,
        githubPath: 'infernojs/inferno',
    },
];

export const ComparisionUiFw = MkCompareTable(jsUiFws, "JavaScript UI Frameworks");

// export function ComparisionUiFw() {
//     let tableType = '';
//     function switchTableType(type?: string) {
//         if (!type) tableType = type!;
//         else if (tableType === 'type1') tableType = 'type2';
//         else tableType = 'type1';
//     }

//     return {
//         oninit: async (vnode) => {
//             jsUiFws = await updateComparisonList(jsUiFws as Array<IChoice>);
//             m.redraw();
//         },
//         view: (vnode) => {
            
//             return [
//                 m('h1', "JavaScript UI Frameworks"),
//                 generateTable(jsUiFws, switchTableType, tableType),
//             ];
//         }
//     };
// }




