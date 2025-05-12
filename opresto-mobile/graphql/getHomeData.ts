// graphql/getHomeData.ts
import { gql } from '@apollo/client';

export const GET_HOME_DATA = gql`
  query {
    cities {
      id
      name
      postalCode
    }
    restaurants {
      id
      name
      city {
        name
        postalCode
      }
    }
  }
`;
