const fs = require('fs');
const csv = require('csv-parser');

const books = [];

fs.createReadStream('./data/books.csv')
  .pipe(csv())
  .on('data', (row) => {
    books.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');
  });

const resolver = {
  searchBooks: ({ title }) => {
    const searchResults = books.filter((book) =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
    return searchResults.sort((a, b) => b.ratings_count - a.ratings_count);
  },
};

module.exports = resolver;
