import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import menu from '../../assets/menu.svg';
import close from '../../assets/close.svg';
import logo from '../../assets/logo.png';

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [toggle, setToggle] = useState(false);
  const [navColor, setNavColor] = useState("bg-colorPrimary")

  const listenScrollEvent = () => {
    window.scrollY > 10 ? setNavColor("bg-colorPrimary shadow-md shadow-colorSecondary duration-700") : setNavColor("bg-colorPrimary");
  }

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    }
  }, [])

  return (
    <nav className={`${navColor} w-full flex items-center justify-center sm:px-16 px-6 py-5 fixed top-0 z-50`}>
      <div className="w-full flex justify-between items-center max-w-7xl mx-5">
        <Link to="/" className="flex items-center gap-2" onClick={() => { setActive(""); window.scrollTo(0, 0); }}>
          <img src={logo} alt="Logo Portfolio" className="w-28 h-w-28 object-contain" />
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          <li className={`${active === "home" ? "text-yellowPrimary dark:text-darkPrimary" : "text-whiteSecondary dark:text-darkSecondary"} hover:text-yellowSecondary  transition-colors font-semibold cursor-pointer`} onClick={() => setActive("home")}>
            <Link to="/">Home</Link>
          </li>
          <li className={`${active === "profile" ? "text-yellowPrimary dark:text-darkPrimary" : "text-whiteSecondary dark:text-darkSecondary"} hover:text-yellowSecondary  transition-colors font-semibold cursor-pointer`} onClick={() => setActive("profile")}>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img src={toggle ? close : menu} alt="Menu icon" className="w-[28px] h-[28px] object-contain cursor-pointer" onClick={() => setToggle(!toggle)} />

          <div className={`${!toggle ? 'hidden' : 'flex'} p-6 dark:bg-darkPrimary bg-whiteSecondary border border-yellowSecondary absolute top-14 right-0 mx-4 my-2 min-w-[140px] flex justify-center z-50 rounded-xl`}>
            <ul className="list-none flex flex-col justify-end items-start gap-4">
              <li className={`${active === "home" ? "text-yellowPrimary dark:text-whitePrimary" : "text-yellowSecondary dark:text-whiteSecondary"} hover:text-yellowSecondary  transition-colors font-semibold cursor-pointer`} onClick={() => { setToggle(!toggle); setActive("home") }}>
                <Link to="/">Home</Link>
              </li>
              <li className={`${active === "profile" ? "text-yellowPrimary dark:text-whitePrimary" : "text-yellowSecondary dark:text-whiteSecondary"} hover:text-yellowSecondary  transition-colors font-semibold cursor-pointer`} onClick={() => { setToggle(!toggle); setActive("profile") }}>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav >
  )
}

export default Navbar