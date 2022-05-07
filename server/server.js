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

app.get('/rooms', (req, res) => {
   res.json(rooms);
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
    socket.on('ROOM:JOIN', ({ room, username }) => { //область, действие
        socket.join(room); //отправка сокета в конкретную комнату
        rooms.get(room).get('users').set(socket.id, username); // из конкретной комнаты, коллекции юзеров, сохраняем в реж. реалтайм имя пользователя
        const users = [...rooms.get(room).get('users').values()]; //получаем имена пользователей
        socket.broadcast.to(room).emit('ROOM:JOINED', users); //всем кроме меня оповестить что зашел в чат
    });

    // socket.on('ROOM:JOIN', (data) => {
    //     console.log(data);
    // });

    console.log('user connected', socket.id);
});

server.listen(4000, (err) => { 
    if (err) throw Error(err);
    console.log('Сервер запущен');
});