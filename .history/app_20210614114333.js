const express = require('express');
const app = express();
const mongosee = require('mongoose');
const bodyParser =  require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(express.json());

const authRouter = require('./routes/auth'),
    userRouter = require('./routes/user'),
    bookRouter = require('./routes/book');

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/book', bookRouter);
app.get('/', (req, res) => {
    res.send('welcome');
});

mongosee.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected db!')
)

app.listen(3000, () => console.log("Server up and running!"));