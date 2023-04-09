const jwt = require("jsonwebtoken")


exports.authMiddle = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(500).send({message: 'Unauthorized'})
    console.log(process.env.TOKEN_SECRET)
    process.env.TOKEN_SECRET && jwt.verify(token, process.env.TOKEN_SECRET, (error, decode) => {
        if(error) return res.status(402).send({message: error.message})
        next()
    })
}
