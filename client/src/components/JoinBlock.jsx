import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { onLogin } from '../App';

const JoinBlock = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');
    const [isLoading, setLoading] = useState(false);

    const onEnter = async () => {
        if (!username || !room) {
            return alert('Please enter a username and room id!');
        }
        const obj = {
            username,
            room
        }
        setLoading(true);
        await axios.post('http://localhost:4000/rooms', obj)
        .catch((error) => {
            console.log(error);
        });
        onLogin(obj);
    };

    return (
        <div>
            <h3>Join a chat</h3>
            <input 
                type="text" 
                placeholder="User" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Room ID"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
            />
            <button disabled={isLoading} onClick={onEnter}>
                {isLoading ? 'Вход...' : 'Войти'}
            </button>
        </div>
    );
};

export default JoinBlock;