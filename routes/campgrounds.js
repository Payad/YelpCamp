const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
// const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const campgrounds = require('../controllers/campgrounds')
// const {campgroundSchema, reviewSchema} = require('../schemas.js');
const {isLoggedIn} = require('../middleware');
const {validateCampground} = require('../middleware');
const {isAuthor} = require('../middleware');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});
// const upload = multer({dest: 'uploads/'});

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

// const isAuthor = async(req, res, next) => {
//     const {id} = req.params;
//     const campground = await Campground.findById(id);
//    if (!campground.author.equals(req.user._id)) {
//         req.flash('error', 'You do not have permission to do that');
//         return res.redirect(`/campgrounds/${id}`)
//    }
//    next();
// }

router.route('/')
.get(catchAsync(campgrounds.index))
.post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))
// .post(upload.array('image'), (req, res) => {
//     console.log(req.body, req.files);
//     res.send('It worked');
// })

router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
.get(catchAsync(campgrounds.showCampground))
.put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
.delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))


// router.get('/', catchAsync(campgrounds.index));

// router.get('/', catchAsync(async (req, res) => {
//     const campgrounds = await Campground.find({});
//     res.render('campgrounds/index', {campgrounds})
// }))

// router.get('/new', isLoggedIn, campgrounds.renderNewForm)

// router.get('/new', isLoggedIn, (req, res) => {
//     // if(!req.isAuthenticated()) {
//     //     req.flash('error', 'you must be signed in');
//     //     return res.redirect('/login');
//     // }
//     res.render('campgrounds/new');
// })

// router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

// router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res, next) => {
//     // req.flash('success', 'successfully ,ade a new campground!')
//     // if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400)
//     // const campgroundSchema = Joi.object({
//     //     campground: Joi.object({
//     //         title: Joi.string().required(),
//     //         price: Joi.number().required().min(0),
//     //         image: Joi.string().required(),
//     //         location: Joi.string().required(),
//     //         description: Joi.string().required(),
//     //     }).required()
//     // })

//     // // const result = campgroundSchema.validate(req.body)
//     // // console.log(result)
//     // const {error} = campgroundSchema.validate(req.body)
//     // if(error) {
//     //     const msg = error.details.map(el => el.message).join(',')
//     //     throw new ExpressError(msg, 400)
//     // }
//     // console.log(result)

//     const campground = new Campground(req.body.campground);
//     campground.author = req.user._id;
//     await campground.save();
//     req.flash('success', 'successfully, made a new campground!')
//     res.redirect(`/campgrounds/${campground._id}`)
   
// }))

// router.get('/:id', catchAsync(campgrounds.showCampground));

// router.get('/:id', catchAsync(async (req, res) => {
//     const campground = await Campground.findById(req.params.id).populate({path: 'reviews', populate: {path: 'author'}}).populate('author');
//     console.log(campground)
//     if(!campground) {
//         req.flash('error', 'Cannot find that campground');
//         return res.redirect('/campgrounds');
//     }
//     res.render('campgrounds/show', {campground})
// }))
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

// router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async(req, res) => {
//     const {id} = req.params;
//     const campground = await Campground.findById(id);
//     if(!campground) {
//         req.flash('error', 'Cannot find that campground');
//         return res.redirect('/campgrounds');
//     }
//     // if (!campground.author.equals(req.user._id)) {
//     //     req.flash('error', 'You do not have permission to do that');
//     //     return res.redirect(`/campgrounds/${id}`)
//     // }
//     res.render('campgrounds/edit', {campground});
// }))
// router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))

// router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
//    const {id} = req.params;
// //    const campground = await Campground.findById(id);
// //    if (!campground.author.equals(req.user._id)) {
// //         req.flash('error', 'You do not have permission to do that');
// //         return res.direct(`/campgrounds/${id}`)
// //    }
//    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
//    req.flash('success', 'Successfully updated campground')
//    res.redirect(`/campgrounds/${campground._id}`)
// }));

// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

// router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req,res) => {
//     const {id} = req.params;
//     const campground = await Campground.findByIdAndDelete(id);
//     req.flash('success', "Successfully deleted campground")
//     res.redirect('/campgrounds')
// }))

module.exports = router;