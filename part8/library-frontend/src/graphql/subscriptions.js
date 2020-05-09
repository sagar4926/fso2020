import { gql } from "@apollo/client";
import { FRAGMENT_BOOK } from "./fragments";

export const S_BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${FRAGMENT_BOOK}
`;
