const express = require('express');
const router = express.Router();

const reviewsController = require('../controllers/review_controller');

router.post('/assign-review/:id', reviewsController.assignReview);

module.exports = router;
