import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/LayoutDefault/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Detail from './pages/Detail';
import { storageUserGet } from './storage/storageUser';
import Profile from './pages/Profile';

export function Router() {
    const user = storageUserGet();
    const isAuthenticated = user;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            const allowedPaths = ['/login', '/cadastrar'];
            const currentPath = window.location.pathname;

            if (!allowedPaths.includes(currentPath)) {
                navigate('/login');
            }
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
                        path="/profile"
                        element={
                            <Layout>
                                <Profile />
                            </Layout>
                        }
                    />
                    <Route
                        path="/detail/:id"
                        element={
                            <Layout>
                                <Detail />
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
