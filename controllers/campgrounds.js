const Campground = require('../models/campground');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({accessToken: mapBoxToken});
const {cloudinary} = require('../cloudinary');

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds})
}

module.exports.renderNewForm = (req, res) => {
    // if(!req.isAuthenticated()) {
    //     req.flash('error', 'you must be signed in');
    //     return res.redirect('/login');
    // }
    res.render('campgrounds/new');
}

module.exports.createCampground = async (req, res, next) => {
     const geoData = await geocoder.forwardGeocode({
        // query: 'Yosemite, CA',
        query: req.body.campground.location,
        limit: 1
    }).send()
    // console.log(geoData.body.features[0].geometry);
    // res.send("Ok!!")
    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.body.features[0].geometry;
    campground.author = req.user._id;
    campground.images = req.files.map(f => ({url: f.path, filename: f.filename}));
    await campground.save();
    console.log(campground);
    req.flash('success', 'successfully, made a new campground!')
    res.redirect(`/campgrounds/${campground._id}`)
   
}

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({path: 'reviews', populate: {path: 'author'}}).populate('author');
    console.log(campground)
    if(!campground) {
        req.flash('error', 'Cannot find that campground');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', {campground})
}

module.exports.renderEditForm = async(req, res) => {
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground) {
        req.flash('error', 'Cannot find that campground');
        return res.redirect('/campgrounds');
    }
    // if (!campground.author.equals(req.user._id)) {
    //     req.flash('error', 'You do not have permission to do that');
    //     return res.redirect(`/campgrounds/${id}`)
    // }
    res.render('campgrounds/edit', {campground});
}

module.exports.updateCampground = async (req, res) => {
    const {id} = req.params;
    console.log(req.body);
 //    const campground = await Campground.findById(id);
 //    if (!campground.author.equals(req.user._id)) {
 //         req.flash('error', 'You do not have permission to do that');
 //         return res.direct(`/campgrounds/${id}`)
 //    }
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    campground.images.push(...imgs);
    await campground.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
           await cloudinary.uploader.destroy(filename);
        }
    await campground.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
    }
    console.log(campground);
    req.flash('success', 'Successfully updated campground')
    res.redirect(`/campgrounds/${campground._id}`)
 }

 module.exports.deleteCampground = async (req,res) => {
    const {id} = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    req.flash('success', "Successfully deleted campground")
    res.redirect('/campgrounds')
}