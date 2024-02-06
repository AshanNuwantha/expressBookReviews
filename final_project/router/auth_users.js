const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
    {
      "username":"Nimal",
      "password":"123book"
    },
    {
      "username":"Amal",
      "password":"1234xyz"
    }
];

const isValid = (username)=>{ //returns boolean
  var isValid = false;
  users.forEach(function(user){
    if(user.username == username && user.username !== undefined && user.username != 0){
      isValid = true;
    }
  });
  return isValid;
}

const authenticatedUser = (username,password)=>{ //returns boolean
  var isExists = false;
  users.forEach(function(user){
    if(user.username !== undefined && user.username != 0 && user.password !== undefined && user.password != 0 && user.username == username && user.password == password){
      isExists = true;
    }
  });
  return isExists;
}

//only registered users can login (Task 7)
regd_users.post("/login", (req,res) => {
  const{username,password} = req.body;
  if(authenticatedUser(username,password)){
    let accessToken = jwt.sign({data: username}, 'access', { expiresIn: 60 * 60 });
    req.session.authenticated ={accessToken}
    return res.status(403).json({message: "User successfully logged in.", accessToken: accessToken});
  }else{
    return res.status(403).json({message: "username & password not vaild."});
  }
});

// Add a book review (Task 8)
regd_users.put("/auth/review/:isbn", (req, res) => {
  const review = req.body.reviews;
  if( review === undefined || review == 0){ return res.status(300).json({message :"undefined reviews"});}
  else{ books[req.params.isbn].reviews = review;  return res.status(300).json({message: "success book review added or modify.","review": books[req.params.isbn].reviews}); }
});

// Delete a book review under isbn (Task 9)
regd_users.delete("/auth/review/:isbn", function(req, res){
  const isbn = req.params.isbn;
  if(isbn === undefined || isbn == 0){
    return res.status(403).json({message :"undefined isbn"});}
  else{ 
    books[req.params.isbn].reviews = {}; 
    var deletedBookReviewDetail = books[req.params.isbn];
    return res.status(300).json({message: "success book review deleted.", deletedBookReviewDetail}); 
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
