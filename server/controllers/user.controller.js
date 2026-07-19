import User from "../models/user.model.js";


export const getCurrentUser = async (req, res) => {
    try {
        console.log("req.userId:", req.userId);

        const userId = req.userId;
        const user = await User.findById(userId);

        console.log("user:", user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}