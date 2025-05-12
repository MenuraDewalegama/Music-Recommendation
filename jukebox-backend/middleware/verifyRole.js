const verifyRole = (role) => {
  return (req, res, next) => {
    if (req.userRole === role) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied: Insufficient permissions' });
    }
  };
};
