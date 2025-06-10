import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('text');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('type', type);

        if (type === 'text') formData.append('content', content);
        else if (type === 'image') formData.append('image', file);
        else if (type === 'document') formData.append('document', file);

        try {
            const token = localStorage.getItem('access');
            const response = await axios.post('http://127.0.0.1:8000/api/posts/create/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Успешно загружено!');
        } catch (err) {
            console.error(err);
            setMessage('Ошибка загрузки');
        }
    };

    return (
        <div>
            <h2>Загрузить новый пост</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Название" value={title} onChange={(e) => setTitle(e.target.value)} required />

                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="text">Текст</option>
                    <option value="document">Документ</option>
                </select>

                {type === 'text' ? (
                    <textarea placeholder="Введите текст" value={content} onChange={(e) => setContent(e.target.value)} />
                ) : (
                    <input type="file" accept={type === 'image' ? 'image/*' : '.pdf,.doc,.docx,.txt'} onChange={(e) => setFile(e.target.files[0])} />
                )}

                <button type="submit">Загрузить</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadForm;
