import { AppError } from "../utils/AppError.js";

export const validation = (schema) => {
  return async (req, res, next) => {
    let filters = {};
    if (req.file ) {
      filters = {image: req.file ,...req.body,...req.params,...req.query,};
    } else if(req.files) {
      filters = {...req.files, ...req.body, ...req.params, ...req.query };
    }
    else{
      filters = { ...req.body, ...req.params, ...req.query };
    
    }
      
    let { error } = await schema.validate(filters,{ abortEarly: true });
    if (!error) {
      next();
    } else {
      let errorList = [];
      error.details.forEach((ele) => {
        errorList.push(ele.message);
      });
      console.log(errorList);
      next(new AppError(errorList, 401));
    }
  };
};