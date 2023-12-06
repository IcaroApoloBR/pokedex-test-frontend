import { Routes, Route } from 'react-router-dom';
import Layout from './components/LayoutDefault/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PokemonDetail from './pages/PokemonDetail';

export function Router() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastrar" element={<SignUp />} />

            <Route path="/"
                element={
                    <Layout>
                        <Home />
                    </Layout>
                }
            />


            <Route path="/detail/:id"
                element={
                    <Layout>
                        <PokemonDetail />
                    </Layout>
                }
            />
        </Routes>
    );
}