const jwt = require('jsonwebtoken');


const GenerateToken = async (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"})
}

module.exports = GenerateToken