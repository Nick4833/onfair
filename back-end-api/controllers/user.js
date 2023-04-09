const User = require("../models/User");

exports.getUserFairs = async(req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);
    return res.status(200).json({
        success: true,
        fairs: user.fairs,
    });
}
