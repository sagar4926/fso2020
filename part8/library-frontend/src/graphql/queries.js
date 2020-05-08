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
      author {
        id
        name
      }
      published
      genres
    }
  }
`;

export const Q_RECOMMENDED_BOOKS = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) {
      id
      title
      author {
        id
        name
      }
      published
      genres
    }
  }
`;

export const Q_ME = gql`
  query {
    me {
      username
      favouriteGenre
    }
  }
`;
