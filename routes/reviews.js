const express = require('express')
const router = express.Router({mergeParams: true});

const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews')
const {reviewSchema} = require('../schemas.js');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware')

const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');

// const validateCampground = (req, res, next) => {
//     // const campgroundSchema = Joi.object({
//     //     campground: Joi.object({
//     //         title: Joi.string().required(),
//     //         price: Joi.number().required().min(0),
//     //         image: Joi.string().required(),
//     //         location: Joi.string().required(),
//     //         description: Joi.string().required(),
//     //     }).required()
//     // })

//     // const result = campgroundSchema.validate(req.body)
//     // console.log(result)
//     const {error} = campgroundSchema.validate(req.body)
//     if(error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
//     // console.log(result)
// }

// const validateReview = (req, res, next) => {
//     const {error} = reviewSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

// router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
//     // res.send('You Made it')
//     const campground = await Campground.findById(req.params.id)
//     const review = new Review(req.body.review);
//     review.author = req.user._id;
//     campground.reviews.push(review);
//     await review.save();
//     await campground.save();
//     req.flash('success', 'Created new review')
//     res.redirect(`/campgrounds/${campground._id}`)
// }))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

// router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
//     // const {id} = req.params.id;
//     // const review = 
//     const {id, reviewId} = req.params;
//     await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
//     await Review.findByIdAndDelete(reviewId);
//     req.flash('success', 'Successfully deleted review')
//     res.redirect(`/campgrounds/${id}`)
//     // res.send("DELETE ME")
// }))

module.exports = router;