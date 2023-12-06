import { motion } from 'framer-motion';
import { socials } from '../../constants';
import PlayerMusic from './PlayerMusic';
import ScrollToTopButton from './ScrollToTopButton';

const Footer = () => {
    return (
        <>
            <motion.footer
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.0 }}
                className="bg-whiteSecondary dark:bg-darkPrimary"
            >
                <div className="p-4 text-yellowPrimary dark:text-yellowSecondary bg-whiteSecondary dark:bg-darkPrimary">
                    <div className="flex items-center lg:justify-between justify-center flex-wrap gap-4">
                        <a href="#" className="font-extrabold text-[24px] cursor-pointer hover:animate-bounce">Ícaro Apolo</a>
                        <div className="flex gap-4">
                            {socials.map((social) => (
                                <div key={social.name}>
                                    <a href={social.href} target="_blank" className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer">
                                        <img
                                            alt={social.name}
                                            src={social.url}
                                            className="object-contain hover:animate-pulse"
                                        />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.footer >

            <PlayerMusic />

            <ScrollToTopButton />
        </>
    )
}

export default Footer