const router = require('express').Router();
const passport = require('passport');

router.use('/login', require('./login'));
router.use('/', require('./resetpassword'));
router.use('/users', passport.authenticate('jwt', { session: false }), require('./users'));
// router.use('/users', require('./users'));

module.exports = router;