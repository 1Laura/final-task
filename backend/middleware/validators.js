module.exports = {
    validateRegister: async (req, res, next) => {
        let {username, password} = req.body;
        if (!username || !password) {
            return res.status(400).json({message: "Username and password are required", error: true, success: false});
        }
        username = username.trim();
        password = password.trim();
        if (username.length < 4 || username.length > 20) {
            return res.status(400).json({message: "Username must be between 4 and 20 characters", error: true, success: false});
        }
        if (password.length < 4 || password.length > 20) {
            return res.status(400).json({message: "Password must be between 4 and 20 characters", error: true, success: false});
        }
        next();
    },

    validateLogin: (req, res, next) => {
        let {username, password} = req.body;

        if (!username || !password) {
            return res.status(400).json({message: "Username and password are required", error: true, success: false});
        }

        username = username.trim();
        password = password.trim();

        if (username.length < 4 || username.length > 20) {
            return res.status(400).json({message: "Username must be between 4 and 20 characters", error: true, success: false});
        }

        if (password.length < 4 || password.length > 20) {
            return res.status(400).json({message: "Password must be between 4 and 20 characters", error: true, success: false});
        }
        next();
    },
};