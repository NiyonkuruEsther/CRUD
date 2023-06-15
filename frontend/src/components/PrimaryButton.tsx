import { ButtonHTMLAttributes } from 'react'

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `items-center px-4 py-2 bg-yellow-400 text-white border-transparent rounded-md font-semibold text-md uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}>
            {children}
        </button>
    )
}
