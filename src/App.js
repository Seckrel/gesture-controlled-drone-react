import './App.css';
import { Hands, HAND_CONNECTIONS } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { useEffect, useRef } from 'react';


function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const hands = new Hands({
    locateFile: file => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1635986972/${file}`;
    }
  });

  const onResult = (results) => {
    // if (canvasRef.current === null || canvasRef.current === undefined) console.log("print");
    const canvasCtx = canvasRef.current.getContext('2d');
    const canvasElement = canvasRef.current;
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image, 0, 0, canvasElement.width, canvasElement.height
    );
    console.log("results", results);
    if (results.multiHandLandmarks){
      for(const landmarks of results.multiHandLandmarks){
        drawConnectors(canvasCtx, landmarks ,HAND_CONNECTIONS,
          {color: '#00ff00', lineWidth: 5});
          drawLandmarks(canvasCtx, landmarks, {color: '#ff0000', lineWidth: 2});
      }
    }
    canvasCtx.restore();
  }

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement === null || videoElement === undefined) return;
    hands.setOptions({
      maxNumHands: 1,
      minDetectionConfidence: .8,
      minTrackingConfidence: .6
    });
    hands.onResults(onResult);
    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await hands.send({image: videoElement})
      },
      width: 1280,
      height: 720
    });
    camera.start()
   }, [])

  return (
    <div className="App">
      <video className="input_video" ref={videoRef}></video>
      <canvas
        ref={canvasRef}
        className='output_canvas' 
        width={"1280px"} 
        height={"720px"}></canvas>
    </div>
  );
}

export default App;
