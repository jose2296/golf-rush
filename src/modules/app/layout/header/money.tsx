import { ReactElement } from 'react';

const Money = ({ count, icon }: { count: number; icon?: ReactElement }) => (
    <div className='p-1 border-2 text-center flex justify-center tooltip tooltip-bottom min-w-[100px]' data-tip={count}>
        <span className='max-w-[50px] truncate'>{count}</span>
        {icon}
    </div>
);

export default Money;
