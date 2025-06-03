const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const salesController = require('../controllers/salesController');

router.post('/sales', protect, salesController.createSale);
router.get('/sales/user/:userId', protect, salesController.getSalesByUser);
router.get('/sales/user/:userId/cashback', protect, salesController.getTotalCashbackByUser);

module.exports = router;
