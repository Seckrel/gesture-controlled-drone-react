import Drone from './Drone';
import { Environment } from '@react-three/drei'
import { Fragment, useState, useEffect, useCallback } from 'react';
import { Canvas, } from '@react-three/fiber';
import { Suspense } from 'react';
import { Html, useProgress } from '@react-three/drei';
import { runHandPose } from '../utils/gestureDetection';


function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}


function OutputCanvas({ webcamRef }) {
    const [xState, setXState] = useState([]);
    const [yState, setYState] = useState([]);
    const [zState, setZState] = useState([]);


    useEffect(() => {
        runHandPose(webcamRef, xState,
            setXState, yState, setYState,
            zState, setZState);
    }, []);


    return (
        <Fragment>
            <Canvas>
                <Suspense fallback={<Loader />}>
                    <Drone
                        position={[0, 0, -10]}
                        direction={{
                            x: xState,
                            y: yState,
                            z: zState
                        }}
                    />
                    <Environment
                        background={true}
                        preset={'dawn'}
                    />
                </Suspense>

            </Canvas>
        </Fragment>
    )
}

export default OutputCanvas;