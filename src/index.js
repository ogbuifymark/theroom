const { ApolloServer,gql} = require('apollo-server-lambda');
const fs = require('fs');
const csv = require('csv-parser');


async function readBooksData() {
  return new Promise((resolve, reject) => {
    const books = [];
    fs.createReadStream('./data/books.csv')
      .pipe(csv())
      .on('data', (row) => {
        books.push(row);
      })
      .on('end', () => {
        console.log('CSV file successfully processed.');
        resolve(books);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

const typeDefs = gql`
  type Book {
    title: String
    authors: String
    average_rating: Float
    isbn: String
    isbn13: String
    language_code: String
    num_pages: Int
    ratings_count: Int
    text_reviews_count: Int
    publication_date: String
    publisher: String
  }

  type Query {
    searchBooks(title: String!): [Book]
  }
`;

 const resolvers = {
  Query: {
    searchBooks: async (_, { title })  => {
      const books = await readBooksData();
      console.log(books.length)
      const searchResults = books.filter((book) =>
        book.title.toLowerCase().includes(title.toLowerCase())
      );
      return searchResults.sort((a, b) => b.ratings_count - a.ratings_count);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

exports.exports = server.createHandler();




  