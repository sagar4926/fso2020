import { gql } from "@apollo/client";

export const Q_ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
      born
      bookCount
    }
  }
`;

export const Q_ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      author
      published
    }
  }
`;