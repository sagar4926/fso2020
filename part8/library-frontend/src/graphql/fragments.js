import { gql } from "@apollo/client";

export const FRAGMENT_AUTHOR = gql`
  fragment AuthorDetails on Author {
    name
    id
    born
    bookCount
  }
`;

export const FRAGMENT_BOOK = gql`
  fragment BookDetails on Book {
    id
    title
    author {
      ...AuthorDetails
    }
    published
    genres
  }
  ${FRAGMENT_AUTHOR}
`;
