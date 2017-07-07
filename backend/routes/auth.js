const express = require('express');
const session = require('express-session');
const passport = require('passport');

const router = express.Router();

/**
 * Controllers, configs
 */
const passportConfig = require('../config/passport');


/**
 * OAuth authentication routes. (Sign in)
 */
router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
  res.redirect(req.session.returnTo || '/');
});
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

module.exports = router;
