import { Request, Response } from "express"


const notFound = (req:Request,res:Response) => {
    res.status(404).json({
        message: "page not found",
        path: req.path,
        date:Date()
    })
};

export default notFound;