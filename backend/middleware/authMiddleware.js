import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        // Bearer token format: "Bearer <token>"
        const tokenWithoutBearer = token.replace(/^Bearer\s/, '');
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        
        // Attach user information to the request object
        req.user = {
            _id: decoded.userId,       // Extracted from the token payload
            username: decoded.username // Extracted from the token payload
        };
        
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default authMiddleware;
