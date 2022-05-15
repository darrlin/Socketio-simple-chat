import React from 'react';
import { useState } from 'react';
import socket from '../../socket';
import cl from './Chat.module.scss';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ users, messages, username, room, onAddMessage }) => {
    const [messageValue, setMessageValue] = useState('');

    let timeNow = new Date(Date.now()).getHours() 
    + ':' + new Date(Date.now()).getMinutes();

    const sendMessage = async () => {
        if (messageValue !== '') {
            const messageData = {
                username,
                room,
                text: messageValue,
                time: timeNow
            }; 
            await socket.emit('ROOM:NEW_MESSAGE', messageData);
           
            onAddMessage({ username, text: messageValue, time: timeNow });
            setMessageValue(''); 
        }
    };

    return (
        <div className={cl.chat}>
            <div className={cl.listusers}>
                <b>Room: {room}</b> <br/>
                <b>Online ({users.length}):</b>
                <ul>
                    {users.map((name, index) => (<li key={name + index}>{name}</li>))}
                </ul>
            </div>
            <div className={cl.inside}>
                <ScrollToBottom className={cl.message_container}>
                    <div className={cl.messages}>
                        {messages.map((message) => ( 
                            <div 
                                key={message}
                                id={username === message.username ? cl.you : cl.other} 
                                className={cl.message} 
                            >
                                <p>{message.text}</p>
                                <span>{message.username}</span>
                                <span>{message.time}</span>
                            </div>
                        ))}  
                    </div>
                </ScrollToBottom>
                
                    <form className={cl.form}> 
                        <textarea 
                            value={messageValue}
                            onChange={(e) => setMessageValue(e.target.value)}
                            onKeyPress={(e) => {
                                e.key === "Enter" && sendMessage();
                            }}
                            rows="3"
                        >
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