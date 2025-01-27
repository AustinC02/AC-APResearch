'use client'
import { Splat } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { Vector3, Quaternion } from 'three'

export default function Recreation() {
    return (
        <div className={"h-screen w-screen relative"}>
            <Canvas dpr={1.5} gl={{ antialias: true }} camera={{ position: [5, 0.5, 0], fov: 45 }}>
                <color attach="background" args={['white']} />
                <FreeFlyCamera />
                <Splat
                    src={`/B.splat`}
                    position={[0, 0, 0]}
                />
            </Canvas>

            {/* Control Guide */}
            <div className="absolute top-4 left-4 bg-gray-800 text-white p-3 rounded shadow">
                <h3 className="font-bold text-sm">Controls</h3>
                <ul className="text-xs">
                    <li>WASD: Move around</li>
                    <li>Mouse: Look around</li>
                </ul>
            </div>
        </div>
    )
}

function FreeFlyCamera() {
    const { camera } = useThree()
    const moveForward = useRef(false)
    const moveBackward = useRef(false)
    const moveLeft = useRef(false)
    const moveRight = useRef(false)
    const velocity = new Vector3()
    const moveSpeed = 0.1

    const isMouseDown = useRef(false)
    const previousMousePosition = useRef({ x: 0, y: 0 })
    const rotationSpeed = 0.002

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key.toLowerCase()) {
                case 'w':
                    moveForward.current = true
                    break
                case 's':
                    moveBackward.current = true
                    break
                case 'a':
                    moveLeft.current = true
                    break
                case 'd':
                    moveRight.current = true
                    break
            }
        }

        const handleKeyUp = (event: KeyboardEvent) => {
            switch (event.key.toLowerCase()) {
                case 'w':
                    moveForward.current = false
                    break
                case 's':
                    moveBackward.current = false
                    break
                case 'a':
                    moveLeft.current = false
                    break
                case 'd':
                    moveRight.current = false
                    break
            }
        }

        const handleMouseDown = () => {
            isMouseDown.current = true
        }

        const handleMouseUp = () => {
            isMouseDown.current = false
        }

        const handleMouseMove = (event: MouseEvent) => {
            if (!isMouseDown.current) return

            const { movementX, movementY } = event

            // Calculate rotation quaternions
            const quaternion = new Quaternion()
            quaternion.setFromAxisAngle(new Vector3(0, 1, 0), -movementX * rotationSpeed) // Yaw
            camera.quaternion.multiply(quaternion)

            quaternion.setFromAxisAngle(new Vector3(1, 0, 0), -movementY * rotationSpeed) // Pitch
            camera.quaternion.multiply(quaternion)
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [camera])

    useFrame(() => {
        velocity.set(0, 0, 0)

        if (moveForward.current) velocity.z -= moveSpeed
        if (moveBackward.current) velocity.z += moveSpeed
        if (moveLeft.current) velocity.x -= moveSpeed
        if (moveRight.current) velocity.x += moveSpeed

        camera.translateX(velocity.x)
        camera.translateZ(velocity.z)
    })

    return null
}