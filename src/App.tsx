import React from 'react';
import './App.css';
import Photo from './Photo/Photo';
import PhotoView from './Photo/PhotoView';

function App() {
  const imgUrl = '/logo192.png'
  return (
    <div className="App">
      <PhotoView src={imgUrl}>
        <img src={imgUrl} alt="" />
      </PhotoView>
      <Photo
        src={imgUrl}
        loaded={true}
        broken={false}
        onPhotoLoad={() => {}}
      ></Photo>
    </div>
  );
}

export default App;
