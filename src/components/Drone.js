import React,
{
  useRef,
  useEffect,
} from 'react'
import { useGLTF } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';



export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/drone.glb')
  const [colorMap, normalMap, specularMap, cloudMap] = useLoader(TextureLoader, ['/drone_texture.png'])


  useEffect(() => {
    const canvas = group.current;
    canvas.rotation.x = 0.4;
    canvas.rotation.y = -0.35;
  }, [])

  useFrame(({ clock }) => {
    const canvas = group.current;
    const t = clock.elapsedTime;
    canvas.rotation.z = -0.2 - (1 + Math.sin(t)) / 20;
    canvas.rotation.y = Math.sin(t) / 8;
    const xDirection = props.direction.x;
    const yDirection = props.direction.y;
    const zDirection = props.direction.z;
    // while (xDirection.length > 0) canvas.position.x += xDirection.pop();
    // while (yDirection.length > 0) canvas.position.y += yDirection.pop();
    // while (zDirection.length > 0) canvas.position.z += zDirection.pop();
    if (xDirection.length > 0) canvas.position.x += xDirection.pop();
    if (yDirection.length > 0) canvas.position.y += yDirection.pop();
    if (zDirection.length > 0) canvas.position.z += zDirection.pop();
  })


  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Circle026.geometry}
        material={nodes.Circle026.material}
        position={[0.16, 3.35, -1.2]}
        rotation={[2.1, -1.45, 2.13]}
        scale={[0.05, 0.08, 0.05]}
      />
      <mesh
        geometry={nodes.Plane027.geometry}
        material={nodes.Plane027.material}
        position={[2.99, 1.51, -1.41]}
        rotation={[-0.07, 0.33, 0.11]}
        scale={[3.95, 2.66, 2.66]}
      />
      <mesh
        geometry={nodes.Plane026.geometry}
        material={nodes.Plane026.material}
        position={[-1.3, 2.52, -2.24]}
        rotation={[-0.07, 0.33, 0.11]}
        scale={[1.22, 1.22, -1.22]}
      />
      <mesh
        geometry={nodes.Plane025.geometry}
        material={nodes.Plane025.material}
        position={[-0.92, 2.6, -1.15]}
        rotation={[-0.07, 0.33, 0.11]}
        scale={[1.22, 1.22, -1.22]}
      />
      <mesh
        geometry={nodes.Plane023.geometry}
        material={nodes.Plane023.material}
        position={[-0.32, 2.72, 0.61]}
        rotation={[-0.07, 0.33, 0.11]}
        scale={[1.25, 1.25, 1.25]}
      />
      <mesh
        geometry={nodes.Circle025.geometry}
        material={nodes.Circle025.material}
        position={[-1.01, 3.18, 1.6]}
        rotation={[-0.42, 1.29, 0.39]}
        scale={[0.03, 0.05, 0.03]}
      />
      <mesh
        geometry={nodes.Circle024.geometry}
        material={nodes.Circle024.material}
        position={[1.71, 2.87, 1.3]}
        rotation={[2.1, -1.45, 2.13]}
        scale={[0.03, 0.05, 0.03]}
      />
      <mesh
        geometry={nodes.Circle023.geometry}
        material={nodes.Circle023.material}
        position={[0.36, 2.54, -3.93]}
        rotation={[3.03, -0.64, 3.01]}
        scale={[0.03, 0.05, 0.03]}
      />
      <mesh
        geometry={nodes.Circle022.geometry}
        material={nodes.Circle022.material}
        position={[-3.25, 2.74, -0.85]}
        rotation={[-0.11, 0.64, 0.13]}
        scale={[0.03, 0.05, 0.03]}
      />
      <mesh
        geometry={nodes.BezierCurve008.geometry}
        material={nodes.BezierCurve008.material}
        position={[-1.92, 1.81, 0.26]}
        rotation={[-2.89, 1.21, 2.84]}
        scale={[1.2, 1.2, 1.2]}
      />
      <mesh
        geometry={nodes.BezierCurve007.geometry}
        material={nodes.BezierCurve007.material}
        position={[-1.92, 1.81, 0.26]}
        rotation={[-2.89, 1.21, 2.84]}
        scale={[1.2, 1.2, 1.2]}
      />
      <mesh
        geometry={nodes.BezierCurve006.geometry}
        material={nodes.BezierCurve006.material}
        position={[-1.92, 1.81, 0.26]}
        rotation={[-2.89, 1.21, 2.84]}
        scale={[1.2, 1.2, 1.2]}
      />
      <mesh
        geometry={nodes.BezierCurve005.geometry}
        material={nodes.BezierCurve005.material}
        position={[-0.71, 1.92, -1.55]}
        rotation={[-0.05, 0.15, 0.11]}
        scale={[1.2, 1.2, 1.2]}
      />
      <mesh
        geometry={nodes.BezierCurve004.geometry}
        material={nodes.BezierCurve004.material}
        position={[-0.71, 1.92, -1.55]}
        rotation={[-0.05, 0.15, 0.11]}
        scale={[1.2, 1.2, 1.2]}
      />
      <mesh
        geometry={nodes.BezierCurve003.geometry}
        material={nodes.BezierCurve003.material}
        position={[-0.71, 1.92, -1.55]}
        rotation={[-0.05, 0.15, 0.11]}
        scale={[1.2, 1.2, 1.2]}
      />
      <mesh
        geometry={nodes.BezierCurve002.geometry}
        material={nodes.BezierCurve002.material}
        position={[0.03, 2.08, 0.73]}
        rotation={[-0.07, 0.33, 0.11]}
        scale={[1.2, 1.2, 1.2]}
      />
      <mesh
        geometry={nodes.BezierCurve001.geometry}
        material={nodes.BezierCurve001.material}
        position={[0.03, 2.08, 0.73]}
        rotation={[-0.07, 0.33, 0.11]}
        scale={[1.2, 1.2, 1.2]}
      />
      <mesh
        geometry={nodes.BezierCurve.geometry}
        material={nodes.BezierCurve.material}
        position={[0.03, 2.08, 0.73]}
        rotation={[-0.07, 0.33, 0.11]}
        scale={[1.2, 1.2, 1.2]}
      />
      <mesh
        geometry={nodes.Plane022.geometry}
        material={nodes.Plane022.material}
        position={[-1.53, 2.05, 1.63]}
        rotation={[-1.61, -0.11, 0.33]}
        scale={[0.03, 0.03, 0.03]}
      />
      <mesh
        geometry={nodes.Plane020.geometry}
        material={nodes.Plane020.material}
        position={[-2.47, 1.85, -1.36]}
        rotation={[-1.61, -0.11, -1.24]}
        scale={[0.03, 0.03, 0.03]}
      />
      <mesh
        geometry={nodes.Plane024.geometry}
        material={nodes.Plane024.material}
        position={[1.24, 2.15, -1.92]}
        rotation={[-1.61, -0.11, -1.24]}
        scale={[0.03, 0.03, 0.03]}
      />
      <mesh
        geometry={nodes.Circle021.geometry}
        material={nodes.Circle021.material}
        position={[1.25, 2.11, -0.22]}
        rotation={[-1.61, -0.11, 0.33]}
        scale={[0.06, 0.06, 0.06]}
      />
      <mesh
        geometry={nodes.Circle020.geometry}
        material={nodes.Circle020.material}
        position={[1.29, 2.12, -0.13]}
        rotation={[-1.61, -0.11, 0.33]}
        scale={[0.06, 0.06, 0.06]}
      />
      <mesh
        geometry={nodes.Circle019.geometry}
        material={nodes.Circle019.material}
        position={[1.3, 2.12, -0.07]}
        rotation={[-1.61, -0.11, 0.33]}
        scale={[0.06, 0.06, 0.06]}
      />
      <mesh
        geometry={nodes.Circle018.geometry}
        material={nodes.Circle018.material}
        position={[1.34, 2.13, 0.02]}
        rotation={[-1.61, -0.11, 0.33]}
        scale={[0.06, 0.06, 0.06]}
      />
      <mesh
        geometry={nodes.Plane012.geometry}
        material={nodes.Plane012.material}
        position={[0.94, 2.12, 0.1]}
        rotation={[-1.61, -0.11, -1.24]}
        scale={[0.07, 0.07, 0.07]}
      />
      <mesh
        geometry={nodes.Plane011.geometry}
        material={nodes.Plane011.material}
        position={[0.93, 2.16, 0]}
        rotation={[-1.61, -0.11, 0.33]}
        scale={[0.03, 0.03, 0.03]}
      />
      <mesh
        geometry={nodes.Plane010.geometry}
        material={nodes.Plane010.material}
        position={[1.02, 2.17, -0.03]}
        rotation={[-1.61, -0.11, 0.33]}
        scale={[0.03, 0.03, 0.03]}
      />
      <mesh
        geometry={nodes.Plane009.geometry}
        material={nodes.Plane009.material}
        position={[1.11, 2.18, -0.06]}
        rotation={[-1.61, -0.11, 0.33]}
        scale={[0.03, 0.03, 0.03]}
      />
      <mesh
        geometry={nodes.Plane008.geometry}
        material={nodes.Plane008.material}
        position={[1.2, 2.19, -0.09]}
        rotation={[-1.61, -0.11, 0.33]}
        scale={[0.03, 0.03, 0.03]}
      />
      <mesh
        geometry={nodes.Circle017.geometry}
        material={nodes.Circle017.material}
        position={[0.96, 2.13, -0.07]}
        rotation={[1.54, 0.11, -1.9]}
        scale={[0.06, 0.06, 0.06]}
      />
      <mesh
        geometry={nodes.Circle016.geometry}
        material={nodes.Circle016.material}
        position={[1.05, 2.14, -0.1]}
        rotation={[1.54, 0.11, -1.9]}
        scale={[0.06, 0.06, 0.06]}
      />
      <mesh
        geometry={nodes.Circle015.geometry}
        material={nodes.Circle015.material}
        position={[1.15, 2.15, -0.14]}
        rotation={[1.54, 0.11, -1.9]}
        scale={[0.06, 0.06, 0.06]}
      />
      <mesh
        geometry={nodes.Cube037.geometry}
        material={nodes.Cube037.material}
        position={[1.2, 2.2, -0.15]}
        rotation={[3.07, -0.33, -0.11]}
        scale={[0.09, 0.01, 0.03]}
      />
      <mesh
        geometry={nodes.Cube036.geometry}
        material={nodes.Cube036.material}
        position={[1.32, 2.18, -1.72]}
        rotation={[3.07, -0.33, -0.11]}
        scale={[0.09, 0.01, 0.03]}
      />
      <mesh
        geometry={nodes.Cube035.geometry}
        material={nodes.Cube035.material}
        position={[1.52, 2.3, 0.44]}
        rotation={[3.07, -0.33, -0.11]}
        scale={[0.09, 0.01, 0.03]}
      />
      <mesh
        geometry={nodes.Cube034.geometry}
        material={nodes.Cube034.material}
        position={[-2.54, 1.79, -0.86]}
        rotation={[-0.07, 0.33, -3.03]}
        scale={[0.09, 0.01, 0.03]}
      />
      <mesh
        geometry={nodes.Cube043.geometry}
        material={nodes.Cube043.material}
        position={[-1.8, 1.9, 0.64]}
        rotation={[-0.07, 0.33, -3.03]}
        scale={[0.09, 0.01, 0.03]}
      />
      <mesh
        geometry={nodes.Cube001.geometry}
        material={nodes.Cube001.material}
        position={[1.22, 2.12, -0.8]}
        rotation={[3.07, -0.33, 3.03]}
        scale={[0.96, 0.01, 0.02]}
      />
      <mesh
        geometry={nodes.Cube.geometry}
        material={nodes.Cube.material}
        position={[-2.3, 1.79, 0.43]}
        rotation={[-0.07, 0.33, 0.11]}
        scale={[0.96, 0.01, 0.02]}
      />
      <mesh
        geometry={nodes.Circle007.geometry}
        material={nodes.Circle007.material}
        position={[-3.88, 1.86, -1.46]}
        rotation={[-0.1, 1, 0.11]}
        scale={[1.58, 5.8, 1.58]}
      />
      <mesh
        geometry={nodes.Circle006.geometry}
        material={nodes.Circle006.material}
        position={[1.24, 2.34, -3.28]}
        rotation={[-0.12, 0.86, 0.18]}
        scale={[1.58, 5.8, 1.58]}
      />
      <mesh
        geometry={nodes.Circle005.geometry}
        material={nodes.Circle005.material}
        position={[2.7, 2.64, 0.97]}
        rotation={[-0.18, 0.67, 0.18]}
        scale={[1.58, 5.8, 1.58]}
      />
      <mesh
        geometry={nodes.Circle004.geometry}
        material={nodes.Circle004.material}
        position={[-2.42, 2.16, 2.8]}
        rotation={[-0.15, 0.46, 0.09]}
        scale={[1.58, 5.8, 1.58]}
      />
      <mesh
        geometry={nodes.Circle002.geometry}
        material={nodes.Circle002.material}
        position={[-0.56, 1.98, -0.23]}
        rotation={[-0.07, 0.33, 0.11]}
        scale={[1.41, 1.41, 1.41]}
      />
      <mesh
        geometry={nodes.Circle001.geometry}
        material={nodes.Circle001.material}
        position={[-0.55, 1.95, -0.23]}
        rotation={[-0.07, 0.33, 0.11]}
        scale={[1.31, 1.31, 1.31]}
      />
      <mesh
        geometry={nodes.Circle.geometry}
        material={nodes.Circle.material}
        position={[-0.55, 1.93, -0.23]}
        rotation={[-0.07, 0.33, 0.11]}
        scale={[1.2, 1.2, 1.2]}
      />
      <mesh
        geometry={nodes.Plane001.geometry}
        material={nodes.Plane001.material}
        position={[0.36, 2.08, -0.5]}
        rotation={[-0.07, 0.33, 0.11]}
        scale={[0.64, 0.3, 0.87]}
      />
      <mesh
        geometry={nodes.Plane021.geometry}
        material={nodes.Plane021.material}
        position={[2.89, 2.48, -1.45]}
        rotation={[-0.07, 0.33, 0.11]}
        scale={[3.95, 2.66, 2.66]}
      />
      <mesh
        geometry={nodes.Plane019.geometry}
        material={nodes.Plane019.material}
        position={[0.07, 2.8, 1.73]}
        rotation={[-0.07, 0.33, 0.11]}
        scale={[1.25, 1.25, 1.25]}
      />
      <mesh
        geometry={nodes.Plane017.geometry}
        material={materials.Material}
        position={[-0.56, 2.15, -0.24]}
        rotation={[-0.07, 0.33, 0.11]}
        scale={[3.95, 2.66, 2.66]}
      />
      <meshStandardMaterial attach='material' map={colorMap} />
    </group>
  )
}

useGLTF.preload('/drone.glb')
