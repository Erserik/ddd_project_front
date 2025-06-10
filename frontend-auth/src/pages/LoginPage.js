// src/pages/LoginPage.js
import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
                username,
                password,
            });

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            setMessage("Успешный вход!");
        } catch (error) {
            setMessage("Ошибка входа: проверьте данные.");
        }
    };

    return (
        <div className="login-form">
            <h2>Вход</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Войти</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginPage;
