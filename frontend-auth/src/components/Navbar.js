import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const isAuth = useAuth();

    return (
        <nav style={{ background: '#f2f2f2', padding: '10px' }}>
            {isAuth ? (
                <>
                    <Link to="/posts" style={{ marginRight: '15px' }}>Посты</Link>
                    <Link to="/upload">Загрузить</Link>
                </>
            ) : (
                <>
                  <Link to="/register" style={{ marginRight: '15px' }}>Регистрация</Link>
                    <Link to="/login">Вход</Link>
                </>
            )}
        </nav>
    );
};

export default Navbar;
