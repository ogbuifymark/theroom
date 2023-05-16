const { buildSchema } = require('graphql');

const schema = buildSchema(`
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
`);

module.exports = schema;
