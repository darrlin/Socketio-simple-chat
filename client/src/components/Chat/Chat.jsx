import React from 'react';
import { useState } from 'react';
import socket from '../../socket';
import cl from './Chat.module.scss';

const Chat = ({ users, messages, username, room, onAddMessage }) => {
    const [messageValue, setMessageValue] = useState('');

    const sendMessage = () => {
        socket.emit('NEW_MESSAGE', {
            username,
            room,
            text: messageValue
        }); 
        console.log(messageValue);
        onAddMessage({ username, text: messageValue });
        setMessageValue('');
    }

    return (
        <div className={cl.chat}>
            <div className={cl.listusers}>
                <b>Online ({users.length})</b>
                <ul>
                    {users.map((name, index) => (<li key={name + index}>{name}</li>))}
                </ul>
            </div>
            <div className={cl.inside}>
                <div className={cl.messages}>
                    {messages.map((message) => ( 
                        <div key={message} className={cl.message}>
                        <p>{message.text}</p>
                        <span>{message.username}</span>
                    </div>
                    ))}
                </div>
                    <form className={cl.form}> 
                        <textarea 
                            value={messageValue}
                            onChange={(e) => setMessageValue(e.target.value)}
                            rows="3">
                        </textarea>
                        <button onClick={sendMessage} type="button">
                            Send
                        </button>
                    </form>
            </div>
        </div>
    );
};

export default Chat;