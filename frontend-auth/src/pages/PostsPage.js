import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostsPage.css';

function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState({});

    const token = localStorage.getItem('access');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await axios.get('http://127.0.0.1:8000/api/posts/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPosts(res.data);
        } catch (err) {
            setError('Не удалось загрузить посты.');
        }
    };

    const handleCommentChange = (postId, value) => {
        setNewComment((prev) => ({ ...prev, [postId]: value }));
    };

    const submitComment = async (postId) => {
        try {
            await axios.post(`http://127.0.0.1:8000/api/posts/${postId}/comments/add/`,
                { text: newComment[postId] },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setNewComment((prev) => ({ ...prev, [postId]: '' }));
            loadComments(postId);
        } catch (err) {
            console.error(err);
        }
    };

    const loadComments = async (postId) => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/posts/${postId}/comments/`);
            setComments((prev) => ({ ...prev, [postId]: res.data }));
        } catch (err) {
            console.error(err);
        }
    };

    const downloadReport = async (hash) => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/posts/report/?hash=${hash}`, {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `report_${hash}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            console.error('Ошибка при скачивании отчёта', err);
        }
    };

    return (
        <div className="posts-page">
            <h2>Список постов</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {posts.map((post) => (
                <div key={post.id} className="post-card">
                    <h3>{post.title}</h3>
                    <p><b>Тип:</b> {post.type}</p>
                    <p><b>Статус:</b> {post.status}</p>
                    <p
                        style={{
                            color: post.similarity_score >= 0.8 ? 'red' : 'black',
                            fontWeight: post.similarity_score >= 0.8 ? 'bold' : 'normal'
                        }}
                    >
                        <b>Похожесть:</b> {Math.round(post.similarity_score * 100)}%
                    </p>


                    <a href={post.document} target="_blank" rel="noreferrer">Скачать файл</a><br/>
                    <button onClick={() => downloadReport(post.sha256_hash)}>Проверить по хэшу</button>

                    <div className="comment-section">
            <textarea
                placeholder="Оставьте комментарий..."
                value={newComment[post.id] || ''}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
            />
                        <button onClick={() => submitComment(post.id)}>Отправить</button>
                        <div className="comments-list">
                            {(comments[post.id] || []).map((comment) => (
                                <div key={comment.id} className="comment">
                                    <b>{comment.user}</b>: {comment.text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostsPage;
