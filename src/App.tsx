import React from 'react';
import './App.css';
import PhotoView from './Photo/PhotoView';

function App() {
  const imgUrl = '/logo192.png'
  return (
    <div className="App">
      <PhotoView src={imgUrl}>
        <img src={imgUrl} alt="" />
      </PhotoView>
    </div>
  );
}

export default App;
