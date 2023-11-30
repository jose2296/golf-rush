import { HTMLAttributes, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

interface props {
    type?: 'normal' | 'btn-primary' | 'btn-secondary' | 'btn-accent' | 'btn-neutral' | 'btn-ghost' | 'btn-link';
    // type?: 'normal' | 'primary' | 'secondary' | 'accent' | 'neutral' | 'ghost' | 'link';
    text: string;
    className?: HTMLAttributes<HTMLElement>['className'];
    icon?: ReactElement;
    linksTo?: string;
    click?: () => void;
    loading?: boolean;
}

const Button = ({ type = 'btn-secondary', text, className, icon, click, loading }: props) => {
    const { t } = useTranslation();

    return (
        <button onClick={click} className={`btn ${type === 'normal' ? '' : type} ${className || ''}`}>
            {t(text)}
            {icon && (
                <div className='icon w-4 ml-1'>
                    {icon}
                </div>
            )}
            {loading && <span className='loading loading-spinner' />}
        </button>
    );
};

export default Button;
