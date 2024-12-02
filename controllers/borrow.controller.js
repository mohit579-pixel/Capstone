const bookModel = require("../models/book");
const borrowModel=require("../models/Borrow");
const returnModel=require("../models/Return");
const userModel=require("../models/user");
module.exports.borrorbooks=async(req,res,next)=>{
    const {username,bookId,dueDate}=req.body;

    const isBook=await bookModel.findById(bookId);
    if(!isBook)res.status(401).json('Enter Valid Book ID');

    const newBorrow=new borrowModel({
        "username":username,
        "bookId":bookId,
        "dueDate":dueDate
    });

    newBorrow.save();

    res.status(200).json(`Book ID ${bookId} borrowed successfully`);
}


module.exports.returnBook=async(req,res,next)=>{
    const {username,bookId,dueDate,fine}=req.body;

    const isBook=await borrowModel.find({"bookId":bookId});
    if(!isBook){res.status(401).json('Enter Valid Book ID');}

    const newBorrow=new returnModel({
        "username":username,
        "bookId":bookId,
        "dueDate":dueDate,
        "fine":fine
    });

    newBorrow.save();

    res.status(200).json(`Book ID ${bookId} Retuened  successfully with fine ${fine}`);
}


module.exports.updateBook = async (req, res, next) => {
    const { username, bookId, name, author } = req.body;

    try {
        
        const isUser = await userModel.findOne({ username: username });
        if (!isUser) return res.status(401).json('Enter Valid Username');

       
        if (!isUser.admin) return res.status(403).json('User is not Authorized');

       
        const isBook = await bookModel.findById(bookId);
        if (!isBook) return res.status(404).json('Enter Valid Book ID');

        
        const updatedBook = await bookModel.updateOne(
            { _id: bookId }, 
            {
                $set: {
                    ...(name && { name }), 
                    ...(author && { author }), 
                }
            }
        );

        
        if (updatedBook.modifiedCount > 0) {
            res.status(200).json(`Book ID ${bookId} updated successfully.`);
        } else {
            res.status(400).json('No changes were made to the book.');
        }
    } catch (error) {
       
        res.status(500).json({ message: 'An error occurreds', error: error.message });
    }
};
