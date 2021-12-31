import './App.css';
import Webcam from 'react-webcam';
import { useEffect, useRef, useState } from 'react';
import { drawHand } from './utilities';
import OutputCanvas from './components/OutputCanvasComponent';


function App() {
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  return (
    <div className="App">
      <Webcam
        audio={false}
        ref={webcamRef}
        mirrored
        screenshotFormat="image/jpeg"
        width={400}
        videoConstraints={videoConstraints}
        className='webcam'
      ></Webcam>

      <OutputCanvas
        webcamRef={webcamRef}
      />
    </div>
  );
}

export default App;
