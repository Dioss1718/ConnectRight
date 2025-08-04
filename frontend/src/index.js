import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App'; 

// This function measures and logs web performance metrics.
// It's useful for understanding how users experience your site.
const reportWebVitals = onPerfEntry => {
  // Only proceed if a callback function is provided.
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Dynamically import the web-vitals library to keep the initial bundle small.
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Call each function to measure a specific performance metric
      // and pass the result to the provided callback.
      getCLS(onPerfEntry); 
      getFID(onPerfEntry); 
      getFCP(onPerfEntry);
      getLCP(onPerfEntry); 
      getTTFB(onPerfEntry);
    });
  }
};

// Create a React root. This is the entry point for the application.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application.
root.render(
  // StrictMode helps find potential problems in the code.
  <React.StrictMode>
    {/* The main component of the application. */}
    <App /> 
  </React.StrictMode>
);

// Note: The `reportWebVitals` function is currently defined but not called.
// To use it, you would typically call it after rendering, like: `reportWebVitals(console.log);`