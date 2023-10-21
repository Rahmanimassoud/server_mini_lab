
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const PORT = 3000

const app = express();
app.use(express.json());



const books = [ { id: 1, title: "The Great Gatsby" }, { id: 2, title: "To Kill a Mockingbird" }, { id: 3, title: "1984" }, ];

// PART 4 this should be first in oder not to interfere with the more specific route.
app.get("/books/long", (req, res)=> {
    res.send("List of long books")
})



app.get('/books/:id', (req, res)=> {
    const bookId = parseInt(req.params.id);
    const book = books.find((b)=> b.id===bookId);
    if(!book) {
        return res.status(404).send("Book not found")
    } 
    res.send(`Book Title ${book.title}`);
})

app.get("/error-example/:id", (req, res)=> {
    res.send(`Book ID: ${req.params.id}`);
    // res.send("This is an error example") //not allowed to send more than one response.
});

// modified route with error handling
app.get("/fixed-example/:id", (req, res)=> {
    const bookId = parseInt(req.params.id);
    const book = books.find((b)=> b.id === bookId);
    if(!book){
        return res.status(404).send("Book not found")
    }
    res.send(`Book title: ${book.title}`)
});


// PART 5

app.get("/greet/:firstName/:lastName", (req, res)=> {
    res.send(`Hello ${req.params.firstName} ${req.params.lastName}`)
})








app.listen(PORT, ()=> {
    console.log(`Server is up and running on port ${PORT}`);
});