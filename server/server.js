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

app.get('/rooms/:id', (req, res) => {
    const { id: room } = req.params;
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
    if (!rooms.has(room)) { 
        rooms.set(room, new Map([
            ['users', new Map()],
            ['messages', []]
        ]));
    }
    res.send(); 
});

socketServer.on('connection', (socket) => {
    socket.on('ROOM:JOIN', ({ username, room }) => { 
        socket.join(room);
        rooms.get(room).get('users').set(socket.id, username);
        const users = [...rooms.get(room).get('users').values()];
        socket.to(room).emit('ROOM:SET_USERS', users);
    });

    socket.on('ROOM:NEW_MESSAGE', ({ room, username, text, time }) => {
        const obj = {
            username,
            room,
            text,
            time
        };
        socket.broadcast.to(room).emit('ROOM:NEW_MESSAGE', obj);
    });

    socket.on('disconnect', () => {
        rooms.forEach((value, room) => {
            if (value.get('users').delete(socket.id)) {
                const users = [...rooms.get(room).get('users').values()]; 
                socket.to(room).emit('ROOM:SET_USERS', users); 
            }
        });
    });
});

server.listen(4000, (err) => { 
    if (err) throw Error(err);
    console.log('Сервер запущен');
});