import React from 'react';
import { useReducer, useEffect } from 'react';
import JoinBlock from './components/JoinBlock/JoinBlock';
import reducer from './reduser';
import socket from './socket';
import Chat from './components/Chat/Chat';
import axios from 'axios';
import './App.scss';

function App() { 

  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    room: null,
    username: null,
    users: [],
    messages: []
  });

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj 
    });
    socket.emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`http://localhost:4000/rooms/${obj.room}`);
    setUsers(data.users);
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users
    });
  };

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message
    });
  };

  useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);
  
  return (
    <div className="App">
     {!state.joined ? <JoinBlock onLogin={onLogin}/> : <Chat {...state} onAddMessage={addMessage}/>}
    </div>
  );
}

export default App;
