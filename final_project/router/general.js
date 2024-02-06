const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register User (Task 6)
public_users.post("/register", (req,res) => {
  const{username,password} = req.body;

  if (!username || !password) {
    return res.status(404).json({message: "Body Empty"});
  }
  if(isValid(username)){
    return res.status(404).json({message: "User already exists"});
  }else{
    index = users.push({username:username,password:password});
    return res.status(300).json({message: "Success registation.",registation_index: index });
  }
});

// Get the book list available in the shop (Task 1)
public_users.get('/',function (req, res) {
  if(books === undefined || books.length == 0){
    return res.status(404).json({message: "No more results."});
  }else{
    return res.status(300).json({books});//.send(JSON.stringify({books},null,4))
  }
});

// Get book details based on ISBN (Task 2)
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  if(books[isbn] === undefined || books[isbn].length == 0){
    return res.status(404).json({message: "No more results."});
  }else{
    return res.status(300).json(books[req.params.isbn]);//.send(JSON.stringify({books},null,4))
  }
});
  
// Get book details based on author (Task 3)
public_users.get('/author/:author',function (req, res) {

  var resultSet = [];
  for(var keys in books){ if(books[keys].author == req.params.author){ resultSet.push(books[keys])} }

  if(resultSet === undefined || resultSet.length == 0){
    return res.status(404).json({message: "No more results."});
  }else{
    return res.status(300).json(resultSet);
  }

});

// Get all books based on title (Task 4)
public_users.get('/title/:title',function (req, res) {

  var resultSet = [];
  for(var keys in books){ if(books[keys].title == req.params.title){ resultSet.push(books[keys])} }

  if(resultSet === undefined || resultSet.length == 0){
    return res.status(404).json({message: "No more results."});
  }else{
    return res.status(300).json(resultSet);
  }
});

//  Get book review (Task 5)
public_users.get('/review/:isbn',function (req, res) {

  if(books[req.params.isbn].reviews === undefined || books[req.params.isbn].reviews == null){
    return res.status(404).json({isbn: req.params.isbn,message: "No more reviews."});
  }else{
    return res.status(300).json({reviews: books[req.params.isbn].reviews});
  }

});

/////////////----------Async-Await functions-------------/////////////////

// Async-Await Get the book list available in the shop (Task 10)
public_users.get('/async/', async function(req ,res){
  try{
    const bookList = await {books};
    res.status(300).json(bookList);
  }catch(err){
    res.status(403).send({message: err});
  }
});

// Async-Await Get book details based on ISBN (Task 11)
public_users.get('/async/isbn/:isbn' ,  async function(req ,res){
  try{
    const bookDetails = await books[req.params.isbn];
    res.status(300).json(bookDetails);
  }catch(err){
    res.status(403).send({message: err});
  }
});

// Async-Await Get book details based on author (Task 12)
public_users.get('/async/author/:author',async function (req, res) {
  //Write your code here
  var resultList = [];
  try{
    const bookList = await books;
    for(var keys in bookList){ 
      if(bookList[keys].author == req.params.author){
         resultList.push(bookList[keys])
        } 
    }
    if(resultList === undefined || resultList.length == 0){
      return res.status(404).json({message: "No more results."});
    }else{
      return res.status(300).json(resultList);
    }
  }catch(err){
    res.status(403).send({message: err});
  }
});

// Async-Await Get all books based on title (Task 13)
public_users.get('/title/:title',async function (req, res) {
  var resultList = [];
  const bookList = await books;
  try{
    for(var keys in bookList){ 
      if(bookList[keys].title == req.params.title){  resultSet.push(bookList[keys]) } 
    }

    if(resultList === undefined || resultList.length == 0){
      return res.status(404).json({message: "No more results."});
    }else{
      return res.status(300).json(resultList);
    }
  }catch(err){
    res.status(403).send({message: err});
  }  
});

module.exports.general = public_users;
