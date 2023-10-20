import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
// import { mainMenu } from "./mithrilComponents/mainMenu.ts";
// import m from "mithril";
import { RcMainMenu } from './reactComponents/ReactMainMenu.tsx';


// m.mount(document.getElementById("appContainer")!, mainMenu);

const reactRoot = ReactDOM.createRoot(document.getElementById('root')!);
reactRoot.render(
      // <React.StrictMode>
        <RcMainMenu />
      // </React.StrictMode>
    );  

// let cc = 0;
// setInterval(() => {
//   reactRoot.render(
//     <React.StrictMode>
//       <App name={cc} />
//     </React.StrictMode>
//   );  
//   cc++;
// }, 1000);

