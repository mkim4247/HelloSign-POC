const router = require('express').Router();

module.exports = router;

// router.use('/hellosign', require('./hellosign')) 
// router.use('/auth', require('./auth'));

// handles 404 not found errors
router.use((req, res, next) => {
    const err = new Error('Not found.');
    err.status = 404;
    next(err);
});