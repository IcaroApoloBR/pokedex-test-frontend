import { useState } from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Button } from "../components/Button";
import { toast } from "react-toastify";
import logo from '../assets/logo.png';
import backgroundLogin from '../assets/backgroundLogin.jpg';
import { FormSignIn, SignInDataProps } from "../types/FormSignIn.types";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../services/api";
import { storageUserSave } from "../storage/storageUser";
import { User } from "../types/User";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<SignInDataProps>({
        resolver: zodResolver(FormSignIn)
    });

    const showPassword = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    const loginUser = async (data: SignInDataProps) => {
        setIsLoading(true);

        try {
            const result = await auth(data.email, data.password);

            const authUser: User = {
                token: result.data.token,
                email: result.data.email,
                id: result.data.id,
                name: result.data.name,
                created_at: result.data.created_at,
            }

            storageUserSave(authUser)

            navigate('/');

            if (result?.error) {
                toast.error("Invalid credentials");
            }
        } catch (error) {
            console.log(error)
            if (error.response.status === 400) {
                toast.error("Invalid credentials, try again");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="grid md:grid-cols-2 sm:grid-cols-1 bg-darkPrimary">
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full bg-hero-login bg-no-repeat bg-left-bottom bg-cover brightness-50"
                >
                    <img src={backgroundLogin} className="hidden md:block h-full brightness-50 object-cover" alt="Pokemon Background" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 h-screen bg-darkPrimary">
                    <div className="max-w-md w-full">

                        <div className="flex flex-col items-center my-4">
                            <img src={logo} width={200} height={200} alt="Pokedex Logo" />
                            <span className="font-semibold text-white text-lg">Login</span>
                        </div>

                        <form className="space-y-4"
                            onSubmit={handleSubmit(loginUser)}>
                            <div className="relative">
                                <div className="absolute top-3 pl-3 pointer-events-none">
                                    <Icon className="text-colorPrimary" icon="ic:twotone-alternate-email" width="24" />
                                </div>
                                <input
                                    type="text"
                                    {...register('email')}
                                    autoComplete="off"
                                    value={email || ''}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="text-sm border focus:ring-colorPrimary outline-none border-colorSecondary focus:border-colorPrimary pl-10 p-3 w-full  bg-darkSecondary placeholder-gray-400 text-gray-200 rounded-md focus:z-10 sm:text-sm"
                                    placeholder="E-mail"
                                />
                                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
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
                                    autoComplete="new-password"
                                    value={password || ''}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="text-sm border focus:ring-colorPrimary outline-none border-colorSecondary focus:border-colorPrimary pl-10 p-3 w-full  bg-darkSecondary placeholder-gray-400 text-gray-200 rounded-md focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                            </div>

                            <div className="flex items-center justify-start">
                                <Link to="/cadastrar" className="text-sm font-semibold text-colorPrimary hover:text-colorSecondary">
                                    Not a pokemon trainer yet? Create an account
                                </Link>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={!email && !password}>
                                    {isLoading ? "Signing in..." : "Sign in"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </motion.div>

            </div >
        </>
    )
}