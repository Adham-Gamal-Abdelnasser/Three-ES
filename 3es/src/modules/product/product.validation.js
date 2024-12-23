import Joi from "joi";

export const addProductSchema = Joi.object({
  title: Joi.string().min(3).max(30).required().trim(),
  description: Joi.string().min(3).max(300).required().trim(),
  price: Joi.number().min(0).required(),
  priceAfterDiscount: Joi.number().min(0).optional(),
  quantity: Joi.number().min(0).required(),
  sold: Joi.number().min(0),
  category: Joi.string().hex().length(24).required(),
  serialNumber: Joi.string().min(3).max(30).required().trim(),
  imageCover:Joi.array().items(Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/jpg")
      .required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().max(5242880).required(),
  }).required()).required(),
  images:Joi.array().items(Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/jpg")
      .required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().max(5242880).required(),
  }).required()).required()
  
});
export const getByIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});
export const updateProductSchema = Joi.object({
  id: Joi.string().hex().length(24),
 
    title: Joi.string().min(3).max(30).trim(),
    description: Joi.string().min(3).max(300).trim(),
    price: Joi.number().min(0),
    priceAfterDiscount: Joi.number().min(0).optional(),
    quantity: Joi.number().min(0),
    category: Joi.string().hex().length(24),
    serialNumber: Joi.string().min(3).max(30).trim(),
    imageCover:Joi.array().items(Joi.object({
      fieldname: Joi.string(),
      originalname: Joi.string(),
      encoding: Joi.string(),
      mimetype: Joi.string()
        .valid("image/jpeg", "image/png", "image/jpg")
        ,
      destination: Joi.string(),
      filename: Joi.string(),
      path: Joi.string(),
      size: Joi.number().max(5242880),
    })),
    images:Joi.array().items(Joi.object({
      fieldname: Joi.string(),
      originalname: Joi.string(),
      encoding: Joi.string(),
      mimetype: Joi.string()
        .valid("image/jpeg", "image/png", "image/jpg")
        ,
      destination: Joi.string(),
      filename: Joi.string(),
      path: Joi.string(),
      size: Joi.number().max(5242880),
    }))
    
  });

