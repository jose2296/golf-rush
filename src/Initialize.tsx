import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const Login = lazy(() => import('./modules/auth/login'));
const Home = lazy(() => import('./modules/app/home/home'));
const Customize = lazy(() => import('./modules/app/customize/customize'));
const Game = lazy(() => import('./modules/app/game/game'));

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: 'AIzaSyAqCWvs41WFHV3KB9Ejkbq6G9UQkp8_qj8',
//     authDomain: 'golf-rush-web.firebaseapp.com',
//     projectId: 'golf-rush-web',
//     storageBucket: 'golf-rush-web.appspot.com',
//     messagingSenderId: '432798610549',
//     appId: '1:432798610549:web:12ad3127b2ea6017b4b43c',
//     measurementId: 'G-ZXE2NDBZHV'
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
// provider.addScope('profile');
// provider.addScope('email');

// signInWithPopup(auth, provider).then(result => {
//     console.log(result);

//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential?.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // IdP data available using getAdditionalUserInfo(result)
//     const idP = getAdditionalUserInfo(result);

//     console.log(token);
//     console.log(user);
//     console.log(idP);

// }).catch(error => {
//     console.error(error);
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);

//     console.log(errorCode);
//     console.log(errorMessage);
//     console.log(email);
//     console.log(credential);
// });

export const Initialize = () => {
    const router = createBrowserRouter([
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/',
            element: <Home />
        },
        {
            path: '/customize',
            element: <Customize />,
        },
        {
            path: '/game',
            element: <Game />,
        },
    ]);

    return (
        <div className='bg-slate-800'>
            <Suspense fallback={<h1>LOADING</h1>}>
                <RouterProvider router={router} />
            </Suspense>
        </div>
    );
};
