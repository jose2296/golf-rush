import { Box, KeyboardControls, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { useControls } from 'leva';
import { useMemo } from 'react';
import Layout from '../layout/layout';
import Ball from './components/Ball';

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
    const groundSize = {
        width: 50,
        height: 6,
        depth: 2
    };

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

                            {/* <Ball position={[20, 19, 0]} /> */}

                            <RigidBody name='ground' type='fixed' ccd={true} friction={2}>
                                <Box args={[groundSize.width, groundSize.height, groundSize.depth]} position={[0, -groundSize.height / 2, 0]}>
                                    <meshStandardMaterial color={'red'} />
                                </Box>
                            </RigidBody>

                            <RigidBody name='ground' type='fixed' ccd={true} friction={2}>
                                <Box args={[groundSize.height, groundSize.width, groundSize.depth]} position={[groundSize.width / 2 + groundSize.height / 2, groundSize.width / 2, 0]}>
                                    <meshStandardMaterial color={'red'} />
                                </Box>
                            </RigidBody>
                            <RigidBody name='ground' type='fixed' ccd={true} friction={2}>
                                <Box args={[groundSize.height, groundSize.width, groundSize.depth]} position={[-groundSize.width / 2 - groundSize.height / 2, groundSize.width / 2, 0]}>
                                    <meshStandardMaterial color={'red'} />
                                </Box>
                            </RigidBody>
                        </Physics>
                    </Canvas>
                </div>

            </KeyboardControls>

        </Layout>
    );
};

export default Game;
