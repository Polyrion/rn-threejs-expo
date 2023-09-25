import { useFrame, useLoader } from "@react-three/fiber"
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { TextureLoader } from 'expo-three'
import { useLayoutEffect, useRef } from 'react'

export default function Shoe(props) {
  const material = useLoader(MTLLoader, require('../assets/Airmax/shoe.mtl'))
  const obj = useLoader(
    OBJLoader,
    require('../assets/Airmax/shoe.obj'),
    (loader) => {
      material.preload()
      loader.setMaterials(material)
    }
  )
  const [base, normal, rough] = useLoader(TextureLoader, [
    require('../assets/Airmax/textures/BaseColor.jpg'),
    require('../assets/Airmax/textures/Normal.jpg'),
    require('../assets/Airmax/textures/Roughness.png'),
  ])
  const mesh = useRef()

  useLayoutEffect(() => {
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.map = base
        child.material.normalMap = normal
        child.material.roughnessMap = rough
      }
    })
  }, [obj])

  useFrame((state, delta) => {
    let { x, y, z } = props.animatedSensor.sensor.value;
    x = ~~(x * 100) / 5000;
    y = ~~(y * 100) / 5000;
    mesh.current.rotation.x += x;
    mesh.current.rotation.y += y;
  })

  return (
    <mesh ref={mesh} rotation={[1, 0, -0.5]}>
      <primitive object={obj} scale={10} />
    </mesh>
  )
}