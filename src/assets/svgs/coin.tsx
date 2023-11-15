import { HTMLAttributes } from 'react';

interface props {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    className?: HTMLAttributes<HTMLElement>['className'];
}

const Coin = ({ fill = 'none', stroke = '#000', strokeWidth = 2, className }: props) => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 64 64'
        aria-labelledby='title'
        aria-describedby='desc'
        role='img'
        className={className}
    >
        <circle
            data-name='layer2'
            cx='32'
            cy='32'
            r='30'
            fill={fill}
            stroke={stroke}
            strokeMiterlimit='10'
            strokeWidth={strokeWidth}
            strokeLinejoin='round'
            strokeLinecap='round'
        ></circle>
        <path
            data-name='layer1'
            fill={fill}
            stroke={stroke}
            strokeMiterlimit='10'
            strokeWidth={strokeWidth}
            d='M19.6 46h21.3M20 32h21m1-10a8 8 0 0 0-16 0v17.6c0 3.2-1.1 6.4-6.4 6.4'
            strokeLinejoin='round'
            strokeLinecap='round'
        ></path>
    </svg>
);

export default Coin;
