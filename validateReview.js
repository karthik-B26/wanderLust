const Joi = require("joi");
const ReviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().min(1).max(5).required(),
        comment:Joi.string().allow("", null),
        date:Joi.string()
    }).required()
})
module.exports={ReviewSchema};
