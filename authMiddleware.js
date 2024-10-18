const authMiddleware = (req, res, next) => {
    if (req.session.loggedIn) {
      next(); 
    } else {
      res.redirect('/login.html'); 
    }
  };
  
  export default authMiddleware;


  // app.use((req, res, next) => {
  //   if (!req.session.userId) {
  //     return res.redirect('/login');
  //   }
  //   next(); // Certifique-se de que `next()` seja chamado
  // });