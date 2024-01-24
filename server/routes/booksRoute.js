import express from "express"; 
import { Book } from "../models/bookModel.js";

const router = express.Router(); 

router.post("/", async (req, res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({message: "Send all required fields"});
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await Book.create(newBook);
        res.status(200).send(book);
    }
    catch(err){
        console.log(err.message); 
        res.status(400).send(err.message);
    }
}); 

router.get("/", async(req, res)=>{
    try{
        const books = await Book.find({});
        res.status(200).send(books);
    }
    catch(err){
        console.log(err.message);
        res.status(400).send(err.message);
    }
}); 

router.get("/:id", async(req, res)=>{
  try{
    if(!req.params.id){
        return res.status(400).send({message: "Send book id"});
    }
    const books = await Book.findById(req.params.id);
    res.status(200).send(books);
  }  
    catch(err){
        console.log(err.message);
        res.status(400).send(err.message);
    }
});

router.put("/:id", async(req, res)=>{
    try{
        if(!req.params.id){
            return res.status(400).send({message: "Send book id"});
        }
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({message: "Send all required fields"});
        }
        const updatedBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await Book.findByIdAndUpdate(req.params.id, updatedBook, {new: true});
        if(!book){
            return res.status(400).send({message: "Book not found"});
        }
        res.status(200).send({message: "Book updated", book});
    }
    catch(err) {
        console.log(err.message);
        res.status(400).send(err.message);
    }
}); 

router.delete("/:id", async(req, res)=>{
    try{
        const book = await Book.findByIdAndDelete(req.params.id);
        if(!book){
            return res.status(400).send({message: "Book not found"});
        }
        res.status(200).send({message: "Book deleted"});
    }
    catch{
        console.log(err.message);
        res.status(400).send(err.message);
    }
});


export default router; 