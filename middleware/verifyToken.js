const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.header('Authorization');
    console.log("Received header:", authHeader);

    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Access denied' });
    }

   
    const token = authHeader.split(' ')[1];
    console.log("Extracted token:", token);

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ msg: 'Invalid token' });
    }
};
