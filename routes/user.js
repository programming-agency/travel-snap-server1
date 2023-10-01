const User = require('../models/User')
const userRoute = (app) => {
    app.post("/api/register", async (req, res) => {
        const { userName, email, photo, pass } = req.body;

        try {
            if (!userName || !email || !photo || !pass) {
                return res.status(400).json({ msg: "All fields are required" });
            }

            const newUser = new User({ userName, email, photo, pass });

            const createdUser = await newUser.save();
            return res.status(200).json(createdUser)
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ msg: "Server Error" });
        }
    });
}

module.exports = userRoute;