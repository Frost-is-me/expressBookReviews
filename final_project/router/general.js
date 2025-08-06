const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.delete("/register",(req,res) =>{
    const user = req.params.username;
    if(users[user]){
        delete users[user];
        return res.status(200).json({message: " user has been deleted"})
    }
    else{
        return res.status(400).json({message:" user not found"})
    }
})

public_users.post("/register", (req,res) => {
 const{username,password} = req.body
 if(!username || !password){
   return res.status(400).json({message: "invalid reuest"})
}
 if(users[username]){
    return res.status(400).json({message:" user is aleady resgisterd"});
 }
 else{
    users[username] = username,password;
    return res.status(200).json({message:" user is registerd succecfully"});
 };
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send(JSON.stringify({books},null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const number = req.params.isbn;
  res.send(books[number]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
const name = req.params.author;
let result = []
for(const id in books){
    if(books[id].author === name){
        result.push(books[id])
    }
}
res.send(result)
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
const titelOF = req.params.title;
let result = []
for(const id in books){
    if(books[id].title === titelOF){
        result.push(books[id])
    }
}
res.send(result)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const number = req.params.isbn;
  res.send(books[number].reviews)
});

module.exports.general = public_users;
