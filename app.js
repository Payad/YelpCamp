// if(process.env.NODE_ENV !== "production") {
//     require('dotenv').config();
// }

//our-first-user password
// 27GkVlveme5S8H7B

 require('dotenv').config();

console.log(process.env.SECRET)
console.log(process.env.API_KEY)

const express = require('express');
const mongoose = require('mongoose');
// const Campground = require('./models/campground');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const session = require('express-session')
const flash = require('connect-flash');
// const joi = require('joi')
const {campgroundSchema, reviewSchema} = require('./schemas.js')
// const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const Review = require('./models/review')
// const cities = require('./seeds/cities')
const passport = require('passport');

const LocalStragedy = require('passport-local');

const User = require('./models/user')
// const validateReview = require('validateReview');
// const {validateReview} = require('../middleware')
const userRoutes = require('./routes/user')
const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/reviews')
const mongoSanitize = require('express-mongo-sanitize');
// const MongoStore = require('connect-mongo')(session);
const MongoStore = require('connect-mongo');
// const helmet = require('helmet');
// const dbUrl = process.env.DB_URL;
//  const dbUrl = 'mongodb://localhost:27017/yelp-camp';
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelp-camp';
//mongoose.connect('mongodb://localhost:27017/yelp-camp',
mongoose.connect(dbUrl,
{
    // useNewUrlParser: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
    // useFindAndModify: false
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
const path = require('path');
// const Joi = require('joi');

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(mongoSanitize({
    replaceWith: '_',
  }));
// app.use(mongoSanitize());

const secret = process.env.SECRET || 'thisshouldbeabettersecret';

const store = MongoStore.create({
    mongoUrl: dbUrl,
    secret,
    // secret: 'thisshouldbeabettersecret',
    touchAfter: 24 * 60 * 60
});

store.on('error', function(e) {
console.log("Session store error", e)
});

const sessionConfig = {
    store,
    name: 'session',
    // secret: 'thisshouldbeabettersecret',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}

app.use(session(sessionConfig));
app.use(flash());
// app.use(helmet({contentSecurityPolicy: false,}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStragedy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


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


const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

app.use((req, res, next) => {
    if(!['/login', '/'].includes(req.originalUrl)) {
        req.session.returnTo = req.originalUrl;
    }
    // console.log(req.session)
console.log(req.query);
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// app.get('/fakeUser', async(req, res) => {
//     const user = new User({email: 'colttt', username: 'colttt'});
//     const newUser = await User.register(user, 'chicken');
//     res.send(newUser);
// })

app.use('/', userRoutes)
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)

app.get('/', (req, res) => {
    res.render('home')
})



// app.post('/campgrounds/:id/reviews', validateReview, catchAsync(async (req, res) => {
//     // res.send('You Made it')
//     const campground = await Campground.findById(req.params.id)
//     const review = new Review(req.body.review)
//     campground.reviews.push(review);
//     await review.save();
//     await campground.save();
//     res.redirect(`/campgrounds/${campground._id}`)
// }))

// app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async (req, res) => {
//     // const {id} = req.params.id;
//     // const review = 
//     const {id, reviewId} = req.params;
//     await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
//     await Review.findByIdAndDelete(reviewId);
//     res.redirect(`/campgrounds/${id}`)
//     // res.send("DELETE ME")
// }))

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
   
})

// all pages not matching routes will get passed to this error handling middleware
// app.all('*', (req, res, next) => {
//     next(new ExpressError('page not found', 404))
// })

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    res.status(statusCode).render('error', {err});

    if(!err.message) err.message = 'Oh no something went wrong';
    // res.send('Oh boy we have an error')
})

// error handling middleware/coincides with ExpressError class
// app.use((err, req, res, next) => {
//     const {statusCode} = err;
//     res.status(statusCode).render('error', {err})
//     if(!err.message) err.message = 'Oh no something went wrong'
// })


app.listen(3000, () => {
    console.log('Listening on port 3000')
})