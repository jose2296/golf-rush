import { UseFormRegisterReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const Input = ({ type = 'text', placeholder, register }: { type?: 'text' | 'password', placeholder: string, register: UseFormRegisterReturn<string>}) => {
    const { t } = useTranslation();

    return (
        <label className='form-control w-full max-w-xs'>
            <div className='label'>
                <span className='label-text'>{t(placeholder)}</span>
            </div>
            <input type={type} placeholder={t(placeholder)} className='input input-bordered input-primary w-full max-w-xs focus:outline-none mb-5' {...register} />
            {/* <div className='label'>
                <span className='label-text-alt'>Bottom Left label</span>
                <span className='label-text-alt'>Bottom Right label</span>
            </div> */}
        </label>
    );
};

export default Input;
