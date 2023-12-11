import { Switch } from "@headlessui/react";
import { useContext } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ThemeContext } from "../../context/ThemeContext";

const ToggleDarkMode = () => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    return (
        <Switch checked={darkMode} onChange={toggleDarkMode} className='inline-flex h-6 w-11 items-center rounded-full bg-gray-300'>
            <span className={`${darkMode ? 'translate-x-6' : 'translate-x-1'} h-4 w-4 transform rounded-full transition ease-in-out duration-700 bg-whitePrimary flex justify-center items-center`}>
                {darkMode ? <Icon icon="icon-park:moon" width="14" color="#1E88E5" /> : <Icon icon="noto:sun" color="#FFEB3B" width="14" />}
            </span>
        </Switch>
    )
}

export default ToggleDarkMode;