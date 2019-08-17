import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

export default function ExchangeRates() {
  const { loading, error, data } = useQuery(gql`
    {
      hello
    }
  `)

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  console.log(data)
  return (
    <>
      <h1>ad</h1>
    </>
  )
}
