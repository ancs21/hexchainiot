import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { useAuth } from '../components/use-auth'

export default function ExchangeRates() {
  const { loading, error, data } = useQuery(gql`
    {
      users
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
