/**
 * @fileoverview Uygulama entry point
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

// CSS imports
import './styles/variables.css';
import './styles/reset.css';
import './styles/global.css';

/**
 * React uygulamasını DOM'a bağlar
 */
function main(): void {
    const rootElement = document.getElementById('root');

    if (!rootElement) {
        throw new Error('Root element not found. Make sure there is an element with id="root" in your HTML.');
    }

    const root = createRoot(rootElement);

    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

main();
