import React from 'react';
import './App.css';
import Photo from './Photo/Photo';
import PhotoProvider from './Photo/PhotoProvider';
import PhotoView from './Photo/PhotoView';

function App() {
  const imgUrl = '/logo192.png'
  return (
    <div className="App">
    <PhotoProvider>
      <PhotoView key={1} src={imgUrl}>
        <img src={imgUrl} alt="" />
      </PhotoView>
      <PhotoView key={2} src={imgUrl}>
        <img src={imgUrl} alt="" />
      </PhotoView>
    </PhotoProvider>
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
