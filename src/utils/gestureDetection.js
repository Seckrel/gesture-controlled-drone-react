import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';


const runHandPose = async (webcamRef, setDirection) => {
    console.log("running")
    const model = await handpose.load({ detectionConfidence: 0.6 });
    setInterval(() => detect(model, webcamRef, setDirection), 500);
}

const detect = async (model, webcamRef, setDirection) => {
    const pathToModel = '/model/tfjs/model.json';
    if (typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4) {
        const tfjs_model = await tf.loadLayersModel(pathToModel)

        const video = webcamRef.current.video;

        const predict = await model.estimateHands(video);
        if (predict.length > 0) {
            const landmarks = predict[0].landmarks;
            let keypoints = [];
            for (let i = 0; i < landmarks.length; i++) {
                const [x, y] = landmarks[i];
                keypoints.push(x, y);
            }
            try {
                const out = tf.tensor([keypoints]);
                const predictedProb = tfjs_model.predict(out);
                const predictedValue = predictedProb.argMax(1).dataSync()[0];
                console.log(predictedValue);
                setDirection(predictedValue);
                // tfjs_model
                //     .then(res => res.predict(out))
                //     .then(predictedProb => predictedProb.argMax(1))
                //     .then(predictValue => predictValue.dataSync())
                //     .then(data => setDirection(data[0]));
            } catch (e) {
                console.log(e.message);
            }

        }
    }
}

export { runHandPose };