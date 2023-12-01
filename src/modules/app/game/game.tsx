import { KeyboardControls, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import useStore from '@store';
import { useControls } from 'leva';
import { useMemo } from 'react';
import Ball from './components/Ball';
import Ground from './components/Ground';

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
    const ballColor = useStore(state => state.userData?.color);
    const ballStela = useStore(state => state.userData?.stela);
    const color = useControls('canvas', {
        value: '#000000',
        debug: true
    });
    const mapControls = useMemo(() => [
        { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
        { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
        { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
        { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
        { name: Controls.jump, keys: ['Space', 'KeyJ'] },
    ], []);

    return (
        <KeyboardControls map={mapControls}>
            <div className='flex items-center flex-col justify-center'>
                <Canvas style={{ width, height }} camera={{ position: [ 0, 0, 55] }}>
                    <OrbitControls />
                    <color attach='background' args={[color.value]} />
                    <gridHelper />
                    {/* <axesHelper args={[20]} /> */}
                    <ambientLight />
                    <Physics debug={color.debug} gravity={[0, -9.8, 0]} >
                        <Ball isPlayer position={[-10, 20, 0]} color={ballColor} stela={ballStela} />

                        <Ball position={[1, 19, 0]} />

                        <Ground />
                    </Physics>
                </Canvas>
            </div>
        </KeyboardControls>
    );
};

export default Game;
