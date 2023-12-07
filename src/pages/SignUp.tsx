import { useState } from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Button } from "../components/Button";
import { toast } from "react-toastify";
import logo from '../assets/logo.png';
import backgroundSignUp from '../assets/backgroundSignUp.png';
import { SignUpDataProps, SignUpSchema } from "./types/FormSignUp.types";

export default function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isLoadingSignUp, setIsLoadingSignUp] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpDataProps>({
        resolver: zodResolver(SignUpSchema)
    });

    const showPassword = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    const signUp = async (data: SignUpDataProps) => {
        setIsLoadingSignUp(true);
        setErrorMessage("");

        if (data.password !== data.confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        try {
            const result = await signIn("credentials", {
                name: data.name,
                email: data.email,
                password: data.password,
                redirect: false,
            });

            console.log(result)

            if (result?.error) {
                setErrorMessage("Incorrect email or password");
                toast.error("Invalid credentials");
            } else {
                // router.push("/churras");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingSignUp(false);
        }
    };

    return (
        <>
            <div className="grid md:grid-cols-2 sm:grid-cols-1 bg-darkPrimary">

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <img src={backgroundSignUp} className="h-full brightness-50 object-cover" alt="Pokemon Background" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-screen bg-darkPrimary">
                    <div className="max-w-md w-full">

                        <div className="flex flex-col items-center my-4">
                            <img src={logo} width={200} height={200} alt="Pokedex Logo" />
                            <span className="font-semibold text-white text-lg">Pokemon Trainer Registration</span>
                        </div>

                        {errorMessage && <p className="text-red-500 text-sm text-center mb-1">{errorMessage}</p>}

                        <form className="space-y-4"
                            onSubmit={handleSubmit(signUp)}>
                            <div className="relative">
                                <div className="absolute top-3 pl-3 pointer-events-none">
                                    <Icon className="text-colorPrimary" icon="ic:twotone-alternate-email" width="24" />
                                </div>
                                <input
                                    type="text"
                                    {...register('email')}
                                    autoComplete="email"
                                    value={email || ''}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="text-sm border focus:ring-colorPrimary outline-none border-colorSecondary focus:border-colorPrimary pl-10 p-3 w-full  bg-darkSecondary placeholder-gray-400 text-gray-200 rounded-md focus:z-10 sm:text-sm"
                                    placeholder="E-mail"
                                />
                                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                            </div>

                            <div className="relative">
                                <div className="absolute top-3 pl-3 pointer-events-none">
                                    <Icon className="text-colorPrimary" icon="mdi:user" width="24" />
                                </div>
                                <input
                                    type="text"
                                    {...register('name')}
                                    value={name || ''}
                                    onChange={(e) => setName(e.target.value)}
                                    className="text-sm border focus:ring-colorPrimary outline-none border-colorSecondary focus:border-colorPrimary pl-10 p-3 w-full  bg-darkSecondary placeholder-gray-400 text-gray-200 rounded-md focus:z-10 sm:text-sm"
                                    placeholder="Pokemon trainer name"
                                />
                                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                            </div>

                            <div className="relative">
                                <div className="absolute top-3 pl-3 pointer-events-none">
                                    <Icon className="text-colorPrimary" icon="mdi:password" width="24" />
                                </div>
                                <button type="button" onClick={showPassword} className="absolute top-3 right-0 pr-3">
                                    {isPasswordVisible ?
                                        <Icon className="text-colorPrimary hover:text-colorPrimary" icon="mdi:eye" width="24" />
                                        :
                                        <Icon className="text-colorPrimary hover:text-colorPrimary" icon="mdi:eye-off" width="24" />
                                    }
                                </button>
                                <input
                                    {...register('password')}
                                    type={isPasswordVisible ? "text" : "password"}
                                    value={password || ''}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="text-sm border focus:ring-colorPrimary outline-none border-colorSecondary focus:border-colorPrimary pl-10 p-3 w-full  bg-darkSecondary placeholder-gray-400 text-gray-200 rounded-md focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    required
                                />
                                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                            </div>

                            <div className="relative">
                                <div className="absolute top-3 pl-3 pointer-events-none">
                                    <Icon className="text-colorPrimary" icon="mdi:password" width="24" />
                                </div>
                                <button type="button" onClick={showPassword} className="absolute top-3 right-0 pr-3">
                                    {isPasswordVisible ?
                                        <Icon className="text-colorPrimary hover:text-colorPrimary" icon="mdi:eye" width="24" />
                                        :
                                        <Icon className="text-colorPrimary hover:text-colorPrimary" icon="mdi:eye-off" width="24" />
                                    }
                                </button>
                                <input
                                    {...register('confirmPassword')}
                                    type={isPasswordVisible ? "text" : "password"}
                                    value={confirmPassword || ''}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="text-sm border focus:ring-colorPrimary outline-none border-colorSecondary focus:border-colorPrimary pl-10 p-3 w-full  bg-darkSecondary placeholder-gray-400 text-gray-200 rounded-md focus:z-10 sm:text-sm"
                                    placeholder="Confirm password"
                                />
                                {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
                            </div>

                            <div className="flex items-center justify-start">
                                <a href="/login" className="text-sm font-semibold text-colorPrimary hover:text-colorSecondary">
                                    Already have an account? Login now
                                </a>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={!email && !password}>
                                    {isLoadingSignUp ? "Waiting..." : "Sign Up"}
                                </Button>
                            </div>

                        </form>
                    </div>
                </motion.div>

            </div >
        </>
    )
}