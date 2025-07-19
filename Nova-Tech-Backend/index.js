const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { router } = require('./Routes/route')
const { ConnnectDB } = require('./Database Connection/DB_Conneection')
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: process.env.URL
    }
});


const json = require('express-json')
const { Supports } = require('./Model/support')
app.use(express.json())
app.use(cors({
    origin: [process.env.URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))


const port = process.env.Port || 3500


app.use('/api', router)

ConnnectDB()
const online = {}
io.on('connection', (socket) => {
    console.log(`a socket user ${socket.id} connected`);
    socket.on('join', (data) => {

        online['admin'] = socket.id
        console.log('admin online', online)

    })

    socket.on('support', async (data) => {
        try {
            const newSupport = new Supports(data);
            const result = await newSupport.save();

            if (result) {
                socket.emit('insertedSupport', {
                    message: 'Inserted Successfully',
                    status: 200
                });


                if (online['admin']) {
                    console.log('Online', online.admin)
                    socket.to(online.admin).emit('queries', {
                        data: newSupport
                    })
                } else {
                    console.log('Not Online')
                }

            } else {
                socket.emit('insertedSupport', {
                    message: 'Insertion Failed',
                    status: 401
                });
            }
        } catch (error) {
            console.log(error.message);
            socket.emit('insertedSupport', {
                message: 'Server Error',
                status: 500
            });
        }
    });
});

server.listen(process.env.Port, () => {
    console.log('listening on *:3000');
});