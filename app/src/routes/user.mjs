import User from '../model/user.mjs';

const getUser = async (req, res) => {
    const username = req.auth.username;
    const user = await User.findOne({ username })
    if (user) {
        res.status(201).json(user);
    } else {
        res.status(404).json({ message: "User not found" })
    }
};

export { getUser };