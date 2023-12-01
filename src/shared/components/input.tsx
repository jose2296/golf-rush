import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface InputProps {
    type?: 'text' | 'password';
    placeholder: string;
    register: UseFormRegisterReturn<string>
    errors: FieldError | undefined;
}

const Input = ({ type = 'text', placeholder, register, errors }: InputProps) => {
    const { t } = useTranslation();

    return (
        <label className='form-control w-full max-w-xs mb-5'>
            <div className='label'>
                <span className='label-text'>{t(placeholder)}</span>
            </div>
            <input type={type} placeholder={t(placeholder)} className='input input-bordered input-primary w-full max-w-xs focus:outline-none' {...register} />
            <div className='label'>
                { errors &&
                    errors.type === 'required' && <span className='label-text-alt text-error'>{t('validations.required_field')}</span>
                }
                {/* <span className='label-text-alt'>Bottom Right label</span> */}
            </div>
        </label>
    );
};

export default Input;
