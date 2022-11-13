import React from 'react';
import './App.css';
import Upload from './components/Upload';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={'https://firebasestorage.googleapis.com/v0/b/upload-storage-at.appspot.com/o/photos%2F80fa6a603bf1435d9a19cabf0ff958ad.webp?alt=media'}
        className="App-logo" alt="logo" />
        
        <Upload/>
      </header>
    </div>
  );
}

export default App;
