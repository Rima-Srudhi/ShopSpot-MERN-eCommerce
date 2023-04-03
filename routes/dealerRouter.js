const router = require('express').Router()
const dealerCtrl = require('../controllers/dealerCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/dealer')
    .get(dealerCtrl.getDealers)
    .post(auth, authAdmin, dealerCtrl.createDealer)

router.route('/dealer/:id')
    .delete(auth, authAdmin, dealerCtrl.deleteDealer)
    .put(auth, authAdmin, dealerCtrl.updateDealer)


module.exports = router