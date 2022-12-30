const BaseJoi = require('joi');
const {number} = require('joi');
const sanitizeHtml = require('sanitize-html');
// const Joi = BaseJoi.extend(extension);

const extension = (joi) => ({
type: 'string',
base: joi.string(),
messages: {
'string.escapeHTML': '{{#label}} must not include HTML!'
},
rules: {
escapeHTML: {
    validate(value, helpers) {
        const clean = sanitizeHtml(value, {
            allowedTags: [],
            allowedAttributes: {},
});
if (clean !== value) return helpers.error('string.escapeHTML', {value})
return clean;
            } 
        }
    }
});

const Joi = BaseJoi.extend(extension);

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required().escapeHTML(),
        price: Joi.number().required().min(0),
        // image: Joi.string().required(),
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
    }).required(),
    deleteImages: Joi.array()
});

// const extension = (joi) => ({
// type: 'string',
// base: joi.string(),
// messages: {
// 'string.escapeHTML': '{{#label}} must not include HTML!'
// },
// rules: {
// escapeHTML: {
//     validate(value, helpers) {
//         const clean = santizeHtml(value, {
//             allowedTags: [],
//             allowedAttributes: {},
// });
// if (clean !== value) return helpers.error('string.escapeHTML', {value})
// return clean;
//             } 
//         }
//     }
// });

//  const Joi = BaseJoi.extend(extension);

//serverside validation Joi Object
module.exports.peopleSchema = Joi.object({
    person: Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        location: Joi.string().required(),
}).required()
})

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        // body: Joi.string().required(),
        // rating: Joi.number().required(),
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapeHTML(),
    }).required()
})
