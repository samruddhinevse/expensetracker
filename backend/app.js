const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()

require('dotenv').config()

const PORT = process.env.PORT

// Import authentication routes
const authRoutes = require('./routes/auth');

//middlewares
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3001',  // Allow only frontend on port 3001
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'] 
}))

app.use('/api/v1/auth', authRoutes);

//routes
readdirSync('./routes').map((route) => {
    if (route !== 'auth.js') { // Avoid loading auth.js again
        app.use('/api/v1', require('./routes/' + route));
    }
});

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()