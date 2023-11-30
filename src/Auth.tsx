import useStore from '@store';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const firebaseConfig = {
    apiKey: 'AIzaSyAqCWvs41WFHV3KB9Ejkbq6G9UQkp8_qj8',
    authDomain: 'golf-rush-web.firebaseapp.com',
    projectId: 'golf-rush-web',
    storageBucket: 'golf-rush-web.appspot.com',
    messagingSenderId: '432798610549',
    appId: '1:432798610549:web:12ad3127b2ea6017b4b43c',
    measurementId: 'G-ZXE2NDBZHV'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Auth = () => {
    const setUserUid = useStore((state) => state.setUserUid);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserUid(user.uid);
                navigate(pathname ?? 'app');
            } else {
                navigate('login');
            }

            setLoading(false);
        });
    }, []);

    return loading ? <></> : <Outlet />;
};

export default Auth;
