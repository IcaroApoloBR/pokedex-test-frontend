import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastrar" element={<SignUp />} />
            <Route path="/detail/:id" element={<PokemonDetail />} />
        </Routes>
    )
}