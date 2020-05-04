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

export default { Q_ALL_AUTHORS };
