import { ArweaveWalletKit } from 'arweave-wallet-kit';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import './index.css';
// setup sentry
import './services/sentry.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ArweaveWalletKit
      config={{
        permissions: [
          'ACCESS_ADDRESS',
          'SIGN_TRANSACTION',
          'ACCESS_ALL_ADDRESSES',
          'ACCESS_PUBLIC_KEY',
          'SIGNATURE',
        ],
        ensurePermissions: true,
      }}
      theme={{
        accent: { r: 109, g: 108, b: 105 },
        displayTheme: 'dark',
        radius: 'minimal',
      }}
    >
      <App />
    </ArweaveWalletKit>
  </React.StrictMode>,
);
