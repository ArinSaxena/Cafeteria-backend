const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role; // Assuming user role is attached to req.user
  
      if (!requiredRoles.includes(userRole)) {
        return res.status(403).json({ message: "Access denied. Insufficient permissions." });
      }
      next();
    };
  };
  
  module.exports = roleMiddleware;
  