const { sign, verify } = require('jsonwebtoken');

const createTokens = (user) => {
    const accessToken = sign({ username: user.username, id: user.id }, "TESTKEY");

    return accessToken
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken)
    {
        return ;
    }

    try 
    {
        const validToken = verify(accessToken, "TESTKEY");
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