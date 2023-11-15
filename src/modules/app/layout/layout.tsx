import { ReactElement } from 'react';
import Footer from './footer/footer';
import Header from './header/header';

const Layout = ({ children }: { children: ReactElement }) => {

    return (
        <div className='main-container h-screen bg-base-300 flex flex-col'>
            <Header />
            {/* <main className='max-w-screen-xl m-auto flex flex-1'> */}
            <main className='max-w-5xl w-full h-screen mx-auto grid gap-4 grid-cols-1'>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
