import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import Button from '@shared/components/button';
import Pencil from '@svgs/pencil';
import { useNavigate } from 'react-router-dom';
import Ball from '../game/components/Ball';
import Layout from '../layout/layout';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2'>
                <div className='flex items-center justify-center flex-col'>
                    <div className='w-full h-96 rounded-xl border-2 border-secondary'>
                        <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [ 0, 1, 6] }}>
                            <ambientLight />
                            <Physics gravity={[0, 0, 0]} >
                                <Ball type='fixed' position={[0, 0, 0]} />

                            </Physics>

                        </Canvas>
                    </div>
                    <Button
                        type='btn-neutral'
                        text='Customize'
                        className='mt-5 px-20'
                        click={() => navigate('/customize')}
                        icon={<Pencil fill='white' />}
                    />
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <div className='w-52'>
                        <Button text='Play' click={() => navigate('/game')} className='mb-6 min-w-full' />
                        <Button text='Profile' className='mb-6 min-w-full' />
                        <Button text='Shop' className='mb-6 min-w-full' />

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
