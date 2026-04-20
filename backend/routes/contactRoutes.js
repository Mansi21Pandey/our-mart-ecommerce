const express = require('express');
const router = express.Router();
const { submitContact, getMessages } = require('../controllers/contactController');

router.post('/submit', submitContact);
router.get('/messages', getMessages); // Optional: add admin middleware

module.exports = router;