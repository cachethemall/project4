import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { EmptyDiv, mainMenu } from "./mainMenu";
import { showChart } from "./chartLib";
import m from "mithril";

function ExampleComponent() {
  return {view: () => m("h1", "abc233")}
}
m.mount(document.getElementById("appContainer"), mainMenu);

// const reactRoot = ReactDOM.createRoot(document.getElementById('root')!);
// let cc = 0;
// setInterval(() => {
//   reactRoot.render(
//     <React.StrictMode>
//       <App name={cc} />
//     </React.StrictMode>
//   );  
//   cc++;
// }, 1000);

// m.route(document.getElementById("appContainer"), "/main", {"/main": mainMenu});

