import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/RegisterPage';
import Login from './pages/LoginPage';
import PostsPage from './pages/PostsPage';
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadForm';
import useAuth from './hooks/useAuth';
import Navbar from './components/Navbar';

function App() {
    const isAuth = useAuth();

    return (
        <Router>
            <Navbar />
            <Routes>
                {!isAuth && <Route path="/" element={<HomePage />} />}
                {!isAuth && <Route path="/register" element={<Register />} />}
                {!isAuth && <Route path="/login" element={<Login />} />}
                {isAuth && <Route path="/posts" element={<PostsPage />} />}
                {isAuth && <Route path="/upload" element={<UploadPage />} />}
                {/* Если путь не совпал */}
                <Route path="*" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;
