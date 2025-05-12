// graphql/getRestaurantDetails.ts
import { gql } from '@apollo/client';

export const GET_RESTAURANT_DETAILS = gql`
  query GetRestaurant($id: ID!) {
    restaurant(id: $id) {
      id
      name
      description
      address
      terrace
      city {
        name
        postalCode
      }
      manager {
  firstname
  lastname
  email

}
cookingStyles {
        id
        label
      }
      ratings {
        id
        value
      }
    }
  }
`;
