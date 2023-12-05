import { useState } from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Button } from "../components/Button";
import { toast } from "react-toastify";
import logo from '../assets/logo.png';
import background from '../assets/background.jpg';
import { FormSignIn, SignInDataProps } from "./types/FormSignIn.types";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm<SignInDataProps>({
        resolver: zodResolver(FormSignIn)
    });

    const showPassword = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    const loginUser = async (data: SignInDataProps) => {
        setIsLoading(true);
        setErrorMessage("");

        try {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            console.log(result)

            if (result?.error) {
                setErrorMessage("E-mail ou senha incorretos");
                toast.error("Credenciais inválidas");
            } else {
                // router.push("/churras");
            }
        } catch (error) {
            console.error(error);
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
                >
                    <img src={background} className="h-full brightness-50 object-cover" alt="Pokemon Background" />
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

                        {errorMessage && <p className="text-red-500 text-sm text-center mb-1">{errorMessage}</p>}

                        <form className="space-y-4"
                            onSubmit={handleSubmit(loginUser)}>
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
                                    placeholder="Senha"
                                />
                                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                            </div>

                            <div className="flex items-center justify-start">
                                <a href="/cadastrar" className="text-sm font-semibold text-colorPrimary hover:text-colorSecondary">
                                    Ainda não é um treinador? Criar conta
                                </a>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={!email && !password}>
                                    {isLoading ? "Entrando..." : "Entrar"}
                                </Button>
                            </div>

                        </form>
                    </div>
                </motion.div>

            </div >
        </>
    )
}