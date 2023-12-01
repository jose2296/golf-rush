import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import Button from '@shared/components/button';
import useStore from '@store';
import Target from '@svgs/target';
import { getApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Ball from '../game/components/Ball';

const colors = [
    { id: 1, name: 'Color1', value: '#F0A3C2' },
    { id: 2, name: 'Color2', value: '#87D37C' },
    { id: 3, name: 'Color3', value: '#2E86AB' },
    { id: 4, name: 'Color4', value: '#C3423F' },
    { id: 5, name: 'Color5', value: '#F5BB00' },
    { id: 6, name: 'Color6', value: '#4F6D7A' },
    { id: 7, name: 'Color7', value: '#9D7E79' },
    { id: 8, name: 'Color8', value: '#B565A7' },
    { id: 9, name: 'Color9', value: '#3E92CC' },
    { id: 10, name: 'Color10', value: '#F15A5E' },
    { id: 11, name: 'Color11', value: '#72CC4D' },
    { id: 12, name: 'Color12', value: '#F68E5F' },
    { id: 13, name: 'Color13', value: '#5A5A5A' },
    { id: 14, name: 'Color14', value: '#99B898' },
    { id: 15, name: 'Color15', value: '#E55934' },
    { id: 16, name: 'Color16', value: '#C2A157' },
    { id: 17, name: 'Color17', value: '#7C57D3' },
    { id: 18, name: 'Color18', value: '#AB2E86' },
    { id: 19, name: 'Color19', value: '#3FC342' },
    { id: 20, name: 'Color20', value: '#00F5BB' },
    { id: 21, name: 'Color21', value: '#7A4F6D' },
    { id: 22, name: 'Color22', value: '#799D7E' },
    { id: 23, name: 'Color23', value: '#A7B565' },
    { id: 24, name: 'Color24', value: '#CC3E92' },
    { id: 25, name: 'Color25', value: '#5EF15A' },
    { id: 26, name: 'Color26', value: '#9A41F4' },
    { id: 27, name: 'Color27', value: '#F492A5' },
    { id: 28, name: 'Color28', value: '#5C8BF4' },
    { id: 29, name: 'Color29', value: '#F49C5D' },
    { id: 30, name: 'Color30', value: '#75F4A5' },
    { id: 31, name: 'Color31', value: '#E54974' },
    { id: 32, name: 'Color32', value: '#8F8F8F' },
    { id: 33, name: 'Color33', value: '#F4EB75' },
    { id: 34, name: 'Color34', value: '#5A5A5A' },
    { id: 35, name: 'Color35', value: '#B8A8D5' },
    { id: 36, name: 'Color36', value: '#F4C75A' },
    { id: 37, name: 'Color37', value: '#6D7A4F' },
    { id: 38, name: 'Color38', value: '#D3799D' },
    { id: 39, name: 'Color39', value: '#5C74A7' },
    { id: 40, name: 'Color40', value: '#A5A05E' },
    { id: 41, name: 'Color41', value: '#F46F6F' },
    { id: 42, name: 'Color42', value: '#6F6F6F' },
    { id: 43, name: 'Color43', value: '#EBF475' },
    { id: 44, name: 'Color44', value: '#6A6A6A' },
    { id: 45, name: 'Color45', value: '#D5B38A' }
];

const stelas = [
    { id: 1, name: 'None', value: 'none' },
    { id: 2, name: 'Basic', value: 'basic' }
];

const items = [
    colors,
    stelas,
    [
        { id: 15, name: 'Color15', value: '#E55934' }
    ]
];

const Aaaa = ({ color, stela }) => {
    
    const ballRef = useRef<Ball>();
    const cameraRef = useRef(null);
    
    useFrame((state, delta) => {
        console.log();
        const {x, y} = ballRef.current.worldCom();
        cameraRef.current?.position.copy([x,y, 6]);

    });
    return (
        <>
            <OrbitControls />
            <ambientLight />
            {/* <PerspectiveCamera ref={cameraRef} makeDefault position={[10, 10, 10]} /> */}
            <Physics gravity={[0, 0, 0]} >
                <Ball ref={ballRef} type='fixed' color={color} position={[0, 0, 0]} stela={stela} />
            </Physics>
        </>
    );
};

const Customize = () => {
    const userData = useStore(state => state.userData);
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentColorSelected, setCurrentColorSelected] = useState(items[0].find(item => item.value === userData?.color) ?? items[0][0]);
    const [currentStelaSelected, setCurrentStelaSelected] = useState(items[1].find(item => item.value === userData?.stela) ?? items[1][0]);
    const { t } = useTranslation();

    const tabs = [
        'colors',
        'stelas',
        'accessories',
    ];

    const handleChangeColor = (color: typeof items[0][0]) => {
        const db = getFirestore(getApp());
        const users = doc(db, `/users/${userData?.uid}`);

        setCurrentColorSelected(color);
        setDoc(users, {
            color: color.value
        }, { merge: true });
    };

    const handleChangeStela = (stela: typeof items[1][0]) => {
        const db = getFirestore(getApp());
        const users = doc(db, `/users/${userData?.uid}`);

        setCurrentStelaSelected(stela);
        setDoc(users, {
            stela: stela.value
        }, { merge: true });
    };

    const handleClickItem = (item: typeof items[0][0]) => {
        if (currentIndex === 0) {
            handleChangeColor(item);
        }

        if (currentIndex === 1) {
            handleChangeStela(item);
        }
    };


    return (
        <div className='flex flex-col justify-between'>
            <div className=''>
                <Button text='back' type='btn-link' click={() => navigate('/app')} />
            </div>
            <div className='grid gap-x-20 lg:gap-y-20 grid-cols-1 lg:grid-cols-2 flex-1'>
                <div className='flex items-center justify-center flex-col'>
                    <div className='w-full h-96 rounded-xl border-2 border-secondary'>
                        
                        <Canvas style={{ width: '100%', height: '100%' }} camera={{ position: [ 0, 1, 6] }} >
                            <Aaaa color={currentColorSelected.value} stela={currentStelaSelected.value} />
                        </Canvas>
                    </div>
                    <Button
                        type='btn-neutral'
                        text='customize.practice'
                        className='mt-5 px-20'
                        // click={() => navigate('/practice')}
                        icon={<Target fill='white' />}
                    />
                </div>
                <div className='flex items-center justify-center'>
                    <div className='w-full h-[600px] rounded-xl border-2 border-secondary flex flex-col overflow-hidden'>
                        <div className='flex p-0 border-b-2 border-secondary'>
                            {tabs && tabs.map((tab, index) => (
                                <button
                                    key={`tab-${index}`}
                                    className={`flex-1 tooltip tooltip-bottom text-center border-secondary p-2 h-12 rounded-none text-[1.1rem] disabled:cursor-not-allowed disabled:opacity-50 ${index > 0 ? 'border-l-2' : ''} ${index === currentIndex ? 'bg-primary text-primary-content' : ''}`}
                                    disabled={index > 1}
                                    data-tip={t(`customize.${index > 1 ? 'coming_soon' : tab}`)}
                                    onClick={() => setCurrentIndex(index)}
                                >
                                    {t(`customize.${tab}`)}
                                </button>
                            ))}
                        </div>

                        <div className='grid grid-cols-4 gap-4 p-4 h-full overflow-y-scroll'>
                            {items?.[currentIndex] && items[currentIndex].map(item => (
                                <button 
                                    ref={el => currentColorSelected.id === item.id ? el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) : null} 
                                    key={`item-${item.name}`} 
                                    className='group text-center w-20 h-[110px] grid gap-1' 
                                    onClick={() => handleClickItem(item)}
                                >
                                    {currentIndex === 0 &&
                                        <div className={`h-20 border-2 border-primary rounded-lg flex justify-center items-center group-hover:bg-secondary transition duration-[600ms] ${currentColorSelected.id === item.id ? '!bg-primary' : ''}`}>
                                            <div style={{ backgroundColor: item.value }} className={'w-10 h-10 rounded-full '} />
                                        </div>
                                    }

                                    {currentIndex === 1 && 
                                        <div className={`h-20 border-2 border-primary rounded-lg flex justify-center items-center group-hover:bg-secondary transition duration-[600ms] ${currentStelaSelected.id === item.id ? '!bg-primary' : ''}`}>
                                            {item.value}
                                        </div>
                                        // <div className='w-20 h-20 border-2 border-primary'>{item.value}</div>
                                    }

                                    {
                                        currentIndex === 2 && <div className='w-20 h-20 border-2 border-primary'>{item.value}</div>

                                    }
                                    <span className={`${currentColorSelected.id === item.id ? 'font-bold' : ''}`}>{item.name}</span>

                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customize;
