const express = require('express');
const app = express();
const mongosee = require('mongoose');
const bodyParser =  require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(express.json());

const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const bookRouter = require('./routes/book');

app.use('/api/book', bookRouter);
app.use('/api/auth', authRouter);
app.use('/user', userRouter);
app.get('/', (req, res) => {
    res.send('we are an home');
});

mongosee.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Connected db!')
)

app.listen(3000, () => console.log("Server up and running!"));