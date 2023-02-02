import * as React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    return <h1>Score Anything</h1>;
}

const HTML_ROOT = document.createElement('div');
HTML_ROOT.id = 'root';
document.body.appendChild(HTML_ROOT);

const REACT_ROOT = createRoot(document.getElementById('root')!);
REACT_ROOT.render(<App />);