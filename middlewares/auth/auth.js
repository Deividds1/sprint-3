import Jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        res.status(401).json({ error: "Access denied" });
        return;
    }
    try {
        const verified = Jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token", mensaje: error });
    }
};

export default verifyToken;