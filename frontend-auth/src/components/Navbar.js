import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
    const isAuth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/');
        window.location.reload();
    };

    return (
        <nav style={navStyle}>
            <div style={navInnerStyle}>
                <div style={linkGroupStyle}>
                    {isAuth ? (
                        <>
                            <Link to="/posts" style={linkStyle}>Посты</Link>
                            <Link to="/upload" style={linkStyle}>Загрузить</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/register" style={linkStyle}>Регистрация</Link>
                            <Link to="/login" style={linkStyle}>Вход</Link>
                        </>
                    )}
                </div>

                {isAuth && (
                    <button onClick={handleLogout} style={logoutStyle}>
                        Выйти
                    </button>
                )}
            </div>
        </nav>
    );
};

const navStyle = {
    backgroundColor: '#28a745',
    padding: '12px 24px',
};

const navInnerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
};

const linkGroupStyle = {
    display: 'flex',
    gap: '16px',
};

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
    padding: '6px 12px',
    borderRadius: '4px',
};

const logoutStyle = {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '4px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    display: 'inline-block',
    width: 'auto',
};

export default Navbar;
