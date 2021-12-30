import './App.css';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import { useEffect, useRef, useMemo } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as tflite from '@tensorflow/tfjs-tflite';
import { drawHand } from './utilities';
import OutputCanvas from './components/OutputCanvasComponent';


function App() {
  const webcamRef = useRef(null);
  const pathToModel = '../public/model/model.json';

  useEffect(() => {
    const fu = async () => await tf.loadLayersModel(pathToModel);
    console.log(fu())

  }, [])  
  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };


  const runHandPose = async () => {
    const model = await handpose.load({ detectionConfidence: 0.6 });
    setInterval(() => detect(model), 100);
  }

  const detect = async (model) => {
    if (typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;

      const predict = await model.estimateHands(video);
      if (predict.length > 0) {
        const landmarks = predict[0].landmarks;
        for (let i = 0; i < landmarks.length; i++) {
          const [x, y, z] = landmarks[i];
          console.log(`keypoint: ${i}: ${x} ${y} ${z}]`);
          
        }
      }

    }
  }

  useEffect(() => {
    runHandPose();
  }, []);

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

      <OutputCanvas />
    </div>
  );
}

export default App;
