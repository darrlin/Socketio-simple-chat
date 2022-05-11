const express = require('express'); 
const io = require('socket.io'); 
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());

const rooms = new Map();

app.get('rooms/:id', (req, res) => {
    const { id: room } = req.params;
    console.log(room);
    const obj = rooms.has(room)
        ? {
            users: [...rooms.get(room).get('users').values()],
            messages: [...rooms.get(room).get('messages').values()],
        }
        : { users: [], messages: [] };
    res.json(obj);
});

app.post('/rooms', (req, res) => {
    const { room, username } = req.body;
    if (!rooms.has(room)) { //если не пресутствует комната то создаем её
        rooms.set(room, new Map([
            ['users', new Map()],
            ['massages', []]
        ]));
    }
    res.send();  //ответ
});

socketServer.on('connection', (socket) => {
    socket.on('ROOM:JOIN', ({ room, username }) => { 
        socket.join(room);
        rooms.get(room).get('users').set(socket.id, username); 
        const users = [...rooms.get(room).get('users').values()]; 
        socket.broadcast.to(room).emit('ROOM:SET_USERS', users); 
    });

    socket.on('ROOM:NEW_MESSAGE', ({ room, username, text }) => {
        const obj = {
          username,
          text
        };
        rooms.get(room).get('messages').push(obj);
        socket.to(room).broadcast.emit('ROOM:NEW_MESSAGE', obj);
    });

    socket.on('disconnect', () => {
        rooms.forEach((value, room) => {
            if (value.get('users').delete(socket.id)) {
                const users = [...rooms.get(room).get('users').values()]; 
                socket.broadcast.to(room).emit('ROOM:SET_USERS', users); 
            }
        });
    });

    console.log('user connected', socket.id);
});

server.listen(4000, (err) => { 
    if (err) throw Error(err);
    console.log('Сервер запущен');
});