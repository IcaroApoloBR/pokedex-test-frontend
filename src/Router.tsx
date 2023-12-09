import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/LayoutDefault/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PokemonDetail from './pages/PokemonDetail';
import { storageUserGet } from './storage/storageUser';

export function Router() {
    const user = storageUserGet();
    const isAuthenticated = user;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    return (
        <Routes>
            {isAuthenticated ? (
                <>
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <Home />
                            </Layout>
                        }
                    />
                    <Route
                        path="/detail/:id"
                        element={
                            <Layout>
                                <PokemonDetail />
                            </Layout>
                        }
                    />
                </>
            ) : (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastrar" element={<SignUp />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </>
            )}
        </Routes>
    );
}
