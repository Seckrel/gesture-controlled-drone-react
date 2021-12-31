import './App.css';
import Webcam from 'react-webcam';
import { useEffect, useRef, useMemo, useState } from 'react';
import { drawHand } from './utilities';
import { runHandPose } from './utils/gestureDetection';
import OutputCanvas from './components/OutputCanvasComponent';


function App() {
  const webcamRef = useRef(null);
  const [direction, setDirection] = useState(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };


  
  useEffect(() => {
    runHandPose(webcamRef, setDirection);
  }, []);

  return (
    <div className="App">
      {/* {tfjs_model.then(res => console.log(Object.getOwnPropertyNames(res)))} */}
      {/* {tfjs_model.then(res =>  .log(res.inputs))} */}
      {console.log(direction)}
      <Webcam
        audio={false}
        ref={webcamRef}
        mirrored
        screenshotFormat="image/jpeg"
        width={400}
        videoConstraints={videoConstraints}
        className='webcam'

      ></Webcam>

      <OutputCanvas />
    </div>
  );
}

export default App;
