import { KeyboardControls, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { useControls } from 'leva';
import { useMemo } from 'react';
import Layout from '../layout/layout';
import Ball from './components/Ball';
import Ground from './components/Ground';
import Truss1 from './components/test';
import { RigidBody } from '@react-three/rapier';

export const Controls = {
    forward: 'forward',
    back: 'back',
    left: 'left',
    right: 'right',
    jump: 'jump',
};

const width = 1400;
const height = 758;

const Game = () => {
    const color = useControls('canvas', {
        value: '#000000',
    });
    const mapControls = useMemo(() => [
        { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
        { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
        { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
        { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
        { name: Controls.jump, keys: ['Space'] },
    ], []);

    return (
        <Layout>
            <KeyboardControls map={mapControls}>
                <div className='flex items-center flex-col justify-center'>
                    <Canvas style={{ width, height }} camera={{ position: [ 0, 0, 55] }}>
                        <OrbitControls />
                        <color attach='background' args={[color.value]} />
                       <gridHelper />
                        {/* <axesHelper args={[20]} /> */}
                        <ambientLight />
                        <Physics debug gravity={[0, -9.8, 0]} >
                            <Ball isPlayer position={[0, 2, 0]} />

                            <Ball position={[1, 19, 0]} />
 
                            {/* <Ground /> */}

                            <Truss1 />
                        </Physics>
                    </Canvas>
                </div>
            
            </KeyboardControls>

        </Layout>
    );
};

export default Game;