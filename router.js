
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

//session is false because by default passport wants to create a cookie-based request
//since jwt is impleted we need not cookie auth
const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app){
  app.get('/', requireAuth, function(req,res,next){
    res.send({ welcome:'hello'});
  });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

}
