import gql from 'graphql-tag'

export default gql`
query{
  eventMany{
    _id
    eventid
    name
    start_date
    end_date
    member
    banner
  }
}
`