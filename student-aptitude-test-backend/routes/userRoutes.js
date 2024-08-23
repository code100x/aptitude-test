const express = require('express');
const Razorpay = require('razorpay');
const { registerUser, loginUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.post('/payment', protect, async (req, res) => {
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const options = {
        amount: 1000 * 100, // Rs 1000 in paise
        currency: 'INR',
        receipt: `receipt_${req.user.id}`
    };

    instance.orders.create(options, (error, order) => {
        if (error) {
            return res.status(500).json({ message: 'Payment failed' });
        }
        res.status(200).json(order);
    });
});

module.exports = router;
