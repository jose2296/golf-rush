import useStore from '@store';
import { getAuth, signOut } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const userFullName = useStore(state => `${state.userData?.name} ${state.userData?.surname}`);
    const { t } = useTranslation();

    // const coins = 5000;
    // const gems = 100;

    const logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            navigate('/login');
        }).catch((error) => {
            console.error(error);
        });
    };
    return (
        <header className='bg-base-100 flex items-center h-16 px-10 py-5'>
            <h1 className='text-3xl font-bold flex-1'>Golf Rush</h1>

            {/* <div className='flex gap-4 justify-center flex-row'>
                <Money count={coins} icon={<Coin stroke='white' strokeWidth={4} className='w-5 ml-2' />} />
                <Money count={gems} icon={<Gem fill='white' strokeWidth={4} className='w-5 ml-2' />} />
            </div> */}
            <div className=''>
                <p>{userFullName}</p>
            </div>

            <div className='dropdown dropdown-end'>
                <label tabIndex={0} className='btn btn-ghost btn-circle avatar p-1 ml-2'>
                    <div className='rounded-full'>
                        <img alt='avatar' src='/src/assets/avatar.jpg' />
                    </div>
                </label>
                <ul tabIndex={0} className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box'>
                    <li><a className='px-10 py-2 justify-between'>{t('settings')}</a></li>
                    <li><a className='px-10 py-2'>{t('contact')}</a></li>
                    <div className='divider divider-neutral m-0' />
                    <li onClick={logout}><a className='px-10 py-2 text-primary hover:text-primary'>{t('logout')}</a></li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
