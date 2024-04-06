const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

const userRoutes = require('./routes/userRoutes');

// 省略其他代码...

app.use(userRoutes);

// 省略其他代码...

mongoose.connect('mongodb://192.168.1.104:27017/meet_hobby', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Connection error', err);
    process.exit();
});
