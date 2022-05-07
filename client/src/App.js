import React from 'react';
import { useReducer, useEffect } from 'react';
import JoinBlock from './components/JoinBlock';
import reducer from './reduser';
import socket from './socket';
import Chat from './components/Chat';

function App() { 

  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    room: null,
    username: null
  });

  const onLogin = (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj //говорит что мы авторизованы 
    });
    socket.emit('ROOM:JOIN', obj);
  };

  window.socket = socket;

  useEffect(() => {
    socket.on('ROOM:JOINED', (users) => {
      console.log('Новый пользователь', users);
    });
  }, []);
  
  return (
    <div className="App">
     {!state.joined ? <JoinBlock onLogin={onLogin}/> : <Chat/>}
    </div>
  );
}

export default App;
