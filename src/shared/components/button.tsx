import { HTMLAttributes, ReactElement } from 'react';

interface props {
    type?: 'normal' | 'btn-primary' | 'btn-secondary' | 'btn-accent' | 'btn-neutral' | 'btn-ghost' | 'btn-link';
    // type?: 'normal' | 'primary' | 'secondary' | 'accent' | 'neutral' | 'ghost' | 'link';
    text: string;
    className?: HTMLAttributes<HTMLElement>['className'];
    icon?: ReactElement;
    linksTo?: string;
    click?: () => void
}

const Button = ({ type = 'btn-secondary', text, className, icon, click }: props) => {
    return (
        <button onClick={click} className={`btn ${type === 'normal' ? '' : type} ${className || ''}`}>
            {text}
            {icon && (
                <div className='icon w-4 ml-1'>
                    {icon}
                </div>
            )}
        </button>
    );
};

export default Button;
