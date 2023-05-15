import * as React from 'react';
import { createRoot } from "react-dom/client";
import { App } from './app';

// register service worker
navigator?.serviceWorker.register('/sw.js')

const domRoot = document.getElementById("root")
if (domRoot) {
    const reactRoot = createRoot(domRoot);
    reactRoot.render(<App />);
}
