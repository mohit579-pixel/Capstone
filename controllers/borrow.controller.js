const bookModel = require("../models/book");
const borrowModel=require("../models/Borrow");
const returnModel=require("../models/Return");
module.exports.borrorbooks=async(req,res,next)=>{
    const {username,bookId,dueDate}=req.body;

    const isBook=await bookModel.findById(bookId);
    if(!isBook)res.status(401).json('Enter Valid Book ID');

    const newBorrow=new borrowModel({
        "username":username,
        "bookId":bookId,
        "dueDate":dueDate
    });

    res.status(200).json(`Book ID ${bookId} borrowed successfully`);
}


module.exports.returnBook=async(req,res,next)=>{
    const {username,bookId,dueDate,fine}=req.body;

    const isBook=await borrowModel.findById(bookId);
    if(!isBook)res.status(401).json('Enter Valid Book ID');

    const newBorrow=new returnModel({
        "username":username,
        "bookId":bookId,
        "dueDate":dueDate,
        "fine":fine
    });

    res.status(200).json(`Book ID ${bookId} Retuened  successfully with fine ${fine}`);
}