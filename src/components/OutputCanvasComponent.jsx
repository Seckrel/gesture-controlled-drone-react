import Drone from './Drone';
import { Environment } from '@react-three/drei'
import { Fragment, useState, useEffect, useCallback } from 'react';
import { Canvas, } from '@react-three/fiber';
import { Suspense } from 'react';
import { Html, useProgress } from '@react-three/drei';

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}


function OutputCanvas() {

    const [xState, setXState] = useState([]);
    const [yState, setYState] = useState([]);
    const [zState, setZState] = useState([]);
    const SPEED = 0.5

    const clearState = useCallback(
        (direction, state) => {
            if (state.length === 0) return;
            const testValue = state[0]
            if ((direction * testValue) < 0) while (state.length > 0) state.pop();
        }
        ,
        []
    )

    const addSpeed = useCallback(
        (direction, state, setState) => {
            setState([...state, direction * SPEED])
        },
        []
    )

    const keypressed = useCallback(
        e => {
            console.log(e.keyCode);
            if (e.keyCode === 37) {
                console.log("go left");
                clearState(-1, xState);
                addSpeed(-1, xState, setXState);
            }
            else if (e.keyCode === 38) {
                console.log("go up")
                clearState(1, yState);
                addSpeed(1, yState, setYState);
            }
            else if (e.keyCode === 39) {
                console.log("go right")
                clearState(1, xState);
                addSpeed(1, xState, setXState);
            }
            else if (e.keyCode === 40) {
                console.log("go donw")
                clearState(-1, yState);
                addSpeed(-1, yState, setYState);
            }
            else if (e.keyCode === 83) {
                console.log("go back");
                clearState(1, zState);
                addSpeed(1, zState, setZState);
            }
            else if (e.keyCode === 87) {
                console.log("go forward");
                clearState(-1, zState);
                addSpeed(-1, zState, setZState);
            }
        },
        [xState, yState, zState, addSpeed, clearState]
    )


    useEffect(() => {

        window.addEventListener("keydown", keypressed)
        return () => window.removeEventListener("keydown", keypressed);

    }, [xState, yState, keypressed])


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