import e, { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

// validator middleware for scemas
const validate = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    
    try{
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        return next();
    }catch(error: any){
        return res.status(400).send(error.errors);
    }

}

export default validate;