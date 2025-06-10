import React, { useState } from 'react';
import { registerUser } from '../api/auth';

const RegisterPage = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(form);
            setMessage('Регистрация прошла успешно!');
        } catch (err) {
            setMessage('Ошибка регистрации');
        }
    };

    return (
        <div className="register-container">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Имя" onChange={handleChange} required />
                <input name="email" placeholder="Email" onChange={handleChange} required type="email" />
                <input name="password" placeholder="Пароль" onChange={handleChange} required type="password" />
                <button type="submit">Зарегистрироваться</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default RegisterPage;
