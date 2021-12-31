import './App.css';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import { useEffect, useRef, useMemo, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { drawHand } from './utilities';
import OutputCanvas from './components/OutputCanvasComponent';


function App() {
  const webcamRef = useRef(null);
  const pathToModel = '/model/tfjs/model.json';
  const tfjs_model = useMemo(async () => await tf.loadLayersModel(pathToModel), [pathToModel]);
  const [direction, setDirection] = useState(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };


  const runHandPose = async () => {
    const model = await handpose.load({ detectionConfidence: 0.6 });
    setInterval(() => detect(model), 500);
  }

  const detect = async (model) => {
    if (typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;

      const predict = await model.estimateHands(video);
      if (predict.length > 0) {
        const landmarks = predict[0].landmarks;
        let keypoints = [];
        for (let i = 0; i < landmarks.length; i++) {
          const [x, y] = landmarks[i];
          keypoints.push(x,y);
        }
        tfjs_model.then(res => {
          try{
            const out = tf.tensor([keypoints]);
            tfjs_model
              .then(res => res.predict(out))
              .then(predictedProb => predictedProb.argMax(1))
              .then(predictValue => predictValue.dataSync())
              .then(data => setDirection(data[0]));
          }catch(e){
            console.log(e.message);
          }
        })
      }
    }
  }

  useEffect(() => {
    runHandPose();
  }, []);

  return (
    <div className="App">
      {/* {tfjs_model.then(res => console.log(Object.getOwnPropertyNames(res)))} */}
      {/* {tfjs_model.then(res =>  .log(res.inputs))} */}
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
