import { MkCompareTable } from "../mithrilComponents/CompareTableCommon";
import { jsUiFws } from "./ComparisionData";

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




