import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../config';
import UploadOptions from './UploadOptions';
import ProgressBar from './ProgressBar';
import RecipeDisplay from './RecipeDisplay';
import PreviewImage from './PreviewImage';

const ImageUpload = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [status, setStatus] = useState('');
    const [textEntries, setTextEntries] = useState(['']);
    const [uploadType, setUploadType] = useState('image');
    const [recipes, setRecipes] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);

            // 创建文件预览
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(selectedFile);
        } else {
            setFile(null);
            setPreview(null);
        }
    };

    const addTextEntry = () => {
        setTextEntries([...textEntries, '']);
    };

    const removeTextEntry = (index) => {
        const newEntries = textEntries.filter((_, i) => i !== index);
        setTextEntries(newEntries);
    };

    const handleTextChange = (index, value) => {
        const newEntries = [...textEntries];
        newEntries[index] = value;
        setTextEntries(newEntries);
    };

    const handleUpload = async () => {
        if (uploadType === 'image' && !file) {
            setStatus('请先选择一张图片。');
            return;
        }

        if (uploadType === 'text' && textEntries.every((entry) => entry.trim() === '')) {
            setStatus('请输入至少一条文字。');
            return;
        }

        const formData = new FormData();
        if (uploadType === 'image') {
            formData.append('image', file);
        } else if (uploadType === 'text') {
            const texts = textEntries.filter((t) => t && t.trim() !== '');
            if (texts.length === 0) {
                setStatus('请输入至少一条文字。');
                return;
            }
            texts.forEach((text, index) => {
                formData.append(`text${index}`, text);
            });
        }

        try {
            const res = await axios.post(`${API_BASE}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    if (!progressEvent.total) return;
                    const percent = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percent);
                },
            });

            setStatus('上传成功！');
            if (res?.data?.recipes) {
                setRecipes(res.data.recipes);
            }
        } catch (error) {
            console.error('上传失败:', error);
            setStatus('上传失败，请稍后重试。');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.leftPanel}>
                <h2>上传图片或文字</h2>

                <UploadOptions
                    uploadType={uploadType}
                    setUploadType={setUploadType}
                />

                {uploadType === 'image' && (
                    <>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                        {preview && <PreviewImage src={preview} alt="预览" />}
                    </>
                )}

                {uploadType === 'text' && (
                    <div style={styles.textList}>
                        {textEntries.map((entry, index) => (
                            <div key={index} style={styles.textItem}>
                                <textarea
                                    value={entry}
                                    onChange={(e) => handleTextChange(index, e.target.value)}
                                    placeholder={`输入第 ${index + 1} 条文字...`}
                                    style={styles.textarea}
                                />
                                <button
                                    onClick={() => removeTextEntry(index)}
                                    style={styles.removeBtn}
                                    disabled={textEntries.length === 1}
                                >
                                    删除
                                </button>
                            </div>
                        ))}
                        <button onClick={addTextEntry} style={styles.addBtn}>+ 添加一条文字</button>
                    </div>
                )}

                <button onClick={handleUpload} style={styles.uploadBtn}>开始上传</button>

                <ProgressBar value={uploadProgress} />

                <div style={styles.status}>{status}</div>
            </div>

            <div style={styles.rightPanel}>
                <h2>推荐食谱</h2>
                <RecipeDisplay recipes={recipes} />
            </div>
        </div>
    );
};

// 可选：聊天窗口（若你页面里使用了）
const ChatWindow = ({ user }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessage = { role: 'user', content: input };
        setMessages([...messages, newMessage]);

        try {
            const res = await axios.post(`${API_BASE}/chat`, {
                userId: user?.id, // 传递用户 ID
                message: input,
            });

            const botMessages = res.data.options.map((option, index) => ({
                role: 'assistant',
                content: option,
                id: `bot-${Date.now()}-${index}`,
            }));

            setMessages((prev) => [...prev, ...botMessages]);
            setInput('');
        } catch (error) {
            console.error('发送消息失败:', error);
        }
    };

    return (
        <div>
            <div style={styles.chatBox}>
                {messages.map((m, idx) => (
                    <div key={idx} style={m.role === 'user' ? styles.userMsg : styles.botMsg}>
                        {m.content}
                    </div>
                ))}
            </div>
            <div style={styles.chatInputRow}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="输入消息..."
                    style={styles.chatInput}
                />
                <button onClick={sendMessage} style={styles.chatSendBtn}>发送</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        height: '100%',
        gap: '20px',
    },
    leftPanel: {
        flex: 1,
        borderRight: '1px solid #eee',
        padding: '20px',
    },
    rightPanel: {
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
    },
    status: {
        marginTop: '20px',
        fontSize: '18px',
    },
    textList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        margin: '10px 0 20px',
    },
    textItem: {
        display: 'flex',
        gap: '10px',
        alignItems: 'stretch',
    },
    textarea: {
        flex: 1,
        minHeight: '72px',
        padding: '8px',
        fontSize: '14px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        resize: 'vertical',
    },
    removeBtn: {
        padding: '8px 12px',
        background: '#eee',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    addBtn: {
        padding: '8px 12px',
        background: '#f6f6ff',
        border: '1px solid #ddd',
        borderRadius: '6px',
        cursor: 'pointer',
        alignSelf: 'flex-start',
    },
    uploadBtn: {
        padding: '10px 16px',
        background: '#111',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
    },
    chatBox: {
        height: 240,
        border: '1px solid #eee',
        borderRadius: 6,
        padding: 10,
        marginBottom: 10,
        overflowY: 'auto',
        background: '#fafafa',
    },
    userMsg: {
        background: '#dde9ff',
        borderRadius: 6,
        padding: '6px 8px',
        margin: '6px 0',
        alignSelf: 'flex-end',
    },
    botMsg: {
        background: '#f2f2f2',
        borderRadius: 6,
        padding: '6px 8px',
        margin: '6px 0',
        alignSelf: 'flex-start',
    },
    chatInputRow: {
        display: 'flex',
        gap: 10,
    },
    chatInput: {
        flex: 1,
        padding: '8px 10px',
        border: '1px solid #ddd',
        borderRadius: 6,
    },
    chatSendBtn: {
        padding: '8px 12px',
        background: '#111',
        color: '#fff',
        border: 'none',
        borderRadius: 6,
        cursor: 'pointer',
    },
};

export default ImageUpload;
export { ChatWindow };
