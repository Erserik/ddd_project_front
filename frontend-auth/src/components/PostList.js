import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    const token = localStorage.getItem('access');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/posts/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => setPosts(response.data))
            .catch(() => setError('Не удалось загрузить посты.'));
    }, []);

    const handleDelete = (postId) => {
        axios.delete(`http://127.0.0.1:8000/api/posts/${postId}/`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => setPosts(posts.filter(post => post.id !== postId)));
    };

    const handleVerify = (hash) => {
        window.open(`http://127.0.0.1:8000/api/posts/report/?hash=${hash}`, '_blank');
    };

    const handleVote = (postId) => {
        axios.post(`http://127.0.0.1:8000/api/posts/${postId}/vote/`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(() => alert("Голос учтен"));
    };

    return (
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2>Список постов</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {posts.map(post => (
                <div key={post.id} style={{
                    border: '1px solid #ccc',
                    marginBottom: '20px',
                    padding: '20px',
                    borderRadius: '8px',
                    backgroundColor: '#fff'
                }}>
                    <h4>{post.title}</h4>
                    <p><strong>Тип:</strong> {post.type}</p>
                    <p><strong>Статус:</strong> {post.status}</p>
                    <p><strong>Похожесть:</strong> {post.similarity_score * 100}%</p>

                    {post.document && (
                        <a
                            href={post.document}
                            download
                            style={{ marginRight: '10px', color: 'blue' }}
                        >
                            Скачать файл
                        </a>
                    )}

                    <button onClick={() => handleVerify(post.sha256_hash)} style={{ marginRight: '10px' }}>
                        Проверить по хэшу
                    </button>

                    <button onClick={() => handleVote(post.id)} style={{ marginRight: '10px' }}>
                        Голосовать
                    </button>

                    {post.user === JSON.parse(localStorage.getItem('user'))?.username && (
                        <button onClick={() => handleDelete(post.id)} style={{ color: 'red' }}>
                            Удалить
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PostList;
