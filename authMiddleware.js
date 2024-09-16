const authMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
      next(); 
    } else {
      res.redirect('/login.html'); 
    }
  };
  
  export default authMiddleware;