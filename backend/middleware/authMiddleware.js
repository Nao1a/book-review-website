import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.userId;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  }

const x = (req, res, next) => {
  if(req.isAuthenticated()){
    return next();
  }
  res.status(401).json({error: 'you must be logged in to acess this resource'})
}
  
export default {authMiddleware, x}

