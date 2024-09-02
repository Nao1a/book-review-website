import jwt from "jsonwebtoken"
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({_id: decoded.userId});
      if(!user) return res.status(404).json({message: "User not found"})

      req.user = user
      next();
    } catch (err) {
      console.log(err)
      res.status(401).json({ message: 'Token is not valid' });
    }
  }


  
export default authMiddleware

