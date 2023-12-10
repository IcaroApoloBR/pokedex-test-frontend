import { ReactNode, MouseEventHandler } from 'react';

interface ButtonProps {
    type: "button" | "submit" | "reset";
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    disabled?: boolean;
}

export const Button = ({ type, onClick, children, disabled }: ButtonProps) => {
    return (
        <>
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} relative px-3 py-1.5 bg-colorPrimary hover:bg-colorSecondary text-white text-base font-bold rounded-2xl shadow-lg hover:scale-95 transition-all`}>
                {children}
            </button>
        </>
    )
}