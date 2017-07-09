// Import dependencies
import express from 'express';
import passport from 'passport';

// Import router
const router = express.Router();

/**
 * Controllers, configs
 */
import passportConfig from '../config/passport';

/**
 * OAuth authentication routes. (Sign in)
 */
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}));
router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/',
  successRedirect: '/home'
  })
);

/**
 * Commented out routes for other social media authentications
 */
// router.get('/github', passport.authenticate('github'));
// router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
//   res.redirect(req.session.returnTo || '/');
// });
// router.get('/google', passport.authenticate('google', { scope: 'profile email' }));
// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
//   res.redirect(req.session.returnTo || '/');
// });
// router.get('/twitter', passport.authenticate('twitter'));
// router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
//   res.redirect(req.session.returnTo || '/');
// });
// router.get('/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
// router.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/' }), (req, res) => {
//   res.redirect(req.session.returnTo || '/');
// });

// Export router for shared access
module.exports = router;
