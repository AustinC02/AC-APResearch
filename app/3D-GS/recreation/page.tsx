'use client'
import { Splat, CameraControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

export default function Recreation() {
    return (
        <div className={"h-screen w-screen relative"}>
            <Canvas dpr={1.5} gl={{ antialias: true }} camera={{ position: [5, 0.5, 0], fov: 35 }}>
                <color attach="background" args={['white']} />
                <CameraControls
                    makeDefault
                    dampingFactor={0.1}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={0}
                    minDistance={1}
                    maxDistance={10}
                />
                <Splat
                    src={`/B.splat`}
                    position={[-5, 0, 2]}
                />
            </Canvas>

            {/* Control Guide */}
            <div className="absolute top-4 left-4 bg-gray-800 text-white p-3 rounded shadow">
                <h3 className="font-bold text-sm">Controls</h3>
                <ul className="text-xs">
                    <li>Left Click: Orbit</li>
                    <li>Right Click: Pan</li>
                    <li>Scroll: Zoom</li>
                </ul>
            </div>
        </div>
    )
}
