const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


let promise = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(books)
    }, 1000);
  })
   promise.then((books) => {
        console.log( "this for the whole books list" + JSON.stringify({books},null,4))
    })

    
function myPromise(number) { return new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve(books = books[number])
    }, 2000);
  })}
  
  myPromise(1).then((book) => {
    console.log("this is for a singel book" + JSON.stringify({book},null,4))
  })

  function myNamePromise(author) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let result = {};
        for (const id in books) {
          if (books[id].author !== author) {
            result[id] = books[id];
          }
        }
        resolve(result);
      }, 3000);
    });
  }

  myNamePromise("Dante Alighieri").then((name) => {
    console.log("this is for getting a book by an Author " + JSON.stringify({name}, null, 4));
  });

  function myTitelPromise(titel) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let result = {};
        for (const id in books) {
          if (books[id].titel !== titel) {
            result[id] = books[id];
          }
        }
        resolve(result);
      }, 4000);
    });
  }

  myTitelPromise("Things Fall Apart").then((name) => {
    console.log("this is for getting a book by the Titel " + JSON.stringify({name}, null, 4));
  });
  
public_users.delete("/register",(req,res) =>{
    const username = req.params.username;
    const userIndex = users.filter(user => user.username === username);
    if(userIndex !== -1){
        users.splice(userIndex, 1);
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
 if(isValid(username)){
    return res.status(400).json({message:" user is aleady resgisterd"});
 }
 else{
    users.push({username, password});
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
