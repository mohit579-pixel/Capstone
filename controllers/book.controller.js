const bookModel = require("../models/book");


module.exports.getBooks=async(req,res,next)=>{
    const allBooks=await bookModel.find({});
    res.status(200).json({allBooks});
}

module.exports.insertbook=async(req,res,next)=>{
    const {name,author,genre,isAvailable}=req.body;
    const newbook= new bookModel({
        "name":name,
        "author":author,
        "genre":genre,
        "isAvailable":isAvailable
    });

    await newbook.save();
    res.status(200).json(newbook);
}


