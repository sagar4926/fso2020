import { gql } from "@apollo/client";
import { FRAGMENT_AUTHOR, FRAGMENT_BOOK } from "./fragments";

export const Q_ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${FRAGMENT_AUTHOR}
`;

export const Q_RECOMMENDED_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${FRAGMENT_BOOK}
`;

export const Q_ME = gql`
  query {
    me {
      username
      favouriteGenre
    }
  }
`;
