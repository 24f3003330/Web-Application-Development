import React from 'react';
import Weather from './components/Weather'; // ✅ FIX: 'Import' → 'import' (capital I is invalid JS)

function App() {
  return (
    <div className="App">
      <Weather />
    </div>
  );
}

export default App;
