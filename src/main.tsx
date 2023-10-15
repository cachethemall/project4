import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
const reactRoot = ReactDOM.createRoot(document.getElementById('root')!);
let cc = 0;
setInterval(() => {
  reactRoot.render(
    <React.StrictMode>
      <App name={cc} />
    </React.StrictMode>
  );  
  cc++;
}, 1000);

