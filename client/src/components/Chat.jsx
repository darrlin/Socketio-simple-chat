import React from 'react';
import { useState } from 'react';

const Chat = () => {
    const [messageValue, setMessageValue] = useState('');

    return (
        <div className="chat">
            <div className="list-users">
                <b>Users (1):</b>
            </div>
            <div className="messages">
                <div className="message">
                    <p>lorem ipsum dolor sit amet, consectetur adip</p>
                    <span>User</span>
                </div>
                <div className="message">
                    <p>Lorem ipsum nulla vitae orci sodales nibh sed vivamus nam adipiscing morbi non, in magna et pellentesque ut: lectus, odio pellentesque mattis, sagittis amet. Nec congue at nam vitae eros lorem congue proin tellus porttitor mattis sem sapien, eget porta, ornare morbi vivamus adipiscing non. Malesuada pellentesque cursus morbi tellus donec integer elementum eros sed arcu amet ut bibendum lectus gravida sodales massa. Commodo at, proin integer mauris eu enim arcu odio et.</p>
                    <span>User</span>
                </div>
            </div>
            <form>
                <textarea 
                    value={messageValue}
                    onChange={(e) => setMessageValue(e.target.value)}
                    rows="3">
                </textarea>
                <button>
                    Send
                </button>
            </form>
        </div>
    );
};

export default Chat;