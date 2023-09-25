import { Canvas } from '@react-three/fiber'
import Shoe from './components/Shoe'
import { Suspense } from 'react'
import { useAnimatedSensor, SensorType } from 'react-native-reanimated'

export default function App() {
  const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 100,
  })

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Shoe animatedSensor={animatedSensor} />
      </Suspense>
    </Canvas>
  )
}

