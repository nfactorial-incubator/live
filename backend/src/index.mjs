import app from './app.mjs';
import databaseConnect from './config/database.mjs'

app.get('/api/user', async (req, res) => {
    const username = req.auth.username;
    const user = await User.findOne({ username })
    if (user) {
        res.status(201).json(user);
    } else {
        res.status(404).json({ message: "User not found" })
    }
});

databaseConnect();

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
});