const Footer = () => {

    return (
        <footer className='h-40 border-primary border-t-2 flex items-center justify-center text-blue-600 font-bold'>
            <div className='level-number mr-4 text-5xl'>
                2
            </div>
            {/* w-[800px] */}
            <div className='level-bar max-w-3xl h-6 w-full bg-transparent border-2 border-blue-400 rounded-2xl'>
                <div className='level-percentage bg-success w-3/6 h-full rounded-2xl'></div>
            </div>
            <div className='next-level-reward ml-4'>
        Reward
            </div>
        </footer>
    );
};

export default Footer;
