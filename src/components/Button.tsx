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
                className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} relative px-5 py-2.5 bg-colorPrimary hover:bg-colorSecondary text-white text-lg font-bold rounded-2xl shadow-lg hover:scale-95 transition-all`}>
                {children}
            </button>
        </>
    )
}