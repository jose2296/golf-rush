import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import Button from '@shared/components/button';
import useStore from '@store';
import Pencil from '@svgs/pencil';
import { useNavigate } from 'react-router-dom';
import Ball from '../game/components/Ball';

const Home = () => {
    const navigate = useNavigate();

    const color = useStore(state => state.userData?.color);

    return (
        <div className='grid gap-4 grid-cols-1 lg:grid-cols-2'>
            <div className='flex items-center justify-center flex-col'>
                <div className='w-full h-96 rounded-xl border-2 border-secondary'>
                    <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [ 0, 1, 6] }}>
                        <ambientLight />
                        <Physics gravity={[0, 0, 0]} >
                            <Ball type='fixed' position={[0, 0, 0]} color={color} />

                        </Physics>

                    </Canvas>
                </div>
                <Button
                    type='btn-neutral'
                    text='home.customize'
                    className='mt-5 px-20'
                    click={() => navigate('customize')}
                    icon={<Pencil fill='white' />}
                />
            </div>
            <div className='flex flex-col items-center justify-center'>
                <div className='w-52'>
                    <Button text='home.play' click={() => navigate('game')} className='mb-6 min-w-full' />
                    <Button text='home.profile' className='mb-6 min-w-full' />
                    <Button text='home.shop' className='mb-6 min-w-full' />
                </div>
            </div>
        </div>
    );
};

export default Home;
