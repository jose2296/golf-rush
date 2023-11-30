import Loader from '@shared/components/loader';
import useStore, { SetUserData } from '@store';
import { getApp } from 'firebase/app';
import { Unsubscribe, doc, getFirestore, onSnapshot } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header/header';

const Layout = () => {

    const userData = useStore(state => state.userData);
    const setUserData = useStore(state => state.setUserData);
    const [loading, setLoading] = useState(true);

    const unsubscribe = useRef<Unsubscribe>();

    useEffect(() => {
        setLoading(true);
        getData();

        return () => {
            unsubscribe.current?.();
        };
    }, []);

    const getData = async () => {
        const db = getFirestore(getApp());
        const usersDoc = doc(db, `/users/${userData?.uid}`);
        // const querySnapshot = await getDoc(usersDoc);
        // const docUserData = querySnapshot.data() as SetUserData;
        // setUserData(docUserData);

        const unSubscribe = onSnapshot(usersDoc, (doc) => {
            const docUserData = doc.data() as SetUserData;
            setUserData(docUserData);
            setLoading(false);
        });
        unsubscribe.current = unSubscribe;
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className='main-container h-screen bg-base-300 flex flex-col'>
            <Header />
            <main className='max-w-5xl w-full h-screen mx-auto grid gap-4 grid-cols-1'>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;
