const { sign, verify } = require('jsonwebtoken');
require('dotenv').config();

const createTokens = (user) => {
    const accessToken = sign({ username: user.username, id: user.id }, process.env.TOKEN_KEY);

    return accessToken
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["accesstoken"];

    if (!accessToken)
    {
        return ;
    }

    try 
    {
        const validToken = verify(accessToken, process.env.TOKEN_KEY);
        if (validToken)
        {
            return next();
        }
    } 
    catch(err)
    {
        return res.status(400).json({ error: err});
    }
}

module.exports = { createTokens, validateToken };