import Button from '@shared/components/button';
import Input from '@shared/components/input';
import useStore from '@store';
import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface FormFields {
    email: string;
    password: string;
}

const Login = () => {
    const { register, handleSubmit } = useForm<FormFields>();

    const setUserUid = useStore((state) => state.setUserUid);
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { t } = useTranslation();

    const signIn = ({ email, password }: FormFields) => {
        setLoading(true);
        setErrorMessage(null);
        const auth = getAuth();
        setPersistence(auth, browserLocalPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                    const uid = userCredential.user.uid;
                    setUserUid(uid);
                    setLoading(false);
                    navigate('/app');
                })
                    .catch((error) => {

                        if (error.code === 'auth/invalid-login-credentials') {
                            setErrorMessage('login.invalid_login_credentials');
                        }
                        setLoading(false);
                    });
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    return (
        <div className='flex justify-center'>
            <form onSubmit={handleSubmit(signIn)} className='flex flex-col max-w-sm items-center justify-center h-[100vh] '>
                <Input placeholder='login.email' register={register('email')} />
                <Input type='password' placeholder='login.password' register={register('password')} />
                <Button text='login.login' type='btn-primary' loading={loading} />

                {errorMessage &&
                    <span className='text-error mt-4'>{t(errorMessage)}</span>
                }
            </form>
        </div>

    );
};

export default Login;
