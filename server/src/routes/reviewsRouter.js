const express = require('express');
const reviewsRouter = express.Router();
const { getAllReviews, 
        createReview, 
        getReviewById, 
        updateReviewById, 
        deleteReviewById } = require('../controllers/reviewscontroller');

reviewsRouter.get('/', getAllReviews);

reviewsRouter.post('/', createReview);

reviewsRouter.get('/:id', getReviewById);

reviewsRouter.put('/:id', updateReviewById);

reviewsRouter.delete('/:id', deleteReviewById);

module.exports = reviewsRouter;
