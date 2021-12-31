import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';


const DIRECTION_MAP = {
    0: 'up',
    1: 'down',
    2: 'back',
    3: 'forward',
    4: 'left',
    5: 'right'
}

const SPEED = 0.5

const clearState = (direction, state) => {
    if (state.length === 0) return;
    const testValue = state[0]
    if ((direction * testValue) < 0) while (state.length > 0) state.pop();
}

const addSpeed = (direction, state, setState) => {
    setState([...state, direction * SPEED])
}

const gesture = (predictedValue, xState, setXState,
    yState, setYState,
    zState, setZState
) => {
    // console.log(e.keyCode);
    const direction = DIRECTION_MAP[predictedValue];
    if (direction === 'left') {
        console.log("go left");
        clearState(-1, xState);
        addSpeed(-1, xState, setXState);
    }
    else if (direction === 'up') {
        console.log("go up")
        clearState(1, yState);
        addSpeed(1, yState, setYState);
    }
    else if (direction === 'right') {
        console.log("go right")
        clearState(1, xState);
        addSpeed(1, xState, setXState);
    }
    else if (direction === 'down') {
        console.log("go down")
        clearState(-1, yState);
        addSpeed(-1, yState, setYState);
    }
    else if (direction === 'back') {
        console.log("go back");
        clearState(1, zState);
        addSpeed(1, zState, setZState);
    }
    else if (direction === 'forward') {
        console.log("go forward");
        clearState(-1, zState);
        addSpeed(-1, zState, setZState);
    }
}

const runHandPose = async (webcamRef, xState, setXState,
    yState, setYState, zState, setZState) => {
    const pathToModel = '/model/tfjs/model.json';
    const model = await handpose.load({ detectionConfidence: 0.6 });
    const tfjs_model = await tf.loadLayersModel(pathToModel)
    setInterval(() => {
        detect(model, tfjs_model, webcamRef)
            .then(res => {
                if (res || res === 0) gesture(res, xState, setXState,
                    yState, setYState,
                    zState, setZState);
            });
    }, 100);
}

const detect = async (model, tfjs_model, webcamRef) => {
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
                keypoints.push(x, y);
            }
            try {
                const out = tf.tensor([keypoints]);
                const predictedProb = tfjs_model.predict(out);
                const predictedValue = predictedProb.argMax(1).dataSync()[0];
                console.log(predictedValue);
                return predictedValue;
            } catch (e) {
                console.log(e.message);
            }
        }
        return null;
    }
}

export { runHandPose };