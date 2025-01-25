const authMiddleware = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).populate("cart.dish");
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
      req.user = user; // Attach the user to the request
      next();
    } catch (error) {
      res.status(401).json({ error: "Authentication failed" });
    }
  };
  