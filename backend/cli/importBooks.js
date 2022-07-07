import mongoose from 'mongoose';
import axios from 'axios';
import { Book } from '../models/Book.js';

mongoose.connect('mongodb://localhost/bookapi');
console.log('connected to mongo');

const url = 'https://edwardtanguay.netlify.app/share/books.json';

const books = (await axios.get(url)).data;

for (const rawBook of books) {
    const book = new Book({
        title: rawBook.title,
        description: rawBook.description,
        numberOfPages: rawBook.totalpages,
        language: rawBook.language,
        imageUrl: `http://edwardtanguay.netlify.app/share/images/books/${rawBook.idcode}.png`,
        buyUrl: rawBook.buyurl
    });
    const ret = await book.save();
    console.log('created book: ' + ret.title);
}

process.exit(1);