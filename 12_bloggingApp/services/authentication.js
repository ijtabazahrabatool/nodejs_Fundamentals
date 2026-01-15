const JWT = require("jsonwebtoken");



const secret = "$tensionSercret@123";

function createTokenForUser(user){
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        role: user.role
    };
    const token = JWT.sign(payload, secret);
    return token;
}


function validateToken(token){
    const payLoad = JWT.verify(token, secret);
    return payLoad;
}


module.exports = {
    createTokenForUser,
    validateToken
}