import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { onLogin } from '../../App';
import cl from './JoinBlock.module.scss';

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
        <div className={cl.join}>
            <h2>Join a chat</h2>
            <input 
                type="text" 
                placeholder="User" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /> <br/>
            <input 
                type="text" 
                placeholder="Room ID"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
            /> <br/>
            <button disabled={isLoading} onClick={onEnter}>
                {isLoading ? 'Joined...' : 'Join'}
            </button>
        </div>
    );
};

export default JoinBlock;