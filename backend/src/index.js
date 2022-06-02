const app = require('./app');
const databaseConnect = require('./config/database.js');

app.get('/api/user', async (req, res) => {
    const username = req.auth.username;
    const user = await User.findOne({ username });
    if (user) {
        res.status(201).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

databaseConnect();

app.listen('8080', () => {
    console.log(`Example app listening on port 8080`);
});
