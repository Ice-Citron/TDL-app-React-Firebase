import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TodoContextProvider } from './context';

// differs from tutorial. This variant is better, since it alligns with React 18+, more modern and better performance. 
const root = ReactDOM.createRoot(document.getElementById('root')); // declares const root which is used for rendering
root.render(
  // StrictMode helps identify potential problems in an application.
  <React.StrictMode>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </React.StrictMode>
);