import React from 'react'
import gql from 'graphql-tag'

import { Query } from 'react-apollo'

const GET_USER = gql`
  query {
    users {
      id
    }
  }
`

export default () => {
  return (
    <Query query={GET_USER}>
      {({ data, loading, error }) => {
        console.log(data)
        return <h1>sas</h1>
      }}
    </Query>
  )
}
