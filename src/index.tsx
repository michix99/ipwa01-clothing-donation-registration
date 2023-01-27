import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorView from './components/ErrorView/ErrorView';
import './services/LocalizationService';
import HomeView from './components/HomeView/HomeView';
import DonationView from './components/DonationView/DonationView';
import LegalNotice from './components/LegalNotice/LegalNotice';
import License from './components/License/License';

/**
 * Includes all routes in the application.
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // Shown when an unknown location is reached or an error happens.
    errorElement: <ErrorView />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: 'donate/:subview',
        element: <DonationView />,
      },
      {
        path: 'legal',
        element: <LegalNotice />,
      },
      {
        path: 'license',
        element: <License />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <RouterProvider router={router} />
    </React.Suspense>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
